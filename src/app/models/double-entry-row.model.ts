import { FormGroup } from '@angular/forms';
import { v4 } from 'uuid';

export class DoubleEntryRow {
    id: string;
    code: string | null;
    date: Date;
    variation: string;
    name: string;
    description: string | null;
    give: number | null;
    take: number | null;
    hasBeenBalanced: boolean | null;

    constructor(
        id: string,
        code: string | null,
        date: Date,
        variation: string,
        name: string,
        description: string | null,
        give: number | null,
        take: number | null,
        hasBeenBalanced: boolean | null
    ) {
        this.id = id;
        this.code = code;
        this.date = date;
        this.variation = variation;
        this.name = name;
        this.description = description;
        this.give = give;
        this.take = take;
        this.hasBeenBalanced = hasBeenBalanced;
    }

    static createFromForm(form: FormGroup): DoubleEntryRow {
        const value = form.value;

        return new DoubleEntryRow(
            value.id ? value.id : v4(),
            value.code,
            value.date,
            value.variation,
            value.name,
            value.description,
            value.give,
            value.take,
            value.hasBeenBalanced === undefined ? null : value.hasBeenBalanced,
        );
    }

    static createFromLocalStorage(value: DoubleEntryRow): DoubleEntryRow {
        return new DoubleEntryRow(
            value.id,
            value.code,
            new Date(value.date),
            value.variation,
            value.name,
            value.description,
            value.give,
            value.take,
            value.hasBeenBalanced === undefined ? null : value.hasBeenBalanced,
        );
    }
}
