const assert = require('assert');
const faker  = require('faker');

const vd = require('../index.js');

describe('get_channel_id_and_name() test', () =>
{
    it('should return null on invalid input', async () =>
    {
        assert(await vd.get_channel_id_and_name() === null);
        assert(await vd.get_channel_id_and_name('') === null);
        assert(await vd.get_channel_id_and_name(' ') === null);
        assert(await vd.get_channel_id_and_name(faker.internet.url()) === null);
    });

    it('should return non-null value on valid input', async () =>
    {
        test
        (
            await vd.get_channel_id_and_name
            (`https://www.youtube.com/watch?v=MgBPQbXqN6c`)
        );

        test
        (
            await vd.get_channel_id_and_name
            (`https://www.youtube.com/embed/MgBPQbXqN6c`)
        );

        test
        (
            await vd.get_channel_id_and_name
            (`https://www.youtube.com/channel/UC52X5wxOL_s5yw0dQk7NtgA`)
        );

        test
        (
            await vd.get_channel_id_and_name
            (`https://www.youtube.com/user/AssociatedPress`)
        );

    });
});

function test(obj)
{
    assert
    (
        obj &&
        obj.channel_id === 'UC52X5wxOL_s5yw0dQk7NtgA' &&
        obj.channel_name === 'Associated Press'
    );
}