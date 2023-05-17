"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scheduling_service_1 = require("./scheduling-service");
describe("DeliveryScheduler", function () {
    var errorSpy;
    var deliveries = [
        { id: "d1", duration: 10, vehicles: ["truck", "plane", "truck"] },
        { id: "d2", duration: 20, vehicles: ["truck"] },
        { id: "d3", duration: 5, vehicles: ["plane", "truck"] },
        { id: "d4", duration: 15, vehicles: ["plane"] },
    ];
    beforeEach(function () {
        errorSpy = jest.spyOn(console, "error").mockImplementation(function () { });
    });
    afterEach(function () {
        errorSpy.mockReset();
    });
    describe("error scenario", function () {
        it("should throw error if delivery method is not supported", function () {
            var vehicles = ["plane"];
            var scheduler = new scheduling_service_1.DeliveryScheduler(vehicles);
            scheduler.scheduleDeliveries(deliveries);
            expect(errorSpy).toHaveBeenCalled();
        });
    });
    describe("success scenario", function () {
        it("should return the schedule of all the deliveries", function () {
            var vehicles = ["plane", "truck"];
            var scheduler = new scheduling_service_1.DeliveryScheduler(vehicles);
            var schedule = scheduler.scheduleDeliveries(deliveries);
            expect(Object.keys(schedule).length).toEqual(7);
            expect(errorSpy).not.toHaveBeenCalled();
        });
    });
});
