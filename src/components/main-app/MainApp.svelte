<script lang="ts">
  import { fly } from "svelte/transition";
  import Map from "./Map.svelte";
  import Actions from "./Actions.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { errorOccured, MapDetailsParamsStore, MapDetailsSearchStore } from "../../utils/utils";
  import ErrorPage from "../ErrorPage.svelte";
  import { Marker } from "mapbox-gl";

  const search: MapDetailsSearchStore = writable({
    marker: null,
    mapDuration: null
  });

  const MapDetails: MapDetailsParamsStore = writable({
    map: null,
    destination: null,
    currentPos: null,
    addMarker: (map, location) => new Marker().setLngLat(location).addTo(map)
  });

  setContext("search", search);
  setContext("map-dets", MapDetails);
</script>

<div class="page-wrapper" transition:fly={{ x: 300, duration: 300 }}>
  <Map />

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
