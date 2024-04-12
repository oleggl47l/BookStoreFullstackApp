export interface OrderItemRequest {
    orderId: string;
    bookId: string;
    quantity: number;
    price: number
}

export const getAllOrderItems = async () => {
    const response = await fetch("http://localhost:5282/api/OrderItemCRUD");

    return response.json();
};

export const createOrderItem = async (orderItemRequest: OrderItemRequest) => {
    await fetch("http://localhost:5282/api/OrderItemCRUD", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(orderItemRequest),
    });
};

export const updateOrderItem = async (id: string, orderItemRequest: OrderItemRequest) => {
    await fetch(`http://localhost:5282/api/OrderItemCRUD/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(orderItemRequest),
    });
}

export const deleteOrderItem = async (id: string) => {
    await fetch(`http://localhost:5282/api/OrderItemCRUD/${id}`, {
        method: "DELETE",
    });
}