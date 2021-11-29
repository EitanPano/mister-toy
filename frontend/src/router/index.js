import Vue from 'vue';
import VueRouter from 'vue-router';

import home from '../views/home.vue';
import userAuth from '../views/user-auth.vue';
import userProfile from '../views/user-profile.vue';
import toyApp from '../views/toy-app.vue';
import toyEdit from '../views/toy-edit.vue';
import toyDetails from '../views/toy-details.vue';
import dashboard from '../views/dashboard.vue'
import about from '../views/about.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: home,
    },
    {
        path: '/auth',
        component: userAuth,
    },
    {
        path: '/profile',
        component: userProfile,
    },
    {
        path: '/toy',
        name: 'Toys',
        component: toyApp,
        children: [
            {
                path: 'edit/:toyId?',
                component: toyEdit,
            },
        ],  
    },
    {
        path: '/toy/:toyId',
        component: toyDetails,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: dashboard
    },
    {
        path: '/about',
        name: 'About',
        component: about
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
