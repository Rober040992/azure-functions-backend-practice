import { Order } from "../../domain/entities/order.entity";
import { OrderRepository } from "../../domain/ports/order.repository";

const orders = new Map<string, Order>();

export const inMemoryOrderRepository: OrderRepository = {
  async save(order: Order): Promise<void> {
    orders.set(order.id, order);
  },

  async findById(id: string): Promise<Order | null> {
    return orders.get(id) ?? null;
  }
};