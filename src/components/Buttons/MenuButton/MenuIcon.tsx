import { useViewNavigation } from '../../../hooks/useViewNavigation';
import style from './menuIcon.module.css';
import { BuildCAtom, MenuOpenAtom } from '../../../atoms/uiState';
import { useAtom, useAtomValue } from 'jotai';
import { useGameScale } from '../../../context/GameScale/useGameScale';
import { PropsWithChildren } from 'react';

interface MenuIconProps extends PropsWithChildren {
    size?: number;
    position?: 'right' | 'top-right';
    single?: boolean;
}

export default function MenuIcon({ children, size = 84, position = 'right', single = false }: MenuIconProps) {
    const { s } = useGameScale();
    const { goToView } = useViewNavigation();
    const [isOpen] = useAtom(MenuOpenAtom);
    const buildTools = useAtomValue(BuildCAtom);

    const onClick = () => {
        if (single) {
            goToView({
                overlay: !isOpen ? 'tournamentMenu' : null,
            });
            return;
        }
        goToView({
            overlay: !isOpen ? 'menu' : null,
        });
    };
    return (
        <div
            className={`${style.menuButtonContainer} ${buildTools.tools ? style.hidden : ''}`}
            style={{ top: position === 'right' ? '50%' : '0px', transform: children ? 'translateY(-33%)' : '' }}
        >
            <button
                className={`${style.menuButton} ${isOpen ? style.isOpen : ''} `}
                type="button"
                onClick={onClick}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
            >
                <svg
                    className={style.menuIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    width={s(size)}
                    height={s(size)}
                    viewBox="0 0 256 256"
                    aria-hidden="true"
                >
                    <circle
                        className={style.circle}
                        cx="128"
                        cy="128"
                        r="96"
                    />

                    <path
                        className={`${style.line} ${style.lineTop}`}
                        d="M82 96 H174"
                    />

                    <path
                        className={`${style.line} ${style.lineMiddle}`}
                        d="M82 128 H174"
                    />

                    <path
                        className={`${style.line} ${style.lineBottom}`}
                        d="M82 160 H174"
                    />
                </svg>
            </button>
            {children}
        </div>
    );
}
