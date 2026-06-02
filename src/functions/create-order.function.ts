import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { createOrderUseCase } from "../application/use-cases/create-order.use-case";
import { inMemoryOrderRepository } from "../infrastructure/repositories/in-memory-order.repository";

export async function createOrderFunction(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Create order requested: ${request.url}`);

  const body = await request.json() as {
    id: string;
    items: {
      productId: string;
      quantity: number;
      unitPrice: number;
    }[];
  };

  const order = await createOrderUseCase(body, inMemoryOrderRepository);

  return {
    status: 201,
    jsonBody: order,
  };
}

app.http("createOrder", {
  route: "orders",
  methods: ["POST"],
  authLevel: "anonymous",
  handler: createOrderFunction,
});