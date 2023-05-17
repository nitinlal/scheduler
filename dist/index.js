"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var services_1 = require("./services");
var deliveries = [
    { id: "d1", duration: 10, vehicles: ["truck", "plane", "truck"] },
    { id: "d2", duration: 20, vehicles: ["truck"] },
    { id: "d3", duration: 5, vehicles: ["plane", "truck"] },
    { id: "d4", duration: 15, vehicles: ["plane"] },
];
var vehicles = ["plane", "truck"];
var scheduler = new services_1.DeliveryScheduler(vehicles);
var schedule = scheduler.scheduleDeliveries(deliveries);
console.log(schedule);
