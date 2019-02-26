const Discord = require("discord.js");



module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't use this lmao").then(message => {message.delete(10000)});
  let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rMember) return message.channel.send("You can't add a role to nobody~");
  let role = args.join(" ").slice(22);
  if(!role) return message.channel.send("What role..?").then(message => {message.delete(10000)});
  let gRole = message.guild.roles.find(gRole => gRole.name === role);
  if(!gRole) return message.channel.send("Use a real role lmao").then(message => {message.delete(10000)});

  if(rMember.roles.has(gRole.id)) return message.channel.send("They already have the role").then(message => {message.delete(15000)});
    await rMember.addRole(gRole.id);

  //await(rMember.addRole(gRole.id));

  message.channel.send(`<@${rMember.id}> was given the role ${gRole.name}.`).then(message => {message.delete(15000)});

  // try{
  //   await rMember.send(`You have been given the role ${gRole.name}`).then(message => {message.delete(5000)});
  // }catch(e){
  //   message.channel.send(`<@${rMember.id}> was given the role ${gRole.name}.`);
  // }
}

module.exports.help = {
  name: "addrole"
}
