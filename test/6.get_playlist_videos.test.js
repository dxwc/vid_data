const assert = require('assert');
const faker  = require('faker');

const vd = require('../index.js');

describe('get_playlist_videos() test', () =>
{
    it('should return null on invalid input', async () =>
    {
        assert(await vd.get_playlist_videos() === null);
        assert(await vd.get_playlist_videos('') === null);
        assert(await vd.get_playlist_videos(' ') === null);
        assert(await vd.get_playlist_videos(faker.internet.url()) === null);
        assert
        (
            await vd.get_playlist_videos
            (
                `https://www.youtube.com/watch?v=Y4ETyLbjQ6c&t=159`
            ) === null
        );
        assert
        (
            await vd.get_playlist_videos
            (
                `https://www.youtube.com/playlist?list=` +
                `not_real85dLwp3cUw85eBJEPK8SwpNMBC`
            ) === null
        );

        assert
        (
            await vd.get_playlist_videos
            (
                `https://www.youtube.com/playlist?list=` +
                `PLcviVtB85dLwp3cUw85eBJEPK8SwpNMBC`
                , true
            ) === null
        );

        assert
        (
            await vd.get_playlist_videos
            (
                `https://www.youtube.com/embed/DwSrTICsG2I?rel=0&autoplay=1`
            ) === null
        );
    });

    it('should return array of videos from playlist', async () =>
    {
        assert
        (
            (await vd.get_playlist_videos
            (
                `https://www.youtube.com/playlist?list=` +
                `PLcviVtB85dLwp3cUw85eBJEPK8SwpNMBC`
            )).constructor === Array
        );

        assert
        (
            (await vd.get_playlist_videos
            (
                `https://www.youtube.com/watch?v=naHNhDHK4VU&list=` +
                `PLkJADc1qDrr_0NxtmzECiOWkr5de82kXV`
            )).constructor === Array
        );

        assert
        (
            (await vd.get_playlist_videos
            (
                `https://www.youtube.com/embed/naHNhDHK4VU?playlist=` +
                `Tka3t0CHBP4,5a740OZXI6E,vqOi0gpO0yc&rel=0`
            )).constructor === Array
        );

        assert
        (
            (await vd.get_playlist_videos
            (
                `https://www.youtube.com/embed/naHNhDHK4VU?playlist=` +
                `Tka3t0CHBP4,5a740OZXI6E`
            )).constructor === Array
        );

        assert
        (
            (await vd.get_playlist_videos
            (
                `https://www.youtube.com/playlist?list=PL72C62342291D5DAE`
            )).constructor === Array
        );

        assert
        (
            (await vd.get_playlist_videos
            (
                `https://www.youtube.com/watch?v=kBdfcR-8hEY&list=PL72C62342291D5DAE`
            )).constructor === Array
        );
    });
});