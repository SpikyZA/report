const Discord = require("discord.js");

const client = new Discord.Client();

const imgur = require('imgur');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMzI1MTMyMDcwNTc3NzY5NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjAxOTc4Njg5fQ.G7TK-GDhqVM8BxRlQyVRYHYytJd0fmS3-TY-6iiySY0', client);

const config = require("./config.json"),
fs = require("fs"),
util = require("util"),
readdir = util.promisify(fs.readdir),
mongoose = require("mongoose");

client.logger = require("./modules/Logger.js");
client.errors = require("./modules/Embeds.js");
client.tools = require("./modules/Tools.js");
client.data = require("./modules/MongoDB.js");

// Event Handler
client.events = new Discord.Collection();
// Command Handler
client.commands = new Discord.Collection();
// Add all categoies to Array
client.categories = [];
async function init(){

const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.logger.event(`Loading Event - ${eventName}`);
    client.on(eventName, event.bind(null, client));
}

let folders = await readdir("./commands/");
folders.forEach(direct =>{
  const commandFiles = fs.readdirSync('./commands/' + direct + "/").filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
      const command = require(`./commands/${direct}/${file}`);
      client.commands.set(command.name, command);
  }
  });

  // connect to mongoose database
  mongoose.connect(config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
      client.logger.log("Connected to the Mongodb database.", "log");
  }).catch((err) => {
      client.logger.log("Unable to connect to the Mongodb database. Error:"+err, "error");
  });

 client.on("guildCreate", guild => {
      console.log("Joined Server: " + guild.name);
      client.channels.cache.get('723301502915182602').send(`<:add:723597102143242320> **Report** joined ${guild.name} | GuildID: ${guild.id}`);
});
  
 client.on ('guildDelete', guild => {
  console.log("Report left " + guild.name);
  client.channels.cache.get('723301502915182602').send(`<:remove:723597101887652062> **Report** left ${guild.name} :disappointed:`);
});
}
init();
client.login(config.token);