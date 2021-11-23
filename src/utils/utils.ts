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

export const user: Writable<User> = writable({
	userType: undefined,
	loggedIn: false,
	userLogin: {
		email: null,
		password: null,
	},
});
