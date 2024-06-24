const { SlashCommandBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newchannel')
        .setDescription('12'),
    
    async execute(interaction) {
        try {
            // Create a new text channel
            const newChannel = await interaction.guild.channels.create({
                name: 'new-channel',
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                ],
            });

            await newChannel.send('Test!');
            await interaction.reply({ content: 'New channel has been created and a message has been sent.', ephemeral: true });
        } catch (error) {
            console.error('Error creating new channel:', error);
            await interaction.reply({ content: 'There was an error creating the new channel.', ephemeral: true });
        }
    }
};