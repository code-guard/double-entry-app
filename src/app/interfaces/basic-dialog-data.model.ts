export interface BasicDialogDataModel {
    title?: string;
    message: string;
    actions?: {
        text: string,
        actionName: string | boolean
    }[];
    reverseButtons?: boolean;
}
