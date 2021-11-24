<script lang="ts">
	import { fly } from "svelte/transition";
	import { user } from "../utils/utils";

	let email: string, pword: string;

	function handleFormSubmit(): void {
		if (!email || !pword) return;
		$user.userLogin = { email, password: pword };
		$user.loggedIn = true;
	}
</script>

<div
	class="page-wrapper"
	in:fly={{ x: 300, duration: 500 }}
	out:fly={{ x: -300, duration: 500 }}
>
	<h1>Sign In</h1>

	<form on:submit|preventDefault={handleFormSubmit}>
		<input type="email" bind:value={email} placeholder="Email" required />
		<input type="password" bind:value={pword} placeholder="Password" required />
		<button> Sign In </button>
	</form>
</div>

<style lang="scss">
	div {
		padding-top: 50px;

		h1 {
			font-size: var(--fs-large);
			font-weight: var(--fw-bold);
			font-family: var(--font-heading);
			text-align: center;
			margin-bottom: 50px;
		}

		form {
			width: 80%;
			max-width: 400px;
			height: 300px;
			margin: auto;
			> * {
				display: block;
			}

			input {
				background: inherit;
				width: 100%;
				padding: 12px;
				font-size: var(--fs-mid);
				font-family: var(--font-normal);
				margin: 20px 0;
				border-radius: 8px;
				border: 2px solid var(--gray);
				color: var(--fc-white);
				transition: all 250ms ease;

				&:hover {
					border-color: var(--red-sharp);
				}

				&:focus {
					outline: 1px solid var(--red-sharp);
					outline-offset: 4px;
				}

				&::placeholder {
					opacity: 0.8;
				}

				&:not(:placeholder-shown) {
					background: inherit;
				}
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

				&:hover {
					filter: brightness(150%);
				}
			}
		}
	}
</style>
