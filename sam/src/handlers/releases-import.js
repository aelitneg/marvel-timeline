// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const { S3 } = require('aws-sdk');

const docClient = new dynamodb.DocumentClient();
const s3 = new S3();

// Get the DynamoDB table name from environment variables
const tableName = process.env.RELEASES_TABLE;

exports.handler = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;

    console.log('Bucket:', bucket, 'Key:', key);

    const { Body } = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    const releases = JSON.parse(Body.toString('utf-8'));

    for (const release of releases) {
        const item = {
            id: release.id,
            title: release.title,
            typeId: release.typeId,
            sortOrder: release.sortOrder,
        };

        await docClient
            .put({
                TableName: tableName,
                Item: item,
            })
            .promise();
    }
};
