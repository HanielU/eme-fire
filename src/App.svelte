<script lang="ts">
	import { user } from "./utils/utils";
	import Home from "./components/Home.svelte";
	import SignIn from "./components/SignIn.svelte";

	$: console.log($user);
</script>

<main>
	{#if !$user.userType && !$user.loggedIn}
		<Home />
	{:else if $user.userType && !$user.loggedIn}
		<SignIn />
	{/if}
</main>

<style>
	main {
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
