#### get_video_id(url, throw_err)

<table>
    <tr>
        <td><strong>Name</strong></td>
        <td><strong>Type</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><code>url</code></td>
        <td>string</td>
        <td>Youtube video watch URL</td>
    </tr>
    <tr>
        <td><code>throw_err</code></td>
        <td>boolean</td>
        <td>Whether to throw or return null on error</a></td>
    </tr>
</table>

Defined `error.code` if `throw_err` is true :

+ `NO_URL` if `url` is empty or not string
+ `UNSUPPORTED_URL` if url does not follow one of these general pattern :
    + `https://www.youtube.com/watch/...`
    + `https://m.youtube.com/watch/...`
    + `https://youtu.be/...`

May throw other unhandled caught error if `throw_error` is true.

---

This module was not produced by or directly for YouTube, LLC and has no affiliation with
the LLC. Use this software only at your own volition.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.