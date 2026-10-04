import { useViewNavigation } from '../../../hooks/useViewNavigation';
import style from './menuIcon.module.css';
import { MenuOpenAtom } from '../../../atoms/uiState';
import { useAtom } from 'jotai';
import { useGameScale } from '../../../context/GameScale/useGameScale';

interface MenuIconProps {
    size?: number;
}

export default function MenuIcon({ size = 84 }: MenuIconProps) {
    const { s } = useGameScale();
    const { goToView } = useViewNavigation();
    const [isOpen] = useAtom(MenuOpenAtom);

    const onClick = () => {
        goToView({
            overlay: !isOpen ? 'menu' : null,
        });
    };
    return (
        <div className={style.menuButtonContainer}>
            <button
                className={`${style.menuButton} ${isOpen ? style.isOpen : ''}`}
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
        </div>
    );
}
