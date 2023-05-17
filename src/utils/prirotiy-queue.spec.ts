import { Vehicle } from "../types";
import { PriorityQueue } from "./priority-queue";

describe("PriorityQueue", () => {
  let pq: PriorityQueue<Vehicle>;

  beforeAll(() => {
    pq = new PriorityQueue<Vehicle>(
      (a, b) => a.nextAvailableAt - b.nextAvailableAt
    );
  });

  it("enqueue", () => {
    pq.enqueue({
      nextAvailableAt: 4,
      type: "truck",
    });

    pq.enqueue({
      nextAvailableAt: 1,
      type: "truck",
    });

    pq.enqueue({
      nextAvailableAt: 2,
      type: "truck",
    });
  });

  it("dequeue", () => {
    expect(pq.dequeue()).toEqual({
      nextAvailableAt: 1,
      type: "truck",
    }
    );
  });
});
