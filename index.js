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

const format_6 = new RegExp
(
    `https:\\/\\/(?:www|m)\\.youtube\\.com\\/(?:playlist|watch)\\?` +
    `(?:.+\\&|)list=([a-zA-Z0-9_\\-]{12,})(?:(\\&.*)|$)`
);

const format_7 = new RegExp
(
    `^https:\\/\\/www\\.(?:youtube|youtube\\-nocookie)*\\.com\\/embed\\/` +
    `(?:[a-zA-Z0-9_\-]{11})\\?(?:.+\\&|)playlist=([a-zA-Z0-9_\\-,]+)(?:(\\&.*)|$)`
);

const format_plist = new RegExp
(
    /data\-video\-id="([a-zA-Z0-9_\\-]{11})"/g
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
        .on('error', (err) => reject(err));
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
            if(!format_5.test(url))
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

/**
 * Test to see if an input URL is one of valid format to get channel ID information
 * @param {} url Youtube URL
 * @returns {Boolean} True if valid URL to get channel ID, false otherwise
 */
function is_valid_to_get_channel_id(url)
{
    if(!url || url.constructor !== String) return false;
    return format_1.test(url) ||
           format_2.test(url) ||
           format_3.test(url) ||
           format_4.test(url) ||
           format_5.test(url);
}

/**
 * Given valid playlist URL, returns playlist ID
 * @param {String} url Youtube playlist URL
 * @returns {?String} If playlist id found, returns string id, else return null
 */
function get_playlist_id(url)
{
    if(!url || url.constructor !== String) return null;
    let arr = url.match(format_6);
    return arr ? arr[1] : null;
}

/**
 * Given a youtube playlist link, returns maximum of 10 ordered array of the video id
 * from playlist
 * @param {String} url Youtube playlist URL
 * @param {Boolean} [offline=false] - if true, does not make any HTTP request. Note:
 * If this is set to true, only channel URLs will be parsed
 * @param {Boolean} [print_error=false] - if true, console.error any error
 * @returns {Promise} resolves with non-empty array of video id or null
 */
async function get_playlist_videos(url, offline, print_error)
{
    if(!url || url.constructor !== String) return null;

    let vid = [];
    let pl_id = get_playlist_id(url);
    if(offline && pl_id) return null;

    try
    {
        let arr = url.match(format_3);
        if(arr)
        {
            vid.push(arr[1]);
            arr = url.match(format_7);

            if(arr)                    return vid.concat(arr[1].split(','));
            else if(!pl_id || offline) return null;
            else                       vid = [];
        }
        else if(!pl_id || offline)
        {
            return null;
        }

        let html = await download(`https://www.youtube.com/playlist?list=${pl_id}`);
        let current;
        while(current = format_plist.exec(html))
            vid.push(current[1]);

        return vid.length ? vid : null;
    }
    catch(err)
    {
        if(print_error) console.error(err);
        return null;
    }
}

/**
 * Given a video or channle URL, makes a single HTTP request and returns an object
 * containing channel_id and channel_name
 * @param {String} url Youtube video/video shortcut/embed/channel/user URL
 * @returns {Promise} resolves with an object containing channel id and name or null
 */
async function get_channel_id_and_name(url)
{
    try
    {
        let is_channel_link = url => format_4.test(url) || format_5.test(url);
        let is_video_link   = url => format_1.test(url) || format_2.test(url);
        let is_embed_link   = url => format_3.test(url);

        if
        (
            !is_channel_link(url) &&
            !is_video_link(url)   &&
            !is_embed_link(url)
        )
            return null;

        let html = await download(url);
        let obj = { };

        if(is_channel_link(url))
        {
            let found_channel_id = html.indexOf(`itemprop="channelId"`);
            if(found_channel_id === -1) return null;
            let ch_id = html.substring(found_channel_id + 30, found_channel_id+54);
            if(/[a-zA-Z0-9_\\-]{24}/.test(ch_id)) obj.channel_id = ch_id;
            else return null;

            let found_channel_title_i = html.indexOf(`itemprop="name"`);
            if(found_channel_title_i === -1) return null;
            let found_channel_title_e = html.indexOf(`">`, found_channel_title_i);
            if(found_channel_title_e === -1) return null;
            obj.channel_name =
            html.substring(found_channel_title_i + 25, found_channel_title_e);

            return obj;
        }

        let found_channel_id = html.indexOf('channelId');
        if(found_channel_id === -1) return null;
        let ch_id = html.substring(found_channel_id + 14,  found_channel_id + 38);
        if(/[a-zA-Z0-9_\\-]{24}/.test(ch_id)) obj.channel_id = ch_id;

        if(is_embed_link(url))
        {
            let found_channel_title_i = html.indexOf('"expanded_title":');
            if(found_channel_title_i === -1) return null;
            let found_channel_title_e =
            html.indexOf('",', found_channel_title_i + 18);
            if(found_channel_title_e === -1) return null;
            obj.channel_name =
            html.substring(found_channel_title_i + 18, found_channel_title_e);

            /*
            let found_channel_thumb_i =
            html.indexOf(`\\"channelThumbnail\\":{\\"thumbnails\\":[{\\"url\\":\\"`);
            let found_channel_thumb_e =
            html.indexOf(`\\",`, found_channel_thumb_i + 49);
            obj.channel_thumbnail =
            html.substring(found_channel_thumb_i + 49, found_channel_thumb_e);
            obj.channel_thumbnail = obj.channel_thumbnail.replace(/\\\\/gi, '');
            obj.channel_thumbnail = obj.channel_thumbnail.replace(/\\/gi, '');
            */
        }
        else
        {
            let found_channel_title_i = html.indexOf('"author":');
            if(found_channel_title_i === -1) return null;
            let found_channel_title_e =
            html.indexOf('",', found_channel_title_i + 10);
            if(found_channel_title_e === -1) return null;
            obj.channel_name =
            html.substring(found_channel_title_i + 10, found_channel_title_e);
        }

        return obj;
    }
    catch(err)
    {
        return null;
    }
}

module.exports.get_video_id               = get_video_id;
module.exports.get_channel_id             = get_channel_id;
module.exports.is_valid_to_get_channel_id = is_valid_to_get_channel_id;
module.exports.get_playlist_id            = get_playlist_id;
module.exports.get_playlist_videos        = get_playlist_videos;
module.exports.get_channel_id_and_name    = get_channel_id_and_name;