import { Writable, writable } from "svelte/store";

export type UserType = "Individual" | "Organisation";

export interface UserLogin {
	email: string;
	password: string;
}

export interface User {
	userType: UserType;
	loggedIn: boolean;
	userLogin: UserLogin;
}

export const user: Writable<User> = localStorageStore("user", {
	userType: null,
	loggedIn: false,
	userLogin: {
		email: null,
		password: null,
	},
});

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
