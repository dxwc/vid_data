const assert = require('assert');
const faker  = require('faker');

const vd = require('../index.js');

describe('get_video() test', () =>
{
    it('should throw error for no url with throw flag', () =>
    {
        try
        {
            vd.get_video_id(null, true);
            throw new Error('empty input did not throw');
        }
        catch(err)
        {
            assert
            (
                err.code === 'NO_URL',
                'should throw NO_URL on empty input'
            );
        }

        try
        {
            vd.get_video_id('', true);
            throw new Error('empty str input did not throw');
        }
        catch(err)
        {
            assert
            (
                err.code === 'NO_URL',
                'should throw NO_URL on empty str input'
            );
        }
    });

    it('should return null for no url with throw flag off', () =>
    {
        assert(vd.get_video_id() === null, 'should return null');
        assert(vd.get_video_id('') === null, 'should return null');
    });

    it('should throw error for invalid url with throw flag on', () =>
    {
        check_invalid_url(faker.internet.url(), true);
        check_invalid_url(faker.internet.url(), true);
        check_invalid_url
        (
            `https://www.youtube.com/watch?time_continue=2&v=Bb60YUkEtw`,
            true
        );
        check_invalid_url
        (
            `https://www.youtube.com/channel/UCuCkxoKLYO_EQ2GeFtbM_bw`,
            true
        );
        check_invalid_url
        (
            `https://www.youtube.com`,
            true
        );
        check_invalid_url
        (
            `http://www.youtube.com/watch?time_continue=2&v=Bb60YUkEtwk`,
            true
        );
        check_invalid_url
        (
            `http://youtu.be/Bb60YUkEtwk?t=4`,
            true
        );
        check_invalid_url
        (
            `http://m.youtube.com/watch?time_continue=2&v=Bb60YUkEtwk`,
            true
        );
    });

    it('should return null for invalid url with throw flag off', () =>
    {
        check_invalid_url(faker.internet.url());
        check_invalid_url(faker.internet.url());
        check_invalid_url
        (
            `https://www.youtube.com/watch?time_continue=2&v=Bb60YUkEtw`
        );
        check_invalid_url
        (
            `https://www.youtube.com/channel/UCuCkxoKLYO_EQ2GeFtbM_bw`
        );
        check_invalid_url
        (
            `https://www.youtube.com`
        );
        check_invalid_url
        (
            `http://www.youtube.com/watch?time_continue=2&v=Bb60YUkEtwk`
        );
        check_invalid_url
        (
            `http://youtu.be/Bb60YUkEtwk?t=4`
        );
        check_invalid_url
        (
            `http://m.youtube.com/watch?time_continue=2&v=Bb60YUkEtwk`
        );
    });

    it('should return correct video ID with throw flag enabled', () =>
    {
        assert
        (
            vd.get_video_id
            (
                `https://www.youtube.com/watch?v=Bb60YUkEtwk&feature=youtu.be&t=4`,
                true
            ) === 'Bb60YUkEtwk'
        );

        assert
        (
            vd.get_video_id
            (
                `https://www.youtube.com/watch?v=Bb60YUkEtwk`,
                true
            ) === 'Bb60YUkEtwk'
        );

        assert
        (
            vd.get_video_id
            (
                `https://www.youtube.com/watch?feature=youtu.be&t=4&v=Bb60YUkEtwk`,
                true
            ) === 'Bb60YUkEtwk'
        );

        assert
        (
            vd.get_video_id
            (
                `https://www.youtube.com/watch?feature=youtu.be&v=Bb60YUkEtwk&t=4`,
                true
            ) === 'Bb60YUkEtwk'
        );

        assert
        (
            vd.get_video_id
            (
                `https://youtu.be/Bb60YUkEtwk?t=4`,
                true
            ) === 'Bb60YUkEtwk'
        );

        assert
        (
            vd.get_video_id
            (
                `https://m.youtube.com/watch?feature=youtu.be&v=Bb60YUkEtwk&t=4`,
                true
            ) === 'Bb60YUkEtwk'
        );
    });

    it('should throw error for valid url format with invalid id', () =>
    {
        let id;
        try
        {
            id = vd.get_video_id
            (
                `https://m.youtube.com/watch?feature=youtu.be&v=Bb60Y.kEtwk&t=4`,
                true
            )

            throw id;
        }
        catch(err)
        {
            assert(err.code === 'PARSE_FAILED', err);
        }
    });

    it('should return null for valid url format with invalid id', () =>
    {
        assert
        (
            vd.get_video_id
            (
                `https://m.youtube.com/watch?feature=youtu.be&v=Bb60Y.kEtwk&t=4`
            ) === null
        );
    });
});

function check_invalid_url(url, throw_err)
{
    if(!throw_err)
    {
        assert(vd.get_video_id(url) === null, 'should reurn null: ' + url);
    }
    else
    {
        try
        {
            vd.get_video_id(url, true);
            throw new Error(url + ' did not throw');
        }
        catch(err)
        {
            assert
            (
                err.code == 'UNSUPPORTED_URL',
                'should throw UNSUPPORTED_URL on ' + url
            );
        }
    }
}