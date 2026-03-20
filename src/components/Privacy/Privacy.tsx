import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import logo from './git.svg';
interface Props {
    position?: 'bottomLeft' | 'topRight';
}

export default function Privacy({ position = 'bottomLeft' }: Props) {
    const { t } = useTranslation();

    return (
        <section className={`${style.policy} ${style[position]}`}>
            <div
                aria-hidden
                className={style.versionBox}
            >
                <a
                    href={`https://github.com/OH-BugHit/BM`}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="versionlink"
                >
                    <img
                        src={logo}
                        width={24}
                        height={24}
                        alt="Github source"
                    />
                </a>
            </div>
            {position === 'topRight' && (
                <a
                    href="/about"
                    target="_blank"
                >
                    {t('about.privacyTitle')}
                </a>
            )}
            {position === 'bottomLeft' && (
                <a
                    href="/about"
                    target="_blank"
                >
                    {t('about.privacyTitle')}
                </a>
            )}
        </section>
    );
}
