import { DeliveryScheduler } from "./services";
import { Delivery } from "./types";

let deliveries: Delivery[] = [
  { id: "d1", duration: 10, vehicles: ["truck", "plane", "truck"] },
  { id: "d2", duration: 20, vehicles: ["truck"] },
  { id: "d3", duration: 5, vehicles: ["plane", "truck"] },
  { id: "d4", duration: 15, vehicles: ["plane"] },
];

let vehicles: string[] = ["plane", "truck"];

let scheduler = new DeliveryScheduler(vehicles);
let schedule = scheduler.scheduleDeliveries(deliveries);
console.log(schedule);
