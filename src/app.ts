import { EventBridgeEvent } from 'aws-lambda';
/**
 * A Lambda function that logs the payload received from a CloudWatch scheduled event.
 */
export const lambdaHandler = async (event: EventBridgeEvent<'Scheduled Event', any>): Promise<void> => {
    // All log statements are written to CloudWatch by default. For more information, see
    // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-logging.html
    console.info(JSON.stringify(event));
};
