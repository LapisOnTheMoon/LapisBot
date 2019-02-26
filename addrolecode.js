const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You can't use this, sorry (not sorry).");
  let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rMember) return message.channel.send("You can't add a role to nobody~");
  let role = args.join(" ").slice(22);
  if(!role) return message.channel.send("What role..?");
  let gRole = message.guild.roles.find(gRole => gRole.name === role);
  if(!gRole) return message.channel.send("Couldn't find that role.");

  if(rMember.roles.has(gRole.id)); {
    await(rMember.addRole(gRole.id));
  }
  //await(rMember.addRole(gRole.id));

  try{
    rMember.send(`You have been given the role ${gRole.name}`);
  }catch(e){
    message.channel.send(`<@${rMember.id}> was given ${gRole.name}, I tried messaging them but couldn't`);
  }
}

module.exports.help = {
  name: "addrole"
}
