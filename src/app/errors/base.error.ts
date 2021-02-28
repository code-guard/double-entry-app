export abstract class BaseError extends Error {
    // message: string;
    protected data?: any;

    constructor(data?: any, message?: string) {
        super(message);
        // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
        this.name = BaseError.name; // stack traces display correctly now
        this.data = data;
    }

    getData(): any {
        return this.data;
    }

    toString(): string {
        return this.message;
    }
}
