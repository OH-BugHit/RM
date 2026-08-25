import { useAtom } from 'jotai';
import style from './userGrid.module.css';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { selectedUserAtom } from '../../../../../atoms/state';

interface Props {
    username: string;
    alive: boolean;
    profilePicture: string | null;
}

export default function UserGridItem({ username, alive, profilePicture }: Props) {
    const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);
    const { i18n } = useTranslation();

    const getPicture = () => {
        if (i18n.language === 'fi-FI') {
            return (
                <img
                    src="/noPic_FI.png"
                    width={200}
                    alt="Tuloskuva on piilotettu"
                ></img>
            );
        } else {
            return (
                <img
                    src="/noPic_EN.png"
                    width={200}
                    alt="Result image is hidden"
                ></img>
            );
        }
    };

    return (
        <button
            aria-pressed={selectedUser.username === username}
            className={style.gridItem}
            onClick={(e: MouseEvent) => {
                setSelectedUser((old) =>
                    old.username === username
                        ? { username: '', profilePicture: null }
                        : { username: username, profilePicture: profilePicture }
                );
                e.stopPropagation();
            }}
        >
            <div className={style.userImageContainer}>{getPicture()}</div>
            <div
                className={
                    selectedUser.username === username ? style.selectedUserNameContainer : style.userNameContainer
                }
            >
                <div
                    className={style.colourBox}
                    style={alive ? { backgroundColor: 'lightgreen' } : { backgroundColor: 'lightcoral' }}
                />
                {username}
            </div>
        </button>
    );
}
