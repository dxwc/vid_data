const assert = require('assert');
const faker  = require('faker');

const vd = require('../index.js');

describe('get_playlist_id() test', () =>
{
    it('should return null on invalid input', () =>
    {
        assert(vd.get_playlist_id() === null);
        assert(vd.get_playlist_id('') === null);
        assert(vd.get_playlist_id(' ') === null);
        assert(vd.get_playlist_id(faker.internet.url()) === null);
        assert
        (
            vd.get_playlist_id(`https://www.youtube.com/watch?v=Y4ETyLbjQ6c&t=159`)
            === null
        );
    });

    it('should return playlist id on valid input', () =>
    {
        assert
        (
            vd.get_playlist_id
            (
                `https://www.youtube.com/playlist?list=` +
                `PLcviVtB85dLwp3cUw85eBJEPK8SwpNMBC`
            ) === `PLcviVtB85dLwp3cUw85eBJEPK8SwpNMBC`
        );

        assert
        (
            vd.get_playlist_id
            (
                `https://www.youtube.com/watch?v=o9qRjzve8Oc&list=` +
                `PLcviVtB85dLwp3cUw85eBJEPK8SwpNMBC`
            ) === `PLcviVtB85dLwp3cUw85eBJEPK8SwpNMBC`
        );

        assert
        (
            vd.get_playlist_id
            (
                `https://www.youtube.com/watch?v=WqwsvKi5FRE&list` +
                `=PLcviVtB85dLwp3cUw85eBJEPK8SwpNMBC&index=8&t=0s`
            ) === `PLcviVtB85dLwp3cUw85eBJEPK8SwpNMBC`
        );

        assert
        (
            vd.get_playlist_id
            (
                `https://www.youtube.com/watch?v=kBdfcR-8hEY&list=PL72C62342291D5DAE`
            ) === `PL72C62342291D5DAE`
        );

        assert
        (
            vd.get_playlist_id
            (
                ` https://www.youtube.com/playlist?list=PL72C62342291D5DAE`
            ) === `PL72C62342291D5DAE`
        );
    });
});