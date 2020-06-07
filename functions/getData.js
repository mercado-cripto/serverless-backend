import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event) {
  const items = {};
  const now = new Date().getTime();
  const nowless10 = now - 600000;

  const paramsBUDA = getParams("BUDA", now, nowless10);
  const paramsCMC = getParams("CMC", now, nowless10);
  const paramsORX = getParams("ORX", now, nowless10);
  const paramsSTTG = getParams("STTG", now, nowless10);
  const paramsCMKT = getParams("CMKT", now, nowless10);
  // fetch all todos from the database
  try {
    const responseBUDA = await dynamoDbLib.call("query", paramsBUDA);
    items.buda = responseBUDA.Items;

    const responseCMC = await dynamoDbLib.call("query", paramsCMC);
    items.cmc = responseCMC.Items;

    const responseORX = await dynamoDbLib.call("query", paramsORX);
    items.orx = responseORX.Items;

    const responseSTTG = await dynamoDbLib.call("query", paramsSTTG);
    items.sttg = responseSTTG.Items;

    const responseCMKT = await dynamoDbLib.call("query", paramsCMKT);
    items.cmkt = responseCMKT.Items;

    return success(items);
  } catch (e) {
    console.log(e);
    return failure({
      message: "Cant get the items",
    });
  }
}

function getParams(mkt, now, nowless) {
  return {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :pk AND SK BETWEEN :nowless10 AND :now",
    ExpressionAttributeValues: {
      ":pk": mkt,
      ":now": now,
      ":nowless10": nowless,
    },
    Limit: 10,
  };
}
