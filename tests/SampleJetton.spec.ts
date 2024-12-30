import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { NextBitcoinEnergyToken } from '../wrappers/NextBitcoinEnergyToken';
import '@ton/test-utils';

describe('NextBitcoinEnergyToken', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let nextBitcoinEnergyToken: SandboxContract<NextBitcoinEnergyToken>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        nextBitcoinEnergyToken = blockchain.openContract(await nextBitcoinEnergyToken.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await nextBitcoinEnergyToken.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nextBitcoinEnergyToken.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and nextBitcoinEnergyToken are ready to use
    });
});
