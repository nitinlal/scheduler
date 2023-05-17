export class PriorityQueue<T> {
    private queue: T[] = [];
  
    constructor(private comparator: (a: T, b: T) => number) {}
  
    enqueue(value: T): void {
        this.queue.push(value);
        this.queue.sort(this.comparator);
    }
  
    dequeue(): T | undefined {
        return this.queue.shift();
    }
}