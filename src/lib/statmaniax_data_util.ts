import { isNil, map, max, toArray, toNumber, values } from 'lodash-es';
import type { StatmaniaxAllSongData } from '../statmaniax';
import type { SmxSongGridRow } from './grid_types';

const _difficulty_headers_all_single = ['beginner', 'easy', 'easy_p', 'hard', 'hard_p', 'wild'];

const _difficulty_headers_all_full = ['full', 'full_p'];

export const songDataToGridRows = (
	statmaniaxAllSongData: StatmaniaxAllSongData
): SmxSongGridRow[] => {
	return map(statmaniaxAllSongData, (sd, id): SmxSongGridRow => {
		const diffs: Record<string, number> = {};
		for (let dif of values(sd.difficulties)) {
			let name = dif.name;
			if (name.endsWith('+')) {
				name = name.substring(0, name.length - 1) + '_p';
			}
			diffs[name] = toNumber(dif.difficulty);
		}

		let xmod = false;
		let bpm_min = toNumber(sd.bpm);
		let bpm_max = toNumber(sd.bpm);
		if (sd.bpm.includes('-')) {
			xmod = true;
			const bpms = sd.bpm.split('-');
			bpm_min = toNumber(bpms[0]);
			bpm_max = toNumber(bpms[1]);
		}

		const all_single: number[] = [];
		const all_full: number[] = [];

		// all_single
		for (const dif_key of _difficulty_headers_all_single) {
			if (isNil(diffs[dif_key])) {
				continue;
			}
			all_single.push(diffs[dif_key]);
		}
		// all_full
		for (const dif_key of _difficulty_headers_all_full) {
			if (isNil(diffs[dif_key])) {
				continue;
			}
			all_full.push(diffs[dif_key]);
		}

		return {
			id: id,
			title: sd.title,
			subtitle: sd.subtitle,
			artist: sd.artist,
			label: sd.label,
			bpm: sd.bpm,
			genre: sd.genre,
			created_at: sd.created_at,
			beginner: diffs['beginner'] ?? undefined,
			easy: diffs['easy'] ?? undefined,
			easy_p: diffs['easy_p'] ?? undefined,
			hard: diffs['hard'] ?? undefined,
			hard_p: diffs['hard_p'] ?? undefined,
			wild: diffs['wild'] ?? undefined,
			dual: diffs['dual'] ?? undefined,
			dual_p: diffs['dual_p'] ?? undefined,
			full: diffs['full'] ?? undefined,
			full_p: diffs['full_p'] ?? undefined,
			team: diffs['team'] ?? undefined,
			xmod,
			bpm_min,
			bpm_max,

			// TODO
			p1_score: 0,
			p2_score: 0,

			all_single,
			all_full
		};
	});
};

export const hasMatchingDifficulty = (
	dif_min: number,
	dif_max: number,
	singleOrFull: 'single' | 'full',
	song: SmxSongGridRow
): boolean => {
	const all_diffs = singleOrFull == 'single' ? song.all_single : song.all_full;
	for (const dif of all_diffs) {
		if (dif >= dif_min && dif <= dif_max) {
			return true;
		}
	}
	return false;
};
