const assert = require('assert');

describe('vid_data test', () =>
{
    it('should import properly and have all functions accessible', () =>
    {
        const vd = require('../index.js');

        assert(vd.constructor === Object, 'require gets object');
        assert(vd.get_video_id.constructor === Function, 'is a function');
    });
});