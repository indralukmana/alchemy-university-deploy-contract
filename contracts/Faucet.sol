// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Faucet {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function withdraw(uint _amount) public payable {
        // can only withdraw up to .1 ETH
        require(
            _amount <= 100000000000000000,
            "Faucet: Cannot withdraw more than .1 ETH"
        );
        (bool sent, ) = payable(msg.sender).call{value: _amount}("");

        require(sent, "Faucet Withdraw: Failed to send Ether");
    }

    function withdrawAll() public onlyOwner {
        (bool sent, ) = payable(msg.sender).call{value: address(this).balance}(
            ""
        );
        require(sent, "Faucet WithdrawAll: Failed to send Ether");
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Faucet: Only owner can call this function"
        );
        _;
    }
}
