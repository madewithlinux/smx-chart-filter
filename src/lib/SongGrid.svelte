<script lang="ts">
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-balham.css';

	import {
		type GridApi,
		type GridOptions,
		type ColDef,
		type Module
	} from '@ag-grid-community/core';
	import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

	import AgGridSvelte5 from 'ag-grid-svelte5';
	import type { SmxSongGridRow } from './grid_types';
	import { songNameCellRenderer } from './grid_util';
	// import { formatFixedDecimal, formatPercentage, mapperNameCellRenderer, songNameCellRenderer } from './grid_util';

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

	//////// grid config
	let columnDefs: ColDef[] = [
		{ headerName: 'id', field: 'id', hide: !allColumns },
		{ headerName: 'title', field: 'title',
		cellRenderer: songNameCellRenderer({ showCoverImage: songCoverImageEnabled }),
		 },
		 { headerName: 'bpm', field: 'bpm' },
		 { headerName: 'B', field: 'beginner' },
		 { headerName: 'E', field: 'easy' },
		 { headerName: 'E+', field: 'easy_p' },
		 { headerName: 'H', field: 'hard' },
		 { headerName: 'H+', field: 'hard_p' },
		 { headerName: 'W', field: 'wild' },
		 { headerName: 'D', field: 'dual' },
		 { headerName: 'D+', field: 'dual_p' },
		 { headerName: 'F', field: 'full' },
		 { headerName: 'F+', field: 'full_p' },
		 { headerName: 'T', field: 'team' },

		 { headerName: 'subtitle', field: 'subtitle' },
		 { headerName: 'artist', field: 'artist' },
		 { headerName: 'label', field: 'label' },
		 { headerName: 'genre', field: 'genre' },
		 { headerName: 'created_at', field: 'created_at', hide: !allColumns },

		{ headerName: 'xmod', field: 'xmod' },
		{ headerName: 'bpm_min', field: 'bpm_min' },
		{ headerName: 'bpm_max', field: 'bpm_max' },
		{ headerName: 'p1_score', field: 'p1_score' },
		{ headerName: 'p2_score', field: 'p2_score' }
	];

	let api: GridApi | undefined = $state();
	let gridOptions: GridOptions = {
		columnDefs: columnDefs,
		defaultColDef: {
			resizable: true,
			sortable: true
		},
		onGridReady(event) {
			api = event.api;
			setTimeout(() => {
				event.api.autoSizeAllColumns();
			}, 0);
		}
	};

	const modules: Module[] = [ClientSideRowModelModule];
</script>

<div class="container">
	<div class="AgGridSvelte-theme-container ag-grid ag-theme-balham">
		<AgGridSvelte5 {rowData} {gridOptions} {modules} gridClass="ag-theme-balham" sizeColumnsToFit={false} />
	</div>
</div>

<style>
	div.container :global(.song-name-cell) {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 5px;
	}
	div.container :global(.cover-image) {
		height: 24px;
	}
	div.container {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}
	.AgGridSvelte-theme-container {
		flex-grow: 1;
		flex-direction: column;
	}
</style>
