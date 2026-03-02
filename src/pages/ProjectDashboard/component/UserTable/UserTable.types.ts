export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    designation: string;
}

export interface ProjectMember {
    id: string;
    role: number;
    member: User;
}

export interface ApiError {
    data?: {
        detail?: string;
    };
}
