const Discord = require("discord.js");
const emojis = require('../../tools/emojis.json');

module.exports = {
    //Command Information
    name: "members",
    description: "Get the currently latency of the bot",
    usage: "ping",
    enabled: true,
    guildOnly: true,
    aliases: [],
    memberPermissions: [],
    botPermissions: ["SEND_MESSAGES"],
    nsfw: false,
    cooldown: 5000,
    ownerOnly: false,

    async execute(client, message, args, data) {
        const members = message.guild.members.cache.array();
        const online = members.filter((m) => m.presence.status === 'online').length;
        const offline =  members.filter((m) => m.presence.status === 'offline').length;
        const dnd =  members.filter((m) => m.presence.status === 'dnd').length;
        const afk =  members.filter((m) => m.presence.status === 'idle').length;
        const embed = new Discord.MessageEmbed()
          .setTitle(`Member Status [${message.guild.members.cache.size}]`)
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setDescription(`${emojis.online} **Online:** \`${online}\` members\n${emojis.dnd} **Busy:** \`${dnd}\` members\n${emojis.idle} **AFK:** \`${afk}\` members\n${emojis.offline} **Offline:** \`${offline}\` members`)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);
    },
};
