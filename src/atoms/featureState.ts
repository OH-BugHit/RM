import { atom } from 'jotai';

interface FeatureFlags {
    allowReportProblem?: boolean;
    allowBlackBox?: boolean;
    allowLearningWorld?: boolean;
    allowSingleplayerReportProblem: boolean;
}

export const featureFlagsAtom = atom(async () => {
    try {
        const isStagingEnv = !window.location.hostname.endsWith('gen-ai.fi');
        const response = await fetch(
            `${import.meta.env.VITE_APP_API}/features/${isStagingEnv ? 'reward-staging' : 'reward'}`
        );
        const data: { features: FeatureFlags } = await response.json();
        const features = data.features as FeatureFlags;
        return features;
    } catch (e) {
        console.warn('Error fetching flags', e);
        return {
            allowReportProblem: false,
            allowBlackBox: false,
            allowLearningWorld: false,
            allowSingleplayerReportProblem: false,
        };
    }
});
