const assert = require('assert');
const faker  = require('faker');

const vd = require('../index.js');

describe('is_valid_to_get_channel_id() test', () =>
{
    it('should return false for invalid input', async () =>
    {
        assert(vd.is_valid_to_get_channel_id(faker.internet.url()) === false);

        assert(vd.is_valid_to_get_channel_id(false) === false);

        assert(vd.is_valid_to_get_channel_id('') === false);

        assert(vd.is_valid_to_get_channel_id(' ') === false);

        assert
        (vd.is_valid_to_get_channel_id('https://www.youtube.com') === false);

        assert
        (vd.is_valid_to_get_channel_id('https://m.youtube.com') === false);

        assert
        (vd.is_valid_to_get_channel_id('https://youtube.com') === false);

        assert
        (
            vd.is_valid_to_get_channel_id
            (
                `https://www.youtube.com/watch?v=Bb60YUkEtwka`
            ) === false
        );

        assert
        (
            vd.is_valid_to_get_channel_id
            (
                `http://www.youtube.com/watch?v=Bb60YUkEtwk`
            ) === false
        );

        assert
        (
            vd.is_valid_to_get_channel_id
            (
                `https://www.youtube.com/embed/49.JNQRrffQ`
            ) === false
        );

        assert
        (
            vd.is_valid_to_get_channel_id
            (
                `https://www.youtube-nocookie.com/embed/`
            ) === false
        );

        assert
        (
            vd.is_valid_to_get_channel_id
            (
                `https://www.youtube.com/channel/UCuCkxoKLYO_EQ2GeFtbM_b`
            ) === false
        );
    });

    it('should return true for valid url', () =>
    {
        assert
        (
            vd.is_valid_to_get_channel_id
            (
                `https://www.youtube.com/user/madeUpChannel324jd/videos`
            )
        );

        assert
        (
            vd.is_valid_to_get_channel_id
            (
                `https://www.youtube.com/user/PBSNewsHour/videos?sort=p`,
            )
        );

        assert
        (
            vd.is_valid_to_get_channel_id
            (
                `https://www.youtube.com/user/PBSNewsHour`
            )
        );

        assert
        (
            vd.is_valid_to_get_channel_id
            (
                `https://www.youtube.com/watch?v=irZNMvuVy58`
            )
        );

        assert
        (
            vd.is_valid_to_get_channel_id
            (
                `https://youtu.be/irZNMvuVy58?t=1662`
            )
        )

        assert
        (
            vd.is_valid_to_get_channel_id
            (
                `https://www.youtube.com/watch?time_continue=988&v=irZNMvuVy58`
            )
        );

        assert
        (
            vd.is_valid_to_get_channel_id
            (
                `https://www.youtube.com/embed/irZNMvuVy58?rel=0&autoplay=1`
            )
        );
    });
});