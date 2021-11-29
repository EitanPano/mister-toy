import Vue from 'vue';
import Vuex from 'vuex';

import { toyStore } from './toy-store.js';
import { userStore } from './user-store.js';
import { reviewStore } from './review.store.js'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        userMsg: null
    },
    getters: {
        userMsg(state) {
            console.log(userMsg);
            return state.userMsg;
        }
    },
    mutations: {
        setMsg(state, {userMsg}) {
            state.userMsg = userMsg
        },
        clearMsg(state) {
            state.userMsg = null
        }
    },
    actions: {

    },
    modules: {
        toyStore,
        userStore,
        reviewStore
    },
});
