import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { createOrderUseCase } from "../application/use-cases/create-order.use-case";
import { inMemoryOrderRepository } from "../infrastructure/repositories/in-memory-order.repository";
import { validateCreateOrderRequest } from "../shared/validation/create-order-request.validator";

export async function createOrderFunction(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Create order requested: ${request.url}`);

  try {
    const body = await request.json();
    const input = validateCreateOrderRequest(body);

    const order = await createOrderUseCase(input, inMemoryOrderRepository);

    return {
      status: 201,
      jsonBody: order,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request body";

    return {
      status: 400,
      jsonBody: { message },
    };
  }
}

app.http("createOrder", {
  route: "orders",
  methods: ["POST"],
  authLevel: "anonymous",
  handler: createOrderFunction,
});
