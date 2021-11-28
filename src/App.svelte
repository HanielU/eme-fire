<script lang="ts">
	import { user } from "./utils/utils";
	import Logout from "./components/Logout.svelte";
	import Home from "./components/Home.svelte";
	import SignUp from "./components/SignUp.svelte";
	import LogIn from "./components/LogIn.svelte";
	import MainApp from "./components/main-app/MainApp.svelte";
	import { onMount } from "svelte";

	onMount(() => {
		if ($user.loggedIn.current) $user.loggedIn.loggedOut = true;
	});
	$: console.log($user.loggedIn);
</script>

<main>
	{#if !$user.userType && !$user.loggedIn.current}
		<Home />
	{:else if $user.userType && !$user.loggedIn.current}
		<SignUp />
	{:else if $user.userType && $user.loggedIn.loggedOut}
		<LogIn />
	{:else if $user.userType && $user.loggedIn.loggedOut === false && $user.loggedIn.current === true}
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
