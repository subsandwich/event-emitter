
export type RandEvent = {
    status: string;
    eventName: string;
    eventNum: number;
}

export class EventEmitter {

    private _eventNumber: number;
    private static eventNames: string[] = ['Event1', 'Event2', 'Event3'];

    get eventNumber() {
        return this._eventNumber;
    }

    set eventNumber(newNum: number) {
        if (Number.isInteger(newNum) && newNum > 1) {
            this._eventNumber = newNum;
        } else {
            throw new Error('number must be positive integer');
        }
    }

    constructor(eventNumber: number){
        this._eventNumber = eventNumber;
    }


    public getEvents(): RandEvent[] {
        let events: RandEvent[] = new Array(this._eventNumber);
        for (let i = 0; i < this._eventNumber; i++) {
            // add event to array
            events[i] = {
                status: (Math.floor(Math.random() * 10) < 3) ? "success" : "failure" ,
                eventName: EventEmitter.eventNames[Math.floor(Math.random() * 3)],
                eventNum: Math.floor(Math.random() * 20)
            };
        }

        return events;

    }
}