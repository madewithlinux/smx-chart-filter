<script lang="ts">
	import { TableHandler, Datatable, Th, ThSort, ThFilter } from '@vincjo/datatables';
	import type { SmxSongGridRow } from './grid_types';
	import { isNil } from 'lodash-es';

	let {
		rowData,
		//////// display options
		songCoverImageEnabled = true,
		allColumns = false
	}: {
		rowData: SmxSongGridRow[];
		songCoverImageEnabled?: boolean;
		allColumns?: boolean;
	} = $props();

	const table = new TableHandler(rowData, { rowsPerPage: 50 });

	// update when getting new data
	$effect(() => {
		rowData;
		table.setRows(rowData);
		console.log('row data changed');
	});
</script>

<Datatable basic {table}>
	<table class="song-data-table">
		<thead>
			<tr>
				<Th />
				<ThSort {table} field="title">title</ThSort>
				<ThSort {table} field="bpm">bpm</ThSort>
				<ThSort {table} field="beginner">B</ThSort>
				<ThSort {table} field="easy">E</ThSort>
				<ThSort {table} field="easy_p">E+</ThSort>
				<ThSort {table} field="hard">H</ThSort>
				<ThSort {table} field="hard_p">H+</ThSort>
				<ThSort {table} field="wild">W</ThSort>
				<ThSort {table} field="dual">D</ThSort>
				<ThSort {table} field="dual_p">D+</ThSort>
				<ThSort {table} field="full">F</ThSort>
				<ThSort {table} field="full_p">F+</ThSort>
				<ThSort {table} field="team">T</ThSort>
				<ThSort {table} field="subtitle">subtitle</ThSort>
				<ThSort {table} field="artist">artist</ThSort>
				<ThSort {table} field="label">label</ThSort>
				<ThSort {table} field="genre">genre</ThSort>
				<ThSort {table} field="xmod">xmod</ThSort>
				<ThSort {table} field="bpm_min">bpm_min</ThSort>
				<ThSort {table} field="bpm_max">bpm_max</ThSort>
				<ThSort {table} field="p1_score">p1_score</ThSort>
				<ThSort {table} field="p2_score">p2_score</ThSort>
			</tr>
		</thead>
		<tbody>
			{#each table.rows as row}
				<tr>
					<!-- <td>{row.first_name}</td>
					<td>{row.last_name}</td>
					<td>{row.email}</td> -->
					<td class="cover-image-cell">
						<!-- <div class="song-name-cell"> -->
						{#if songCoverImageEnabled && !isNil(row.cover_path)}
							<img
								class="cover-image"
								src="https://data.stepmaniax.com/{row.cover_path}/cover@256x256.jpg"
								alt="{row.title} cover image"
							/>
						{/if}
						<!-- </div> -->
					</td>
					<td>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://statmaniax.com/song/{row.id}/"
						>
							{row.title}
						</a>
						<!-- {row.title} -->
					</td>
					<td>{row.bpm}</td>
					<td>{row.beginner}</td>
					<td>{row.easy}</td>
					<td>{row.easy_p}</td>
					<td>{row.hard}</td>
					<td>{row.hard_p}</td>
					<td>{row.wild}</td>
					<td>{row.dual}</td>
					<td>{row.dual_p}</td>
					<td>{row.full}</td>
					<td>{row.full_p}</td>
					<td>{row.team}</td>
					<td>{row.subtitle}</td>
					<td>{row.artist}</td>
					<td>{row.label}</td>
					<td>{row.genre}</td>
					<td>{row.xmod}</td>
					<td>{row.bpm_min}</td>
					<td>{row.bpm_max}</td>
					<td>{row.p1_score}</td>
					<td>{row.p2_score}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Datatable>

<style>
	.song-data-table tbody tr td.cover-image-cell {
		padding: 0;
	}
	.cover-image {
		height: 64px;
	}
</style>
