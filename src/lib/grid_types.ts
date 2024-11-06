export interface SmxSongGridRow {
	id: string;
	title: string;
	subtitle: string;
	artist: string;
	label: string;
	bpm: string;
	genre: string;
	created_at: string;
	beginner: number;
	easy: number;
	easy_p: number;
	hard: number;
	hard_p: number;
	wild: number;
	dual: number;
	dual_p: number;
	full: number;
	full_p: number;
	team: number;
	xmod: boolean;
	bpm_min: number;
	bpm_max: number;
	p1_score: number;
	p2_score: number;

	all_single: number[];
	all_full: number[];
	cover_path: string;
	// comment: string;
}
