<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-layout row>
        <v-flex lg1></v-flex>
        <v-flex xs16>
          <v-btn depressed outline icon fab dark color="red" small v-bind="attrs" v-on="on">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Xóa câu hỏi</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form>
        <v-container sm10>
          <v-layout row>
            <v-flex sm12>
              <v-card>
                <v-layout row>
                  <v-flex xs1></v-flex>
                  <!-- <v-flex xs11>Mã câu hỏi:&nbsp;{{question.idQuestion}}</v-flex> -->
                </v-layout>
                <v-layout row>
                  <v-flex xs1></v-flex>
                  <v-flex xs1>
                    <v-select
                      disabled="true"
                      v-model="level"
                      :items="levels"
                      item-text="name"
                      item-value="id"
                      label="Select"
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                  </v-flex>
                  <v-flex xs1></v-flex>
                  <v-flex xs1>
                    <v-select
                      disabled="true"
                      v-model="type"
                      :items="types"
                      item-text="name"
                      item-value="id"
                      label="Select"
                      persistent-hint
                      return-object
                      single-line
                      @input="onChangeType"
                    ></v-select>
                  </v-flex>
                  <v-flex xs1></v-flex>
                  <v-flex xs2>
                    <v-select
                      disabled="true"
                      v-model="this.question.subType"
                      :items="typesSub"
                      item-text="name"
                      item-value="id"
                      label="Lựa chọn lại bài tập"
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-card>
              <!-- question -->
              <v-card>
                <v-layout row>
                  <v-flex xs1></v-flex>
                  <v-text-field
                    multi-line
                    rows="2"
                    disabled="true"
                    v-model="tempText"
                    light="true"
                    label="Nội dung câu hỏi"
                    type="text"
                  ></v-text-field>
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
                          class="disabled-checkbox"
                          disabled="true"
                          v-model="results"
                          :id="item.id"
                          color="blue"
                          :value="item.checked"
                          hide-details
                        ></v-checkbox>
                      </v-subheader>
                    </v-flex>
                    <v-flex xs10>
                      <v-text-field
                        disabled="true"
                        class="disabled-input"
                        rows="1"
                        v-model="item.content"
                        :label="item.label"
                        contenteditable="true"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-card>
              </div>
              <v-card>
                <v-layout row>
                  <v-flex xs1></v-flex>
                  <v-flex xs10>
                    <v-text-field
                      multi-line
                      rows="2"
                      disabled="true"
                      v-model="explain"
                      light="true"
                      label="Viết đáp án tại đây"
                      type="text"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card>

              <v-card>
                <v-layout row>
                  <v-flex xs1>
                    <v-subheader></v-subheader>
                  </v-flex>
                  <v-flex xs10>
                    <v-btn color="success" v-on:click="dialog = false">Hủy</v-btn>
                    <v-btn
                      :disabled="dialogSave"
                      :loading="dialogSave"
                      color="error"
                      v-on:click="deleteQuestion"
                    >Xác nhận xóa câu hỏi</v-btn>
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
        <!-- dialog start -->
        <v-dialog v-model="dialogSave" width="300">
          <v-card color="primary" dark>
            <v-card-text>
              Đang xóa câu hỏi
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- dialog end -->
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import Types from "@/api/types";
import { Items as Users } from "@/api/user";
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["question"],
  layout: "dashboard",
  components: {},

  data() {
    return {
      id: this.question._id,
      tempText: this.question.question,
      dialog: false,
      dialogSave: false,
      items: [
        {
          id: "answer1",
          label: "Câu trả lời 1",
          content: this.question.answer[0].answer,
          checked: 1,
        },
        {
          id: "answer2",
          label: "Câu trả lời 2",
          content: this.question.answer[1].answer,
          checked: 2,
        },
        {
          id: "answer3",
          label: "Câu trả lời 3",
          content: this.question.answer[2].answer,
          checked: 3,
        },
        {
          id: "answer4",
          label: "Câu trả lời 4",
          content: this.question.answer[3].answer,
          checked: 4,
        },
      ],
      levels: [
        { id: "1", name: "N1" },
        { id: "2", name: "N2" },
        { id: "3", name: "N3" },
        { id: "4", name: "N4" },
        { id: "5", name: "N5" },
      ],
      level: this.question.level,
      subTypeVocabularys: [
        { id: "1", name: "Từ vựng" },
        { id: "2", name: "Ngữ pháp" },
        { id: "3", name: "Đọc" },
        { id: "4", name: "Nghe" },
      ],
      type: this.question.type,
      types: [
        { id: "1", name: "Từ vựng" },
        { id: "2", name: "Ngữ pháp" },
        { id: "3", name: "Đọc" },
        { id: "4", name: "Nghe" },
      ],
      typeSub: this.question.subType,
      results: this.question.results,
      bold: this.question.bold,
      italic: this.question.italic,
      underline: this.question.underline,
      loading: false,
      content: this.question.question,
    };
  },
  computed: {
    ...mapGetters({
      typesSub: "QUESTION/typesSub",
      status: "QUESTION/status",
    }),
  },
  methods: {
    deleteQuestion() {
      this.dialogSave = true;
      setTimeout(() => {
        this.$store.dispatch("QUESTION/deleteQuestion", {
          id: this.id,
        });
        this.dialog = false;
      }, 3000);
    },
  },
};
</script>
<style scoped lang="css">
div:focus {
  border-style: none;
  border-color: Transparent;
  overflow: auto;
  outline: none !important;
  border: 1px solid rgb(39, 6, 221);
}
#text {
  border-color: Transparent;
  outline: none !important;
  border: 1px solid rgb(24, 157, 190);
  height: 50px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.message-successful {
  color: brown;
}
</style>
