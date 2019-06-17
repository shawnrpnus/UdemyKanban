import { Moment } from "moment";

export class Project {
	private projectIdentifier: string;
	private projectName: string;
	private description: string;
	private start_date: Moment | Date | String | null;
	private end_date: Moment | Date | String | null;

	constructor(
		$projectIdentifier: string,
		$projectName: string,
		$projectDescription: string,
		$start_date: Moment | Date | String | null,
		$end_date: Moment | Date | String | null
	) {
		this.projectIdentifier = $projectIdentifier;
		this.projectName = $projectName;
		this.description = $projectDescription;
		this.start_date = $start_date;
		this.end_date = $end_date;
	}
}
