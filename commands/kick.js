const Discord = require("discord.js");
const lChannel = "mod-logs";

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You aren't cool enough for that.").then(message => {message.delete(5000)});
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Couldn't find user!").then(message => {message.delete(5000)});
  let kReason = args.join("  ").slice(22);
  if(!kReason) return message.channel.send("Please include a reason!").then(message => {message.delete(5000)});
  //if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You aren't cool enough for that.");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: That person can't be kicked.");

  let kickEmbed = new Discord.RichEmbed()
  .setTitle("**User Kicked**")
  .setDescription("~Kick~")
  .setColor("#26619c")
  .addField("**User**", kUser)// with ID: ${kUser.id}`)
  .addField("**Kicked By**", `<@${message.author.id}>`)// with ID: ${message.author.id}`)
  .addField("**Kicked In**", message.channel)
  .addField("**Time**", message.createdAt)
  .addField("**Reason**", kReason);

  let logChannel = message.guild.channels.find(logChannel => logChannel.name === lChannel);
  if(!logChannel) return message.channel.send("Couldn't find log channel!");

  message.guild.member(kUser).kick(kReason);
  logChannel.send(kickEmbed);
}

module.exports.help = {
  name: "kick"
}
