export type OrderStatus = "PENDING" | "PAID" | "CANCELLED";

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
}

export function createOrder(id: string, items: OrderItem[]): Order {
  if (items.length === 0) {
    throw new Error("Order must have at least one item");
  }

  const hasInvalidItem = items.some((item) => {
    return (
      item.productId.trim() === "" || item.quantity <= 0 || item.unitPrice <= 0
    );
  });

  if (hasInvalidItem) {
    throw new Error("Order contains invalid items");
  }

  return {
    id,
    items,
    status: "PENDING",
    createdAt: new Date(),
  };
}
