// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Faucet {
    function withdraw(uint _amount) public {
        // can only withdraw up to .1 ETH
        require(
            _amount < 100000000000000000,
            "Faucet: Cannot withdraw more than .1 ETH"
        );
        payable(msg.sender).transfer(_amount);
    }

    receive() external payable {}
}
