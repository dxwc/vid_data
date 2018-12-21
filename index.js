const URL = require('url').URL;

/**
 * @param {String} url - youtube video watch URL
 * @param {Boolean} [throw_err] - if true and error, throws error; else returns null
 * @returns {?String} if valid url, returns 11 character video id
 */
function get_video_id(url, throw_err)
{
    try
    {
        if(!url || url.constructor !== String)
        {
            if(!throw_err) return null;

            let err = new Error('url not string or empty');
            err.code = 'NO_URL';
            throw err;
        }

        let id;
        if(url.match(/https:\/\/(www|m).youtube.com\/watch\?.*\&?v=.{11}.*/) !== null)
        {
            id = new URL(url).searchParams.get('v');
            return id && id.length === 11 ? id : null;
        }
        else if(url.match(/https:\/\/youtu.be\/...........\??.*/) !== null)
        {
            id = new URL(url).pathname;
            return id && id.length === 12 ? id.substr(1, 11) : null;
        }
        else
        {
            if(!throw_err) return null;

            let err = new Error('Not a supported youtube url');
            err.code = 'UNSUPPORTED_URL';
            throw err;
        }
    }
    catch(err)
    {
        if(throw_err) throw err;
        else          return null;
    }
}

module.exports.get_video_id = get_video_id;