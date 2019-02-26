const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    // let user = message.mentions.users.first();
    // let nick = args.slice(1).join(" ");
    // let logUser = args.toString();
    // let workPls = logUser.substr(0, 22);
    let argsPls = Array.from(args);

    if (argsPls[0].includes("<@!")) {
        let user = message.mentions.users.first();
        let nick = args.slice(1).join(" ");
        let logUser = args.toString();
        let workPls = logUser.substr(0, 22);
        if (!user) {
            message.channel.send("You must mention a member");
            return;
        }
        if (!nick) {
            message.channel.send("Please choose a nickname to set");
            return;
        }
        if (message.author.id === "517069944869879808") {
            message.channel.send("You got it daddy~");
        }
        const out = `Changed ${workPls}'s nickname to ${nick}.`;
        message.guild.member(user).setNickname(nick)
        .then(console.log(out))
        .then(message.channel.send(out));
        //.then(message.channel.send(`${workPls} hehe`))
        //.then(console.log(workPls.includes('!')))
        //console.log("Cutie");
    } else {
        let user = message.mentions.users.first();
        let nick = args.slice(1).join(" ");
        let logUser = args.toString();
        let workPls = logUser.substr(0, 21);

        if (!user) {
            message.channel.send("You must mention a member");
            return;
        }
        if (!nick) {
            message.channel.send("Please choose a nickname to set");
            return;
        }
        if (message.author.id === "517069944869879808") {
            message.channel.send("You got it daddy~");
        }
        const out = `Changed ${workPls}'s nickname to ${nick}.`;
        message.guild.member(user).setNickname(nick)
        .then(console.log(out))
        .then(message.channel.send(out));
        //.then(message.channel.send(`${workPls}`))
        //.then(console.log(workPls.includes('!')))
        //console.log("Cutie");

    }
    message.delete(5000);

    // if (!user) {
    //     message.channel.send("You must mention a member");
    //     return;
    // }
    // if (!nick) {
    //     message.channel.send("Please choose a nickname to set");
    //     return;
    // }
    // if (message.author.id === "517069944869879808") {
    //     message.channel.send("You got it daddy~");
    // }
    // if (workPls.includes("!")) {
    //     console.log("okay");
    //     //console.log(argsPls);
    //     console.log(argsPls.shift());
    // }
    // const out = `Changed ${workPls}'s nickname to ${nick}.`;
    // message.guild.member(user).setNickname(nick)
    // .then(console.log(out))
    // .then(message.channel.send(out))
    // .then(message.channel.send(`${workPls} hehe`))
    // .then(console.log(workPls.includes('!')))
}

module.exports.help = {
    name: "nick"
}