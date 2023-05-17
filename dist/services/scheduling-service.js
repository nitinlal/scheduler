"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryScheduler = void 0;
var utils_1 = require("../utils");
var uuid_1 = require("uuid");
var DeliveryScheduler = /** @class */ (function () {
    function DeliveryScheduler(vehicleTypes) {
        this.vehicleQueues = {};
        this.schedule = {};
        this.createDeliveryVehicleQueues(vehicleTypes);
    }
    DeliveryScheduler.prototype.scheduleDeliveries = function (deliveries) {
        var sortedDeliveries = this.sortDeliveriesByleastDurationAsc(deliveries); // O (n log n)
        try {
            // O ( n * m) -  where n is number deliveries and m is the number of delivery methods
            for (var _i = 0, sortedDeliveries_1 = sortedDeliveries; _i < sortedDeliveries_1.length; _i++) {
                var delivery = sortedDeliveries_1[_i];
                var deliveryStartTime = 0;
                for (var _a = 0, _b = delivery.vehicles; _a < _b.length; _a++) {
                    var vehicleType = _b[_a];
                    if (!this.vehicleQueues[vehicleType]) {
                        throw new Error("Vehicle type not supported: ".concat(vehicleType));
                    }
                    var vehicle = this.vehicleQueues[vehicleType].dequeue();
                    if (!vehicle) {
                        throw new Error("No vehicle available");
                    }
                    deliveryStartTime = Math.max(deliveryStartTime, vehicle.nextAvailableAt);
                    this.schedule["".concat(delivery.id, "-").concat(vehicleType, "-").concat((0, uuid_1.v4)())] =
                        deliveryStartTime;
                    this.updateVehicleNextAvailableTime(deliveryStartTime, vehicle, delivery);
                }
            }
        }
        catch (err) {
            console.error("Error scheduling delivery : ".concat(err));
        }
        return this.schedule;
    };
    DeliveryScheduler.prototype.createDeliveryVehicleQueues = function (vehicleTypes) {
        for (var _i = 0, vehicleTypes_1 = vehicleTypes; _i < vehicleTypes_1.length; _i++) {
            var vehicleType = vehicleTypes_1[_i];
            this.vehicleQueues[vehicleType] = new utils_1.PriorityQueue(function (a, b) { return a.nextAvailableAt - b.nextAvailableAt; });
            this.vehicleQueues[vehicleType].enqueue({
                type: vehicleType,
                nextAvailableAt: 0,
            });
        }
    };
    DeliveryScheduler.prototype.sortDeliveriesByleastDurationAsc = function (deliveries) {
        return deliveries.sort(function (a, b) { return a.duration - b.duration; });
    };
    DeliveryScheduler.prototype.updateVehicleNextAvailableTime = function (deliveryStartTime, vehicle, delivery) {
        vehicle.nextAvailableAt = deliveryStartTime + delivery.duration;
        this.vehicleQueues[vehicle.type].enqueue(vehicle); // O (n log n)
    };
    return DeliveryScheduler;
}());
exports.DeliveryScheduler = DeliveryScheduler;
