const assert = require('assert');
const faker  = require('faker');

const vd = require('../index.js');

describe('get_channel_id() test', () =>
{
    it('should return null for invalid input', async () =>
    {
        assert(await vd.get_channel_id(faker.internet.url()) === null);

        assert(await vd.get_channel_id(null) === null);

        assert(await vd.get_channel_id('') === null);

        assert(await vd.get_channel_id(' ') === null);

        assert(await vd.get_channel_id('https://www.youtube.com') === null);

        assert(await vd.get_channel_id('https://m.youtube.com') === null);

        assert(await vd.get_channel_id('https://youtube.com') === null);

        assert
        (
            await vd.get_channel_id
            (
                `https://www.youtube.com/watch?v=Bb60YUkEtwka`
            ) === null
        );

        assert
        (
            await vd.get_channel_id
            (
                `http://www.youtube.com/watch?v=Bb60YUkEtwk`
            ) === null
        );

        assert
        (
            await vd.get_channel_id
            (
                `https://youtu.be/Bb60YUkEtwkt=4`, true
            ) === null
        );

        assert
        (
            await vd.get_channel_id
            (
                `https://www.youtube.com/embed/49.JNQRrffQ`
            ) === null
        );

        assert
        (
            await vd.get_channel_id
            (
                `https://www.youtube-nocookie.com/embed/`
            ) === null
        );

        assert
        (
            await vd.get_channel_id
            (
                `https://www.youtube.com/channel/UCuCkxoKLYO_EQ2GeFtbM_b`
            ) === null
        );

        assert
        (
            await vd.get_channel_id
            (
                `https://www.youtube.com/user/madeUpChannel324jd/videos`
            ) === null
        );

        assert
        (
            await vd.get_channel_id
            (
                `https://www.youtube.com/user/PBSNewsHour/videos?sort=p`,
                true
            ) === null
        );

        assert
        (
            await vd.get_channel_id
            (
                `https://www.youtube.com/user/PBSNewsHour`, true
            ) === null
        );

    });

    it('should return correct channel for valid input', (done) =>
    {
        vd.get_channel_id(`https://www.youtube.com/user/PBSNewsHour`)
        .then((id) =>
        {
            assert(id === `UC6ZFN9Tx6xh-skXCuRHCDpQ`);
            return vd.get_channel_id(`https://www.youtube.com/watch?v=irZNMvuVy58`);
        })
        .then((id) =>
        {
            assert(id === `UC6ZFN9Tx6xh-skXCuRHCDpQ`);
            return vd.get_channel_id(`https://www.youtube.com/embed/irZNMvuVy58`);
        })
        .then((id) =>
        {
            assert(id === `UC6ZFN9Tx6xh-skXCuRHCDpQ`);
            return vd.get_channel_id(`https://youtu.be/irZNMvuVy58?t=1`);
        })
        .then((id) =>
        {
            assert(id === `UC6ZFN9Tx6xh-skXCuRHCDpQ`);
            return vd.get_channel_id
            (`https://www.youtube.com/watch?time_continue=1254&v=irZNMvuVy58`);
        })
        .then((id) =>
        {
            assert(id === `UC6ZFN9Tx6xh-skXCuRHCDpQ`);
            return done();
        });
    });
});