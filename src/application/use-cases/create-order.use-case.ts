import {
  createOrder,
  Order,
  OrderItem,
} from "../../domain/entities/order.entity";
import { OrderRepository } from "../../domain/ports/order.repository";

export interface CreateOrderInput {
  id: string;
  items: OrderItem[];
}

export async function createOrderUseCase(
  input: CreateOrderInput,
  orderRepository: OrderRepository,
): Promise<Order> {
  const order = createOrder(input.id, input.items);

  await orderRepository.save(order);

  return order;
}
