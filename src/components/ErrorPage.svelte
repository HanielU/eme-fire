<div>
	<h1>Something went wrong, Please Reload the Page</h1>
</div>

<style lang="scss">
	div {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 3;
		padding: 20px;
		background: var(--bg);
		@include flex;

		h1 {
			color: var(--red-sharp);
			font-size: var(--fs-big);
			width: fit-content;
		}
	}
</style>
