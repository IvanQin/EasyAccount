import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Entrance from '@/components/Entrance'
import Forbidden from '@/components/Forbidden'
Vue.use(Router);
const utils = require('../utils/utils');
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
            beforeEnter: (to, from, next) => {
                console.log('to:', to);
                console.log('from:', from);
                let accessToken = Vue.prototype.$cookies.get('access-token');
                let roomId = Vue.prototype.$cookies.get('roomId');
                let validateTokenRequest = utils.getDbOperationTemplate('auth', utils.SEARCH, {
                    document: {
                        token: accessToken,
                        roomId: roomId
                    }
                });
                console.log(validateTokenRequest);
                Vue.prototype.$http.post('/api/validate-token', {dbDocument: validateTokenRequest}).then(res => {
                    let receivedData = res.data;
                    console.log(receivedData);
                    if (receivedData == 'OK') {
                        next();
                    }
                    else {
                        next({
                            name: 'Forbidden'
                        });
                    }
                });
                console.log('cookies:', Vue.prototype.$cookies.get('access-token')); // TODO validate cookie (token) in the server set
                // cookie
                // next();

            }
        },
        {
            path: '/entrance',
            name: 'Entrance',
            component: Entrance
        },
        {
            path: '/403',
            name: 'Forbidden',
            component: Forbidden
        }
    ]
});
export default router;
