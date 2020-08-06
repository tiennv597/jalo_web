<template>
  <div contenteditable="true" @input="updateHTML"></div>
</template>

<script>
export default {
  data() {
    // return {
    //   message: "H<b>ELLO</b> <i>editable</i> Vue.js!",
    // };
  },
  methods: {
    updateHTML: function (e) {
      this.$emit("input", e.target.innerHTML);
    },
  },
};
</script>
<style scoped lang="css">
div[contenteditable] {
  border: 1px solid lightblue;
}
</style>