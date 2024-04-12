export interface UserRequest {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
}

export const getAllUsers = async () => {
    const response = await fetch("http://localhost:5282/api/UserCRUD");

    return response.json();
};

// export const createUser = async (userRequest: UserRequest) => {
//     await fetch("http://localhost:5282/api/UserCRUD", {
//         method: "POST",
//         headers: {
//             "content-type": "application/json"
//         },
//         body: JSON.stringify(userRequest),
//     });
// };

export const updateUser = async (id: string, userRequest: UserRequest) => {
    await fetch(`http://localhost:5282/api/UserCRUD/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(userRequest),
    });
}

export const deleteUser = async (id: string) => {
    await fetch(`http://localhost:5282/api/UserCRUD/${id}`, {
        method: "DELETE",
    });
}