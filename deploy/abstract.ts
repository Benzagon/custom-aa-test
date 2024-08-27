import { parseEther, VoidSigner } from "ethers";
import * as hre from "hardhat";
import { serializeEip712 } from "zksync-ethers/build/utils";

const CONTRACT_ADDRESS = "0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021";
const provider = hre.zksyncEthers.providerL2;
const signer = new VoidSigner(
    "0xa61464658AfeAf65CccaaFD3a512b69A83B77618", 
    provider
); // We're prettending we can sign with this dummy account

export default async function () {
    const tx = await signer.populateTransaction({
        to: "0xa61464658AfeAf65CccaaFD3a512b69A83B77618",
        data: '0x1337',
        value: parseEther(".001"),
    }); // Test data

    // Serialize tx with signature that proves I own the account
    const serializedTx = serializeEip712({
        ...tx,
        nonce: 0, // Test nonce
        from: CONTRACT_ADDRESS,
        customData: {
            customSignature: "0x13371337", // Dummy signature that isnt even validated.
        },
    });

    const response = await provider.broadcastTransaction(serializedTx);
    console.log(response);
}