import type { Coordinates } from "./utils";

export interface FireService {
	name: string;
	location: Coordinates;
	id: string | number;
	status: "Free" | "Busy";
	requesting: boolean;
}

export const fireServices: FireService[] = [
	{
		name: "AA Rano",
		id: "1",
		location: [7.387885630352927, 9.067220785475529],
		status: "Free",
		requesting: false,
	},
	{
		name: "Apo Fire Station",
		id: 1,
		location: correctFormat([9.015555585251604, 7.480360458649031]),
		status: "Busy",
		requesting: false,
	},
	{
		name: "Federal Fire Service Headquaters",
		id: 2,
		location: correctFormat([9.040949026244842, 7.487149262933628]),
		status: "Busy",
		requesting: false,
	},
	{
		name: "Fire Brigade",
		id: 3,
		location: correctFormat([9.063522295857064, 7.469304391546175]),
		status: "Free",
		requesting: false,
	},
	{
		name: "FCDA Fire Station",
		id: 4,
		location: correctFormat([9.068674849216306, 7.445325448797435]),
		status: "Free",
		requesting: false,
	},
	{
		name: "FCT Fire Service Headquaters",
		id: 5,
		location: correctFormat([9.05104809209096, 7.510517046720033]),
		status: "Free",
		requesting: false,
	},
];

export function correctFormat(arr: Coordinates): Coordinates {
	return arr.reverse();
}
