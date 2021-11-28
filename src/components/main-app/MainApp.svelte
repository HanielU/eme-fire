<script>
	import { fly } from "svelte/transition";
	import Map from "./Map.svelte";
	import Actions from "./Actions.svelte";
	import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import { errorOccured } from "../../utils/utils";
	import ErrorPage from "../ErrorPage.svelte";

	const search = writable({});

	const MapDetails = writable({
		map: null,
		destination: null,
		currentPos: null,
		addMarker: (map, location) =>
			new mapboxgl.Marker().setLngLat(location).addTo(map),
	});

	setContext("search", search);
	setContext("map-dets", MapDetails);
</script>

<div class="page-wrapper" transition:fly={{ x: 300, duration: 300 }}>
	<!-- {#if !$search.expand} -->
	<Map />
	<!-- {/if} -->

	<Actions />

	{#if $errorOccured}
		<ErrorPage />
	{/if}
</div>

<style>
	div {
		z-index: 1;
	}
</style>
