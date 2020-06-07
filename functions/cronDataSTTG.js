import * as sd from "./libs/saveData";

const rp = require("request-promise");
const MARKET = "STTG";

export async function main(event) {
  try {
    const requestOptions = {
      method: "GET",
      uri: "https://api.satoshitango.com/v3/ticker/CLP",
      json: true,
      gzip: true,
    };
    const response = await rp(requestOptions);

    let responseBTCObj = {
      cryptoId: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price_ask: response.data.ticker.BTC.ask,
      price_bid: response.data.ticker.BTC.bid,
    };
    let responseETHObj = {
      cryptoId: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price_ask: response.data.ticker.ETH.ask,
      price_bid: response.data.ticker.ETH.bid,
    };
    let responseLTCObj = {
      cryptoId: "litecoin",
      name: "LiteCoin",
      symbol: "LTC",
      price_ask: response.data.ticker.LTC.ask,
      price_bid: response.data.ticker.LTC.bid,
    };

    await sd.saveData(MARKET, responseLTCObj);
    await sd.saveData(MARKET, responseETHObj);
    await sd.saveData(MARKET, responseBTCObj);
    return;
  } catch (e) {
    console.log(e);
    return;
  }
}
