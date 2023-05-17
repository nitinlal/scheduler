"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var priority_queue_1 = require("./priority-queue");
describe("PriorityQueue", function () {
    var pq;
    beforeAll(function () {
        pq = new priority_queue_1.PriorityQueue(function (a, b) { return a.nextAvailableAt - b.nextAvailableAt; });
    });
    it("enqueue", function () {
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
    it("dequeue", function () {
        expect(pq.dequeue()).toEqual({
            nextAvailableAt: 1,
            type: "truck",
        });
    });
});
