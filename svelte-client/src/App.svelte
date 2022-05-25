<script>
	import { Router, Route } from "svelte-routing";
	import Calculator from "./pages/Calculator.svelte";
	import Auth from "./pages/Auth.svelte";

</script>

<main>
	<Router url="">
		<div>
		  <Route path="/" component="{Auth}" />
		  <Route path="calc" component="{Calculator}" />
		</div>
	  </Router>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>