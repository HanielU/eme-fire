<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { fireServices } from "../../../utils/data";

	const dispatch = createEventDispatcher();
</script>

<ul>
	{#each fireServices as fireService}
		<li on:click={() => dispatch("showFireService", fireService)}>
			<span>
				{fireService.name}
			</span>

			<span class={fireService.status === "Free" ? "green" : "red"}>
				{fireService.status}
			</span>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		width: 100%;
		height: 100%;
		padding-bottom: 50px;
		overflow-y: auto;
		list-style: none;
	}

	li {
		@extend %generic-btn;
		padding: 20px;
		margin-bottom: 20px;
		@include flex($justify: space-between);
	}

	span {
		&.green {
			color: green;
		}

		&.red {
			color: red;
		}
	}
</style>
