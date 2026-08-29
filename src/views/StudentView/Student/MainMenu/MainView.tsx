import { useNavigate } from 'react-router-dom';
import { useViewNavigation } from '../../../../hooks/useViewNavigation';
import { StudentViews } from '../../../../types';
import style from './main.module.css';
import MenuItem from './MenuItem';

export default function MainMenu() {
    const { goToView } = useViewNavigation();
    const navigate = useNavigate();

    const onSelect = (item: StudentViews | 'frontpage') => {
        if (item === 'frontpage') {
            navigate('/');
        } else {
            goToView({
                main: item,
                sub: null,
                overlay: null,
            });
        }
    };
    return (
        <div className={style.main}>
            <div className={style.content}>
                <h1>Reward Machine</h1>
                <MenuItem
                    title="Levels"
                    onSelect={() => onSelect('levels')}
                />
                <MenuItem
                    title="Recap"
                    onSelect={() => onSelect('recap')}
                />
                <MenuItem
                    title="Create"
                    onSelect={() => onSelect('ownLevels')}
                />
                <MenuItem
                    title="Settings"
                    onSelect={() => onSelect('levels')}
                />
                <MenuItem
                    title="Home"
                    onSelect={() => onSelect('frontpage')}
                />
            </div>
        </div>
    );
}
