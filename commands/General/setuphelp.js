const Discord = require("discord.js");
const tools = require("../../modules/Tools.js");

module.exports = {
      //Command Information
      name: "setuphelp",
      description: "Get a list of the commands the bot offers",
      usage: "help [Command]",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      cooldown: 0,
      ownerOnly: false,

    async execute(client, message, args, data) {

        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Setup Help")
        .setDescription("The setup for Report is pretty basic and straight forward.\n\nTo set the report channel, you simply do ``r!reportchannel #channel``\nYou must replace ``#channel`` with the channel that you want the bot to log messages to, don't forget to tag the channel.\n\nYou can use the two types of reporting, Silent reporting and Normal reporting. You can find out more about these commands by running the ``r!help`` command.")
        .addField("Support Discord", `https://discord.gg/sKKEyUn`)
        .setColor("#FA8334")
        message.channel.send(helpEmbed);


    },
};