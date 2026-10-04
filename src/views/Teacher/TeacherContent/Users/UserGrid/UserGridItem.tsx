import { useAtom } from 'jotai';
import style from './userGrid.module.css';
import { MouseEvent } from 'react';
import { selectedUserAtom } from '../../../../../atoms/state';

interface Props {
    username: string;
    alive: boolean;
    profilePicture: string | null;
}

export default function UserGridItem({ username, alive, profilePicture }: Props) {
    const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);

    return (
        <button
            aria-pressed={selectedUser.username === username}
            className={`${style.gridItem} ${selectedUser.username === username ? style.selected : ''}`}
            onClick={(e: MouseEvent) => {
                setSelectedUser((old) =>
                    old.username === username
                        ? { username: '', profilePicture: null }
                        : { username: username, profilePicture: profilePicture }
                );
                e.stopPropagation();
            }}
        >
            <div className={style.userImageContainer}></div>
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
