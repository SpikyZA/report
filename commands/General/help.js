const Discord = require("discord.js");
const tools = require("../../modules/Tools.js");

module.exports = {
      //Command Information
      name: "help",
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

      if(args[0] == "prefix") {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Command :: Prefix")
        .setDescription("The ***prefix*** command is used to change the prefix of **Report** in your server")
        .addField("Aliases", `p`)
        .addField("Permissions", `MANAGE_MESSAGES`)
        .addField("Usage", `**r!prefix** *[newprefix]*\nReplace *[newprefix]* with the prefix that you want`)
        .setColor("#FA8334")
        message.channel.send(helpEmbed);
      } else if(args[0] == "reportchannel") {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Command :: ReportChannel")
        .setDescription("The ***reportChannel*** command is used to set the channel that the reports will be sent")
        .addField("Aliases", `rc`)
        .addField("Permissions", `MANAGE_MESSAGES`)
        .addField("Usage", `**r!reportchannel** *[#channel]*\nReplace *[#channel]* with the channel that you wont. Don't forget to tag the channel`)
        .setColor("#FA8334")
        message.channel.send(helpEmbed);
      } else if(args[0] == "serverinfo") {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Command :: ServerInfo")
        .setDescription("The ***serverinfo*** command sends useful information about your guild")
        .addField("Aliases", `se`)
        .addField("Permissions", `NONE`)
        .addField("Usage", `**r!serverinfo**`)
        .setColor("#FA8334")
        message.channel.send(helpEmbed);
      } else if(args[0] == "botinfo") {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Command :: BotInfo")
        .setDescription("The ***botinfo*** command sends useful information about **Report**")
        .addField("Aliases", `bi`)
        .addField("Permissions", `NONE`)
        .addField("Usage", `**r!botinfo**`)
        .setColor("#FA8334")
        message.channel.send(helpEmbed);
      } else if(args[0] == "report") {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Command :: Report")
        .setDescription("The ***report*** command is the backbone of the bot. It send your report to the report logs channel that was setup by the server owner\n\nIf your report includes an image, it will send the image aswell")
        .addField("Aliases", `r`)
        .addField("Permissions", `NONE`)
        .addField("Usage", `**r!report** *[your report]*\nReplace *[your report]* with the report message that you want to send`)
        .setColor("#FA8334")
        message.channel.send(helpEmbed);
      } else if(args[0] == "sreport") {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Command :: Silent Report")
        .setDescription("The ***sreport*** command is the same as the *report* command, but it does not send a confirmation message of ther report being sent\n\nThis is useful if you want to report something but not let anybody know")
        .addField("Aliases", `sr`)
        .addField("Permissions", `NONE`)
        .addField("Usage", `**r!sreport** *[your report]*\nReplace *[your report]* with the report message that you want to send`)
        .setColor("#FA8334")
        message.channel.send(helpEmbed);
      } else if(args[0] == "suggest") {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Command :: Suggestion")
        .setDescription("The Suggestion feature is a new feature to **Report**. It enables the user to suggest items in a server, there are multiple commands to the suggest system.")
        .addField("How to submit a Suggestion", `To submit a suggestion, you can do *r!suggest [your suggestion]*\nReplace *[your suggestion]* with your suggestion`)
        .addField("**ADMIN** How to Approve or Deny a suggestion", `To approve or deny a suggestion, your staff will need the \`MANAGE_MESSAGES\` permission.\n\nTo **Approve**, you can do *r!suggest approve [suggestID]*\nReplace the *[suggestID]* with the Suggestion ID in the footer of the message. This will also send the suggestion to a Suggestion Approved channel (requires setup)\n\nTo **Deny** a suggestion, use *r!suggest deny [suggestID]*\nReplace *[suggestID]* with the suggestion ID in the footer of the suggestion`)
        .setColor("#FA8334")
        message.channel.send(helpEmbed);
      } else if(args[0] == "suggestchannel") {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Command :: Suggestion Channel")
        .setDescription("The ***suggestchannel*** command is what you use to set the channel that **Report** sends the suggestions to")
        .addField("Aliases", `sc`)
        .addField("Permissions", `MANAGE_MESSAGES`)
        .addField("Usage", `**r!suggestchannel** *[#channel]*\nReplace *[#channel]* with the channel that you want to be the Suggestions channel`)
        .setColor("#FA8334")
        message.channel.send(helpEmbed);
      } else if(args[0] == "suggestapproval") {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Command :: Suggestion Channel")
        .setDescription("The ***suggestapproval*** command is what you use to set the channel that **Report** sends the Approved Suggestions to")
        .addField("Aliases", `sac`)
        .addField("Permissions", `MANAGE_MESSAGES`)
        .addField("Usage", `**r!suggestapproval** *[#channel]*\nReplace *[#channel]* with the channel that you want to be the Approved Suggestions channel`)
        .setColor("#FA8334")
        message.channel.send(helpEmbed);
      } else {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Help Page")
        .setDescription("Welcome to the help embed for **Report**\n\nTo find out more information about a certain command, you can do *r!help [command]*")
        .addField("Setup Commands", `\`prefix\` \`reportchannel\``)
        .addField("Report Commands", `\`report\` \`sreport\``)
        .addField("General Commands", `\`botinfo\` \`serverinfo\``)
        .addField("Suggest Commands", `\`suggest\` \`suggestchannel\` \`suggestapproval\``)
        .addField("Tags Commands", `*coming soon*`)
        .setFooter("r!help [command] to find out more")
        .setColor("#FA8334")
        message.channel.send(helpEmbed);
      }


    },
};