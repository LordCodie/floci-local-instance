import { S3Client, PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import * as fs from "fs";

const s3 = new S3Client({
    region: "us-east-1",
    endpoint: "http://localhost:4566",
    credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test'
    },
    forcePathStyle: true
})

async function uploadFileToFloci(bucketName: string, filePath: string, objectKey: string) {
    try {
        await s3.send(new CreateBucketCommand({ Bucket: bucketName }))
        console.log(`Bucket ${bucketName} is created`)

        const fileStream = fs.createReadStream(filePath)

        await s3.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: objectKey,
                Body: fileStream,
                ContentType: 'image/jpeg'
            })
        )

        console.log(`Successfully uploaded`)
    } catch (error) {
        console.error(`Error uploading file:`, error)
    }
}

// await fs.writeFileSync(
//     './files/alive.txt',
//     'Hey this is just a text file you made to learn how to upload a blob file to S3.'
// )

const imagePath =
  "/workspaces/floci-local-instance/local-applications/s3/files/lean-business-canvas.jpg";

uploadFileToFloci('my-local-bucket', imagePath, 'uploads/lean-business-canvas.jpg')
