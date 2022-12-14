import { Colors, TextChannel, User } from 'discord.js';
import moment from 'moment';
import { CommandDefinition } from '../../lib/command';
import { Channels, CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const modLogEmbed = (formattedDate, moderator: User, user: User, reason: string) => makeEmbed({
    color: Colors.Red,
    author: {
        name: `[BANNED] ${user.tag}`,
        iconURL: user.displayAvatarURL(),
    },
    fields: [
        {
            name: 'Member',
            value: user.toString(),
        },
        {
            name: 'Moderator',
            value: moderator.toString(),
        },
        {
            name: 'Reason',
            value: reason,
        },
        {
            inline: false,
            name: 'Date',
            value: formattedDate,
        },
    ],
    footer: { text: ` User ID: ${user.id}` },
});

const successfulBanEmbed = (user: User, reason: string) => makeEmbed({
    title: 'User Successfully Banned',
    color: Colors.Green,
    fields: [
        {
            inline: true,
            name: 'Username',
            value: user.toString(),
        },
        {
            inline: true,
            name: 'ID',
            value: (user instanceof User) ? user.id : user,
        },
        {
            inline: false,
            name: 'Reason',
            value: reason,
        },
    ],
});

const failedBanEmbed = (user: User, error: any) => makeEmbed({
    title: 'Failed to Ban User',
    color: Colors.Red,
    fields: [
        {
            inline: true,
            name: 'Username',
            value: user.toString(),
        },
        {
            inline: true,
            name: 'ID',
            value: user.id,
        },
        {
            inline: false,
            name: 'Error',
            value: error || 'No error provided',
        },
    ],
});

const dmEmbed = (formattedDate, moderator: User, reason: string) => makeEmbed({
    title: 'You have been banned from FlyByWire Simulations',
    fields: [
        {
            inline: false,
            name: 'Moderator',
            value: moderator.toString(),
        },
        {
            inline: false,
            name: 'Reason',
            value: reason,
        },
        {
            inline: false,
            name: 'Date',
            value: formattedDate,
        },
        {
            inline: false,
            name: 'Appeal',
            value: `If you would like to appeal your ban, please fill out [this form.](${process.env.BAN_APPEAL_URL})`,
        },
    ],
});

const noDM = (user: User) => makeEmbed({
    title: 'Ban - DM not sent',
    description: makeLines([
        `${user.toString()} has DMs closed or has no mutual servers with the bot`,
        '',
        `Please remember to send the user the reason they were banned and the ban appeal form - ${process.env.BAN_APPEAL_URL}`,
    ]),
    color: Colors.Red,
});

export const ban: CommandDefinition = {
    name: 'ban',
    requiredPermissions: ['BanMembers'],
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.ban\s+/, '').split(' ');
        if (splitUp.length < 2) {
            await msg.reply('you did not provide enough arguments for this command. (<id> <reason>)');
            return Promise.resolve();
        }
        const idArg = splitUp[0];
        const reason = splitUp.slice(1).join(' ');
        const targetUser = await msg.guild.members.fetch(idArg);
        const moderator = msg.author;
        const currentDate = new Date();
        const formattedDate: string = moment(currentDate).utcOffset(0).format('DD, MM, YYYY, HH:mm:ss');
        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
        try {
            await targetUser.send({ embeds: [dmEmbed(formattedDate, moderator, reason)] });
        } catch {
            await modLogsChannel.send({ content: moderator.toString(), embeds: [noDM(targetUser.user)] });
        }
        return msg.guild.members.ban(idArg).then((user) => {
            if (modLogsChannel && typeof user !== 'string') {
                modLogsChannel.send({ embeds: [modLogEmbed(formattedDate, moderator, targetUser.user, reason)] });
            }
            msg.channel.send({ embeds: [successfulBanEmbed(targetUser.user, reason)] });
        }).catch(async (error) => {
            msg.channel.send({ embeds: [failedBanEmbed(targetUser.user, error)] });
        });
    },
};
