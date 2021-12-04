<script lang="ts">
	import { user } from "./utils/utils";
	import Logout from "./components/Logout.svelte";
	import Home from "./components/Home.svelte";
	import SignUp from "./components/SignUp.svelte";
	import LogIn from "./components/LogIn.svelte";
	import MainApp from "./components/main-app/MainApp.svelte";

	// runs as soon as component is rendered
	if ($user.loggedIn.current) $user.loggedIn.loggedOut = true; // [1]
	if ($user.loggedIn.loggedOut && !$user.loggedIn.current)
		$user.loggedIn.current = true; // [2]
	if ($user.userType && !$user.loggedIn.current) $user.userType = null; // [3]

	$: showHome = !$user.userType; // [4]
	$: showSignUp = $user.userType && !$user.loggedIn.current; // [5]
	$: showLogin = $user.userType && $user.loggedIn.loggedOut; // [6]
	$: showMainApp =
		$user.userType && !$user.loggedIn.loggedOut && $user.loggedIn.current; // [7]

	/* 
		COMMENT INDEX

		[1]: if user was logged in before refresh, log out the user

		[2]: if user was logged out and the sign in page is active, 
		on refresh, change the conditions in order so that the sign in page does not show

		[3]: if user has a category, but isn't signed in yet, remove the user's selected category on refresh

		[4]: user hasn't selected category, meaning user isn't signed up

		[5]: user has selected category, but hasn't signed up yet

		[6]: user has selected category, but user refresed the page, which means they are logged out

		[7]: user has a category, user is not logged out, user is currently logged in
	 */
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
