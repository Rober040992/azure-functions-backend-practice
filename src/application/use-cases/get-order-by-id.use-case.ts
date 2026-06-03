import { Order } from "../../domain/entities/order.entity";
import { OrderRepository } from "../../domain/ports/order.repository";

export async function getOrderByIdUseCase(
  id: string,
  orderRepository: OrderRepository
): Promise<Order | null> {
  return orderRepository.findById(id);
}