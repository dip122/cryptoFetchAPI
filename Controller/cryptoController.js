
const calculateStandardDeviation = require('../Helper/cryptoCalculator');
const crypto = require('../Models/crypto.model');
class cryptoController {

    static statusController = async(req,res)=>{
        try{

            const { coin } = req.query;
            if(!coin){
                return res.status(404).json({error : "Please provide a coin name"});
            }

            const cryptoData = await crypto.findOne({coin : coin.toLowerCase()});
            if(!cryptoData){
                return res.status(404).json({error : 'Coin Not Found'});
            }

            const response = {
                price : cryptoData.price,
                marketCap : cryptoData.marketCap,
                change24h : cryptoData.change24h
            }
            return res.json(response);

        }catch(error){
            return res.status(500).send({
                message : "Server Error",
                error
            })
        }
    }

    static deviationController = async(req,res)=>{
        try{
            const {coin} = req.query;
            if(!coin){
                return res.status(404).send({Error : 'Please enter coin name'});
            }

            const cryptoData = await crypto.findOne({coin : coin.toLowerCase()});
            if(!cryptoData || !cryptoData.historicalPrices || cryptoData.historicalPrices.length < 2){
                return res.status(404).send({Error : 'Not Enough Data to calculate the standard deviation'});
            }
            const historicalPrices = cryptoData.historicalPrices.slice(-100);
            const result = calculateStandardDeviation(historicalPrices);

            return res.json({deviation : result});
            
        }catch(error){
            console.log(error);
            return res.status(500).send({
                message : 'Server Error',
                error
            })
        }
    }
}

module.exports = cryptoController;