const assert = require('assert');
const util   = require('util');

describe('vid_data test', () =>
{
    it('should import properly and have all functions accessible', () =>
    {
        const vd = require('../index.js');

        assert(vd.constructor === Object, 'require gets object');
        assert(vd.get_video_id.constructor === Function, 'is a function');
        assert(util.types.isAsyncFunction(vd.get_channel_id), 'is a async function');
        assert
        (
            vd.is_valid_to_get_channel_id.constructor === Function,
            'is a function'
        );
        assert(vd.get_playlist_id.constructor === Function, 'is a function');
        assert
        (
            util.types.isAsyncFunction(vd.get_playlist_videos),
            'is a asyc function'
        );
        assert
        (
            util.types.isAsyncFunction(vd.get_channel_id_and_name),
            'is a asyc function'
        );
    });
});