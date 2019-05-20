import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "profiles",
    Key: {
      userId: data.userId
    },

    UpdateExpression: "SET displayName = :displayName, bio = :bio, profilePicture = :profilePicture",
    ExpressionAttributeValues: {
        ":displayName": data.displayName || null,
        ":bio": data.bio || null,
        ":profilePicture": data.profilePicture || null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
