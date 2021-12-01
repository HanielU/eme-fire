<script lang="ts">
	import { user } from "./utils/utils";
	import Logout from "./components/Logout.svelte";
	import Home from "./components/Home.svelte";
	import SignUp from "./components/SignUp.svelte";
	import LogIn from "./components/LogIn.svelte";
	import MainApp from "./components/main-app/MainApp.svelte";

	// runs as soon as component is rendered
	if ($user.loggedIn.current) $user.loggedIn.loggedOut = true;
	if ($user.loggedIn.loggedOut && !$user.loggedIn.current)
		$user.loggedIn.current = true;

	$: showHome = !$user.userType; // user hasn't selected category, meaning user isn't signed up
	$: showSignUp = $user.userType && !$user.loggedIn.current; // user has selected category, but hasn't signed up yet
	$: showLogin = $user.userType && $user.loggedIn.loggedOut; // user has selected category, but user refresed the page, which means they are logged out
	$: showMainApp =
		$user.userType && !$user.loggedIn.loggedOut && $user.loggedIn.current;
</script>

<main>
	{#if showHome}
		<Home />
	{:else if showSignUp}
		<SignUp />
	{:else if showLogin}
		<LogIn />
	{:else if showMainApp}
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
