import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const xbox: CommandDefinition = {
    name: ['xbox', 'xboxmarketplace'],
    description: 'Short response + link to NOTAM for xbox marketplace',
    category: CommandCategory.GENERAL,
    executor: (msg) => {
        const xboxEmbed = makeEmbed({
            title: 'FlyByWire Addons | Xbox + MSFS Marketplace',
            description: 'Due to a number of contributing factors, FlyByWire Simulations\' addons will not be released on the Xbox or the Marketplace. [You can read more here](https://flybywiresim.com/notams/marketplace-announcement/).',
        });

        return msg.channel.send({ embeds: [xboxEmbed] });
    },
};
