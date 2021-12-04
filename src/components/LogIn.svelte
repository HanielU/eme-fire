<script lang="ts">
	import { fly, fade } from "svelte/transition";
	import { user } from "../utils/utils";

	const handleFormSubmit = () => ($user.loggedIn.loggedOut = false);
	const changePassword = () => ($user.loggedIn.current = false);
</script>

<div
	class="page-wrapper"
	in:fly={{ x: 300, duration: 500 }}
	out:fade={{ duration: 350 }}
>
	{#if $user.userType}
		<h1>Log In</h1>

		<div class="form">
			<h4>Local Account Found</h4>
			<button on:click={handleFormSubmit}> Sign In </button>

			<button on:click={changePassword}> Reset Password </button>
		</div>
	{/if}
</div>

<style lang="scss">
	.page-wrapper {
		padding-top: 50px;

		h1 {
			font-size: var(--fs-large);
			font-weight: var(--fw-bold);
			font-family: var(--font-heading);
			text-align: center;
			margin-bottom: 50px;
		}

		.form {
			width: 80%;
			max-width: 400px;
			height: 300px;
			margin: auto;
			> * {
				display: block;
			}

			h4 {
				text-align: center;
				color: var(--fc-white);
				margin-bottom: 10px;
			}

			button {
				cursor: pointer;
				background: var(--bg-accent);
				color: var(--fc-white);
				padding: 15px 20px;
				width: 100%;

				font-size: var(--fs-mid);
				border-radius: 8px;
				transition: all 250ms ease;
				margin-left: auto;
				margin-bottom: 20px;

				&:hover {
					filter: brightness(150%);
				}
			}
		}
	}
</style>
