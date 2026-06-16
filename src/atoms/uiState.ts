import { atom } from 'jotai';
import { View } from '../types';

export const UiShowSidePanelAtom = atom<boolean>(false);
export const LodStateAtom = atom<1 | 2>(1);
export const ActiveViewAtom = atom<View>({});
export const StoryStepAtom = atom<number>(1);
