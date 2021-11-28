<script lang="ts">
	import { user } from "./utils/utils";
	import Logout from "./components/Logout.svelte";
	import Home from "./components/Home.svelte";
	import SignIn from "./components/SignIn.svelte";
	import MainApp from "./components/main-app/MainApp.svelte";
</script>

<main>
	{#if !$user.userType && !$user.loggedIn}
		<Home />
	{:else if $user.userType && !$user.loggedIn}
		<SignIn />
	{:else}
		<MainApp />
	{/if}

	<Logout />
</main>

<style>
	main {
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		position: relative;
	}
</style>
