import { LambdaClient, CreateFunctionCommand, InvokeCommand } from "@aws-sdk/client-lambda"
import * as fs from "fs"

const lambda = new LambdaClient({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
    credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test'
    }
})

const run = async () => {
    const zipBuffer = fs.readFileSync('./function.zip')

    console.log("Deploying Lambda function...");
    await lambda.send(
        new CreateFunctionCommand({
            FunctionName: "hello-floci-lambda",
            Runtime: "nodejs18.x",
            Role: "arn:aws:iam::000000000000:role/lambda-role",
            Handler: "index.handler",
            Code: {
                ZipFile: zipBuffer
            }
        })
    )
    console.log("Function 'hello-floci-lambda' deployed successfully.");

    console.log("Invoking function...")
    const response = await lambda.send(
        new InvokeCommand({
            FunctionName: "hello-floci-lambda",
            Payload: Buffer.from(JSON.stringify({ name: "Floci Explorer" }))
        })
    )

    const resultText = new TextDecoder().decode(response.Payload)
    console.log("Response payload:", JSON.parse(resultText))
}

run().catch(console.error)