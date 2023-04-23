import { RandEvent, EventEmitter } from './eventemitter';
import { EventBridgeClient, PutEventsCommand, PutEventsRequest } from '@aws-sdk/client-eventbridge';

const myEmitter: EventEmitter = new EventEmitter(5);

const client: EventBridgeClient = new EventBridgeClient({ region: process.env.REGION });

/**
 * A Lambda function that logs the payload received from a CloudWatch scheduled event.
 */
export const lambdaHandler = async (_: any): Promise<void> => {
    console.log('invoking event');
    const events: RandEvent[] = myEmitter.getEvents();

    console.log('generated events, see below');
    events.forEach((val: RandEvent, index: number): void => {
        console.log(`Event ${index}: ${JSON.stringify(val)}`);
    });

    console.log('sending events to eventbridge');
    const command: PutEventsRequest = {
        Entries: events.map((randEvent: RandEvent) => {
            return {
                Source: 'emitter',
                Detail: JSON.stringify(randEvent),
                DetailType: 'Random generated event',
            };
        }),
    };

    try {
        const response = await client.send(new PutEventsCommand(command));
        if (response.FailedEntryCount && response.FailedEntryCount > 0) {
            throw new Error('failed entries greater than 0');
        }
    } catch (error) {
        console.log('Unable to send events');
        console.log(error);
        return;
    }

    console.log('events sent successfully');
};
