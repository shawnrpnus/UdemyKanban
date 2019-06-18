export class Project {
	projectIdentifier: string;
	projectName: string;
	description: string;
	start_date: Date | String | null;
	end_date: Date | String | null;

	constructor(
		$projectIdentifier: string,
		$projectName: string,
		$projectDescription: string,
		$start_date: Date | String | null,
		$end_date: Date | String | null
	) {
		this.projectIdentifier = $projectIdentifier;
		this.projectName = $projectName;
		this.description = $projectDescription;
		this.start_date = $start_date;
		this.end_date = $end_date;
	}
}
