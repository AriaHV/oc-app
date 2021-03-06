import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


export  async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = { 
        TableName: "handles",
        Item: {
            handle: data.handle,
            userId: event.requestContext.identity.cognitoIdentityId,
            administeredAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure({ status: false}); 
    }
}