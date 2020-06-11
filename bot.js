const Discord = require('discord.js');
const { prefix, token, apiKey} = require('./config.json');
const client = new Discord.Client();
const hypixel = require("hypixel-api-nodejs");
const { helpEmbed } = require('./embed.js');
const usedKey = apiKey;
const itemList = require('./itemNames.json'); // Thank you Bozosword ;)


client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);


itemEmbed = new Discord.MessageEmbed()


client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot && msg.channel.id === '720336962527035442') return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    

    if (command === 'getitem') {
        if (!args.length) {
            return message.channel.send(`You didn't provide the item, ${message.author}!`);
        }  
        console.log(args);
        let argString = args;
        let argsReformatted = (argString + "").split(',').join(' ').toLowerCase();
        console.log(argsReformatted);
        
        if(typeof itemList[argsReformatted] !== "undefined") // Takes the item name and converts it to the Bazaar naming system
            singleBazaar(itemList[argsReformatted],argsReformatted,message.author.displayAvatarURL());     
        else    
            message.channel.send("Item not Found!");

    }

    if (command === 'help') {
    message.channel.send(helpEmbed);
    }


// TODO convert this to run off of a local database of the bazaar items.
function singleBazaar(item,itemName,avatar) // Put this function in here so it could call the send.message
 {
    
    hypixel.getBazaarProduct(usedKey, item).then(product_info => {    //Retrieve JavaScript Object from request
 
        var itemTax = 0.01
        var itemBuyPrice = product_info.product_info.quick_status.buyPrice; // Grabs the item prices and volumes
        var itemSellPrice = product_info.product_info.quick_status.sellPrice;
        var itemBuyVolume =  product_info.product_info.quick_status.buyVolume;
        var itemSellVolume =  product_info.product_info.quick_status.sellVolume;
        var calculatedTax = itemSellPrice * itemTax
        var coinMargin = itemSellPrice - itemBuyPrice - calculatedTax; // Converts the margins also subtracts the amount lost from taxes
        var grossProfit = itemSellPrice - itemBuyPrice;
        var profitMargin = grossProfit / itemSellPrice;
        profitMargin = profitMargin * 100;
       
        
        itemEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(itemName, + ' Margins')
        .setURL('https://github.com/PentBeear/Hypixel-Margins-Bot')
        .setAuthor(":)", avatar)
        .setDescription('Margins for the item ' + itemName)
        .setThumbnail('https://cdn.discordapp.com/avatars/719929333963161683/194ef03bd57df9b504916a3de6ce27dd.png?size=128')
        .addFields(
            { name: 'Profit Margin', value: '%' + profitMargin },
            { name: 'Coin Margin', value: coinMargin },
            { name: 'Buy Volume', value: itemBuyVolume },
            { name: 'Sell Volume', value: itemSellVolume },

        )

        message.channel.send(itemEmbed);
        
        
    });

}
});


// Adds the arrays nessacary for the bot to calculate profits accurately.
 var coinArray = [];
 var itemArray = [];

 function updateBazaar()
 {
     hypixel.getBazaarList(usedKey).then(productIds => {    //Retrieve JavaScript Object from request
         var list = productIds.productIds;
         
         for (var key in list) { 
             if (list.hasOwnProperty(key)) {
 
             hypixel.getBazaarProduct(usedKey, list[key]).then(product_info => {    //Retrieve JavaScript Object from request
 
                 var itemTax = 0.01
                 var itemBuyPrice = product_info.product_info.quick_status.buyPrice; // Grabs the item prices and volumes
                 var itemSellPrice = product_info.product_info.quick_status.sellPrice;
                 var itemBuyVolume =  product_info.product_info.quick_status.buyVolume;
                 var itemSellVolume =  product_info.product_info.quick_status.sellVolume;
                 var calculatedTax = itemSellPrice * itemTax
                 var coinMargin = itemSellPrice - itemBuyPrice - calculatedTax; // Converts the margins also subtracts the amount lost from taxes
                 var grossProfit = itemSellPrice - itemBuyPrice;
                 var profitMargin = grossProfit / itemSellPrice;
                 profitMargin = profitMargin * 100;
                
     
                 if (profitMargin <= 0 || coinMargin <= 0)
                 {
                     console.log("Item not profitable! " + profitMargin); 
                 }
                 else
                 {
                     itemArray.push(profitMargin + list[key]); // Add the margins to the arrays to be sorted
                     coinArray.push(coinMargin);
                     console.log(coinMargin,profitMargin);  
                 }
             });
         }
         }
   });
         itemArray.sort(function(a, b){return b-a}); // Sort the arrays
         coinArray.sort(function(a, b){return b-a});
 }


 



        
    
        

            
 
        
  



        
        

    

// setInterval(updateBazaar, 60000)

