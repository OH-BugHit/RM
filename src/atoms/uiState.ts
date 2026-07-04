import { atom } from 'jotai';
import { HUDvisibility, StatsContent, StoryProgress, TileDefinition, UiHelp, View, VisibleTiles } from '../types';
import {
    defaultHUDvis,
    defaultStoryProgress,
    defaultUIHelp,
    defaultVisibleTiles,
    initialTiles,
} from '../utils/defaults';

export const UiShowSidePanelAtom = atom<boolean>(false);
export const LodStateAtom = atom<1 | 2>(1);
export const ActiveViewAtom = atom<View>({});
export const StoryStepAtom = atom<number>(0);

export const HUDvisAtom = atom<HUDvisibility>(defaultHUDvis);

export const StoryProgressAtom = atom<StoryProgress>(defaultStoryProgress);
export const TileVisibilityAtom = atom<VisibleTiles>(defaultVisibleTiles);
export const StatsContentAtom = atom<StatsContent>({ mode: 'stats', phase: 0 });
export const TilePropsAtom = atom<TileDefinition[]>(initialTiles);

export const UiHelpAtom = atom<UiHelp>(defaultUIHelp);
export const PropToolAtom = atom<TileDefinition | undefined>(undefined); // Selected prop tool
