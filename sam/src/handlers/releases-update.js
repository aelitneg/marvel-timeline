'use strict';

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const releasesTable = process.env.RELEASES_TABLE;
const usersTable = process.env.USERS_TABLE;

const headers = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,GET, POST',
};

const responseUnauthorized = {
    statusCode: 403,
    headers,
    body: JSON.stringify({ message: 'Unauthorized' }),
};

exports.handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            throw new Error(
                `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`,
            );
        }

        console.info('received:', event);

        const body = JSON.parse(event.body);

        // Authorization
        if (!body.userId) {
            console.warn('Unauthorized - no userId provided');
            return responseUnauthorized;
        }

        const user = await docClient
            .get({
                TableName: usersTable,
                Key: {
                    id: body.userId,
                },
            })
            .promise();

        if (!Object.keys(user).length) {
            console.warn('Unauthorized - invalid userId');
            return responseUnauthorized;
        }

        // Update Data
        const params = {
            TableName: releasesTable,
            Item: { ...body },
        };

        await docClient.put(params).promise();

        const response = {
            statusCode: 200,
            headers,
            body: JSON.stringify(body),
        };

        console.info(
            `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`,
        );
        return response;
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                message: error.message,
            }),
        };
    }
};
