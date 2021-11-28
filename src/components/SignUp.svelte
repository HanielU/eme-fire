<script lang="ts">
	import { fly, fade } from "svelte/transition";
	import { user } from "../utils/utils";

	// test data start
	/* let userDetails: UserLogin = {
		firstName: null,
		lastName: null,
		orgName: null,
		email: "hanieltobi@gmail.com",
		password: "haniel2004",
	};

	if ($user.userType === "Individual") {
		userDetails.firstName = "Haniel";
		userDetails.lastName = "Ubogu";
	} else {
		userDetails.orgName = "Hecto Tech";
	} */
	// test data end

	function handleFormSubmit(): void {
		if (!$user.userLogin.email || !$user.userLogin.password) return;
		$user.loggedIn = {
			loggedOut: false,
			current: true,
		};
	}
</script>

<div
	class="page-wrapper"
	in:fly={{ x: 300, duration: 500 }}
	out:fade={{ duration: 350 }}
>
	{#if $user.userType}
		<h1>Sign Up</h1>

		<form on:submit|preventDefault={handleFormSubmit}>
			{#if $user.userType === "Individual"}
				<input
					type="text"
					bind:value={$user.userLogin.firstName}
					placeholder="First Name"
				/>
				<input
					type="text"
					bind:value={$user.userLogin.lastName}
					placeholder="Last Name"
				/>
			{:else if $user.userType === "Organisation"}
				<input
					type="text"
					bind:value={$user.userLogin.orgName}
					placeholder="Organisation Name"
				/>
			{/if}

			<input
				type="email"
				bind:value={$user.userLogin.email}
				placeholder="Email"
				required
			/>
			<input
				type="password"
				bind:value={$user.userLogin.password}
				placeholder="Password"
				required
			/>
			<button> Sign Up </button>
		</form>
	{/if}
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
