const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./index.js', { token: 'token' });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn(2);

const express = require("express");
const app = express();

app.get("/", function(request, response) {
    response.send({message: "Ping"})
});

const listener = app.listen("8801", function() {
    console.log("Your app is listening on port " + listener.address().port);
});
