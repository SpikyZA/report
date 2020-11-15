const Discord = require("discord.js");
const fs = require("fs")
const tools = require("../../modules/Tools.js");

module.exports = {
      //Command Information
      name: "helpold",
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

           if (args.length) {
            if (fs.existsSync("./commands/" + args[0] + ".js")) { 
                var command = require("./" + args[0] + ".js")
                var embed = new discord.RichEmbed()
                    .setTitle(command.name.charAt(0).toUpperCase() + command.name.slice(1))
                    .setDescription(command.description)
                embed.addField('Category', command.category, true)
                if(command.aliases){
                    embed.addField('Aliases', command.aliases, true)
                }
                embed.addField('Usage', command.usage, true)
                message.channel.send("Arguments: <> = needed argument, [] = optional argument")
                message.channel.send(embed)
            } else {
                message.channel.send("Invalid command")
            }
        } else {
            var list = {}
            fs.readdirSync("./commands").forEach(file => {
                var command = require("./" + file)
                if (!list[command.category]) list[command.category] = []
                list[command.category].push(command.name)
            })
            var embed = new discord.RichEmbed()
                .setTitle("Main Help")
                .setDescription("Prefix: " + bot.handler.getPrefix(message.guild.id))
            for (category in list) {
                var commands = []
                for (cmd in list[category]) {
                    commands.push(list[category][cmd])
                }
                embed.addField("**" + category.charAt(0).toUpperCase() + category.slice(1) + "**", commands)
            }
            message.channel.send(embed)
        }

    },
};