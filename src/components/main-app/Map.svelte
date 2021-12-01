<script lang="ts">
	import { getContext, onMount } from "svelte";
	import {
		Coordinates,
		errorOccured,
		MapDetailsParamsStore,
		MapDetailsSearchStore,
		user,
	} from "../../utils/utils";

	let mapPresent = false;

	const search: MapDetailsSearchStore = getContext("search");
	const MapDetails: MapDetailsParamsStore = getContext("map-dets");

	$: if (!$user.loggedIn) {
		mapPresent = false;
	}
	$: if ($MapDetails.destination) {
		$search.marker = $MapDetails.addMarker(
			$MapDetails.map,
			$MapDetails.destination
		);

		getRoute($MapDetails.destination);

		$MapDetails.map.fitBounds(
			[$MapDetails.destination, $MapDetails.currentPos],
			{
				padding: 60,
			}
		);
	}

	// create a function to make a directions request
	async function getRoute(end: Coordinates) {
		// make a directions request using cycling profile
		// an arbitrary start will always be the same
		// only the end or destination will change

		const query = await fetch(
			// @ts-ignore
			`https://api.mapbox.com/directions/v5/mapbox/driving/${$MapDetails.currentPos[0]},${$MapDetails.currentPos[1]};${end[0]},${end[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${mapboxgl.accessToken}`
		);

		const json = await query.json();
		const data = json.routes[0];
		$search.mapDuration = Math.floor(data.duration / 60);
		const route = data.geometry.coordinates;
		const geojson = {
			type: "Feature",
			properties: {},
			geometry: {
				type: "LineString",
				coordinates: route,
			},
		};
		// if the route already exists on the map, we'll reset it using setData
		if ($MapDetails.map.getSource("route")) {
			$MapDetails.map.getSource("route").setData(geojson);
		}
		// otherwise, we'll make a new request
		else {
			$MapDetails.map.addLayer({
				id: "route",
				type: "line",
				source: {
					type: "geojson",
					data: geojson,
				},
				layout: {
					"line-join": "round",
					"line-cap": "round",
				},
				paint: {
					"line-color": "#3887be",
					"line-width": 5,
					"line-opacity": 0.75,
				},
			});
		}
	}

	onMount(() => {
		try {
			// @ts-ignore
			mapboxgl.accessToken =
				"pk.eyJ1IjoiaGFuaWVsdSIsImEiOiJja3dha2NpY2sxc2VrMnVyaGVuM21zaGhoIn0.MKnA0D7iVP_3gSKNwz6EjQ";

			if (!mapPresent) {
				navigator.geolocation.getCurrentPosition(onSuccess, onError, {
					enableHighAccuracy: true,
				});
			}

			function onSuccess(position) {
				let supposedCurrentPos = [
					position.coords.longitude,
					position.coords.latitude,
				];
				setupMap(supposedCurrentPos);
			}

			function onError() {
				let bazeUniversityBlockDLibrary = [
					7.405533646178658, 9.006449673032344,
				];
				let bazeUniversity = [7.405952340281745, 9.007773176138375];
				setupMap(bazeUniversity);
			}

			function setupMap(center: Coordinates) {
				$MapDetails.currentPos = center;

				// @ts-ignore
				$MapDetails.map = new mapboxgl.Map({
					container: "map",
					style: "mapbox://styles/mapbox/streets-v11",
					center: $MapDetails.currentPos,
					zoom: 14,
				});

				$MapDetails.addMarker($MapDetails.map, $MapDetails.currentPos);

				// Add zoom and rotation controls to the map.
				// @ts-ignore
				$MapDetails.map.addControl(new mapboxgl.NavigationControl()); // defaults to top-right

				$MapDetails.map.on("load", () => {
					// make an initial directions request that
					// starts and ends at the same location
					getRoute($MapDetails.currentPos);
					mapPresent = true;

					// Add starting point to the map
					$MapDetails.map.addLayer({
						id: "point",
						type: "circle",
						source: {
							type: "geojson",
							data: {
								type: "FeatureCollection",
								features: [
									{
										type: "Feature",
										properties: {},
										geometry: {
											type: "Point",
											coordinates: $MapDetails.currentPos,
										},
									},
								],
							},
						},
						paint: {
							"circle-radius": 10,
							"circle-color": "#3887be",
						},
					});
				});

				// map.addControl(
				// 	new MapboxDirections({
				// 		accessToken: mapboxgl.accessToken,
				// 	}),
				// 	"top-left"
				// );
			}
		} catch (error) {
			console.log(error.message);
			$errorOccured = true;
		}
	});
</script>

<div class="map-wrapper">
	<div id="map">
		{#if !mapPresent}
			<div class="placeholder-map">Loading map</div>
		{/if}
	</div>
</div>

<style>
	.map-wrapper {
		height: 45%;
		width: 100%;
		position: relative;
		z-index: 1;
		background: white;
	}

	#map {
		height: 90%;
		width: 100%;
	}

	.placeholder-map {
		height: 100%;
		width: 100%;
		background: white;
	}
</style>
