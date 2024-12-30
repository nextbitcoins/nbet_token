import { Address, toNano } from '@ton/core';
import { NextBitcoinEnergyToken } from '../wrappers/NextBitcoinEnergyToken';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../utils/jetton-helpers';

export async function run(provider: NetworkProvider) {
    const jettonParams = {
        name: "NextBitcoin Energy Token",
        description: "The Next Bitcoin Energy Token (NBET) is a revolutionary token on the TON (The Open Network) blockchain, designed to support the decentralized mining of NextBitcoin (NXBTC). NXBTC is a unique digital asset that mirrors Bitcoin's properties and is pegged to its market price, maintaining the scarcity and value attributes that define Bitcoin. NBET plays a vital role in this ecosystem, serving as the primary token that fuels the mining process through an innovative Mine and Earn game on the Telegram Mini App.",
        symbol: "NBET",
        image: "https://amaranth-defeated-kiwi-462.mypinata.cloud/ipfs/bafkreidpykfeek3pbdof54ble7lmy3zedwtlpclinpp7zzvcwlcuujse64",
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    const nextBitcoinEnergyToken = provider.open(await NextBitcoinEnergyToken.fromInit(provider.sender().address as Address, content, toNano(400000000000)));

    //new contract
//     await nextBitcoinEnergyToken.send(
//         provider.sender(),
//         {
//             value: toNano('0.05'),
//         },
//         {
//             $$type: 'Mint',
//             amount: toNano(400000000000),
//             receiver: provider.sender().address as Address
//         }
//     );
//    await provider.waitForDeploy(nextBitcoinEnergyToken.address);


//    close mint

    await nextBitcoinEnergyToken.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        
       "Owner: MintClose"
    );
    await provider.waitForDeploy(nextBitcoinEnergyToken.address);


    //change owner
    // await nextBitcoinEnergyToken.send(
    //     provider.sender(),
    //         {
    //             value: toNano('0.05'),  
    //         },
        
    //        {
    //         $$type: 'ChangeOwner',
    //         queryId: BigInt("12"),
    //         newOwner: Address.parse("0QB4TBmfaohG4-Q99QxkXX1atJNNZ8dXItLj5I27YXtFFg04")
    //     }
    // )
    // await provider.waitForDeploy(nextBitcoinEnergyToken.address);

        
}
