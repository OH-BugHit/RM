import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer/Footer';
import { Button } from '@genai-fi/base';
import GitHubIcon from '@mui/icons-material/GitHub';
/*import SchoolIcon from '@mui/icons-material/School';*/
import { TextField } from '@mui/material';
import LinkButton from '../../components/Buttons/LinkButton/LinkButton';
import Phase from './Phase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameScale } from '../../context/GameScale/useGameScale';
import NextArrowIcon from '../../components/Buttons/ButtonIcons/OtherIcons/NextArrowIcon';

export default function Frontpage() {
    const { s } = useGameScale();
    const { t } = useTranslation();
    const [inputCode, setInputCode] = useState<string>('');
    const [mode, setMode] = useState<'multi' | 'unset'>('unset');
    const navigate = useNavigate();

    const toStudent = () => {
        navigate(`/student/${inputCode}/main?view=join`);
    };

    const toTeacher = () => {
        navigate(`/teacher/?view=users&overlay=share`);
    };

    const logoSize = Math.min(192, window.innerWidth * 0.2);
    const itemVariants = {
        hidden: { opacity: 0, y: 10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -10, scale: 0.8 },
    };

    return (
        <AnimatePresence mode="popLayout">
            <main
                className={style.homeContainer}
                key="frontpage"
            >
                <div
                    key={'header'}
                    className={style.header}
                >
                    <img
                        src="/logo192.png"
                        alt="GenAI logo"
                        width={logoSize}
                        height={logoSize}
                    />
                    <div className={style.headerColumn}>
                        <h1>{t('common.title')}</h1>
                        <h2>{t('common.subtitle')}</h2>
                        <div className={style.buttons}>
                            {/*<LinkButton
                                href="https://gen-ai.fi/en/"
                                startIcon={<SchoolIcon />}
                                key="materialLink"
                            >
                                <p>{t('app.teachingMaterials')}</p>
                            </LinkButton>*/}
                            <LinkButton
                                href="https://github.com/OH-BugHit/BM"
                                startIcon={<GitHubIcon />}
                                key="githublink"
                            >
                                <p>{t('app.github')}</p>
                            </LinkButton>
                        </div>
                    </div>
                </div>
                <div
                    key={'select'}
                    className={style.selectGroup}
                >
                    {mode === 'multi' && (
                        <motion.div
                            className={style.startBox}
                            style={{ gap: `${s(2)}rem` }}
                            initial="hidden"
                            key="classroomLogin"
                            animate="visible"
                            exit="exit"
                            variants={itemVariants}
                            transition={{ duration: 0.25 }}
                        >
                            <TextField
                                title={t('frontpage.labels.enterCode')}
                                label={t('frontpage.labels.enterCode')}
                                type="number"
                                key="studentInput"
                                className={style.codeInput}
                                value={inputCode}
                                fullWidth
                                onChange={(e) => setInputCode(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <Button
                                key="loginSession"
                                sx={{ minWidth: '140px' }}
                                onClick={toStudent}
                                variant="contained"
                                disabled={inputCode.length < 5}
                            >
                                {t('frontpage.actions.start')}
                            </Button>

                            <Button
                                key="createNewSession"
                                sx={{ minWidth: '140px' }}
                                onClick={toTeacher}
                                variant="outlined"
                                title={t('frontpage.actions.createNew')}
                            >
                                {t('frontpage.actions.createNew')}
                            </Button>
                            <Button
                                style={{
                                    scale: '-1',
                                    transform: `translateY(-25%)`,
                                }}
                                onClick={() => setMode('unset')}
                                key="goBackToMode"
                            >
                                <NextArrowIcon
                                    size={40}
                                    ready={true}
                                />
                            </Button>
                        </motion.div>
                    )}

                    {mode === 'unset' && (
                        <motion.ul
                            className={style.phases}
                            initial="hidden"
                            key="modeIcons"
                            animate="visible"
                            exit="exit"
                            variants={itemVariants}
                            transition={{ duration: 0.25 }}
                        >
                            <div
                                className={style.cards}
                                key="classroombutton"
                            >
                                <Phase
                                    image={'/images/previewImages/tournamentPlay.png'}
                                    id="classroom"
                                    key="classroom"
                                    onClick={() => setMode('multi')}
                                />
                            </div>
                            <div
                                className={style.cards}
                                key="singleplayerbutton"
                            >
                                <Phase
                                    image={'/images/previewImages/play1940.png'}
                                    id="yourWorld"
                                    key="singleplayer"
                                    onClick={() => navigate('/student/single/main?view=main&overlay=menu')}
                                />
                            </div>
                        </motion.ul>
                    )}
                </div>
            </main>
            <Footer
                hideLang={false}
                key="footer"
            />
        </AnimatePresence>
    );
}
