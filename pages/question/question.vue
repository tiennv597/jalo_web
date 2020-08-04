<template>
  <v-form>
    <v-container sm12>
      <v-layout row wrap>
        <v-flex sm11 id="question">
          <!-- question -->
          <v-card>
            <v-layout row>
              <v-flex xs1></v-flex>
              <v-flex xs10>
                <v-text-field
                  multi-line
                  rows="2"
                  shaped="false"
                  v-model="question"
                  outlined
                  clearable
                  label="Write your question here"
                  type="text"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card>

          <!-- Answer option 1 -->

          <div v-for="item in items" :key="item.id">
            <!-- nội dung -->
            <v-card>
              <v-layout row>
                <v-flex xs1>
                  <v-subheader>
                    <v-checkbox v-model="result" color="red" value="red" hide-details></v-checkbox>
                  </v-subheader>
                </v-flex>
                <v-flex xs10>
                  <v-text-field
                    multi-line
                    rows="1"
                    v-model="answer1"
                    clearable
                    :label="item.hind"
                    type="text"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card>
          </div>
          <v-card>
            <v-layout row>
              <v-flex xs1>
                <v-subheader></v-subheader>
              </v-flex>
              <v-flex xs11>
                <v-btn color="info" v-on:click="addQuestion">Add answer option</v-btn>
                <v-btn color="success">Save</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
          <!--  -->
          <v-card>
            <v-layout row>
              <v-flex xs1>
                <v-subheader></v-subheader>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
import VWidget from "@/components/VWidget";
import Answer from "@/components/Answer";
import Vue from "vue";
// Vue.component("button-counter", {
//   template: '<button v-on:click="count++">Bạn đã bấm {{ count }} lần.</button>',
// });
new Vue({ el: "#question" });
export default {
  layout: "dashboard",
  components: {
    VWidget,
    Answer,
  },
  data() {
    return {
      items: [
        {
          id: "answer 1",
          hind: "Answer option 1",
        },
        {
          id: "answer 2",
          hind: "Answer option 2",
        },
        {
          id: "answer 3",
          hind: "Answer option 3",
        },
        {
          id: "answer 4",
          hind: "Answer option 4",
        },
      ],
      message: "",
      answer1: "",
      loading: false,
      email: "",
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  computed: {},
  methods: {
    addQuestion() {
      console.log("test add question");
      this.$store.dispatch("QUESTION/addAnswer", {
        items: this.items,
      });
    },
    clickMe() {
      this.loading = true;
      this.message = "Wait for it...";
      setTimeout(() => {
        this.loading = false;
        this.message = "You've clicked me!";
      }, 2000);
    },
  },
};
</script>
