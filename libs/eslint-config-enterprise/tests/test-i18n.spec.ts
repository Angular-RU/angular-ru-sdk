import * as fs from 'node:fs';
import * as path from 'node:path';

describe('[TEST]: Angular-RU eslint recommendations for i18n', (): void => {
    it('check failed files', (): void => {
        const bad: string = getInfoByReportFile('bad');

        expect(bad.includes('2 problems (2 errors, 0 warnings)')).toBeTruthy();
    });

    it('check success files', (): void => {
        const good: string = getInfoByReportFile('good');

        expect(good).toHaveLength(0);
    });
});

function getInfoByReportFile(type: 'bad' | 'good'): string {
    return fs.readFileSync(path.resolve(__dirname, `../reports/eslint.${type}-i18n.report.txt`)).toString();
}
