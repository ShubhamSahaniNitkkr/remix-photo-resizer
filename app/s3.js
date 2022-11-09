import dotenv from "dotenv";
import aws from "aws-sdk";

dotenv.config();

const region = "us-east-1";
const bucketName = "cropped-photo";
const accessKeyId = "AKIA4NE63ZNTGCGSE4UQ";
const secretAccessKey = "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";

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export async function generateUploadURL() {
  const params = {
    Bucket: bucketName,
    Key: `${Math.random()}`,
    Expires: 300,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}
