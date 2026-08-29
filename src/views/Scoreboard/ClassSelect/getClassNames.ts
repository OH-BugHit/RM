import { StudentData } from '../../../types';

/**
 *
 * @param studentData Data containing students and their scoredata
 * @returns Set that contains classnames that one or more student has done
 */
export const getClassNames = (studentData: StudentData): Set<string> => {
    const allClassnames = new Set<string>();
    for (const studentScores of studentData.students.values()) {
        for (const classname of studentScores.data.keys()) {
            allClassnames.add(classname);
        }
    }
    return allClassnames;
};
