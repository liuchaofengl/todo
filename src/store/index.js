import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list:[],
    inputValue:"操逼",
    nextId:4,
    doneKey:"alldone"
  },
  mutations: {
    getsList(state,data){
      state.list = data
    },
    changeInputvalue(state,val){
      state.inputValue = val
    },
    add(state){
        let obj = {
          "id":state.nextId,
          title:state.inputValue,
          done:false
        }
        state.list.push(obj)
        state.nextId++
        state.inputValue=""
    },
    del(state,index){
      state.list.splice(index,1)
    },
    //复选框状态改变
    statusChange(state,obj){
      const index = state.list.findIndex((item) => item.id == obj.id)
      if(index !== -1){
        state.list[index].done = obj.status
      }
    },
    //清除已完成
    cleansuc(state){
      state.list = state.list.filter(x => x.done == false)
    },
    //
    changedoneKey(state,key){
      state.doneKey = key
    }
  },
  actions: {
    gets(contexts){
      axios.get("/list.json").then(({data}) => {
        console.log('ok')
        console.log(data)
        contexts.commit("getsList",data)
      })
    }
  },
  getters:{
    doneLength(state){
      return state.list.filter(item => item.done == false).length
    },
    //
    done(state){
      if(state.doneKey == 'alldone'){
        return state.list
      }else if(state.doneKey == 'undone'){
          return state.list.filter(item => item.done==false)
      }else{
        return state.list.filter(item => item.done == true)
      }
    }
  },
  modules: {
  }
})
