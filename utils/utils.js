let rp = require('request-promise');
let tax = 0.01;

exports.getMargin = (product) => {
    let [buyPrice, sellPrice] = this.getPrices(product); 
    let calculatedTax = sellPrice * tax;
    let itemCoinMargin = sellPrice - buyPrice - calculatedTax; // Converts the margins also subtracts the amount lost from taxes
    let itemProfitMargin = ((itemCoinMargin/buyPrice)*100);   
    return [itemCoinMargin, itemProfitMargin];
}


exports.getPrices = product => {
    try{
    return [
      parseFloat(product.sell_summary[0].pricePerUnit),
      parseFloat(product.buy_summary[0].pricePerUnit)
    ];}catch(err){
        return [-1,-1];//in case there are no offers
    }
  };

exports.getBazaarList = function(key) {  
    var apiUrl = "https://api.hypixel.net/skyblock/bazaar?key=" + key 
    
    return rp(apiUrl).then(body => {
        let responseData = JSON.parse(body);
        return responseData;
    });
    
}