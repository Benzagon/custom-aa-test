import * as hre from "hardhat";
import { getWallet } from "./utils";
import { ethers } from "ethers";

// Address of the contract to interact with
const CONTRACT_ADDRESS = "0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021";
if (!CONTRACT_ADDRESS) throw "⛔️ Provide address of the contract to interact with!";

// An example of a script to interact with the contract
export default async function () {
  console.log(`Running script to interact with contract ${CONTRACT_ADDRESS}`);

  // Load compiled contract info
  const contractArtifact = await hre.artifacts.readArtifact("MyAccount");

  // Initialize contract instance for interaction
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractArtifact.abi,
    getWallet() // Interact with the contract on behalf of this wallet
  );

  // Run contract read function
  const response = await contract.count();
  console.log(`Current count is: ${response}`);
}