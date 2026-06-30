import style from './style.module.css';
import TotalStats from './TotalStats';
import TimeStepStats from './TimeStepStats';
import { useTranslation } from 'react-i18next';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { StatsContentAtom, StoryStepAtom, UiHelpAtom } from '../../../atoms/uiState';
import { Button } from '@genai-fi/base';
import Arrow from '../../../components/HelperArrow/Arrow';

interface StatsProps {
    width?: string;
}
export default function Stats({ width = '100%' }: StatsProps) {
    const { t } = useTranslation();
    const statsContent = useAtomValue(StatsContentAtom);
    const setStep = useSetAtom(StoryStepAtom);
    const [uiHelp, setUIhelp] = useAtom(UiHelpAtom);
    return (
        <div
            className={style.statsContainer}
            style={{ width: width }}
        >
            {uiHelp.statsArrow && (
                <Arrow
                    radius={140}
                    angle={270}
                />
            )}
            {statsContent.mode === 'stats' && <h3 style={{ margin: '0.5rem' }}>{t('stats.title')}</h3>}
            <div className={style.statsContent}>
                {statsContent.mode === 'stats' ? (
                    <>
                        <TimeStepStats />
                        <TotalStats />
                    </>
                ) : (
                    <>
                        <p>{t(`story.text.${statsContent.phase}`)}</p>
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
