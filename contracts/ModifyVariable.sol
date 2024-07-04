// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract ModifyVariable {
    uint256 public value;

    constructor(uint256 _value) {
        value = _value;
    }

    function modifyToLeet() public {
        value = 1337;
    }

    function modifyToZero() public {
        value = 0;
    }

    function modifyToOne() public {
        value = 1;
    }

    function modifyValue(uint256 _value) public {
        value = _value;
    }
}
