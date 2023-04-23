import {RandEvent, EventEmitter} from './eventemitter';


const myEmitter: EventEmitter = new EventEmitter(5);

/**
 * A Lambda function that logs the payload received from a CloudWatch scheduled event.
 */
export const lambdaHandler = async (_: any): Promise<void> => {
    console.log('invoking event');
    let events: RandEvent[] = myEmitter.getEvents();

    console.log('generated events');
    events.forEach((val: RandEvent, index: number): void => {
        console.log(`Event ${index}: ${JSON.stringify(val)}`);
    });
    console.log('events generated, returning');
};
