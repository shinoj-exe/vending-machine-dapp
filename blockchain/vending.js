// import Web3 from 'web3';

// const provider = new Web3.providers.HttpProvider(
//     "https://polygon-mumbai.g.alchemy.com/v2/1ovM971SFozoJOYYY9wKCF3biTYoz_B6"
// )

// const web3 = new Web3(provider)

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donutBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVendingMachineBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOfDonuts","type":"uint256"}],"name":"purchase","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOfDonuts","type":"uint256"}],"name":"restock","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const vendingMachineContract=web3=>{
    return new web3.eth.Contract(abi,"0xd4090077df893D0Dd0Bd13050C7DE340e54d07C3")

}

// const vmContract = new web3.eth.Contract(abi,"0xd4090077df893D0Dd0Bd13050C7DE340e54d07C3")

export default vendingMachineContract