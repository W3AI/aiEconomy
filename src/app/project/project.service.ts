import { Subject } from 'rxjs/Subject';

import { Task } from "./task.model";

// Naming Convention:
// project.service is meant To manage all tasks/services/skills we know 
// as well as completed and cancelled tasks/steps
// named project.service instead of task.service
// in order to keep the naming rule/convention of: training ~ project 
// as per Max S. training project

export class ProjectService {
    taskChanged = new Subject<Task>();
    private availableTasks: Task[] = [
        { id: 'coding', name: 'Coding', duration: 30, calories: 8 },
        { id: 'cooking', name: 'Cooking', duration: 180, calories: 15 },
        { id: 'gardening', name: 'Gardening', duration: 120, calories: 18 },
        { id: 'planning', name: 'Planning', duration: 60, calories: 8 }
    ];
    private runningTask: Task;
    private tasks: Task[] = [];

    getAvailableTasks() {
        // slice creates a real copy of the availableTasks array
        // in oreder to be able to edit it without affecting the original array
        return this.availableTasks.slice();
    }

    startTask(selectedId: string) {
        this.runningTask = this.availableTasks.find(
            task => task.id === selectedId);
        this.taskChanged.next({ ...this.runningTask });
    }

    completeTask() {
        this.tasks.push({ 
            ...this.runningTask, 
            date: new Date(), 
            state: 'completed' });
        this.runningTask = null;
        this.taskChanged.next(null);
    }

    cancelTask(progress: number) {
        this.tasks.push({ 
            ...this.runningTask, 
            duration: this.runningTask.duration * (progress / 100),
            calories: this.runningTask.calories * (progress / 100),
            date: new Date(), 
            state: 'cancelled' });
        this.runningTask = null;
        this.taskChanged.next(null);
    }

    getRunningTask() {
        return { ...this.runningTask };
    }

    getCompletedOrCancelledTasks() {
        return this.tasks.slice();
    }
}