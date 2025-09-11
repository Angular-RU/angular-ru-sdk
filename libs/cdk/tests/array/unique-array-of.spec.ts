/* eslint-disable sonarjs/no-hardcoded-ip */
import {uniqueArrayOf} from '@angular-ru/cdk/array';

describe('[TEST]: unique array of', () => {
    it('unique list from duplicate', () => {
        expect(
            uniqueArrayOf(
                [
                    {id: 1, value: 2},
                    {id: 2, value: 3},
                    {id: 1, value: 4},
                ],
                (item) => item.id,
            ),
        ).toEqual([
            {id: 1, value: 2},
            {id: 2, value: 3},
        ]);
    });

    it('unique list from duplicate deep path', () => {
        expect(
            uniqueArrayOf(
                [
                    {ip: '1.2.3.4', info: {username: 'a'}},
                    {ip: '1.2.3.5', info: {username: 'a'}},
                    {ip: '1.2.3.6', info: {username: 'b'}},
                    {ip: '1.2.3.7', info: {username: 'c'}},
                ],
                'info.username',
            ),
        ).toEqual([
            {ip: '1.2.3.4', info: {username: 'a'}},
            {ip: '1.2.3.6', info: {username: 'b'}},
            {ip: '1.2.3.7', info: {username: 'c'}},
        ]);
    });
});
