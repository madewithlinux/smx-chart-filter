<script lang="ts">
	import { page } from '$app/stores';
	import SongGrid from '$lib/SongGrid.svelte';
	import { hasMatchingDifficulty, songDataToGridRows } from '$lib/statmaniax_data_util';
	import type { StatmaniaxAllSongData } from '../statmaniax';

	const all_song_data: StatmaniaxAllSongData = $page.data.item;
	const all_grid_rows = songDataToGridRows(all_song_data);

	let p1_dif_min = $state(10);
	let p1_dif_max = $state(17);
	let p2_dif_min = $state(8);
	let p2_dif_max = $state(13);

	let bpm_min = $state(0);
	let bpm_max = $state(999);

	let allow_xmod = $state(false);

	let filtered_grid_rows = $derived(
		all_grid_rows.filter(
			(row) =>
				hasMatchingDifficulty(p1_dif_min, p1_dif_max, 'single', row) &&
				hasMatchingDifficulty(p2_dif_min, p2_dif_max, 'single', row) &&
				row.bpm_max >= bpm_min &&
				row.bpm_max <= bpm_max &&
				(allow_xmod || !row.xmod)
		)
	);
</script>

<div class="container">
	<div class="header">
		<h1>SMX chart filter</h1>
		<div class="row">
			P1 difficulty:
			<label>
				min <input type="number" bind:value={p1_dif_min} />
			</label>
			<label>
				max <input type="number" bind:value={p1_dif_max} />
			</label>
		</div>
		<div class="row">
			P2 difficulty:
			<label>
				min <input type="number" bind:value={p2_dif_min} />
			</label>
			<label>
				max <input type="number" bind:value={p2_dif_max} />
			</label>
		</div>
		<div class="row">
			primary BPM:
			<label>
				min <input type="number" bind:value={bpm_min} />
			</label>
			<label>
				max <input type="number" bind:value={bpm_max} />
			</label>
		</div>
		<div class="row">
			<label>
				allow xmod?: <input type="checkbox" bind:checked={allow_xmod} />
			</label>
		</div>
		<div class="row">
			{filtered_grid_rows.length} (of {all_grid_rows.length}) charts match
		</div>
	</div>
	<div class="content">
		<SongGrid rowData={filtered_grid_rows} />
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
			Cantarell, 'Helvetica Neue', sans-serif;
		font-size: 1.2rem;
		--gap: 0.5em;
	}
	h1 {
		margin: 0;
	}
	div.container {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
	}
	div.header {
		/* padding: 10px; */
		/* padding: 1em; */
		padding-left: 0.5em;
		padding-right: 0.5em;
		padding-top: var(--gap);
		padding-bottom: var(--gap);
		gap: var(--gap);
		display: flex;
		flex-direction: column;
		/* gap: 5px; */
	}
	.row {
		display: flex;
		gap: var(--gap);
	}
	.row input[type='number'] {
		width: 80px;
		text-align: right;
	}
	.row .wide {
		flex-grow: 1;
	}
	div.content {
		flex-grow: 1;
		display: flex;
	}
</style>
