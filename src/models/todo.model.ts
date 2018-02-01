export interface ToDoItem{
	id?: string;
	name: string;
	description: string;
	priority?: number;
	duedate?: any;
	estimatedTime?: number;
	points?: number;
	color?: string;
}