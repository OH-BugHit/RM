import { JSX, PropsWithChildren } from 'react';
import style from './style.module.css';
import { TopMenuContext } from './context';

interface Props extends PropsWithChildren {
    placement?: 'free' | 'left' | 'right' | 'top' | 'bottom' | 'relative' | 'relative-bottom' | 'relative-top';
    label?: JSX.Element;
    anchor?: HTMLElement;
    selected?: boolean;
    title?: string;
    x?: number;
    y?: number;
}

export default function FloatingMenu({ placement = 'free', x = 0, y = 0, label, children, selected, title }: Props) {
    return (
        <nav
            className={style[placement]}
            aria-label={title}
            style={placement === 'free' ? { left: `${x}px`, top: `${y}px`, transform: 'translateX(-50%)' } : undefined}
        >
            <TopMenuContext.Provider value={placement}>
                <div
                    className={`${
                        placement === 'top' ||
                        placement === 'relative-top' ||
                        placement === 'bottom' ||
                        placement === 'free' ||
                        placement === 'relative' ||
                        placement === 'relative-bottom'
                            ? style.logoColumn
                            : style.logoRow
                    } ${selected ? style.selected : ''}`}
                >
                    {label}
                </div>
                {children}
            </TopMenuContext.Provider>
        </nav>
    );
}
