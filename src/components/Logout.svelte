<script lang="ts">
	import { user } from "../utils/utils";

	const logout = () =>
		user.set({
			userType: null,
			loggedIn: {
				loggedOut: false,
				current: false,
			},
			userLogin: {
				email: null,
				password: null,
			},
		});
</script>

<button on:click={logout}>Logout</button>

<style lang="scss">
	button {
		padding: 15px;
		font-size: var(--small);
		background: var(--bg-accent);
		color: var(--fc-white);
		position: fixed;
		z-index: 9999;
		left: 0;
		bottom: 0;
		cursor: pointer;
		border-top-right-radius: 8px;

		&:hover {
			filter: brightness(150%);
		}
	}
</style>
