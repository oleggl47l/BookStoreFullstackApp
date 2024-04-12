export interface OrderRequest {
    orderDate: Date;
    totalAmount: number;
    userId: string;
}

export const getAllOrders = async () => {
    const response = await fetch("http://localhost:5282/api/OrderCRUD");

    return response.json();
};

export const createOrder = async (orderRequest: OrderRequest) => {
    await fetch("http://localhost:5282/api/OrderCRUD", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(orderRequest),
    });
};

export const updateOrder = async (id: string, orderRequest: OrderRequest) => {
    await fetch(`http://localhost:5282/api/OrderCRUD/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(orderRequest),
    });
}

export const deleteOrder = async (id: string) => {
    await fetch(`http://localhost:5282/api/OrderCRUD/${id}`, {
        method: "DELETE",
    });
}