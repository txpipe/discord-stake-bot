import { Webhook, MessageBuilder } from 'discord-webhook-node';
import { createInterface } from 'readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const hook = new Webhook("<your webhook url>");
hook.setUsername('Stake Delegation Bot');

rl.on('line', function (line) {
    let event = JSON.parse(line);

    if (!!event.stake_delegation) {
        const msg = new MessageBuilder()
            .setTitle('new delegation!')
            .setDescription('Oura detected a new stake delegation certificate :)')
            .addField('pool', event.stake_delegation.pool_hash)
            .addField('address', event.stake_delegation.credential.AddrKeyhash)
            .addField('block', event.context.block_hash)
            .addField('tx', event.context.tx_hash)
            .setTimestamp();

        hook.send(msg);
    }
})
