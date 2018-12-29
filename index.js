const https = require('https');

const format_1 = new RegExp
(
    `^https:\\/\\/(?:www|m)\\.youtube\\.com\\/watch\\?` +
    `(?:.+\\&|)v=([a-zA-Z0-9_\\-]{11})(?:(\\&.*)|$)`
);

const format_2 = new RegExp
(
    `^https:\\/\\/youtu.be\\/([a-zA-Z0-9_\\-]{11})`
);

const format_3 = new RegExp
(
    `^https:\\/\\/www\\.(?:youtube|youtube\\-nocookie)*\\.com\\/embed\\/` +
    `([a-zA-Z0-9_\\-]{11})`
);

const format_4 = new RegExp
(
    `https:\\/\\/(?:www|m)\.youtube\\.com\\/channel\\/([a-zA-Z0-9_\\-]{24})`
);

const format_5 = new RegExp
(
    `^https:\\/\\/(?:www|m)\.youtube\\.com\\/user\\/(.+)(?:(\\/*.|$))`
);

/**
 * @param {String} url - youtube video watch URL
 * @returns {?String} if valid url, returns 11 character video id string, else null
 */
function get_video_id(url)
{
    if(!url || url.constructor !== String) return null;

    let arr = url.match(format_1);
    if(arr) return arr[1];

    arr = url.match(format_2);
    if(arr) return arr[1];

    arr = url.match(format_3);
    if(arr) return arr[1];

    return null;
}

/**
 * @param {String} url
 * @returns {Promise} Resolves with the downloaded content, reject on error
 */
function download(url)
{
    return new Promise((resolve, reject) =>
    {
        let data = '';
        https.get(url, (res) =>
        {
            res.on('data',  (chunk) => data += chunk);
            res.on('end',   ()      => resolve(data));
            res.on('error', (err)   => reject(err));
        })
        .on(('error'), (err) => reject(err));
    });
}

/**
 * Given a video, channel or user URL, returns channel ID
 * @param {String} url - youtube channel or video URL
 * @param {Boolean} [offline=false] - if true, does not make any HTTP request. Note:
 * If this is set to true, only channel URLs will be parsed
 * @param {Boolean} [print_error=false] - if true, console.error any error
 * @returns {Promise} if valid url, resolves with video id string, else resolves null
 */
async function get_channel_id(url, offline, print_error)
{
    if(!url || url.constructor !== String) return null;

    let arr = url.match(format_4);
    if(arr) return arr[1];

    if(offline) return null;

    let html;
    let video_id = get_video_id(url);
    if(video_id || format_5.test(url))
    {
        try
        {
            if(video_id && format_3.test(url))
                url = `https://www.youtube.com/watch?v=${video_id}`

            html = await download(url);
            let found = html.search(`data-channel-external-id=\"`);

            if(found === -1) return null;

            let ch_id = html.substring(found+26, found+50);
            return /[a-zA-Z0-9_\\-]{24}/.test(ch_id) ? ch_id : null;
        }
        catch(err)
        {
            if(print_error) console.error(err);
            return null;
        }
    }

    return null;
}

module.exports.get_video_id   = get_video_id;
module.exports.get_channel_id = get_channel_id;