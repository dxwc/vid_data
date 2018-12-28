const format_1 = new RegExp
(
    `^https:\\/\\/(?:www|m)\\.youtube\\.com\\/watch\\?` +
    `(?:.+\\&|)v=([a-zA-Z0-9_\\-]{11})(?:(\\&.*)|$)`
);

const format_2 = new RegExp
(
    `^https:\\/\\/youtu.be\\/([a-zA-Z0-9_\\-]{11})(?:(\\?.*)|$)`
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

    return null;
}

module.exports.get_video_id = get_video_id;