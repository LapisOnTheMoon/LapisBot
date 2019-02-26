const Discord = require("discord.js");
const lChannel = "mod-logs";

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You aren't cool enough to ban lmao").then(message => {message.delete(5000)});
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Couldn't find user!").then(message => {message.delete(5000)});
  let bReason = args.join("  ").slice(22);
  if(!bReason) return message.channel.send("Please include a reason!").then(message => {message.delete(5000)});
  //if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You aren't cool enough to ban lmao");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: That person can't be banned.");

  //let banIcon
  let banEmbed = new Discord.RichEmbed()
  .setTitle("**User Banned**")
  .setDescription("~Ban~")
  .setColor("#b70000")
  .addField("User", `${bUser} with ID: ${bUser.id}`)
  .addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", bReason);

  let logChannel = message.guild.channels.find(logChannel => logChannel.name === lChannel);
  if(!logChannel) return message.channel.send("Couldn't find log channel!").then(message => {message.delete(5000)});

  message.guild.member(bUser).ban(bReason);
  logChannel.send(banEmbed);
}

module.exports.help = {
  name: "ban"
}
