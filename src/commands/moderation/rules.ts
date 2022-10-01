import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { Channels, CommandCategory, Roles } from '../../constants';

const RULES_EMBED = makeEmbed({
    title: '<:bookmark_tabs:759405704644788256> Rules',
    description: 'Your presence in this server implies accepting these rules, including all further changes. These changes might be done at any time without notice, it is your responsibility to check for them.:',
    fields: [
        {
            name: 'Be respectful',
            value: 'You must respect all users, regardless of your liking towards them. Treat others the way you want to be treated.',
        },
        {
            name: 'No Inappropriate Language',
            value: 'The use of profanity should be kept to a minimum. However, any derogatory language towards any user is prohibited.',
        },
        {
            name: 'No pornographic/adult/other NSFW material',
            value: 'Just don\'t.',
        },
        {
            name: 'No piracy',
            value: 'Sharing of the pirated content, including mods, partially or fully, is strictly prohibited. Discussions of means of obtaining pirated content are also prohibited. Content from unknown source, links to it, discussions of means of obtaining are also prohibited. ',
        },
        {
            name: 'No advertisements',
            value: 'This server is not meant for self-advertising or advertising someone/something else.',
        },
        {
            name: 'Direct & Indirect Threats',
            value: 'Any threats are absolutely prohibited and disallowed.',
        },
        {
            name: 'The Admins and Mods will Kick/Ban per discretion.',
            value: '[]',
        },



    ],
});

export const rules: CommandDefinition = {
    name: 'rules',
    description: 'Sends the rules',
    requiredPermissions: ['BanMembers'],
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        await msg.channel.send({ embeds: [RULES_EMBED] });
    },
};
