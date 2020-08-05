import actions from './actions'
import getters from './getters'
import mutations from './mutations'
// import state from './state'

const state = {
  items: [],
  typesSub: [
    { id: "1", name: "Cách đọc kanji" },
    { id: "2", name: "Cách đọc hiragana" },
    { id: "3", name: "Cấu tạo từ" },
    { id: "4", name: "Đồng nghĩa" },
    { id: "5", name: "Biểu hiện từ" },
    { id: "6", name: "Cách dùng từ" },
  ],
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}