export class Project {
	id?: number;
	projectIdentifier: string;
	projectName: string;
	description: string;
	start_date: string | undefined;
	end_date: string | undefined;

	constructor(
		$projectIdentifier: string,
		$projectName: string,
		$projectDescription: string,
		$start_date: string | undefined,
		$end_date: string | undefined
	) {
		this.projectIdentifier = $projectIdentifier;
		this.projectName = $projectName;
		this.description = $projectDescription;
		this.start_date = $start_date;
		this.end_date = $end_date;
		this.id = undefined;
	}
}
