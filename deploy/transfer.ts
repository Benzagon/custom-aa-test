import * as hre from "hardhat";
import { getWallet } from "./utils";
import { ethers, parseEther } from "ethers";

// Address of the contract to interact with
const CONTRACT_ADDRESS = "0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021";
if (!CONTRACT_ADDRESS) throw "⛔️ Provide address of the contract to interact with!";

// Send 1 ether from rich account to bootloader, to pay for gas fees
export default async function () {
    const wallet = getWallet()
    
    const response = await wallet.sendTransaction({
        to: CONTRACT_ADDRESS,
        value: parseEther("1"),
    });

    console.log(response);
}
