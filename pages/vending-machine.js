import styles from '../styles/VendingMachine.module.css'
import { useState } from 'react'
import 'bulma/css/bulma.css'
import Web3 from 'web3'
import Head from 'next/head'
// Ox9ca89a0e3fba2abe5e075b130d30197690e75371
const VendingMachine=()=>{
    const [error,setError]=useState('');
    let web3;

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
                <p>Place</p>
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