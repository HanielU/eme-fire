<script>
	import { fly } from "svelte/transition";
</script>

<div in:fly={{ x: 300, duration: 500 }}>
	<h1>Sign In</h1>
</div>
