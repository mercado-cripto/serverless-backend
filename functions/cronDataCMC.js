import * as sd from "./libs/saveData";

const rp = require("request-promise");
const MARKET = "CMC";

export async function main(event) {
  try {
    const requestOptions = {
      method: "GET",
      uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
      qs: {
        convert: "USD",
        symbol: "BTC,ETH,LTC",
      },
      headers: {
        "X-CMC_PRO_API_KEY": process.env.API_KEY,
      },
      json: true,
      gzip: true,
    };

    const response = await rp(requestOptions);

    let responseETHObj;
    let responseLTCObj;
    let responseBTCObj;

    responseBTCObj = {
      cryptoId: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price_usd: response.data.BTC.quote.USD.price,
    };
    responseETHObj = {
      cryptoId: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price_usd: response.data.ETH.quote.USD.price,
    };
    responseLTCObj = {
      cryptoId: "litecoin",
      name: "LiteCoin",
      symbol: "LTC",
      price_usd: response.data.LTC.quote.USD.price,
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
