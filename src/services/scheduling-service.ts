import { Delivery, Schedule, Vehicle } from "../types";
import { PriorityQueue } from "../utils";
import { v4 } from "uuid";

type VehicleQueues = {
  [index: string]: PriorityQueue<Vehicle>;
};

export class DeliveryScheduler {
  private vehicleQueues: VehicleQueues = {} as VehicleQueues;
  private schedule: Schedule = {};

  constructor(vehicleTypes: string[]) {
    this.createDeliveryVehicleQueues(vehicleTypes);
  }

  public scheduleDeliveries(deliveries: Delivery[]): Schedule {
    const sortedDeliveries = this.sortDeliveriesByleastDurationAsc(deliveries); // O (n log n)
    try {
      // O ( n * m) -  where n is number deliveries and m is the number of delivery methods
      for (let delivery of sortedDeliveries) {
        let deliveryStartTime = 0;

        for (let vehicleType of delivery.vehicles) {
          if (!this.vehicleQueues[vehicleType]) {
            throw new Error(`Vehicle type not supported: ${vehicleType}`);
          }

          const vehicle = this.vehicleQueues[vehicleType].dequeue();

          if (!vehicle) {
            throw new Error("No vehicle available");
          }

          deliveryStartTime = Math.max(
            deliveryStartTime,
            vehicle.nextAvailableAt
          );

          this.schedule[`${delivery.id}-${vehicleType}-${v4()}`] =
            deliveryStartTime;

          this.updateVehicleNextAvailableTime(
            deliveryStartTime,
            vehicle,
            delivery
          );
        }
      }
    } catch (err) {
      console.error(`Error scheduling delivery : ${err}`);
    }

    return this.schedule;
  }

  private createDeliveryVehicleQueues(vehicleTypes: string[]) {
    for (let vehicleType of vehicleTypes) {
      this.vehicleQueues[vehicleType] = new PriorityQueue<Vehicle>(
        (a, b) => a.nextAvailableAt - b.nextAvailableAt
      );
      this.vehicleQueues[vehicleType].enqueue({
        type: vehicleType,
        nextAvailableAt: 0,
      });
    }
  }

  private sortDeliveriesByleastDurationAsc(deliveries: Delivery[]) {
    return deliveries.sort((a, b) => a.duration - b.duration);
  }

  private updateVehicleNextAvailableTime(
    deliveryStartTime: number,
    vehicle: Vehicle,
    delivery: Delivery
  ) {
    vehicle.nextAvailableAt = deliveryStartTime + delivery.duration;
    this.vehicleQueues[vehicle.type].enqueue(vehicle); // O (n log n)
  }
}
