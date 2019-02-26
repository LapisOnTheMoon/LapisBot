const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.channel.send('Pinging...').then(sent => {
        sent.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`);
    });
}

module.exports.help = {
    name: "ping"
  }