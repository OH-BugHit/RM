import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import style from './classSelect.module.css';
import { studentDataAtom } from '../../../atoms/state';
import { getClassNames as getAllChallenges } from './getClassNames';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface Props {
    openResult: string;
    setOpenResult: (value: string) => void;
}

/**
 * Component for selecting class. Labels are fetched from Labels atom.
 * Column shows overall button (or not, depending on prop) and buttons for each class name found
 * Selected class is set with setOpenResult
 * @param param0 active class name (or null for overall)
 * @param param1 setter for active class name
 * @param param2 if true, overall button is not shown
 * @returns Class selection component
 */
export default function ChallengeScoreSelect({ openResult, setOpenResult }: Props) {
    const { t } = useTranslation();
    const [studentData] = useAtom(studentDataAtom);
    const allChallenges = getAllChallenges(studentData);

    if (!studentData?.students) return <div>Ei kuvia</div>;
    return (
        <div
            className={style.classSelect}
            role="group"
            aria-label="Challenge selection"
        >
            <FormControl
                fullWidth
                className={style.termSelector}
            >
                <InputLabel id="term-label">{t('teacher.tournament.play.selectLabel')}</InputLabel>
                <Select
                    labelId="term-label"
                    value={openResult}
                    onChange={(e) => setOpenResult(e.target.value)}
                    sx={{ color: 'black' }}
                >
                    <MenuItem
                        key={'total'}
                        value={'total-RM-olli'}
                        style={{ color: '#090055', background: 'rgb(206, 250, 224)' }}
                    >
                        {t('teacher.tournament.play.total')}
                    </MenuItem>

                    {allChallenges.map((label) => (
                        <MenuItem
                            key={label}
                            value={label}
                        >
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
