type UserType = {
    id: string;
    email: string;
    displayName?: string;
};

type TaskType = {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    userId: string;
};

export type { UserType, TaskType };