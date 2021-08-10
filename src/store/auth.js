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
                //await axios.get('sanctum/csrf-cookie');
                const login = await axios.post('login', credentials);
                localStorage.setItem('plainToken', login.data.token)
                dispatch('me')

            } catch (e) {
                //console.log(e)
            }

        },

        async logout({commit, state}) {
            try {
                await axios.post('logout',{id: state.user.id})
                //console.log(data)
                
                // remove token
                localStorage.removeItem('plainToken')
                
                // set state management to false
                commit("SET_AUTHENTICATED", false)
                commit("SET_USER", null)
            } catch (e) {
                //console.log(e)
            }
        },

        async me({ commit }) {
            try {
                let res = await axios.get('api/me', {
                    headers: {
                        Authorization: localStorage.getItem('plainToken')
                    }
                })
                //res.data.token = token
                commit("SET_AUTHENTICATED", true)
                commit("SET_USER", res.data)
            } catch (error) {
                //console.log(error)
                commit("SET_AUTHENTICATED", false)
                commit("SET_USER", null)
            }
        }
    }
})
