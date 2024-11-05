export interface StatmaniaxAllSongData {
	[key: number]: StatmaniaxSongData;
}
export interface StatmaniaxSongData {
	title: string;
	subtitle: string;
	artist: string;
	label: string;
	bpm: string;
	cover_path: string;
	genre: string;
	created_at: string;
	website: string;
	difficulties: StatmaniaxSongDifficultiesMap | StatmaniaxSongDifficulty[];
}

export interface StatmaniaxSongDifficultiesMap {
	[index: number]: StatmaniaxSongDifficulty;
}

export interface StatmaniaxSongDifficulty {
	difficulty: number;
	name: StatmaniaxSongDifficultyName;
}

export type StatmaniaxSongDifficultyName =
	| 'easy'
	| 'easy+'
	| 'hard'
	| 'hard+'
	| 'wild'
	| 'dual'
	| 'dual+'
	| 'full'
	| 'full+'
	| 'team';
