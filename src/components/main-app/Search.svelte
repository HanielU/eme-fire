<script lang="ts">
	import { getContext } from "svelte";
	import { fly } from "svelte/transition";
	import type { FireService } from "../../utils/data";
	import type {
		ActionsPage,
		ActionsPageRouterStore,
		MapDetailsParamsStore,
		MapDetailsSearchStore,
	} from "../../utils/utils";
	import Loader from "./Loader.svelte";
	import FireServicesList from "./fire-services/FireServicesList.svelte";
	import MainFireService from "./fire-services/FireService.svelte";

	let loading = false;
	let showFireServices = false;
	let currentFireService: FireService;

	const setPage: (page: ActionsPage) => void = getContext("setPage");
	const search: MapDetailsSearchStore = getContext("search");
	const MapDetails: MapDetailsParamsStore = getContext("map-dets");
	const router: ActionsPageRouterStore = getContext("router");

	function activateLoader() {
		loading = true;
		const continueAction = () => {
			loading = false;
			showFireServices = true;
			clearTimeout(endTimeOut);
		};
		const endTimeOut = setTimeout(continueAction, 500);
	}

	function handleDispatch(e) {
		currentFireService = e.detail;

		if ($search.marker) {
			$search.marker.remove();
		}

		// @ts-ignore
		$MapDetails = {
			...$MapDetails,
			destination: currentFireService.location,
		};

		$router = {
			...$router,
			currentPage: "fireService",
			duration: { in: 250, out: 250 },
		};
	}
</script>

<section transition:fly={{ x: 300, duration: 500 }}>
	{#if $router.currentPage === "search"}
		<div
			class="actions-search"
			in:fly={{ x: -300, duration: $router.duration.in }}
			out:fly={{ x: -300, duration: $router.duration.out }}
		>
			<h1>Request a Fire Service Near You</h1>

			<div class="btns">
				<button on:click={() => setPage("home")}>Go Back</button>

				<button on:click={activateLoader}> Request </button>
			</div>

			{#if loading}
				<div class="results">
					<Loader />
				</div>
			{:else if !loading && showFireServices}
				<FireServicesList on:showFireService={handleDispatch} />
			{/if}
		</div>
	{/if}

	{#if !loading && showFireServices && $router.currentPage === "fireService"}
		<MainFireService {currentFireService} />
	{/if}
</section>

<style lang="scss">
	section {
		top: 0;
		left: 0;
		position: absolute;
		height: 100%;
		width: 100%;
		padding: 20px;
	}

	.actions-search {
		width: 100%;
		height: 100%;
		padding-top: 10px;
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
	}

	h1 {
		margin-bottom: 20px;
	}

	:global(.btns) {
		width: 100%;
		margin-bottom: 20px;
		@include flex($justify: space-between);
	}

	button {
		@extend %generic-btn;
	}

	.results {
		width: 100%;
		height: 70%;
		@include flex;
	}
</style>
