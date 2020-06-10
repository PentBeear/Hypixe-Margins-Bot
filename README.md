# Hypixel-Margins-Bot
Gets the top 20 most profitable items on hypixel skyblock in the bazaar (currently not added), also has a function to check individual items
Dependicies 
hypixel-api-nodejs
discord.js

Note hypixel-api-nodejs was modified with this code added on the end

```
exports.getBazaarProduct = function(key, item) {
		var apiUrl = "https://api.hypixel.net/skyblock/bazaar/product?key=" + key + "&productId=" + item + "";
		
		return rp(apiUrl).then(body => {
            let responseData = JSON.parse(body);
            return responseData;
        });
	}

	exports.getBazaarList = function(key) {
		var apiUrl = "https://api.hypixel.net/skyblock/bazaar/products?key=" + key 
		
		return rp(apiUrl).then(body => {
            let responseData = JSON.parse(body);
            return responseData;
        });
	}```
