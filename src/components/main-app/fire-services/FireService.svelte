<script lang="ts">
	import { fly } from "svelte/transition";
	import { getContext } from "svelte";
	import type {
		ActionsPageRouterStore,
		MapDetailsSearchStore,
	} from "../../../utils/utils";
	import type { FireService } from "../../../utils/data";

	export let currentFireService: FireService;

	const search: MapDetailsSearchStore = getContext("search");
	const router: ActionsPageRouterStore = getContext("router");

	let initialRideTime = 0; // initial time secs
	let serviceHired = false;
	let rideStarted = false;

	$: fireServiceBusy = currentFireService.status === "Busy";
	$: rideDuration = $search.mapDuration; // min
	$: rideDurationInSecs = rideDuration * 60; // secs
	$: ridePercent = returnPercent(initialRideTime) || 0; // percentage of total ride duration
	/* $: console.log({
			min: rideDuration,
			secs: rideDurationInSecs,
			ridePercent,
			initialRideTime,
		}); */

	function returnPercent(initialRideTime: number): number {
		let percent: number = +(
			(initialRideTime * 100) /
			rideDurationInSecs
		).toFixed(2);
		if (percent > 100) return Math.floor(percent);
		return percent;
	}

	function goBack() {
		$router = {
			...$router,
			currentPage: "search",
		};
	}

	function hireService() {
		serviceHired = true;
		rideStarted = true;
		let interval = 1000; // 1sec
		const rideInterval = setInterval(() => {
			if (initialRideTime === rideDurationInSecs || !serviceHired) {
				clearInterval(rideInterval);
				rideStarted = false;
				return;
			}
			initialRideTime++;
		}, interval);
	}

	function stopHire() {
		if (!rideStarted && serviceHired) goBack();
		serviceHired = false;
		rideStarted = false;
		initialRideTime = 0;
	}
</script>

<div
	class="fire-service page-wrapper"
	transition:fly={{ x: 300, duration: 250 }}
>
	<h1>
		{currentFireService.name}
	</h1>

	<h3>
		Estimated time to your location: {!rideDuration || rideDuration === 0
			? "loading..."
			: `${rideDuration} mins`}
	</h3>

	<div class="btns">
		<button on:click={goBack}> go back </button>

		{#if !serviceHired}
			<button on:click={hireService} disabled={fireServiceBusy}>
				{!fireServiceBusy ? "Hire Service" : "Currently Busy"}
			</button>
		{:else}
			<button on:click={stopHire}> Cancel </button>
		{/if}
	</div>

	<div class="duration-wrapper">
		<div class="duration" style="--width: {ridePercent}%" />
	</div>
	<h4 class="duration__timer">
		{serviceHired
			? rideStarted
				? `Distance Covered ${ridePercent}%`
				: "Ride Done!"
			: ""}
	</h4>
</div>

<style lang="scss">
	.fire-service {
		position: absolute;
		border-top-right-radius: 16px;
		border-top-left-radius: 16px;
		padding: 20px;
	}

	h1 {
		border-left: 4px solid var(--fc-white);
		padding: 10px;
		background: var(--gray);
		border-radius: 8px;
		margin-bottom: 10px;
		font-size: var(--fs-semimid);
	}

	h3 {
		margin-bottom: 20px;
		font-size: var(--fs-small);
		font-weight: var(--fw-regular);
		color: #f45959bd;
		border-radius: 8px;
		border-left: 4px solid var(--red-sharp);
		padding: 10px;
	}

	.duration-wrapper {
		width: 100%;
		padding: 10px;
		border-left: 2px solid var(--red-dim);
		// border-top: 2px solid var(--red-dim);
		border-bottom: 2px solid var(--red-dim);
		// border-top-left-radius: 6px;
		// border-bottom-left-radius: 6px;
	}

	.duration {
		width: var(--width);
		max-width: 100%;
		height: 20px;
		background: var(--red-sharp);
		transition: width 150ms linear;

		&__timer {
			color: var(--red-sharp);
		}
	}

	button {
		@extend %generic-btn;

		&:disabled {
			filter: brightness(80%);
		}
	}
</style>
