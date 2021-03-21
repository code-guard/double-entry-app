export class Config {
    variations: boolean;

    constructor(
        variations: boolean
    ) {
        this.variations = variations;
    }

    static createFromLocalStorage(value: Config): Config {
        return new Config(
            value.variations,
        );
    }
}
