import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useAtom, useAtomValue } from 'jotai';
import { TextStepAtom, UiHelpAtom } from '../../../atoms/uiState';
import { Button } from '@genai-fi/base';
import Arrow from '../../../components/HelperArrow/Arrow';
import TypewriterText from '../../../components/Typewriter/TypeWriterText';
import NextArrowIcon from '../../../components/Buttons/ButtonIcons/OtherIcons/NextArrowIcon';
import { useEffect, useState } from 'react';
import { LevelConfAtom } from '../../../atoms/gameState';

interface LevelTextBoxProps {
    variant?: 'wide' | 'narrow';
}
export default function LevelTextBox({ variant = 'wide' }: LevelTextBoxProps) {
    const { t } = useTranslation();
    const [step, setStep] = useAtom(TextStepAtom);
    const uiHelp = useAtomValue(UiHelpAtom);
    const level = useAtomValue(LevelConfAtom);
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        setReady(false);
    }, [setReady, step]);

    const mode = level?.levelText?.modes?.[step] ?? 'hidden';

    return (
        <div
            className={`${style.textContainer} ${variant === 'narrow' ? style.narrowContainer : style.wideContainer} `}
        >
            <div className={style.textContent}>
                <>
                    {uiHelp.textArrow && (
                        <Arrow
                            radius={140}
                            angle={270}
                        />
                    )}
                    {step}
                    <p className={style.storyText}>
                        <TypewriterText
                            onComplete={() => setReady(true)}
                            startDelay={step < 1 ? 600 : 200}
                            speed={25}
                            text={t(`${level?.levelText?.textKey}.text.${step}`)}
                        />
                    </p>
                    {mode === 'textNext' && (
                        <>
                            <Button
                                style={!ready ? { opacity: 0 } : { opacity: 1 }}
                                disabled={!ready}
                                onClick={() => {
                                    setStep((old) => old + 1);
                                }}
                            >
                                <NextArrowIcon />
                            </Button>
                        </>
                    )}
                </>
            </div>
        </div>
    );
}
