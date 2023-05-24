// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract VendingMachine{
    address public owner;
    mapping (address => uint) public donutBalances;

    constructor(){
        owner = msg.sender;
        // set initial donut balaqnce as 100
        donutBalances[address(this)]=100;
    } 

    function getVendingMachineBalance() public view returns(uint){
        return donutBalances[address(this)];
    }

    function restock(uint amountOfDonuts) public {
        require(msg.sender==owner,"Only the owner can restock thius vending Machine!");
        donutBalances[address(this)]+=amountOfDonuts;
    }

    function purchase(uint amountOfDonuts) public payable{
        require(msg.value >= amountOfDonuts * 1 ether,"You must pay atleast 1 ether per donut"); 
        require(donutBalances[address(this)] >= amountOfDonuts,"Not enough donuts in stock to fullfll request");
        donutBalances[address(this)]-=amountOfDonuts;
        donutBalances[msg.sender]+=amountOfDonuts;
    }
}