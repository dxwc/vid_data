const assert = require('assert');
const faker  = require('faker');

const vd = require('../index.js');

describe('get_video_id() test', () =>
{
    it('should return null for invalid url or id', () =>
    {
        assert(vd.get_video_id(null) === null);

        assert(vd.get_video_id('') === null);

        assert(vd.get_video_id(' ') === null);

        assert(vd.get_video_id(faker.internet.url()) === null);

        assert
        (
            vd.get_video_id
            (`https://www.youtube.com/watch?time_continue=2&v=Bb60YUkEtw`) === null
        );

        assert
        (
            vd.get_video_id
            (`https://www.youtube.com/channel/UCuCkxoKLYO_EQ2GeFtbM_bw`) === null
        );

        assert
        (
            vd.get_video_id
            (`https://www.youtube.com`) === null
        );

        assert
        (
            vd.get_video_id
            (`http://www.youtube.com/watch?time_continue=2&v=Bb60YUkEtwk`) === null
        );

        assert
        (
            vd.get_video_id
            (
                `https://m.youtube.com/watch?feature=youtu.be&v=Bb60Y.kEtwk&t=4`
            ) === null
        );

        assert
        (
            vd.get_video_id
            (
                `https://m.youtube.com/watch?feature=youtu.be&v=Bb60Y.kEtwk&t=4`
            ) === null
        );

        assert
        (
            vd.get_video_id
            (`http://youtu.be/Bb60YUkEtwk?t=4`) === null
        );

        assert
        (
            vd.get_video_id
            (`http://m.youtube.com/watch?time_continue=2&v=Bb60YUkEtwk`)
            === null
        );

        assert
        (
            vd.get_video_id
            (`https://www.youtube.com/embed?49_JNQRrffQ?rel=0&autoplay=1`)
            === null
        );
    });

    it('should return correct id for valid url and id', () =>
    {
        assert
        (
            vd.get_video_id
            (`https://www.youtube.com/watch?v=Bb60YUkEtwk&feature=youtu.be&t=4`)
            === `Bb60YUkEtwk`
        );

        assert
        (
            vd.get_video_id
            (`https://www.youtube.com/watch?v=Bb60YUkEtwk`)
            === `Bb60YUkEtwk`
        );

        assert
        (
            vd.get_video_id
            (`https://www.youtube.com/watch?feature=youtu.be&t=4&v=Bb60YUkEtwk`)
            === `Bb60YUkEtwk`
        );

        assert
        (
            vd.get_video_id
            (`https://www.youtube.com/watch?feature=youtu.be&v=Bb60YUkEtwk&t=4`)
            === `Bb60YUkEtwk`
        );

        assert
        (
            vd.get_video_id
            (`https://youtu.be/Bb60YUkEtwk?t=4`)
            === `Bb60YUkEtwk`
        );

        assert
        (
            vd.get_video_id
            (`https://www.youtube.com/embed/49_JNQRrffQa`)
            === `49_JNQRrffQ`
        );

        assert
        (
            vd.get_video_id
            (
                `https://www.youtube.com/watch?feature=youtu.be&v=` +
                `Bb60YUkEtwk&t=4&app=desktop`
            ) === `Bb60YUkEtwk`
        );

        assert
        (
            vd.get_video_id
            (
                `https://www.youtube.com/embed/49_JNQRrffQ`
            ) === `49_JNQRrffQ`
        );

        assert
        (
            vd.get_video_id
            (
                `https://www.youtube.com/embed/49_JNQRrffQ?rel=0&autoplay=1`
            ) === `49_JNQRrffQ`
        );

        assert
        (
            vd.get_video_id
            (
                `https://www.youtube-nocookie.com/embed/49_JNQRrffQ?rel=0&autoplay=1`
            ) === `49_JNQRrffQ`
        );
    });
});