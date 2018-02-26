export interface SlideItem {
	id: string;
	idx: number;
	name: string;
	description: string;
	priority?: number;
	duedate?: any;
	estimatedTime?: number;
	points: number;
	color: string;
	currentPlacement: number;
}