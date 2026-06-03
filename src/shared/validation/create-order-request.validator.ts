import { OrderItem } from "../../domain/entities/order.entity";

export interface CreateOrderRequest {
  id: string;
  items: OrderItem[];
}

export function validateCreateOrderRequest(body: unknown): CreateOrderRequest {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid request body");
  }

  const request = body as Partial<CreateOrderRequest>;

  if (typeof request.id !== "string" || request.id.trim() === "") {
    throw new Error("Order id is required or wrong type");
  }

  if (!Array.isArray(request.items)) {
    throw new Error("Order items are required");
  }

  if (request.items.length === 0) {
    throw new Error("Order items are required");
  }

  const hasInvalidItem = request.items.some((item) => {
    return (
      !item ||
      typeof item !== "object" ||
      typeof item.productId !== "string" ||
      item.productId.trim() === "" ||
      typeof item.quantity !== "number" ||
      item.quantity <= 0 ||
      typeof item.unitPrice !== "number" ||
      item.unitPrice <= 0
    );
  });

  if (hasInvalidItem) {
    throw new Error("Order contains invalid items");
  }

  return {
    id: request.id.trim(),
    items: request.items,
  };
}
