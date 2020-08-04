
import Vuex from "vuex"
import AuthStore from "./modules/auth"
import QuestionStore from "./modules/question"
// import DrawerStore from "./modules/drawer"
const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      AUTH: AuthStore,
      QUESTION: QuestionStore
    }
  })
}
export default createStore

