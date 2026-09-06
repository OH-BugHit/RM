import { useNavigate } from 'react-router-dom';
import { useViewNavigation } from '../../../../hooks/useViewNavigation';
import { StudentViews } from '../../../../types';
import style from './main.module.css';
import MenuItem from './MenuItem';
import { useGameScale } from '../../../../context/GameScale/useGameScale';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';

const DESIGN_WIDTH = 500;
const DESIGN_HEIGHT = 500;

export default function MainMenu() {
    const { s } = useGameScale();
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
        <div
            className={style.main}
            style={{
                width: s(DESIGN_WIDTH),
                height: s(DESIGN_HEIGHT),
            }}
        >
            <div className={style.content}>
                <h1>Reward Machine</h1>

                <div className={style.mainActions}>
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
                </div>

                <div className={style.secondaryActions}>
                    <MenuItem
                        title="Settings"
                        icon={<SettingsIcon />}
                        onSelect={() => onSelect('levels')}
                    />
                    <MenuItem
                        title="Home"
                        icon={<HomeIcon />}
                        onSelect={() => onSelect('frontpage')}
                    />
                </div>
            </div>
        </div>
    );
}
