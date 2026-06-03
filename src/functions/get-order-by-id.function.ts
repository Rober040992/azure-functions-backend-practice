import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { getOrderByIdUseCase } from "../application/use-cases/get-order-by-id.use-case";
import { inMemoryOrderRepository } from "../infrastructure/repositories/in-memory-order.repository";

export async function getOrderByIdFunction(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log(`Get order requested: ${request.url}`);

  try {
    const id = request.params.id;

    const order = await getOrderByIdUseCase(id, inMemoryOrderRepository);

    if (!order) {
      return {
        status: 404,
        jsonBody: {
          message: "Order not found",
        },
      };
    }

    return {
      status: 200,
      jsonBody: order,
    };
  } catch (error) {
    context.error(error);

    return {
        status: 500,
        jsonBody: { message: "Internal server error" }
    }
  }
}

app.http("getOrderById", {
  route: "orders/{id}",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getOrderByIdFunction,
});
