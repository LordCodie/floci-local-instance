import { Handler } from "aws-lambda"

export const handler: Handler = async (event) => {
    console.log("Received event in Floci Lambda:", event)

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Hello ${event.name || "World"} from local Floci Lambda!`,
            timestamp: new Date().toISOString(),
        })
    }
}