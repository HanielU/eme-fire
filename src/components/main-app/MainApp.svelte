<script>
	import { fly } from "svelte/transition";
</script>

<div class="page-wrapper" in:fly={{ x: 300, duration: 500 }}>Hello People</div>
