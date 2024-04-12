export interface BookRequest {
    title: string;
    author: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
}

export const getAllBooks = async () => {
    const response = await fetch("http://localhost:5282/api/BookCRUD");

    return response.json();
};

export const createBook = async (bookRequest: BookRequest) => {
    await fetch("http://localhost:5282/api/BookCRUD", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(bookRequest),
    });
};

export const updateBook = async (id: string, bookRequest: BookRequest) => {
    await fetch(`http://localhost:5282/api/BookCRUD/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(bookRequest),
    });
}

export const deleteBook = async (id: string) => {
    await fetch(`http://localhost:5282/api/BookCRUD/${id}`, {
        method: "DELETE",
    });
}