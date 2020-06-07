import * as sd from "./libs/saveData";
import jsSHA from "jssha";
import fetch from "node-fetch";

const MARKET = "ORX";
const ORX_URL = "http://api2.orionx.io/graphql";
const queryBTCOrion = {
  query: '{market(code: "BTCCLP"){lastTrade{ price, amount , date } }}',
};
const queryETHOrion = {
  query: '{market(code: "ETHCLP"){lastTrade{ price, amount , date } }}',
};
const queryLTCOrion = {
  query: '{market(code: "LTCCLP"){lastTrade{ price, amount , date } }}',
};

export async function main(event) {
  let responseETHObj = await orionXData(queryETHOrion, "ETH");
  let responseLTCObj = await orionXData(queryLTCOrion, "LTC");
  let responseBTCObj = await orionXData(queryBTCOrion, "BTC");

  await sd.saveData(MARKET, responseLTCObj);
  await sd.saveData(MARKET, responseETHObj);
  await sd.saveData(MARKET, responseBTCObj);

  return;
}
async function orionXData(query, crypto) {
  try {
    const res = await fullQuery(ORX_URL, query);
    const obj = await getObject(res, crypto);
    return obj;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function fullQuery(url, query) {
  try {
    const timeStamp = new Date().getTime() / 1000;
    const body = JSON.stringify(query);
    let shaObj = new jsSHA("SHA-512", "TEXT"); // eslint-disable-line
    shaObj.setHMACKey(process.env.ORX_SECRET_KEY, "TEXT");
    shaObj.update(timeStamp + body);
    const signature = shaObj.getHMAC("HEX");
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ORIONX-TIMESTAMP": timeStamp,
        "X-ORIONX-APIKEY": process.env.ORX_API_KEY,
        "X-ORIONX-SIGNATURE": signature,
        "Content-Length": body.length,
      },
      body,
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function getObject(res, crypto) {
  try {
    let object = null;
    if (crypto === "BTC")
      object = {
        cryptoId: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        last_price_clp: res.data.market.lastTrade.price,
      };
    else if (crypto === "ETH")
      object = {
        cryptoId: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        last_price_clp: res.data.market.lastTrade.price,
      };
    else if (crypto === "LTC")
      object = {
        cryptoId: "litecoin",
        name: "Litecoin",
        symbol: "LTC",
        last_price_clp: res.data.market.lastTrade.price,
      };

    return object;
  } catch (e) {
    console.log(e);
    return null;
  }
}
