import { atom } from 'jotai';
import {
    Agent,
    AgentProps,
    Bouncer,
    Control,
    EnvironmentSelection,
    GroupType,
    Level,
    MessageData,
    RewardConfig,
    Settings,
    SoundSettings,
    StudentData,
    StudentGameBlobs,
    StudentGames,
    StudentScores,
    TeacherControl,
    TopThreeResults,
    TournamentAgents,
    UserInfo,
    UserItemData,
    Username,
} from '../types';
import { defaultAgentSettings, defaultControls, defaultAudioSettings, testTeacherControls } from '../utils/defaults';
import { LoadedGame } from '../utils/types';

export const sessionCodeAtom = atom<string>('');
/**
 * List of active players
 */
export const usersAtom = atom<UserInfo[]>([]);

/**
 * Contains selected user in usergrid view
 * Only used by teacher
 */
export const selectedUserAtom = atom<UserItemData>({ username: '', profilePicture: null });

/**
 * All player names
 */
export const takenUsernamesAtom = atom<Username[]>([]);

/**
 * Contains profile pictures in map for teacher
 * K= username, V: picture // TODO: Change to robot image!!!
 */
export const profilePicturesAtom = atom<Map<string, string>>(new Map());

/**
 * //TODO: Settings can not be changed. Copy settings from BM!
 * Contains game settings
 * Only used by teacher
 */
export const settingAtom = atom<Settings>({
    limitScoreboard: { limit: 2, showAll: false },
    userGridSettings: {
        userGridShowCrowns: true,
        userGridAutoGrow: true,
        userGridMaxColumns: 6,
    },
});

/**
 * Teacher can send messages by updating this atom
 */
export const messageTransferAtom = atom<MessageData>({
    message: '',
    reload: false,
    action: 'bouncer',
    recipient: { username: '' },
});

/**
 * Contains game data from students (top results)
 */
export const studentDataAtom = atom<StudentData>({ students: new Map() });

/**
 * Teacher stores received leves here.
 */
export const studentGamesAtom = atom<StudentGames>({ students: new Map() });

export const studentGameZipsAtom = atom<StudentGameBlobs>({ students: new Map() });

export const tournamentAgentUpdatesAtom = atom<TournamentAgents>({ data: new Map() });
/**
 * Contains configuration of the game
 * Teacher can send new configuration by modifying this atom
 */
export const configAtom = atom<RewardConfig>({
    pause: true,
    phase: undefined,
});

/**
 * levelDataAtom is used for current tournament level.
 * This level is sent to the student at level request event, or change event
 */
export const levelDataAtom = atom<Level | null>(null);

/**
 * Contains top three scores for all terms
 */
export const topScoresAtom = atom<TopThreeResults>({ scores: new Map() });

/**
 * Contains students own profilepicture
 * Only used by student
 */
export const profilePictureAtom = atom<string | null>(null);

/* Users that have left the session (for returning player). Only used by student*/
export const availableUsernamesAtom = atom<Username[]>([]);

/**
 * Contains students own username
 * Only used by student
 */
export const usernameAtom = atom<string>('');

/**
 * Controls students game and can set messages for player by teacher.
 * Reload = true will kick student from session by reloading the page.
 * Only used by student
 */
export const studentBouncerAtom = atom<Bouncer>({ message: '', reload: false });

/**
 * Contains students own results
 * Only used by student
 */
export const studentResultsAtom = atom<StudentScores>({ data: new Map() });

/**
 * Step of guidance in progress
 */
export const gamePhaseAtom = atom<number>(1);

export const OpenLevelGroupsAtom = atom<Set<GroupType>>(new Set<GroupType>());

export const TournamentFileAtom = atom<Blob | null>(null);

export const TournamentGameAtom = atom<LoadedGame | null>(null);
//
// ^^^^
// New stuff
//

export const GameModeAtom = atom<'single' | 'student'>('single');

export const AudioSettingsAtom = atom<SoundSettings>(defaultAudioSettings);

export const AgentSettingsAtom = atom<AgentProps>(defaultAgentSettings);

export const ResetUiPulseAtom = atom<boolean>(false);
export const GameControlAtom = atom<Control>(defaultControls);

export const ActiveEnvironmentAtom = atom<EnvironmentSelection>({
    name: '',
    type: undefined,
});
export const ActiveAgentAtom = atom<Agent>({ name: 'Agent X', observationShape: 'large', type: 'created', img: '' });
export const ImportedAgentImgAtom = atom<string | undefined>(undefined);

export const UpdateSpritesPulseAtom = atom<boolean>(true);
export const UpdateWorldPulseAtom = atom<boolean>(true);

export const TeacherControlAtom = atom<TeacherControl>(testTeacherControls);
