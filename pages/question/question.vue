<template>
  <v-form>
    <v-container sm12>
      <v-layout row wrap>
        <v-flex sm11 id="question">
          <!--  -->
          <v-card>
            <v-layout row>
              <v-flex xs1></v-flex>
              <v-flex xs1>
                <v-select
                  label="Cấp độ (N5~N1)"
                  :items="levels"
                  v-model="level"
                  item-text="country"
                  item-value="abbr"
                ></v-select>
              </v-flex>
              <v-flex xs1></v-flex>
              <v-flex xs1>
                <v-select
                  v-model="type"
                  :hint="`${type.name}, ${type.id}`"
                  :items="types"
                  item-text="name"
                  item-value="id"
                  label="Select"
                  persistent-hint
                  return-object
                  single-line
                  :click="onChangeType()"
                ></v-select>
              </v-flex>
              <v-flex xs1></v-flex>
              <!-- <v-flex xs1>
                <v-select
                  label="Types"
                  :items="types"
                  v-model="type"
                  item-text="country"
                  item-value="abbr"
                ></v-select>
              </v-flex>-->
            </v-layout>
          </v-card>
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
          <!-- Answer option  -->
          <div v-for="item in items" :key="item.id">
            <!-- nội dung -->
            <v-card>
              <v-layout row>
                <v-flex xs1>
                  <v-subheader>
                    <v-checkbox
                      v-model="result"
                      :id="item.checked"
                      color="blue"
                      :value="item.checked"
                      hide-details
                    ></v-checkbox>
                  </v-subheader>
                </v-flex>
                <v-flex xs10>
                  <v-text-field
                    multi-line
                    rows="1"
                    :v-model="item.id"
                    clearable
                    :label="item.label"
                    type="text"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card>
          </div>
          <span>Checked names: {{ result }} {{ level }}</span>
          <v-card>
            <v-layout row>
              <v-flex xs1>
                <v-subheader></v-subheader>
              </v-flex>
              <v-flex xs11>
                <v-btn color="error" v-on:click="deleteOption">Delete answer option</v-btn>
                <v-btn color="info" v-on:click="addOption">Add answer option</v-btn>
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
import Vue from "vue";
new Vue({ el: "#question" });
export default {
  layout: "dashboard",
  components: {},
  data() {
    return {
      items: [
        {
          id: "answer1",
          label: "Answer option 1",
          checked: "1",
        },
        {
          id: "answer2",
          label: "Answer option 2",
          checked: "2",
        },
        {
          id: "answer3",
          label: "Answer option 3",
          checked: "3",
        },
        {
          id: "answer4",
          label: "Answer option 4",
          checked: "4",
        },
      ],
      levels: ["N1", "N2", "N3", "N4", "N5"],
      level: "",
      // type: { id: 1, name: "Từ vựng" },
      // types: [
      //   { id: "1", name: "Từ vựng" },
      //   { id: "2", name: "Ngữ pháp" },
      //   { id: "3", name: "Đọc" },
      //   { id: "4", name: "Nghe" },
      // ],
      type: { id: "1", name: "Từ vựng" },
      types: [
        { id: "1", name: "Từ vựng" },
        { id: "2", name: "Ngữ pháp" },
        { id: "3", name: "Đọc" },
        { id: "4", name: "Nghe" },
      ],
      result: [],
      loading: false,
    };
  },
  computed: {},
  methods: {
    addOption() {
      console.log("test add question");
      this.$store.dispatch("QUESTION/addOption", {
        items: this.items,
      });
    },
    deleteOption() {
      console.log("test add question");
      this.$store.dispatch("QUESTION/deleteOption", {
        items: this.items,
      });
    },
    onChangeType() {
      //console.log(type.id)
      alert("onchange trigerred: " + this.type.id)
    },
  },
};
</script>
