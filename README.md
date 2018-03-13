# easyaccount

> A web app for travelers to account.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### Tech stack
- Frontend framework: Vue.js, vue-cli
- CSS framework: [Element-UI](http://element.eleme.io/)

### Problems encountered

- If there exists some error like 'export declaration are not support by current javascript' in WebStorm, change the Javascript version in 'Preference' but not in 'default' setting!

### How to use
- How to use element-ui? 
    + `Vue.use(ElementUI)` `import 'element-ui/lib/theme-chalk/index.css'` for global import.
- How to use axios? 
    + `import axios from 'axios'`
    + `Vue.prototype.$http = axios`
    + `axios.defaults.baseURL = 'http://localhost:3000'`
    + Type the statements above in **main.js**
- How to redirect in Vue.js?
    + [Tutorial](https://www.cnblogs.com/eva3288/p/8204713.html)
    + `query`&`path` vs `params` vs `name`
    + `query` is similar to HTTP GET, `params' is similar to HTTP POST
    + the redirected page can use `this.$route.params` or `this.$route.query` to get the values.
   
### Knowledge
- Difference between *sessionStorage* and *localStorage*
    + [SessionStorage vs LocalStorage](https://stackoverflow.com/questions/5523140/html5-local-storage-vs-session-storage)
- Difference between *storage* and *cookie*
    + [storage vs cookie](https://stackoverflow.com/questions/3220660/local-storage-vs-cookies)
    + Notice: cookie will be sent to server in every HTTP request but storage not.
- Instance in javascript
    + [JS instance and class](http://blog.csdn.net/alex8046/article/details/51940518)

### TODO
-[x] Core computing strategy
-[ ] Data visualization (using graph to show the payment date)