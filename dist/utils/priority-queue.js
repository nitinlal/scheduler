"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue(comparator) {
        this.comparator = comparator;
        this.queue = [];
    }
    PriorityQueue.prototype.enqueue = function (value) {
        this.queue.push(value);
        this.queue.sort(this.comparator);
    };
    PriorityQueue.prototype.dequeue = function () {
        return this.queue.shift();
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
