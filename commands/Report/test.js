const Discord = require("discord.js");
const config = require("../../config.json");
const imgur = require('imgur');

module.exports = {
      //Command Information
      name: "test",
      description: "Sets the report channel",
      usage: "`prefix reportchannel #channelname`",
      enabled: true,
      guildOnly: true,
      aliases: ["ttt"],
      memberPermissions: ["MANAGE_MESSAGES"],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {
        
    if(message.member.voice.channel) {
        let vcName = message.member.voice.channel.name;
        if(vcName.length != null) {
            return message.reply(message.member.voice.channel.name);
        } 
    }

	


    },
};