import style from './levelTextBox.module.css';
import { useTranslation } from 'react-i18next';
import { useAtom, useAtomValue } from 'jotai';
import { TextStepAtom, UiHelpAtom } from '../../../atoms/uiState';
import { Button } from '@genai-fi/base';
import Arrow from '../../../components/HelperArrow/Arrow';
import TypewriterText from '../../../components/Typewriter/TypeWriterText';
import NextArrowIcon from '../../../components/Buttons/ButtonIcons/OtherIcons/NextArrowIcon';
import { useEffect, useState } from 'react';
import { LevelConfAtom } from '../../../atoms/gameState';
import { useGameScale } from '../../../context/GameScale/useGameScale';
import i18n from '../../../i18n';

interface LevelTextBoxProps {
    variant?: 'wide' | 'narrow';
}
export default function LevelTextBox({ variant = 'wide' }: LevelTextBoxProps) {
    const { t } = useTranslation();
    const { s, scale } = useGameScale();
    const [step, setStep] = useAtom(TextStepAtom);
    const uiHelp = useAtomValue(UiHelpAtom);
    const level = useAtomValue(LevelConfAtom);
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        setReady(false);
    }, [setReady, step]);

    const mode = level?.levelText?.modes?.[step] ?? 'hidden';

    const styleProps: React.CSSProperties = {
        marginTop: `${0.5}rem`,
        minHeight: `${s(70)}px`,
    };

    const isSmallScreen = scale < 1;

    return (
        <div
            className={`${style.textContainer} ${variant === 'narrow' || isSmallScreen ? style.narrowContainer : style.wideContainer} `}
            style={
                isSmallScreen
                    ? {
                          ...styleProps,
                          width: `${s(400)}px`,
                          maxWidth: `50dvw`,
                      }
                    : variant === 'narrow'
                      ? {
                            ...styleProps,
                            width: `${s(400)}px`,
                            maxWidth: `30dvw`,
                        }
                      : { ...styleProps, width: `${s(550)}px`, maxWidth: `30dvw`, paddingBottom: '1rem' }
            }
        >
            <div className={style.textContent}>
                <>
                    {uiHelp.textArrow && (
                        <Arrow
                            radius={s(140)}
                            angle={270}
                        />
                    )}
                    <p
                        className={style.storyText}
                        style={mode === 'text' && variant === 'narrow' ? { paddingBottom: '1rem' } : {}}
                    >
                        {i18n.exists(`${level?.levelText?.textKey}.text.${step}`) && (
                            <TypewriterText
                                onComplete={() => setReady(true)}
                                startDelay={step < 1 ? 600 : 200}
                                speed={22}
                                text={t(`${level?.levelText?.textKey}.text.${step}`)}
                            />
                        )}
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
                                <NextArrowIcon size={s(64)} />
                            </Button>
                        </>
                    )}
                </>
            </div>
        </div>
    );
}
