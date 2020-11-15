const Discord = require("discord.js");
const config = require("../../config.json");
const suggest = require("../../models/suggest");

module.exports = {
      //Command Information
      name: "suggestchannel",
      description: "Sets the report channel",
      usage: "`prefix reportchannel #channelname`",
      enabled: true,
      guildOnly: true,
      aliases: ["sc"],
      memberPermissions: ["MANAGE_MESSAGES"],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {
    
      if(args.length == 0){

        if(data.guild.suggestLogs == "null") {
          let announcementEmbed = new Discord.MessageEmbed()
          .setTitle("Suggestion Channel")
          .setColor(config.color)
          .setDescription(`This server does not have a **Suggestion** Channel setup yet. \n\nYou can run \`r!help suggestchannel\` to find out more`)
          return message.channel.send(announcementEmbed)
        }

        else {
        let announcementEmbed = new Discord.MessageEmbed()
        .setTitle("Suggestion Channel")
        .setColor(config.color)
        .setDescription(`This servers **Suggestion** Channel is: <#${data.guild.suggestLogs}>`)
        return message.channel.send(announcementEmbed)
    //   return message.channel.send("This servers report log channel is: " + `<#${data.guild.reportchannel}>`);
        }
    }

    else {
      let channel = message.mentions.channels.first().id;
      data.guild.suggestLogs = channel;
      await data.guild.save();
      let announcementEmbed = new Discord.MessageEmbed()
      .setTitle("Successfully Set Suggestion Channel")
      .setColor(config.color)
      .setDescription(`This servers **Suggestion** Channel is now set to: <#${data.guild.suggestLogs}>`)
      return message.channel.send(announcementEmbed)
      //return message.channel.send("Server report channel updated to " + `<#${data.guild.reportchannel}>`)
    }

    }

}