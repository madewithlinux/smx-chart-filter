import type { ICellRendererFunc, ValueFormatterFunc } from 'ag-grid-community';
import { isNil } from 'lodash-es';
import type { SmxSongGridRow } from './grid_types';

export interface SongNameCellRendererConfig {
	showCoverImage: boolean;
}

export const songNameCellRenderer: (
	config: SongNameCellRendererConfig
) => ICellRendererFunc<SmxSongGridRow> =
	({ showCoverImage: songCoverImageEnabled }) =>
	(params) => {
		if (isNil(params.data)) {
			return '';
		}
		const data: SmxSongGridRow = params.data;

		const songName = data.title;
		const leaderboardUrl = `https://statmaniax.com/song/${data.id}/`;
		const songCoverImageUrl = isNil(data.cover_path)
			? ''
			: `https://data.stepmaniax.com/${data.cover_path}/cover@256x256.jpg`;
		const img = songCoverImageEnabled
			? `<img class="cover-image" src="${songCoverImageUrl}" />`
			: '';
		return `<div class="song-name-cell">${img}<a target="_blank" rel="noopener noreferrer" href="${leaderboardUrl}">${songName}</a></div>`;
	};

// export const mapperNameCellRenderer: ICellRendererFunc<SmxSongGridRow> = (params) => {
// 	if (isNil(params.data)) {
// 		return '';
// 	}
// 	const data: SmxSongGridRow = params.data;
// 	const mapperName = data.leaderboardInfo.song?.mapper ?? '';
// 	const mapperUrl = `https://beatsaver.com/profile/${data.leaderboardInfo.song?.mapperId}`;
// 	return `<a target="_blank" rel="noopener noreferrer" href="${mapperUrl}">${mapperName}</a>`;
// };

export const formatFixedDecimal: (digits: number) => ValueFormatterFunc<number> =
	(digits) => (params) => {
		const numberFormat = new Intl.NumberFormat(undefined, {
			minimumFractionDigits: digits,
			maximumFractionDigits: digits
		});
		return numberFormat.format(params.value);
	};

const numberFormatTwoDecimal = new Intl.NumberFormat(undefined, {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});
export const formatPercentage: ValueFormatterFunc<number> = (params) => {
	return `${numberFormatTwoDecimal.format(100 * params.value)}%`;
};
