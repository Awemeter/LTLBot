import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const faq: CommandDefinition = {
    name: 'faq',
    description: '',
    category: CommandCategory.GENERAL,
    executor: (msg) => {
        const simversionEmbed = makeEmbed({
            title: 'Frequently Asked Questions',
            description: makeLines([
                'Please make sure to fully read through the <#1023141370690551918> before you create a support topic in <#1022978356616118423>.',
                '',
            ]),
        });

        return msg.channel.send({ embeds: [simversionEmbed] });
    },
};
