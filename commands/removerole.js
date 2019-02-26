const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't use this, sorry (not sorry).");
  let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rMember) return message.channel.send("You can't remove a role from nobody~");
  let role = args.join(" ").slice(22);
  if(!role) return message.channel.send("What role..?");
  let gRole = message.guild.roles.find(gRole => gRole.name === role);
  if(!gRole) return message.channel.send("Use a real role, please.");

  if(!rMember.roles.has(gRole.id)) return message.channel.send("They don't have the role");
    await rMember.removeRole(gRole.id);

  //await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`The ${gRole.name} was taken away`);
  }catch(e){
    message.channel.send(`<@${rMember.id}> was removed from the role ${gRole.name}.`);
  }
}

module.exports.help = {
  name: "removerole"
}
