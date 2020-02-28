const key = require('./auth.json').key;
console.log(`Discord Auth Token: ${key}`);

const Discord = require('discord.js');
const client = new Discord.Client();

let prefix = '&';

const userIdToMention = (id) => `<@${id}>`;

client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(msg.content.substring(0, prefix.length) == prefix){
        message = msg.content.substring(prefix.length);
        command = message.split('\n ')[0]
        if (command == "prefix") {
            prefix = message.substring(7);
            msg.reply("Sure! Prefix is now set to " + prefix);
        }
        if (command == "rall") {
            const members = msg.channel.members;
            let memList = [];
            members.forEach(mem => {
                memList.push(mem.id);
            });
            msg.reply(userIdToMention(memList[Math.floor(Math.random()*memList.length)]));
        }
        if(command == "rhere") {
            const members = msg.channel.members;
            let memList = [];
            members.forEach(mem => {
                let pres = mem.presence.status;
                if(pres == "online")
                    memList.push(mem.id);
            });
            msg.reply(userIdToMention(memList[Math.floor(Math.random()*memList.length)]));
        }
        if(command == "rnhere") {
            const members = msg.channel.members;
            let memList = [];
            members.forEach(mem => {
                let pres = mem.presence.status;
                if(pres != "online")
                    memList.push(mem.id);
            });
            msg.reply(userIdToMention(memList[Math.floor(Math.random()*memList.length)]));
        }
    }

});

client.login(key);
