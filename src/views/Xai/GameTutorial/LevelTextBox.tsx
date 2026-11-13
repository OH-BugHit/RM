import style from './levelTextBox.module.css';
import { useTranslation } from 'react-i18next';
import { useAtom, useAtomValue } from 'jotai';
import { TextStepAtom, UiHelpAtom } from '../../../atoms/uiState';
import { Button } from '@genai-fi/base';
import Arrow from '../../../components/HelperArrow/Arrow';
import { SampleWriter } from '../../../components/Typewriter/TypeWriterText';
import NextArrowIcon from '../../../components/Buttons/ButtonIcons/OtherIcons/NextArrowIcon';
import { useEffect, useState } from 'react';
import { LevelConfAtom } from '../../../atoms/gameState';
import { useGameScale } from '../../../context/GameScale/useGameScale';
import i18n from '../../../i18n';
import AdditionalLevelMaterial from './AdditionalMaterial/MaterialContainer';
import Separator from '../../../components/Separator/Separator';
import { AnimatePresence, motion } from 'framer-motion';

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
                    <div className={style.content}>
                        <p
                            className={style.storyText}
                            style={mode === 'text' && variant === 'narrow' ? { paddingBottom: '1rem' } : {}}
                        >
                            {i18n.exists(`${level?.levelText?.textKey}.text.${step}`) && (
                                <SampleWriter
                                    onComplete={() => setReady(true)}
                                    startDelay={step < 1 ? 600 : 200}
                                    speed={22}
                                    sample={t(`${level?.levelText?.textKey}.text.${step}`)}
                                />
                            )}
                        </p>
                        <AnimatePresence initial={false}>
                            {level?.levelText?.additionalMaterial?.includes(step) && ready && (
                                <motion.div
                                    key={step}
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    transition={{
                                        height: {
                                            duration: 0.3,
                                            ease: 'easeOut',
                                        },
                                    }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            opacity: {
                                                duration: 0.2,
                                                delay: 0.4,
                                            },
                                        }}
                                    >
                                        <Separator />
                                        <AdditionalLevelMaterial
                                            levelTextKey={level.levelText.textKey}
                                            step={step}
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {mode === 'textNext' && (
                        <>
                            <Button
                                style={!ready ? { opacity: 0 } : { opacity: 1 }}
                                disabled={!ready}
                                onClick={() => {
                                    setStep((old) => old + 1);
                                    setReady(false);
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
