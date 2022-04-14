// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./CrowdSale.sol";
import "./KycContract.sol";

contract MyTokenSale is CrowdSale{
    KycContract kyc;

    constructor(uint256 rate, address payable wallet, ERC20 token, KycContract _kyc) CrowdSale(rate, wallet, token)public{
        kyc = _kyc;
    }

    function preValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        require(beneficiary != address(0));
        require(weiAmount != 0);
        require(kyc.kycCompleted(msg.sender), "KYC Not Completed, purchase not allowed");
    }
}