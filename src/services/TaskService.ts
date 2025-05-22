import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { TaskType } from "../utils/types/Types";

export async function getTasks(userId: string): Promise<TaskType[]> {
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
    })) as TaskType[];
}

export async function addTask(task: Omit<TaskType, 'id'>): Promise<string> {
    const tasksRef = collection(db, "tasks");
    const docRef = await addDoc(tasksRef, task);
    return docRef.id;
}

export async function updateTask(taskId: string, updates: Partial<TaskType>): Promise<void> {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, updates);
}

export async function deleteTask(taskId: string): Promise<void> {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
}