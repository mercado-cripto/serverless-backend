import * as sd from "./libs/saveData";

const rp = require("request-promise");
const MARKET = "BUDA";
const BUDA_URL_ETH = "https://www.buda.com/api/v2/markets/eth-clp/ticker";
const BUDA_URL_BTC = "https://www.buda.com/api/v2/markets/btc-clp/ticker";
const BUDA_URL_LTC = "https://www.buda.com/api/v2/markets/ltc-clp/ticker";

export async function main(event) {
  let responseETHObj = await budaRequest(
    BUDA_URL_ETH,
    "ethereum",
    "Ethereum",
    "ETH"
  );
  let responseLTCObj = await budaRequest(
    BUDA_URL_LTC,
    "litecoin",
    "Litecoin",
    "LTC"
  );
  let responseBTCObj = await budaRequest(
    BUDA_URL_BTC,
    "bitcoin",
    "Bitcoin",
    "BTC"
  );

  await sd.saveData(MARKET, responseLTCObj);
  await sd.saveData(MARKET, responseETHObj);
  await sd.saveData(MARKET, responseBTCObj);

  return;
}

async function budaRequest(URL, cryptoId, name, symbol) {
  try {
    const requestOptions = {
      method: "GET",
      uri: URL,
      json: true,
      gzip: true,
    };
    const response = await rp(requestOptions);

    const object = {
      cryptoId,
      name,
      symbol,
      last_price_clp: response.ticker.last_price[0],
    };
    return object;
  } catch (e) {
    console.log(e);
    return null;
  }
}
