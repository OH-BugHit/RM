import { useTranslation } from 'react-i18next';
import style from './userGrid.module.css';
import { useAtom } from 'jotai';
import { profilePicturesAtom, settingAtom, takenUsernamesAtom, usersAtom } from '../../../../../atoms/state';
import Loading from '@genai-fi/base/main/components/Loading/Loading';
import UserMenu from '../UserMenu/UserMenu';
import UserGridItem from './UserGridItem';

export default function UserGrid() {
    const { t } = useTranslation();
    const [users] = useAtom(usersAtom);
    const [allUNs] = useAtom(takenUsernamesAtom);
    const [profilePictures] = useAtom(profilePicturesAtom);
    const [settings] = useAtom(settingAtom);

    let maxWidth = '';
    if (settings.userGridSettings.userGridAutoGrow) {
        maxWidth = `calc(${allUNs.length > 0 ? Math.min(Math.round(allUNs.length / 2) + 3, 16) : 2} * 220px + 4 * 1rem)`;
    } else {
        maxWidth = `calc(${settings.userGridSettings.userGridMaxColumns} * 220px + 4 * 1rem)`;
    }

    return (
        <>
            <div className={style.loadingWrapper}>
                {allUNs.length === 0 && (
                    <Loading
                        loading={true}
                        message={t('teacher.messages.waitingPeople')}
                    />
                )}
            </div>
            <div className={style.userGrid}>
                <div
                    className={allUNs.length === 0 ? 'none' : style.userGridContainer}
                    style={{ maxWidth, paddingTop: '0.5rem' }}
                >
                    {allUNs.length > 0 && <UserMenu />}
                    <div
                        className={style.grid}
                        data-testid="usergrid"
                    >
                        {allUNs
                            .filter((u) => users.some((user) => user.username === u.username))
                            .map((user) => {
                                return (
                                    <UserGridItem
                                        key={user.username}
                                        username={user.username}
                                        alive={true}
                                        profilePicture={profilePictures.get(user.username) ?? null}
                                    />
                                );
                            })}
                        {allUNs
                            .filter((u) => !users.some((user) => user.username === u.username))
                            .map((user) => {
                                return (
                                    <UserGridItem
                                        key={user.username}
                                        username={user.username}
                                        alive={false}
                                        profilePicture={profilePictures.get(user.username) ?? null}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}
