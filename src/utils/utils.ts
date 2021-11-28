import { Writable, writable } from "svelte/store";

export const errorOccured: Writable<boolean> = writable(false);

export type UserType = "Individual" | "Organisation";

export interface UserLogin {
	email: string;
	password: string;
	firstName?: string;
	lastName?: string;
	orgName?: string;
}

export interface User {
	userType: UserType;
	loggedIn: { loggedOut: boolean; current: boolean };
	userLogin: UserLogin;
}

export type UserStore = Writable<User>;

export const user: UserStore = localStorageStore("user", {
	userType: null,
	loggedIn: {
		loggedOut: false,
		current: false,
	},
	userLogin: {
		email: null,
		password: null,
		firstName: null,
		lastName: null,
		serviceName: null,
	},
});

export type ActionsPage = "home" | "search" | "fireService";

export interface ActionsPageRouter {
	currentPage: ActionsPage;
	previousPage: ActionsPage;
	duration?: {
		in: number;
		out: number;
	};
}

export type ActionsPageRouterStore = Writable<ActionsPageRouter>;

export type Coordinates = number[];

export interface MapDetailsParams {
	map: any;
	currentPos: Coordinates;
	destination: Coordinates;
	expand: boolean;
	addMarker: (map, location) => any;
}

export type MapDetailsParamsStore = Writable<MapDetailsParams>;

export interface MapDetailsSearch {
	marker?: any;
	mapDuration?: any;
}

export type MapDetailsSearchStore = Writable<MapDetailsSearch>;
/* export interface MapDetailsParams {
	map: any;
	currentPos: number[];
	mapDuration?: any;
	mapLoading?: boolean;
	destination: number[];
	expand: boolean;
	addMarker: (map, location) => any;
} */

const client = typeof window !== "undefined";

// Custom store to make life easier
export function localStorageStore(key, initial) {
	const { set: setStore, ...readableStore } = writable(initial, () => {
		if (!client) return;

		getAndSetFromLocalStorage();

		const updateFromStorageEvents = (event) => {
			if (event.key === key) getAndSetFromLocalStorage();
		};
		window.addEventListener("storage", updateFromStorageEvents);
		return () => window.removeEventListener("storage", updateFromStorageEvents);
	});

	// Set both the localStorage and this Svelte store
	const set = (value) => {
		setStore(value);
		localStorage.setItem(key, JSON.stringify(value));
	};

	// Synchronize the Svelte store and local storage
	const getAndSetFromLocalStorage = () => {
		const localValue = localStorage.getItem(key);

		if (localValue === null) set(initial);
		else {
			try {
				setStore(JSON.parse(localValue));
			} catch {
				set(initial);
			}
		}
	};

	return { ...readableStore, set };
}
