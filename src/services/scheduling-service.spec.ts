import { Delivery } from "../types";
import { DeliveryScheduler } from "./scheduling-service";

describe("DeliveryScheduler", () => {
  let errorSpy: jest.SpyInstance;
  let deliveries: Delivery[] = [
    { id: "d1", duration: 10, vehicles: ["truck", "plane", "truck"] },
    { id: "d2", duration: 20, vehicles: ["truck"] },
    { id: "d3", duration: 5, vehicles: ["plane", "truck"] },
    { id: "d4", duration: 15, vehicles: ["plane"] },
  ];

  beforeEach(() => {
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  describe("error scenario", () => {
    it("should throw error if delivery method is not supported", () => {
      let vehicles: string[] = ["plane"];
      let scheduler = new DeliveryScheduler(vehicles);
      scheduler.scheduleDeliveries(deliveries);

      expect(errorSpy).toHaveBeenCalled();
    });
  });

  describe("success scenario", () => {
    it("should return the schedule of all the deliveries", () => {
      let vehicles: string[] = ["plane", "truck"];
      let scheduler = new DeliveryScheduler(vehicles);
      let schedule = scheduler.scheduleDeliveries(deliveries);

      expect(Object.keys(schedule).length).toEqual(7);
      expect(errorSpy).not.toHaveBeenCalled();
    });
  });
});
