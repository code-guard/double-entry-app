import { TAccountRow } from './t-account-row';

export interface TAccount {
    id: string;
    account: string;
    tAccountRows: TAccountRow[];
}
