# WebZipTask

This webtask provides a way to serve static and dynamic content using a wt-bundle. To be honest it is a bit of a necessary hack to that uses a zip archive to store the resources as a bundle then serve them up using express.

## resources

I have provided a sample resources set of content that you should overwrite, it is there for the purpose of testing

```
$ tree resources
resources
├── index.html
└── js
    └── logic.js
```

## deploy

The deploy script will bundle up the resources directory and make it a ZIP file that is loaded as a base64 encoded resource.js file. This makes it easy for the wt-bundle to package the collection as one entity.

```bash
$ ./deploy.sh 
  adding: index.html (deflated 39%)
  adding: js/ (stored 0%)
  adding: js/logic.js (deflated 15%)

> web-zip-task@0.0.1 bundle /Users/davide/git/github.com/eddo888/WebZipTask
> wt-bundle webtask.js -o ./build/bundle.js

Bundle successfully written to `./build/bundle.js`
Name:        WebZipTask
Removed webtask: WebZipTask
Webtask created

You can access your webtask at the following url:

https://wt-eddo888-tpg-com-au-0.run.webtask.io/WebZipTask

```

now you can curl the web task to get the resource

```bash
$ curl https://wt-eddo888-tpg-com-au-0.run.webtask.io/WebZipTask/index.html
<html>
  <head>
    <script src="js/logic.js" type="text/javascript"></script>
  <body>
    <p>Hello</p>
    <script type="text/javascript">
      hello('world');
    </script>
  </body>
</html>
```
## logging

please see [webtask.io](https://webtask.io) for more info on webtasks and logging

```bash
$ wt logs
[22:48:47.660Z]  INFO wt: connected to streaming logs (container=wt-eddo888-tpg-com-au-0)
[22:48:52.557Z]  INFO wt: new webtask request 1487112532514.443614
[22:48:52.711Z]  INFO wt: url /index.html
[22:48:52.729Z]  INFO wt: finished webtask request 1487112532514.443614 with HTTP 200 in 174ms
```

## secrets

Web tasks allow you to configure secrets using the wt create --secret option. I have packaged up  .env capability that allows you to access configuration data in either webtask context or local server.js context.

### .env
```
message=Hello
```

this gets uploaded to the webtask and is accessible through the config object

```javascript
var config = require('./config');
console.log('message',config.message);
```

## run locally

To run this locally using the server.js component, do the folowing;

```bash
$ npm install

$ npm start

> web-zip-task@0.0.1 start /Users/davide/git/github.com/eddo888/WebZipTask
> wt-bundle server.js -o ./build/bundle.js && node ./build/bundle.js

Bundle successfully written to `./build/bundle.js`
Server started on port 3000

```

now you can curl the result

```bash
$ curl localhost:3000/index.html
<html>
  <head>
    <script src="js/logic.js" type="text/javascript"></script>
  <body>
    <p>Hello</p>
    <script type="text/javascript">
      hello('world');
    </script>
  </body>
</html>

```

