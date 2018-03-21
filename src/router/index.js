import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Entrance from '@/components/Entrance'
import Forbidden from '@/components/Forbidden'
import NotFound from '@/components/NotFound'
import Create from '@/components/Create'

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
                let validateTokenRequest = utils.getDbOperationTemplate(utils.SEARCH, 'auth', {
                    document: {
                        token: accessToken,
                        roomId: roomId
                    }
                });
                Vue.prototype.$http.post('/api/validate-token', {dbDocument: validateTokenRequest}).then(res => {
                    let receivedData = res.data;
                    if (receivedData.status == utils.SUCCESS_MSG) {
                        next();
                    }
                    else {
                        next({
                            name: 'Forbidden',
                            params: {
                                errorMessage: receivedData.status
                            }
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
            path: '/create',
            name: 'Create',
            component: Create
        },
        {
            path: '/403',
            name: 'Forbidden',
            component: Forbidden
        },
        {
            path: '/*',
            name: 'NotFound',
            component: NotFound
        }
    ]
});
export default router;
