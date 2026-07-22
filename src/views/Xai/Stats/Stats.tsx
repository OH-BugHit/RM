import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { StatsContentAtom, StoryStepAtom, UiHelpAtom } from '../../../atoms/uiState';
import { Button } from '@genai-fi/base';
import Arrow from '../../../components/HelperArrow/Arrow';
import { RewardChart } from '../../../components/Charts/RewardChart';

export default function Stats() {
    const { t } = useTranslation();
    const statsContent = useAtomValue(StatsContentAtom);
    const setStep = useSetAtom(StoryStepAtom);
    const [uiHelp, setUIhelp] = useAtom(UiHelpAtom);
    return (
        <div
            className={style.statsContainer}
            style={{ width: '550px', maxWidth: '40vw' }}
        >
            <div className={style.statsContent}>
                {statsContent.mode === 'stats' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', inset: 0 }}>
                        <RewardChart
                            width={600}
                            height={400}
                        />
                    </div>
                ) : (
                    <>
                        {uiHelp.statsArrow && (
                            <Arrow
                                radius={140}
                                angle={270}
                            />
                        )}
                        <p className={style.storyText}>{t(`story.text.${statsContent.phase}`)}</p>
                        {statsContent.mode === 'textNext' && (
                            <>
                                <div style={{ flexGrow: 1 }} />
                                <Button
                                    onClick={() => {
                                        setStep((old) => old + 1);
                                        setUIhelp((old) => {
                                            return {
                                                ...old,
                                                statsArrow: false,
                                            };
                                        });
                                    }}
                                >
                                    Okay!
                                </Button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
