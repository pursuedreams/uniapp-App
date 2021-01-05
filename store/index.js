import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import material from './modules/material'
import sites from './modules/sites'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loginDialogStatus: false
	},
	mutations: {
		handleLoginDialog (state, playload) {
			state.loginDialogStatus = playload
		}
	},
	modules: {
		user: {
			namespaced: true,
			...user
		},
		material: {
			namespaced: true,
			...material
		},
		sites: {
			namespaced: true,
			...sites
		},
	}
})

export default store
