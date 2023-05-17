export interface Vehicle {
    nextAvailableAt: number;
    type: string;
}

export interface Delivery {
    duration: number;
    id: string;
    vehicles: string[];
}

export interface Schedule {
    [index: string]: number
}
