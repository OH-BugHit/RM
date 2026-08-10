import { atom } from 'jotai';
import {
    AgentCluster,
    BuildCluster,
    ControlOptions,
    HUDvisibility,
    InspectCluster,
    InspectState,
    PanelOptions,
    RewardCluster,
    StateViewType,
    StatsContent,
    StoryProgress,
    TileDefinition,
    TopBar,
    UiHelp,
    View,
    VisibleTiles,
} from '../types';
import {
    defAgentContent,
    defaultHUDvis,
    defaultStoryProgress,
    defaultUIHelp,
    defaultVisibleTiles,
    defBuildContent,
    defInspectContent,
    defRewardContent,
} from '../utils/defaults';
import {} from 'leaflet';

export const SetupVisibleAtom = atom<PanelOptions>({ visible: false, content: undefined });
export const LodStateAtom = atom<1 | 2>(1);
/**
 * Contains active view. Dialogs show based on this
 */
export const ActiveViewAtom = atom<View>({});
export const StoryStepAtom = atom<number>(0);

export const HUDvisAtom = atom<HUDvisibility>(defaultHUDvis);

export const StoryProgressAtom = atom<StoryProgress>(defaultStoryProgress);
export const TileVisibilityAtom = atom<VisibleTiles>(defaultVisibleTiles);
export const StatsContentAtom = atom<StatsContent>({ mode: 'stats', phase: 0 });
/**
 * Contains tile props that user has created
 */
export const TilePropsAtom = atom<TileDefinition[]>([]);

export const UiHelpAtom = atom<UiHelp>(defaultUIHelp);
/**
 * Contains information what tile tool is currently selected.
 */
export const CurrentTileToolAtom = atom<TileDefinition | undefined>(undefined);
export const DesignOpenAtom = atom<boolean>(false); // Enables tile buttons

export const AgentRenderPulseAtom = atom<boolean>(false); // Triggers re-render on agent image
export const HideHudAtom = atom<boolean>(false);
export const ObsViewTypeAtom = atom<StateViewType>('sprite');
export const QmapViewTypeAtom = atom<StateViewType>('sprite');
export const ZoomLevelAtom = atom<number>(14);
export const MapCenterAtom = atom<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

export const ControlEnablerAtom = atom<ControlOptions>();

export const InspectAtom = atom<InspectState>({ vis: false, step: 0 });

export const TopbarAtom = atom<TopBar>({ traps: 0, treasures: 0, bigTreasures: 0, score: 0, topScore: 0, toBeat: 0 });

export const BuildCAtom = atom<BuildCluster>(defBuildContent);
export const BuildSavedClustersAtom = atom<{ agent: AgentCluster; inspect: InspectCluster; reward: RewardCluster }>({
    agent: defAgentContent,
    inspect: defInspectContent,
    reward: defRewardContent,
});
export const InspectCAtom = atom<InspectCluster>(defInspectContent);
export const AgentCAtom = atom<AgentCluster>(defAgentContent);
export const RewardCAtom = atom<RewardCluster>(defRewardContent);
