import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


export  async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = { 
        TableName: "profiles",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            handle: data.handle,
            displayName: data.displayName,
            bio: data.bio,
            profilePicture: data.profilePicture,
            registeredAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure({ status: false}); 
    }
}
