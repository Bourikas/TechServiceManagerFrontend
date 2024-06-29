export interface StoreEntry {

    malfunction_description : string;
    device_condition : string;
    entry_date : string;
    inspection_date? : string;
    repair_date? : string;
    return_date? : string;
    repair_description? : string;
    repair_cost? : number;
    part_description? : string;
    part_cost? : number;
    device : number;
    technician : number;
    

}

export interface StoreEntryDetailed {

    id: number;
    malfunction_description : string;
    device_condition : string;
    entry_date : string;
    inspection_date? : string;
    repair_date? : string;
    return_date? : string;
    repair_description? : string;
    repair_cost? : number;
    part_description? : string;
    part_cost? : number;
    device: {
        device_type: string;
        model_type: string;
        serial_number: string;
      };
    technician : number;
    owner: {
        first_name: string;
        last_name: string;
      };
    

}