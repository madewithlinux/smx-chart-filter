import { json, type RequestHandler } from '@sveltejs/kit';
import type { StatmaniaxAllSongData } from '../../../statmaniax';

const STATMANIAX_SONG_DATA_URL = 'https://statmaniax.com/api/get_song_data';

export const GET: RequestHandler = async ({ fetch, url }) => {
  const res = await fetch(STATMANIAX_SONG_DATA_URL);
	const item: StatmaniaxAllSongData = await res.json();
	const response = json(item);
	response.headers.set('age', '0');
	response.headers.set('cache-control', `public, max-age=${15 * 60}`);
	return response;
};


