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

export interface UserTableProps {
    isAdmin: boolean;
    isActive: boolean;
    ownerId: string;
    isOwner: boolean;
    currentUserId: string;
}

export interface ApiError {
    data?: {
        detail?: string;
    };
}

export interface ProjectUsersProps {
    isAdmin: boolean;
    isActive: boolean;
    ownerId: string;
    isOwner: boolean;
    currentUserId: string;
}
