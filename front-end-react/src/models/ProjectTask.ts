export class ProjectTask {
	id?: number;
	projectIdentifier: string;
	projectSequence: string;
	summary: string;
	acceptanceCriteria: string;
	status: string;
	priority: number;
	due_date: string | undefined;

	constructor(
		$projectIdentifier: string,
		$projectSequence: string,
		$projectsummary: string,
		$acceptanceCriteria: string,
		$status: string,
		$priority: number,
		$due_date: string | undefined
	) {
		this.projectIdentifier = $projectIdentifier;
		this.projectSequence = $projectSequence;
		this.summary = $projectsummary;
		this.acceptanceCriteria = $acceptanceCriteria;
		this.status = $status;
		this.priority = $priority;
		this.due_date = $due_date;
		this.id = undefined;
	}
}
