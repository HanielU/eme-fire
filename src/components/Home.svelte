<script lang="ts">
	import { fly } from "svelte/transition";
	import { user } from "../utils/utils";

	function setUserType() {
		$user.userType = this.textContent;
	}
</script>

<article class="page-wrapper" transition:fly={{ x: -300, duration: 500 }}>
	<div class="logo-wrapper">
		<h1>Max Security</h1>
	</div>

	<div class="select-aff">
		<h3>Do You Represent</h3>

		<div class="option" on:click={setUserType}>Individual</div>

		<h6 class="mid">or</h6>

		<div class="option" on:click={setUserType}>Organisation</div>
	</div>
</article>

<style lang="scss">
	article {
		max-width: 450px;
		padding-top: 50px;
		@include flex($justify: space-around);
		flex-direction: column;
		z-index: 5;
	}

	.logo-wrapper {
		margin: auto;
		width: 80%;
		height: 300px;
		border-radius: 8px;
		background: var(--bg-accent);
		@include flex;

		h1 {
			font-family: var(--font-heading);
			font-weight: var(--fw-bold);
			font-size: var(--fs-large);
			color: var(--red-sharp);
			max-width: 8ch;
			text-align: center;
		}
	}

	.select-aff {
		width: 80%;
		height: 300px;
		text-align: center;
		margin-bottom: 30px;

		h3 {
			font-size: var(--fs-big);
			margin-bottom: 30px;
		}

		.option {
			width: 100%;
			padding: 10px;
			border: 1px solid #ff8282;
			border-radius: 8px;
			font-size: var(--fs-semimid);
			cursor: pointer;

			&:hover {
				background: var(--red-dim);
			}
		}

		.mid {
			color: #e9ebef82;
			font-size: var(--fs-mid);
			margin: 10px 0;
		}
	}
</style>
