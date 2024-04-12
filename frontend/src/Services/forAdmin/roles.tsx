export interface RoleRequest {
    name: string;
}

export const getAllRoles = async () => {
    const response = await fetch("http://localhost:5282/api/RoleCRUD");

    return response.json();
};

export const createRole = async (roleRequest: RoleRequest) => {
    await fetch("http://localhost:5282/api/RoleCRUD", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(roleRequest),
    });
};

export const updateRole = async (id: string, roleRequest: RoleRequest) => {
    await fetch(`http://localhost:5282/api/RoleCRUD/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(roleRequest),
    });
}

export const deleteRole = async (id: string) => {
    await fetch(`http://localhost:5282/api/RoleCRUD/${id}`, {
        method: "DELETE",
    });
}