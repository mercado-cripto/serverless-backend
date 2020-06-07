import * as sd from "./libs/saveData";

const rp = require("request-promise");
const MARKET = "CMKT";
const CRYPTO_MKT_URL = "https://api.cryptomkt.com/v1/ticker?market=";

export async function main(event) {
  let responseETHObj = await cryptoMktRequest(
    "ETHCLP",
    "ethereum",
    "Ethereum",
    "ETH"
  );

  let responseBTCObj = await cryptoMktRequest(
    "BTCCLP",
    "bitcoin",
    "Bitcoin",
    "BTC"
  );

  await sd.saveData(MARKET, responseETHObj);
  await sd.saveData(MARKET, responseBTCObj);

  return;
}
async function cryptoMktRequest(marketCode, cryptoId, name, symbol) {
  try {
    const requestOptions = {
      method: "GET",
      uri: CRYPTO_MKT_URL + marketCode,
      json: true,
      gzip: true,
    };
    const response = await rp(requestOptions);
    const { last_price } = response.data[0];

    const object = {
      cryptoId,
      name,
      symbol,
      last_price_clp: last_price,
    };

    return object;
  } catch (e) {
    console.log(e);
    return null;
  }
}
