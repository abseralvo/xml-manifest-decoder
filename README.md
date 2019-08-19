# xml-manifest-decoder
Decode AndroidManifest.xml file from a NodeJs Buffer to JSON

Heavily inspired by https://github.com/openstf/adbkit-apkreader and dependent on https://github.com/Stuk/jszip

###Install 
``
npm i --save xml-manifest-decoder
``

###Usage

##### Read the `AndroidManifest.xml` of an APK in runtime
```javascript
import extractManifest from 'xml-manifest-decoder'

const manifest = await extractManifest(apk as File);
```
manifest is now a json representation of the AndroidManifest.xml

## License

The MIT License (MIT)

Copyright (c) 2019 **Alan Ben Seralvo**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
