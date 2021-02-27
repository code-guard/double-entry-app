import { FormGroup } from '@angular/forms';

export class DoubleEntryRow {
    id: string;
    code: string | null;
    date: Date;
    name: string;
    description: string | null;
    give: number | null;
    take: number | null;
    hasBeenBalanced: boolean;

    constructor(
        id: string,
        code: string | null,
        date: Date,
        name: string,
        description: string | null,
        give: number | null,
        take: number | null,
        hasBeenBalanced: boolean
    ) {
        this.id = id;
        this.code = code;
        this.date = date;
        this.name = name;
        this.description = description;
        this.give = give;
        this.take = take;
        this.hasBeenBalanced = hasBeenBalanced;
    }

    static createFromForm(form: FormGroup): DoubleEntryRow {
        const value = form.value;

        return new DoubleEntryRow(
            value.id,
            value.code,
            value.date,
            value.name,
            value.description,
            value.give,
            value.take,
            value.hasBeenBalanced
        );
    }

    static createFromLocalStorage(value: DoubleEntryRow): DoubleEntryRow {
        return new DoubleEntryRow(
            value.id,
            value.code,
            new Date(value.date),
            value.name,
            value.description,
            value.give,
            value.take,
            value.hasBeenBalanced
        );
    }
}
