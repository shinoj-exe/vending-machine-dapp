import styles from '../styles/VendingMachine.module.css'
import { useState ,useEffect} from 'react'
import 'bulma/css/bulma.css'
import Web3 from 'web3'
import vendingMachineContract from '@/blockchain/vending'
import Head from 'next/head'
// Ox9ca89a0e3fba2abe5e075b130d30197690e75371 old
// 0xd4090077df893D0Dd0Bd13050C7DE340e54d07C3
// owner address: 0xd52b01e012a6dFCba7760Db149681648D10762B1
const VendingMachine=()=>{
    const [error,setError]=useState('');
    const [success,setSuccess]=useState('');

    const [inventory,setInventory]=useState('');
    const [myDonutCount,setMyDonutCount]=useState('');
    const [buyCount,setBuyCount]=useState('');
    const [web3,setWeb3]=useState(null)
    const [address,setAddress]=useState(null);
    const [vmContract,setVmContract]=useState(null);

    // let web3;

    useEffect(()=>{
        if(vmContract) getInventoryHandler()
        if(vmContract && address) getMyDonutCountHandler()
    },[vmContract,address])

    const getInventoryHandler=async()=>{
        const inventory=await vmContract.methods.getVendingMachineBalance().call()
        setInventory(inventory)
    }

    const getMyDonutCountHandler=async()=>{
        // const accounts=await web3.eth.getAccounts()
        const count = await vmContract.methods.donutBalances(address).call()
        setMyDonutCount(count);
    }

    const updateDonutQty= event=>{
        setBuyCount(event.target.value)
    }

    const buyDonutsHandler = async()=>{
        // const accounts=await web3.eth.getAccounts()
        try {
            await vmContract.methods.purchase(buyCount).send({
                from: address,
                value: web3.utils.toWei('1','ether')*buyCount
            })
            // setPurchases(purchases++);
            setSuccess("Donut purchased")
            if(vmContract) getInventoryHandler()
            if(vmContract && address) getMyDonutCountHandler()
        } catch (error) {
            setError(error.message)
        }
    }

    const connectWalletHandler=async()=>{
        if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){ //this condition satisfies only if the user has metamask
            try {
                // req wallet connect
                await window.ethereum.request({method: "eth_requestAccounts"})
                // set web3 instance
                const web3 = new Web3(window.ethereum);
                setWeb3(web3)
                // get list of accounts
                const accounts=await web3.eth.getAccounts()
                setAddress(accounts[0]);

                // create local contract copy
                const vm = vendingMachineContract(web3)
                setVmContract(vm)

                // getMyDonutCountHandler()

            } catch (error) {
                console.log(error.message);
                setError(error.message)
            }
        }else{
            // metamask not installed
            alert("Please install metamask")
        }
    }
    return (
        <div className={styles.main}>

            <Head>
            <title>Vending Machine App</title>
            <meta name="description" content="A solidity based blockchain vending machine app" />
          </Head>
          <nav className="navbar mt-4 mb-4">
            <div className="container">
                <div className="navbar-brand">
                    <h1>Vending Machine </h1>
                </div>
                <div className="navbar-end">
                    <button className="button is-primary" onClick={connectWalletHandler}>Connect Wallet</button>
                </div>
            </div>
          </nav>
          <section>
            <div className="container">
                <h2>Vending Machine Inventory: {inventory}</h2>
            </div>
          </section>
          <section>
            <div className="container">
                <h2>My Donut Count: {myDonutCount}</h2>
            </div>
          </section>
          <section className='mt-5'>
            <div className="container">
                <div className="field">
                    <label className='label'>Buy Donuts</label>
                    <div className="control">
                        <input type="text" className='input' onChange={updateDonutQty} placeholder='Enter the Amount of Donuts to buy' />
                    </div>
                    <button className="button is-primary mt-2" onClick={buyDonutsHandler}>Buy Donut</button>

                </div>
            </div>
          </section>
          <section>
            <div className="container has-text-danger">
                <p>{error}</p>
            </div>
          </section>
          <section>
            <div className="container has-text-success">
                <p>{success}</p>
            </div>
          </section>
            {/* <h1>Vending Machinne</h1> */}
        </div>
    )
}

export default VendingMachine;