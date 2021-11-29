import { userService } from '../services/user.service.js';

export const userStore = {
    state: {
        user: userService.getLoggedinUser(),
    },
    getters: {
        user(state) {
            return state.user;
        },
        username(state) {
            return state.user.username;
        },
        isAdmin(state) {
            return (state.user) ? state.user.isAdmin : false;
        },
    },
    mutations: {
        login(state) {
            state.user = userService.getLoggedinUser()
        },
        logout(state) {
            state.user = null;
        }
    },
    actions: {
        login({commit}, {user}) {
            userService.login(user).then((res) => {
                commit({type: 'login'})
            })

        },
        logout({commit}) {
            userService.logout().then(() => {
                commit({type: 'logout'})
            })
        },
        signup({commit}, {user}) {
            userService.signup(user).then(() => {
                commit({type: 'login'})
            })
        }
    },
};
