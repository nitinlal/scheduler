# Delivery Scheduler 

This project is set up to minimize the makespan time of all deliveries.

## Getting Started

To run the project:

```shell
npm run start
```

To test the project:
```
npm run test
```

## Overview

- **Delivery Selection**: Deliveries are sorted by their duration time, ensuring shorter duration deliveries are selected first.

- **Multiple Delivery Types**: Each type of delivery can have multiple methods such as 'plane', 'truck', etc.

- **Priority Queues** for Vehicles: Each delivery method (referred to as a Vehicle) has its own priority queue. The queues are sorted by the earliest nextAvailableAt time.

- **Separate Queues for Different Vehicles**: Separate queues are maintained for different delivery methods.