export class ProjectTask {
	id?: number;
	projectIdentifier: string;
	projectSequence: string;
	summary: string;
	acceptanceCriteria: string;
	status: string;
	priority: number;
	dueDate: string | undefined;

	constructor(
		$projectIdentifier: string,
		$projectsummary: string,
		$acceptanceCriteria: string,
		$status: string,
		$priority: number,
		$dueDate: string | undefined
	) {
		this.projectIdentifier = $projectIdentifier;
		this.projectSequence = "";
		this.summary = $projectsummary;
		this.acceptanceCriteria = $acceptanceCriteria;
		this.status = $status;
		this.priority = $priority;
		this.dueDate = $dueDate;
		this.id = undefined;
	}
}
