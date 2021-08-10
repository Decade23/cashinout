import axios from "axios";

export default ({
    namespaced: true,
    state: {
        authenticated: false,
        user: null
    },
    getters: {
        authenticated(state) {
            return state.authenticated
        },
        user(state) {
            return state.user
        },
    },
    mutations: {
        SET_AUTHENTICATED(state, value) { state.authenticated = value },
        SET_USER(state, value) { state.user = value }
    },
    actions: {
        async login({ dispatch }, credentials) {
            try {
                await axios.get('sanctum/csrf-cookie');
                await axios.post('login', credentials);
                dispatch('me')    
            } catch (e) {
                console.log(e)
            }
            
        },

        async logout({ commit }) {
            await axios.post('logout')
            commit("SET_AUTHENTICATED", false)
            commit("SET_USER", null)
        },

        async me({ commit }) {
            try {
                let res = await axios.get('api/me')
                commit("SET_AUTHENTICATED", true)
                commit("SET_USER", res.data)
            } catch (error) {
                console.log(error)
                commit("SET_AUTHENTICATED", false)
                commit("SET_USER", null)
            }
        }
    }
})
