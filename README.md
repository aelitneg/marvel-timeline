# marvel-timeline

A simple web app to track my progress watching the Marvel Cinematic Universe (MCU) in order. The backend is built using AWS Serverless Application Model (SAM) with DynamoDB, Lambda functions, and an API Gateway. The frontend uses React and is deployed using AWS Amplify.

## Deployment

1. Upload the `marvel-timeline-api.yaml` to an S3 bucket and update the `DefinitionBody` in the marvelTimelineApi resource in the `template.yml`
   - TODO: Need to find a way to deploy without using a second bucket. SAM deploy complains when A) the OpenAPI definition does not exist, and B) if the S3 bucket its supposed to create already exists
1. Run `sam build && sam deploy`
