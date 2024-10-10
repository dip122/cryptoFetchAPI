function calculateStandardDeviation(prices) {
    const n = prices.length;
    const mean = prices.reduce((acc, price) => acc + price, 0) / n;
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / n;
    return Math.sqrt(variance);
}

module.exports = calculateStandardDeviation