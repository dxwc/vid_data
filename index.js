const URL = require('url').URL;

const whitelisted = `abcdefghijklmnopqrstuvwxyz0123456789-_`;

/**
 * Check if input contains only the allowed characters
 * @param {String} input - check if input contains only the allowed characters
 * @returns {Boolean} true if allowed characters only, false otherwise
 */
function is_whitelisted(input)
{
    if(!input || input.constructor !== String)
        return false;

    input = input.toLocaleLowerCase();

    for(let i = 0; i < input.length; ++i)
        if(whitelisted.indexOf(input[i]) === -1)
            return false;

    return true;
}

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
            let err = new Error('url not string or empty');
            err.code = 'NO_URL';
            throw err;
        }

        let id;
        if(url.match(/https:\/\/(www|m).youtube.com\/watch\?.*\&?v=.{11}.*/) !== null)
        {
            id = new URL(url).searchParams.get('v');
            id = id && id.length === 11 ? id : null;
        }
        else if(url.match(/https:\/\/youtu.be\/...........\??.*/) !== null)
        {
            id = new URL(url).pathname;
            id = id && id.length === 12 ? id.substr(1, 11) : null;
        }
        else
        {
            let err = new Error('Not a supported youtube url');
            err.code = 'UNSUPPORTED_URL';
            throw err;
        }

        if(!is_whitelisted(id))
        {
            let err = new Error('Could not parse video ID from valid URL');
            err.code = 'PARSE_FAILED';
            throw err;
        }

        return id;
    }
    catch(err)
    {
        if(!throw_err) return null;

        if
        (
            err.code === 'NO_URL'          ||
            err.code === 'UNSUPPORTED_URL' ||
            err.code === 'PARSE_FAILED'
        )
        {
            throw err;
        }

        let unexpected_err = new Error('Unexpected exception thrown, see stack');
        unexpected_err.code = 'UNEXPECTED_ERROR';
        unexpected_err.stack = err.stack;
        throw unexpected_err;
    }
}

module.exports.get_video_id = get_video_id;