const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const roleToGive = "MEWMANS";

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("ready", () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setPresence({
        game: {
            name: 'LouisLovesLapis and I love him.',
            type: "WATCHING",
            url: "https://www.twitch.tv/antichristlouis"
        }
    }).catch(console.error);
});

bot.on("message", message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  //let botChannel =
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let serverID = message.guild.id;
  let userID = message.author.id;
  let mServer = message.guild.id;
  let mID = message.author.id;

  let commandfile = bot.commands.get(cmd.slice(prefix.length));﻿
  if(commandfile) commandfile.run(bot,message,args);

  if(cmd === `😃`){
    message.delete().catch(O_o=>{});
  }

  // if(message.content.includes('😃')) {
  //   message.delete().catch(O_o=>{});
  //   message.channel.send('😀');
  // }

  if(cmd === `😃` && serverID == botconfig.myServer){
    message.channel.send("Don't say that lol");
    message.delete().catch(O_o=>{});
  }


  // if(message.content.includes(`😃`)){
  //   message.channel.send('😀');
  //   message.delete().catch(O_o=>{});
  // }


  // if(mID == botconfig.myID && mServer == botconfig.myServer){
  //   const tChannel = "trash-can";
  //   let tcIcon = "http://pngimg.com/uploads/trash_can/trash_can_PNG18426.png";
  //   let tcEmbed = new Discord.RichEmbed()
  //   .setTitle("Moon's Trash Can")
  //   .setColor("#26619c")
  //   .setThumbnail(tcIcon)
  //   .setFooter(`Getting rid of trash`, tcIcon)
  //   .addField("Trash", message.content);
  //
  //   let trashCan = message.guild.channels.find(trashCan => trashCan.name === tChannel);
  //   if(!trashCan) return message.channel.send("Couldn't take out the trash").then(message => {message.delete(3000)});
  //
  //   trashCan.send(tcEmbed);
  //   message.delete().catch(O_o=>{});
  // }

  // if(message.content.includes(`uwu`)){
  //   message.channel.send("Uguu~ I wub daddy~");
  // }

  if (userID == botconfig.hisID || userID == botconfig.myID)
  {
     if (message.content.includes("uwu"))
       message.channel.send("Uguu~ I wub daddy~");
  }


  if (userID == botconfig.hisID || userID == botconfig.myID)
  {
     if (message.content.includes("daddy") || message.content.includes("DADDY") || message.content.includes("Daddy"))
     {
       message.react("517759854425800704");
       message.react("526971110076448768");
     }
  }

  // if (message.content.includes("lapidot")){
  //
  //   message.channel.send("Lapi WHO? Don't know her " + annoyedLapis);
  //   message.react(annoyedLapis);
  // }

  // if(message.content.includes(`lapidot`)){
  //   message.channel.send(`Lapi WHO? Don't know her ${ayy}`);
  //   message.react(ayy);
  // }

  if(message.content.includes("lapidot") || message.content.includes("Lapidot")) {
   const ayy = bot.emojis.find(emoji => emoji.name === "lapisNo");
   const puke = bot.emojis.find(emoji => emoji.name === "puking");
   message.channel.send(`${ayy} Lapi WHO? Don't know her ${ayy}`);
   message.react(ayy.id);
   message.react(puke.id);
   message.guild.members.get(message.author.id).setNickname('BANNED', 'get the fuck out');
   //message.author.setNickname('I\m Stupid', 'dumb people');
}

  if(message.author.id === "219410026631135232") {
    message.channel.send("The person sending this message is super cute uwu");
  }

  // if(message.content.includes("ddouble") && userID == botconfig.myID) {
  //   message.channel.send(`that boi makes <@${message.author.id}> drip cum owo`)
  // }

});

//message.channel.send("Lapi WHO? Don't know her " + annoyedLapis);

// bot.on('guildMemberAdd', (guildMember) => {
//    guildMember.addRole(guildMember.guild.roles.find(role => role.name === roleToGive));
//    guildMember.guild.channels.get('528340920563662880').send(`Welcome <@${guildMember.id}> to The Apocalypse~ Make sure to read the <#525863043289186305>~`);
// });

bot.on('guildMemberAdd', (guildMember) => {
    const banTheseData = fs.readFileSync("./idtoban.json");
    const banThese = JSON.parse(banTheseData);
    //const banThese2 = JSON.stringify(banTheseData);

    if (banThese.id.includes(guildMember.id)){
      guildMember.ban("Snaaaaaaaaake")
      .then(() => console.log(`Banned ${guildMember.displayName}`))
      .catch(console.error);
      // return;
    } else {
      const love = bot.emojis.find(emoji => emoji.name === "lapisLove");
      const derp = bot.emojis.find(emoji => emoji.name === "ameDerp");
      const star = bot.emojis.find(emoji => emoji.name === "starkms");
      const lul = bot.emojis.find(emoji => emoji.name === "lapisLUL");

      guildMember.addRole(guildMember.guild.roles.find(role => role.name === roleToGive));
      guildMember.guild.channels.get('517071894285910048').send(`${derp} Welcome <@${guildMember.id}> to The Apocalypse~ ${love} Make sure to read the <#528340920563662880> ~ ${lul} Enjoy your stay~ ${star}`);
    }
});


// bot.on('guildMemberAdd', (guildMember) => {
//     if (guildMember.id === "id thing lol"){
//       guildMember.ban(0)
//       .then(() => console.log(`Banned ${guildMember.displayName}`))
//       .catch(console.error);
//     } else {
//       guildMember.addRole(guildMember.guild.roles.find(role => role.name === roleToGive));
//       guildMember.guild.channels.get('528340920563662880').send(`Welcome <@${guildMember.id}> to The Apocalypse~ Make sure to read the <#525863043289186305>~`);
//     }
// });

// bot.on('guildMemberAdd', member => {
//     member.guild.channels.get('channelID').send("Welcome");
// });

bot.login(botconfig.token).catch(console.error)

bot.on('error', err => console.error);

bot.on('error', err => {
    if (err.message.includes('ECONNRESET' || 'ENOTFOUND')) {
        bot.setTimeout(() => {
            bot.login(botconfig.token).catch(error => {
              console.log(error + " testing lol");
            })
        }, 500)
    }
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
