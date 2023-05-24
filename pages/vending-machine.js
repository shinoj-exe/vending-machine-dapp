import styles from '../styles/VendingMachine.module.css'
import { useState ,useEffect} from 'react'
import 'bulma/css/bulma.css'
import Web3 from 'web3'
import vmContract from '@/blockchain/vending'
import Head from 'next/head'
// Ox9ca89a0e3fba2abe5e075b130d30197690e75371
// owner address: 0xd52b01e012a6dFCba7760Db149681648D10762B1
const VendingMachine=()=>{
    const [error,setError]=useState('');
    const [inventory,setInventory]=useState('');
    const [myDonutCount,setMyDonutCount]=useState('');

    let web3;

    useEffect(()=>{
        getInventoryHandler()
    },[])

    const getInventoryHandler=async()=>{
        const inventory=await vmContract.methods.getVendingMachineBalance().call()
        setInventory(inventory)
    }

    const getMyDonutCountHandler=async()=>{
        const accounts=await web3.eth.getAccounts()
    }

    const connectWalletHandler=async()=>{
        if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){ //this condition satisfies only if the user has metamask
            try {
                await window.ethereum.request({method: "eth_requestAccounts"})
                web3=new Web3(window.ethereum);
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
          <section>
            <div className="container has-text-danger">
                <p>{error}</p>
            </div>
          </section>
            {/* <h1>Vending Machinne</h1> */}
        </div>
    )
}

export default VendingMachine;