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
- How to use element-ui? `Vue.use(ElementUI)` `import 'element-ui/lib/theme-chalk/index.css'` for global import.