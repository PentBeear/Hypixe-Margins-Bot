const Discord = require('discord.js');
const { prefix, token, apiKey} = require('./config.json');
const client = new Discord.Client();
const { getBazaarList } = require("./utils/utils.js");
const { helpEmbed } = require('./embed.js');
let utils = require("./utils/utils")
const usedKey = apiKey;
const itemList = require('./itemNames.json'); // Thank you Bozosword ;)
const itemListReverse = require('./itemNamesReversed.json'); // Thank you Bozosword ;)
var botChannel = 720336962527035442;
var PouchDB = require('pouchdb');
var db = new PouchDB('itemData');

let topItemsPercent = []
let topItemsCoin = []
let topItemsDemand = []



client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);





itemEmbed = new Discord.MessageEmbed()
marginsPercent = new Discord.MessageEmbed()
marginsCoin = new Discord.MessageEmbed()










client.on('message', message => {

    

    if (!message.content.startsWith(prefix) || message.author.bot ) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    

    if (command === 'getitem' && message.channel.id == botChannel) {
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

    /*if (command === 'test') { 
        updateBazaar();
    }

    if (command === 'test2') {
        updateMessages();
    }

    if (command === 'test3') {
        clear('720342502904954882');
        
    }
    */
    
    
    
        
        

        
    if (command === 'help') {
        message.channel.send(helpEmbed);
        }
        
    if (command === 'changechannel') {
        if(message.member.hasPermission('ADMINISTRATOR'))
        {   
            botChannel = message.channel.id;
            message.channel.send("Channel set " + botChannel);
        }
        else
        {
            message.channel.send("You don't have permission to do this!");
        }
                
        }
    
        


    
    

    



 
// unfinished
function singleBazaar(item,itemName,avatar) // Put this function in here so it could call the send.message
 {
    
    
       
        
        itemEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(itemName, + ' Margins')
        .setURL('https://github.com/PentBeear/Hypixel-Margins-Bot')
        .setAuthor(":)", avatar)
        .setDescription('Margins for the item ' + itemName)
        .setThumbnail('https://cdn.discordapp.com/avatars/719929333963161683/194ef03bd57df9b504916a3de6ce27dd.png?size=128')
        .addFields(
            { name: 'Price (BUY)', value:itemBuyPrice },
            { name: 'Price (SELL)', value:itemSellPrice },
            { name: 'Profit Margin', value: '%' + profitMargin },
            { name: 'Coin Margin', value: coinMargin },
            { name: 'Buy Volume', value: itemBuyVolume },
            { name: 'Sell Volume', value: itemSellVolume },

        )

        message.channel.send(itemEmbed);
        
        
  

}




});

//var topItemsPercent = []; // Example of what this stores ENCHANTED_DIAMOND:"405" (405 is the profit margin);




// Adds the arrays nessacary for the bot to calculate profits accurately.

function updateBazaar()
{
    console.log("STARTING BAZAAR GET!");
    topItemsPercent = [];
    utils.getBazaarList(usedKey).then(response => {    //Retrieve JavaScript Object from request
    let list = (response.products);
    try{
           
        for (let key in list) { 
            if (list.hasOwnProperty(key) && list[key] != undefined && list != undefined) {    
                //console.log(list[key]);
                let [itemBuyPrice, itemSellPrice] = utils.getPrices(list[key]); // Grabs the item prices and volumes
                let itemBuyVolume =  list[key].quick_status.buyVolume; 
                let itemSellVolume = list[key].quick_status.sellVolume;  
                let [itemCoinMargin, itemProfitMargin] = utils.getMargin(list[key]);
                topItemsPercent.push([list[key].quick_status.productId, itemProfitMargin]);
                topItemsCoin.push([list[key].quick_status.productId, itemCoinMargin]);
                topItemsDemand.push([list[key].quick_status.productId, itemBuyVolume]);

                try{ 
                db.get(list[key].quick_status.productId).then(function (doc) { 
                
                doc.buyPrice = itemBuyPrice.toFixed(1); //
                doc.sellPrice = itemSellPrice.toFixed(1); 
                doc.buyVolume = itemBuyVolume.toFixed(1);
                doc.sellVolume = itemSellVolume.toFixed(1);
                doc.coinMargin = itemCoinMargin.toFixed(1);
                doc.profitMargin = itemProfitMargin.toFixed(2); 
                //console.log(doc);
                return db.put(doc);
                })
                    .catch(function (err) {
                    console.log(err);
                });}
                catch(err){
                    console.log(key);
                }
                 
               
                 // RUN THIS TO MAKE THE DATABASE!
                /*   db.put({
                    "_id": list[key].quick_status.productId,
                    "buyPrice": itemBuyPrice.toFixed(1),
                    "sellPrice": itemSellPrice.toFixed(1),
                    "buyVolume": itemBuyVolume.toFixed(1),
                    "sellVolume": itemSellVolume.toFixed(1),
                    "coinMargin": itemCoinMargin.toFixed(1),
                    "profitMargin": itemProfitMargin.toFixed(1),
                    }).then(function (response) {
                        // handle response
                    }).catch(function (err) {
                        console.log(err);
                    });
                    */

 
             }
    }}  
    catch(err){console.log(err);}
     }).then(()=>{
        topItemsPercent.sort((a, b) => {
            return ((b[1]) - (a[1]));
        });
        topItemsCoin.sort((a, b) => {
            return ((b[1]) - (a[1]));
        });
        topItemsDemand.sort((a, b) => {
            return ((b[1]) - (a[1]));
        });
        //console.log(topItemsPercent);
        //console.log(topItemsCoin);
        //console.log(topItemsDemand);
        updateMessages()
    });//pro-tip: using the margin, the price and the market volume, you can come up with a better metric
     
    
     

  } 


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

 /*async function clear(channelId) {
    let channel = client.channels.cache.get(channelId);
    await channel.messages.fetch({ limit: 100 }).then(messages => { // Fetches the messages
        channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
    )});
}
*/



function updateMessages()
{
 updateMarginCoin();
 updateMarginPercent();
}


let lastMessagePercent = [];
  async function updateMarginPercent()
{
    
    const channel = client.channels.cache.get('720342502904954882');
    

    for (i = 0; i < topItemsPercent.length; i++) {
        if (i >= 10)
        {
            break;
        }
        else
        {
            var item = topItemsPercent[i].join();
            var userReadableItem;
            item = item.split(',')[0]

            if(typeof itemList[item] !== "undefined") // Takes the item name and converts it to the Bazaar naming system
                userReadableItem = itemList[item];
            else    
                message.channel.send("Item not Found!");

            let itemBuyPrice; // Makes the variables and date
            let itemSellPrice;
            let itemProfitMargin;
            let itemCoinMargin;
            let itemBuyVolume;
            let itemSellVolume;
            let date = new Date();


            
            try{ 
                db.get(item).then(function (doc) { // Gets info from database
                itemBuyPrice =  doc.buyPrice;
                itemSellPrice = doc.sellPrice;
                itemBuyVolume = doc.buyVolume;
                itemSellVolume = doc.sellVolume;
                itemCoinMargin = doc.coinMargin;
                itemProfitMargin = doc.profitMargin;
                console.log(doc);
                });}
                catch(err){
                    console.log(err);
                }
                await sleep(1000);

                if (itemBuyPrice == undefined)
                {
                    console.log("ERROR ITEM UNDEFINED " + item);
                    await sleep(1000);
                    console.log("hopefully this was fixed!" + item + "value from undefined: " + itemBuyPrice)
                }
                
        marginsPercent = new Discord.MessageEmbed() // Creates Message
        .setColor('#0099ff')
        .setTitle(userReadableItem)
        .setDescription('Create a buy order, once filled resell as a sell order') 
        .addFields(
            { name: 'Price (Buy)', value:itemBuyPrice, inline: true},
            { name: 'Price (Sell)', value:itemSellPrice, inline: true},
            { name: 'Profit (Percentage)', value: '%' + itemProfitMargin, inline: true},
            { name: 'Profit (Coins)', value: itemCoinMargin, inline: true},
            { name: 'Buy Volume', value: itemBuyVolume, inline: true},
            { name: 'Sell Volume', value: itemSellVolume, inline: true},
    
        ) // Adds date
        .setFooter('Last updated on ' + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":"  + date.getSeconds());
    
        if (lastMessagePercent.length != 10) // If there are no previous messages make them and then edit them after.
        {
            lastMessagePercent[i] = await channel.send(marginsPercent);  // Sends the Message
            console.log(lastMessagePercent[i].id);
            console.log(lastMessagePercent.length);
            
        }
        else
        {
            channel.messages.fetch({around: lastMessagePercent[i].id, limit: 1}) // Gets the message by the stored ids
                .then(msg => {
                    const fetchedMsg = msg.first();
                    fetchedMsg.edit(marginsPercent);
                });
            
        }
        
     }
    }  
    
  }

  let lastMessageCoin = [];
  async function updateMarginCoin()
  {
      await sleep(15000);
      const channel = client.channels.cache.get('721063771476328548');
      
  
      for (i = 0; i < topItemsCoin.length; i++) {
          if (i >= 10)
          {
              break;
          }
          else
          {
              var item = topItemsCoin[i].join();
              var userReadableItem;
              item = item.split(',')[0]
  
              if(typeof itemList[item] !== "undefined") // Takes the item name and converts it to the Bazaar naming system
                  userReadableItem = itemList[item];
              else    
                  message.channel.send("Item not Found!");
  
              let itemBuyPrice; // Makes the variables and date
              let itemSellPrice;
              let itemProfitMargin;
              let itemCoinMargin;
              let itemBuyVolume;
              let itemSellVolume;
              let date = new Date();
  
  
              
              try{ 
                  db.get(item).then(function (doc) { // Gets info from database
                  itemBuyPrice =  doc.buyPrice;
                  itemSellPrice = doc.sellPrice;
                  itemBuyVolume = doc.buyVolume;
                  itemSellVolume = doc.sellVolume;
                  itemCoinMargin = doc.coinMargin;
                  itemProfitMargin = doc.profitMargin;
                  console.log(doc);
                  });}
                  catch(err){
                      console.log(err);
                  }
                  await sleep(1000);
  
                  if (itemBuyPrice == undefined)
                  {
                      console.log("ERROR ITEM UNDEFINED " + item);
                      await sleep(1000);
                      console.log("hopefully this was fixed!" + item + "value from undefined: " + itemBuyPrice)
                  }
                  
          marginsCoin = new Discord.MessageEmbed() // Creates Message
          .setColor('#0099ff')
          .setTitle(userReadableItem)
          .setDescription('Create a buy order, once filled resell as a sell order') 
          .addFields(
              { name: 'Price (Buy)', value:itemBuyPrice, inline: true},
              { name: 'Price (Sell)', value:itemSellPrice, inline: true},
              { name: 'Profit (Percentage)', value: '%' + itemProfitMargin, inline: true},
              { name: 'Profit (Coins)', value: itemCoinMargin, inline: true},
              { name: 'Buy Volume', value: itemBuyVolume, inline: true},
              { name: 'Sell Volume', value: itemSellVolume, inline: true},
      
          ) // Adds date
          .setFooter('Last updated on ' + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":"  + date.getSeconds());
      
          if (lastMessageCoin.length != 10) // If there are no previous messages make them and then edit them after.
          {
              lastMessageCoin[i] = await channel.send(marginsCoin);  // Sends the Message
              console.log(lastMessageCoin[i].id);
              console.log(lastMessageCoin.length);
              
          }
          else
          {
              channel.messages.fetch({around: lastMessageCoin[i].id, limit: 1}) // Gets the message by the stored ids
                  .then(msg => {
                      const fetchedMsg = msg.first();
                      fetchedMsg.edit(marginsCoin);
                  });
              
          }
          
       }
      }  
      
    }
  
  
   




        
   
        

            
 
        
  



        
        

    

 setInterval(updateBazaar, 60000)


