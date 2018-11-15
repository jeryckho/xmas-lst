import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

fb.listsCollection.onSnapshot(querySnapshot => {
    let listsArray = []

    querySnapshot.forEach(doc => {
        let List = doc.data()
        List.id = doc.id
        listsArray.push(List)
    })

    store.commit('setLists', listsArray)
})

export const store = new Vuex.Store({
    state: {
        Lists: []
    },
    actions: {
        
    }, 
    mutations: {
        setLists(state, val) {
            console.log({val});
            if (val) {
                state.Lists = val
            } else {
                state.Lists = []
            }
        }
    }
})