import axios from 'axios'

export const state = {
  statusLogin: false,
  username: '',
  iduser : window.localStorage.id,
  endpoint: "http://localhost:3000"
}

export const mutations = {
  ifLogin () {
    if(window.localStorage.token) {
      state.statusLogin = true
    } else {
      state.statusLogin = false
    }
  },
  getOneUser() {
    axios.get(`http://localhost:3000/users/${state.iduser}`)
         .then(function(res) {
           state.username = res.data.data
         })
  }
}