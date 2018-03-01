import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Entrance from '@/components/Entrance'
import Forbidden from '@/components/Forbidden'
Vue.use(Router);
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
            beforeEnter: (to, from, next) => {
                console.log('to:',to);
                console.log('from:',from);
                next();
                console.log('cookies:', Vue.prototype.$cookies.get('roomId')); // TODO validate cookie (token) in the server set
                // cookie


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
