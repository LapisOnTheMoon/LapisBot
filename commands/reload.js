const Discord = require("discord.js");


exports.run = (client, message, args) => {
  if(!args || args.size < 1) return message.channel.send("Must provide a command name to reload.").then(message => {message.delete(5000)});
  const commandName = args[0];
  // Check if the command exists and is valid
  if(!client.commands.has(commandName)) {
    return message.channel.send("That command does not exist").then(message => {message.delete(5000)});
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the client.commands Enmap
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  console.log(`The command ${commandName} has been reloaded`);
  message.channel.send(`The command ${commandName} has been reloaded`).then(message => {message.delete(5000)});
}


module.exports.help = {
  name: "reload"
}
