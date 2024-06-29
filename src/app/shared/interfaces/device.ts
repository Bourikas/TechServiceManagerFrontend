export interface Device {

    id: number;
    owner: number; // assuming owner is represented by customer id
    maker?: string;
    device_type: string;
    model_type: string;
    serial_number: string;
    date_of_purchase?: string; // use string for date in ISO format
}
