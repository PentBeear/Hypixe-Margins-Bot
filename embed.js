const Discord = require('discord.js'); // A storage file for the embedded message templates

exports.helpEmbed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('Help Menu')
.setURL('https://github.com/PentBeear/Hypixel-Margins-Bot')
.setAuthor('PentBeear', 'https://cdn.discordapp.com/avatars/183946109486497802/2715844a339df84f6c71a352f166a83c.png?size=128', 'https://github.com/PentBeear')
.setDescription('Help menu for the SkyHigh Money bot')
.setThumbnail('https://cdn.discordapp.com/avatars/719929333963161683/194ef03bd57df9b504916a3de6ce27dd.png?size=128')
.addFields(
    { name: 'What are the items?', value: 'It is just the item name E.g Enchanted Raw Chicken' },
    { name: '=getitem', value: 'Gets the margins for a specific item'},
    { name: '=help', value: 'no'},
)


exports.topTenFlips = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('Help Menu')
.setURL('https://github.com/PentBeear/Hypixel-Margins-Bot')
.setAuthor('PentBeear', 'https://cdn.discordapp.com/avatars/183946109486497802/2715844a339df84f6c71a352f166a83c.png?size=128', 'https://github.com/PentBeear')
.setDescription('Help menu for the SkyHigh Money bot')
.setThumbnail('https://cdn.discordapp.com/avatars/719929333963161683/194ef03bd57df9b504916a3de6ce27dd.png?size=128')
.addFields(
    { name: 'What are the items?', value: 'It is just the item name E.g Enchanted Raw Chicken' },
    { name: '=getitem', value: 'Gets the margins for a specific item'},
    { name: '=help', value: 'no'},
)

