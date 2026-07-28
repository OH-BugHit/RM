import { atom } from 'jotai';
import {
    HUDvisibility,
    PanelOptions,
    StateViewType,
    StatsContent,
    StoryProgress,
    TileDefinition,
    UiHelp,
    View,
    VisibleTiles,
} from '../types';
import { defaultHUDvis, defaultStoryProgress, defaultUIHelp, defaultVisibleTiles } from '../utils/defaults';
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
