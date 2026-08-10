import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { StatsContentAtom, StoryProgressAtom, StoryStepAtom, UiHelpAtom } from '../../../atoms/uiState';
import { Button } from '@genai-fi/base';
import Arrow from '../../../components/HelperArrow/Arrow';
import TypewriterText from '../../../components/Typewriter/TypeWriterText';

export default function TutorialText() {
    const { t } = useTranslation();
    const statsContent = useAtomValue(StatsContentAtom);
    const setStep = useSetAtom(StoryStepAtom);
    const [uiHelp, setUIhelp] = useAtom(UiHelpAtom);
    const setProgress = useSetAtom(StoryProgressAtom);
    return (
        <div
            className={style.textContainer}
            style={{ width: '550px', maxWidth: '40vw' }}
        >
            <div className={style.textContent}>
                <>
                    {uiHelp.textArrow && (
                        <Arrow
                            radius={140}
                            angle={270}
                        />
                    )}
                    {statsContent.phase}
                    <p className={style.storyText}>
                        <TypewriterText
                            startDelay={statsContent.phase < 1 ? 600 : 200}
                            speed={25}
                            text={t(`story.text.${statsContent.phase}`)}
                        />
                    </p>
                    {statsContent.mode === 'textNext' && (
                        <>
                            <div style={{ flexGrow: 1 }} />
                            <Button
                                onClick={() => {
                                    if (statsContent.phase === 9) {
                                        setProgress((old) => {
                                            return {
                                                ...old,
                                                design: {
                                                    ...old.design,
                                                    tools: true,
                                                    clickOkay: true,
                                                },
                                            };
                                        });
                                        return;
                                    }
                                    setStep((old) => old + 1);
                                    setUIhelp((old) => {
                                        return {
                                            ...old,
                                            textArrow: false,
                                        };
                                    });
                                }}
                            >
                                {t('common.next')}
                            </Button>
                        </>
                    )}
                </>
            </div>
        </div>
    );
}
