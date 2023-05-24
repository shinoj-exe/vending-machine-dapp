import styles from '../styles/VendingMachine.module.css'
import 'bulma/css/bulma.css'
import Head from 'next/head'

export default function VendingMachine(){
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
                    <button className="button is-primary">Connect Wallet</button>
                </div>
            </div>
          </nav>
          <section>
            <div className="container">
                <p>Place</p>
            </div>
          </section>
            {/* <h1>Vending Machinne</h1> */}
        </div>
    )
}