const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    coin : {
        type : String,
    },
    price : {
        type : String,
    },
    marketCap : {
        type : String,
    },
    change24h : {
        type : String,
    },
    lastUpdated : {
        type : Date,
        default : Date.now()
    },
    historicalPrices : [Number]
});

const cryptomodel = mongoose.model('crypto',Schema);
module.exports = cryptomodel;
