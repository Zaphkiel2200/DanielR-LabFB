export interface User {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    userId: string;
}

export type AppPages = 'login' | 'register' | 'tasks';