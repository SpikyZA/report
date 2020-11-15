const { prefix } = require("../config.json");

const chalk = require("chalk");

module.exports = async (client) => {
    try {
        client.logger.ready(`${client.user.tag} is now up and running!`);
    } catch (e) {
        console.log(e);
    }

    let activities = [ `for Reports`, `version 4` ], i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000);

};