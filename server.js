const express = require('express');
const app = express();
const connectDB = require('./Config/conn');
const dotenv = require('dotenv');
const port = 3002;
const cron = require('node-cron');
const crypto = require('./Models/crypto.model');
const cryptorouter = require('./Routers/cryptorouters');


dotenv.config();
connectDB();

app.get('/',(req,res)=>{
    res.send("This is server side programming");
});

const fetchCryptoData = async () => {
    try {
        console.log('fetchRun');
        const COINGECKOAPI = process.env.COINGECKOAPI;
        const response = await fetch(COINGECKOAPI);
        const data = await response.json();

        const coins = [
            { name: 'bitcoin', id: 'bitcoin' },
            { name: 'ethereum', id: 'ethereum' },
            { name: 'matic-network', id: 'matic-network' }
        ];

        for (const coin of coins) {
            const currentPrice = data[coin.id].usd;
            const marketCap = data[coin.id].usd_market_cap;
            const change24h = data[coin.id].usd_24h_change;


            const cryptoData = await crypto.findOne({ coin: coin.name });

            if (cryptoData) {
                const { historicalPrices = [] } = cryptoData;


                if (historicalPrices.length >= 100) {
                    historicalPrices.shift(); 
                }
                historicalPrices.push(currentPrice); 

                await crypto.updateOne(
                    { coin: coin.name },
                    {
                        price: currentPrice,
                        marketCap: marketCap,
                        change24h: change24h,
                        historicalPrices: historicalPrices
                    }
                );
            } else {
                await crypto.create({
                    coin: coin.name,
                    price: currentPrice,
                    marketCap: marketCap,
                    change24h: change24h,
                    historicalPrices: [currentPrice]
                });
            }
        }
    } catch (error) {
        console.log('Error Fetching cryptoData :', error);
    }
};

// fetchCryptoData();
cron.schedule('0 */2 * * *' , fetchCryptoData);

app.use('/crypto',cryptorouter)

app.listen(process.env.PORT || port , ()=>{
    console.log(`Listening to the port ${port}`);
})