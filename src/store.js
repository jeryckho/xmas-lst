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

fb.detailsCollection.onSnapshot(querySnapshot => {
    let detailsArray = []

    querySnapshot.forEach(doc => {
        let Detail = doc.data()
        Detail.id = doc.id
        detailsArray.push(Detail)
    })

    store.commit('setDetails', detailsArray)
})

export const store = new Vuex.Store({
    state: {
        Details: [],
        Lists: []
    },
    actions: {
        
    }, 
    mutations: {
        setDetails(state, val) {
            if (val) {
                state.Details = val
            } else {
                state.Details = []
            }
        },
        setLists(state, val) {
            if (val) {
                state.Lists = val
            } else {
                state.Lists = []
            }
        },
        setStyle(state, payload) {
            state.Details.forEach(elem => {
                if (elem.id == payload.id) {
                    elem.style = payload.style;
                }
            });
            fb.detailsCollection.doc(payload.id).update({
                style: payload.style
            })
        },
        Take(state, id) {
            state.Details.forEach(elem => {
                if (elem.id == id) {
                    elem.status = "0";
                }
            });
            fb.detailsCollection.doc(id).update({
                status: "0"
            })
        },
        Free(state, id) {
            state.Details.forEach(elem => {
                if (elem.id == id) {
                    elem.status = "1";
                }
            });
            fb.detailsCollection.doc(id).update({
                status: "1"
            })
        }
    }
})