#### get_video_id(url, throw_err)

Given Youtube video url, returns video id.

<table>
    <tr>
        <td><strong>Parameter</strong></td>
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
        <td>
            If <code>false</code> (default) returns <code>null</code> if cannot return id<br>
            If <code>true</code> throw error if cannot return id
        </td>
    </tr>
</table>

If `throw_err` parameter is `true`, the following errors can be thrown :

<table>
    <tr>
        <td><strong>Error code</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><code>NO_URL</code></td>
        <td><code>url</code> is empty or not string</td>
    </tr>
    <tr>
        <td><code>UNSUPPORTED_URL</code></td>
        <td>
        If <code>url</code> does not follow one of these general pattern:<br>
            https://www.youtube.com/watch/...<br>
            https://m.youtube.com/watch/...<br>
            https://youtu.be/...
        </td>
    </tr>
    <tr>
        <td><code>PARSE_FAILED</code></td>
        <td>
            If <code>url</code> is valid but could not parse id<br>
            If invalid characters found in parsed id
        </td>
    </tr>
    <tr>
        <td><code>UNEXPECTED_ERROR</code></td>
        <td>Any other error thrown, <code>stack</code> will be available</td>
    </tr>
</table>

---

This module was not produced by or directly for YouTube, LLC and has no affiliation with
the LLC. Use this software only at your own volition.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.