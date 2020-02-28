const key = require('./auth.json').key;
console.log((key)? `Discord Auth Token: ${key}`: `auth.json file is missing`);

const Discord = require('discord.js');
const client = new Discord.Client();

const userIdToMention = (id) => `<@${id}>`;

let prefix = '&';

const Command = require('./command.js'); //import Command from './command.mjs';
let commands = [];

//Init commands
(() => {
    commands.push(new Command('prefix', (msg, message) => {
            if(msg.member.hasPermission("ADMINISTRATOR")){
                let temp = message.split(' ')[0];
                if(temp.length > 0){
                    prefix = temp;
                    msg.reply("Sure! Prefix is now set to " + prefix);
                } else {
                    msg.reply(`Hm, something isn't right. ${temp} Doesn't seem to be a valid prefix.`);
                }
            }
        }, "Change the prefix for commands."));
    commands.push(new Command('rall', (msg, message) => {
            const members = msg.channel.members;
            let memList = [];
            members.forEach(mem => {
                if(!mem.user.bot)
                    memList.push(mem.id);
            });
            msg.reply(userIdToMention(memList[Math.floor(Math.random()*memList.length)]));
        }, "Roll a random user from all the users in the current channel"));
    commands.push(new Command('rhere', (msg, message) => {
            const members = msg.channel.members;
            let memList = [];
            members.forEach(mem => {
                let pres = mem.presence.status;
                if(pres == "online" && !mem.user.bot)
                    memList.push(mem.id);
            });
            msg.reply(userIdToMention(memList[Math.floor(Math.random()*memList.length)]));
        }, "Roll a random user from all the users in the current channel that are online."));
    commands.push(new Command('rnhere', (msg, message) => {
            const members = msg.channel.members;
            let memList = [];
            members.forEach(mem => {
                let pres = mem.presence.status;
                if(pres != "online" && !mem.user.bot)
                    memList.push(mem.id);
            });
            msg.reply(userIdToMention(memList[Math.floor(Math.random()*memList.length)]));
        }, "Roll a random user from all the users in the current channel and offline."));
})();

client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(!msg.author.bot)
    if(msg.content.substring(0, prefix.length) == prefix){
        message = msg.content.substring(prefix.length);
        command = message.split('\n ')[0];
        if(command == "help" || command == "?"){
            let str = "\n";
            commands.forEach(com => {
                str += `${prefix}${com.command} : ${com.description}` + '\n';
            });
            msg.reply(str);
        } else {
            commands.forEach((com) => {
                if(com.command == command){
                    console.log(`Running ${com.command}`);
                    com.action(msg, message);
                }
            });
        }
    }
});

if(key) client.login(key);
