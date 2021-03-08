import web3 from "ethereum/web3";
import { AssetAddress, UnilendFlashLoanCoreContract } from ".";

import UnilendFDonationABI from "../build/UnilendFDonation.json";
import FlashloanABI from "../build/FlashLoanABI.json";
import IERC20ABI from "../build/IERC20.json";

export const FlashloanLBCore = new web3.eth.Contract(
  FlashloanABI.abi,
  UnilendFlashLoanCoreContract
);
export const UnilendFDonation = (donateContract: string) => {
  console.log("donateContract", donateContract);
  return new web3.eth.Contract(UnilendFDonationABI.abi, donateContract);
};

export const IERC20 = new web3.eth.Contract(IERC20ABI.abi, AssetAddress);
