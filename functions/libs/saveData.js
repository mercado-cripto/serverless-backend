import * as dynamoDbLib from "./dynamodb-lib";

export async function saveData(market, data) {
  const timestamp = new Date().getTime();
  const params = {
    TableName: process.env.tableName,
    Item: {
      PK: market,
      SK: timestamp,
      data,
    },
  };
  try {
    await dynamoDbLib.call("put", params);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
