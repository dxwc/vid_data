## get_video_id(url)

_Given Youtube video URL, returns video id_

Parameter :

+ `url` : A youtube video watch URL as string. Supported URL format example :
    + `https://www.youtube.com/watch?...`
    + `https://m.youtube.com/watch?...`
    + `https://youtu.be/...`
    + `https://www.youtube.com/embed/...`
    + `https://www.youtube-nocookie.com/embed/...`

Returns :

+ A string containing video id, or
+ null

## get_channel_id(url, offline, print_error)

_Given Youtube channel, video or user URL, returns channel id_

Parameters :

+ `url` :  A youtube video watch, channel or user URL as string. Supported URL format
  example :
    + `https://www.youtube.com/channel/...`
    + `https://www.youtube.com/user/...`
    + `https://www.youtube.com/watch?...`
    + `https://m.youtube.com/watch?...`
    + `https://youtu.be/...`
    + `https://www.youtube.com/embed/...`
    + `https://www.youtube-nocookie.com/embed/...`
+ `offline` : An optional boolean argument to indicate whether or not to make HTTP
  request to get channel ID.
    + Default is false, which makes a single HTTP request to `https://www.youtube.com/watch?...` or `https://www.youtube.com/user/...` URL.
    + Setting it to true would return null to all URL other than those formatted like this `https://www.youtube.com/channel/...`
+ `print_error` : An optional boolean argument to indicate whether or not to print
   any possible error message to console. Only useful for debugging. Default false.

Returns :

+ A promise that resolves a string containing channel ID or,
+ A promise that resolves null

## is_valid_to_get_channel_id(url)

_Given a URL, returns a Boolean indicating whether or not it is valid URL to get_
_channel id_

Parameter :

+ `url` :  Any type

Returns :

+ True if `url` is one of the valid format to get channel ID information
    + See **get_channel_id()** above for URL formats that are considered valid
+ False if `url` is not one of the valid format

---

This software was not produced by or directly for YouTube, LLC and has no affiliation
with the LLC. Use this software only at your own volition.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.