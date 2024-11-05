import type { StatmaniaxAllSongData } from '../statmaniax';
import type { PageLoad } from './$types';

export interface OutputData {
	item: StatmaniaxAllSongData;
}

export const load: PageLoad<OutputData> = async ({ fetch, params, data }) => {
	const res = await fetch('/api/song-data');
	const item: any = await res.json();
	return { item };
};
