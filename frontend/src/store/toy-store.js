import { toyService } from '../services/toy-service.js';
import { userService } from '../services/user.service.js';
import { socketService, SOCKET_EMIT_TOY_WATCH, SOCKET_EVENT_TOY_UPDATED } from '../services/socket.service'



export const toyStore = {
    state: {
        isLoading: false,
        // pageIdx: 0,
        // page_size: 5,
        filterBy: {
            toyName: '',
            status: 'all',
            labels: [],
            sortBy: '',
        },
        watchedToy: null,
        toys: null,
        toyLabels: toyService.getLabels(),
    },
    getters: {
        watchedToy({ watchedToy }) { return watchedToy },
        toyLabels(state) {
            return state.toyLabels;
        },
        filteredToys(state) {
            let filteredToys =  JSON.parse(JSON.stringify(state.toys))
            const { sortBy } = state.filterBy

            if (sortBy) switch (sortBy) {
                case 'name': filteredToys = filteredToys.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : (a.name < b.name) ? -1 : 0);
                    break;
                case 'price': filteredToys = filteredToys.sort((a, b) => b.price - a.price);
                    break;
                case 'created': filteredToys = filteredToys.sort((a, b) => a.createdAt - b.createdAt);
            }
            return filteredToys
        },
        isLoading({ isLoading }) {
            return isLoading;
        },
    },
    mutations: {
        setWatchedToy(state, { toy }) {
            state.watchedToy = toy;
        },
        setLoading(state, { isLoading }) {
            state.isLoading = isLoading;
        },
        setToys(state, { toys }) {
            state.toys = toys;
        },
        addToy(state, { toy }) {
            state.toys.push(toy);
        },
        updateToy(state, { toy }) {
            const idx = state.toys.findIndex((currToy) => {
                return currToy._id === toy._id
            });
            state.toys.splice(idx, 1, toy);
        },
        removeToy(state, { toyId }) {
            const idx = state.toys.findIndex((currToy) => currToy._id === toyId);
            state.toys.splice(idx, 1);
        },
        setFilter(state, { filterBy }) {
            state.filterBy = { ...filterBy };
        },
    },
    actions: {
        async loadAndWatchToy({ commit }, { toyId }) {
            try {
                const toy = await toyService.getById(toyId);
                commit({ type: 'setWatchedToy', toy })
                socketService.emit(SOCKET_EMIT_TOY_WATCH, toyId) 
                socketService.off(SOCKET_EVENT_TOY_UPDATED)
                socketService.on(SOCKET_EVENT_TOY_UPDATED, toy => {
                    commit({ type: 'setWatchedToy', toy })
                })
            } catch (err) {
                console.log('toyStore: Error in loadAndWatchToy', err)
                throw err
            }
        },
        loadToys({ commit, state }) {
            commit({ type: 'setLoading', isLoading: true });
            toyService.query(state.filterBy).then((toys) => {
                    commit({ type: 'setToys', toys });
                })
                .finally(() => {
                    commit({ type: 'setLoading', isLoading: false });
                });
        },
        addToy({ commit }, { toy }) {
            return toyService.save(toy).then((savedToy) => {
                commit({ type: 'addToy', toy: savedToy });

                return savedToy;
            });
        },
        updateToy({ commit }, { toy }) {
            return toyService.save(toy).then((savedToy) => {
                
                commit({ type: 'updateToy', toy: savedToy });

                return savedToy;
            });
        },
        removeToy({ commit }, { toy }) {
            return toyService.remove(toy._id).then(() => {
                commit({ type: 'removeToy', toyId: toy._id });
            });
        },
        setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy })
            dispatch({type: 'loadToys'})
        },
    },
};
