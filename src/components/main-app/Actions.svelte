<script lang="ts">
	import { fly } from "svelte/transition";
	import { writable } from "svelte/store";
	import {
		user,
		ActionsPage,
		ActionsPageRouterStore,
		MapDetailsParamsStore,
	} from "../../utils/utils";
	import Search from "./Search.svelte";
	import { getContext, setContext } from "svelte";

	let { firstName, orgName } = $user.userLogin;

	const router: ActionsPageRouterStore = writable({
		currentPage: "home",
		previousPage: null,
		duration: {
			in: 0,
			out: 1000,
		},
	});

	const search: MapDetailsParamsStore = getContext("search");

	function setPage(page: ActionsPage): void {
		let cP = $router.currentPage;
		$router.currentPage = page;
		$router.previousPage = cP;
		$router.duration = {
			in: 0,
			out: 1000,
		};
	}

	setContext("router", router);
	setContext("setPage", setPage);
</script>

<section class:expand={$search.expand}>
	{#if $router.currentPage === "home"}
		<div class="actions-home" transition:fly={{ x: -300, duration: 300 }}>
			<div class="actions-header">
				<div class="logo">
					<h1>Max Security</h1>
				</div>

				<h4 class="user-details">
					{firstName ? firstName : orgName}
				</h4>
			</div>

			<button on:click={() => setPage("search")}> Make A Request </button>
		</div>
	{:else}
		<Search />
	{/if}
</section>

<style lang="scss">
	section {
		background: var(--bg);
		height: 60%;
		width: 100%;
		border-top-right-radius: 16px;
		border-top-left-radius: 16px;
		// overflow-y: auto;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 2;
		transition: height 350ms ease;

		&.expand {
			height: 95%;
		}
	}

	.actions-home {
		width: 100%;
		top: 0;
		left: 0;
		position: absolute;
		padding: 20px;
	}

	.actions-header {
		width: 100%;
		margin-bottom: 20px;
		padding-top: 10px;
		@include flex($justify: space-between);
	}

	button {
		@extend %generic-btn;
		padding: 15px;
		width: 100%;
	}
</style>
