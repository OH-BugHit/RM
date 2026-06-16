import { atom } from 'jotai';

export const TutorialStepAtom = atom<number>(0);
export const StepsTakenAtom = atom<number>(0);
export const StepsProcentageAtom = atom<number>(0);
export const TutorialPhaseAtom = atom<'basics' | 'startRecap' | 'recap' | 'startQuiz' | 'quiz' | 'ready'>('basics');

export const VisitedRewardsAtom = atom({ win: false, pot: false, barkFail: false });
