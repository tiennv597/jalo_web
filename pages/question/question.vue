<template>
  <v-row>
    <v-container sm12>
      <v-layout row wrap>
        <v-layout row>
          <v-flex xs5>
            <p class="message-successful">{{status}}</p>
          </v-flex>
        </v-layout>
      </v-layout>
      <v-layout row wrap>
        <v-layout row>
          <v-flex xs1>
            <AddDialog />
          </v-flex>
        </v-layout>
      </v-layout>
      <v-layout row>
        <!-- data table start -->
        <v-flex lg15>
          <v-card>
            <v-toolbar card color="white">
              <v-flex xs2>
                <v-select
                  v-model="searchByType"
                  :items="searchByTypes"
                  item-text="name"
                  item-value="id"
                  label="Tìm theo"
                  persistent-hint
                  return-object
                  single-line
                ></v-select>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  @input="onInput"
                  flat
                  solo
                  prepend-icon="search"
                  placeholder="Type something"
                  v-model="search"
                  hide-details
                  class="hidden-sm-and-down"
                ></v-text-field>
              </v-flex>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="complex.headers"
                :items="questions"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="idQuestion"
                v-model="selected"
              >
                <template slot="items" slot-scope="props">
                  <td>{{props.index+1}}</td>
                  <td>{{ props.item.idQuestion}}</td>
                  <td>{{ props.item.level.name }}</td>
                  <td>{{ props.item.type.name }}</td>
                  <td>{{ props.item.subType.name }}</td>
                  <td>
                    <v-layout row>
                      <v-flex xs12>{{ props.item.question }}</v-flex>
                    </v-layout>
                    <v-layout row>
                      <span>{{"1: &nbsp;" }}</span>
                      <v-flex xs11>{{ props.item.answer[0].answer }}</v-flex>
                    </v-layout>
                    <v-layout row>
                      <span>{{"2: &nbsp;" }}</span>
                      <v-flex xs11>{{ props.item.answer[1].answer }}</v-flex>
                    </v-layout>
                    <v-layout row>
                      <span>{{"3: &nbsp;" }}</span>
                      <v-flex xs11>{{ props.item.answer[2].answer }}</v-flex>
                    </v-layout>
                    <v-layout row>
                      <span>{{"4: &nbsp;" }}</span>
                      <v-flex xs11>{{ props.item.answer[3].answer }}</v-flex>
                    </v-layout>
                  </td>
                  <td>{{ props.item.date }}</td>
                  <td>
                    <UpdateDialog :question="props.item" />
                    <v-btn depressed outline icon fab dark color="pink" small>
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-row>
</template>
<script>
import AddDialog from "./components/AddDialog";
import UpdateDialog from "./components/UpdateDialog";
import { Items as Users } from "@/api/user";
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "dashboard",
  components: {
    AddDialog,
    UpdateDialog,
  },
  created() {
    this.$store.dispatch("QUESTION/getQuestion", {
      searchByType: this.searchByType,
      search: this.search,
    });
  },
  data() {
    return {
      searchByType: {
        id: "1",
        name: "Nội dung",
      },
      searchByTypes: [
        {
          id: "1",
          name: "Nội dung",
        },
        {
          id: "2",
          name: "Mã câu hỏi",
        },
        {
          id: "3",
          name: "Thể Loại",
        },
        {
          id: "4",
          name: "Thể Loại con",
        },
        {
          id: "5",
          name: "Cấp độ",
        },
      ],
      search: "",
      selected: [],
      complex: {
        selected: [],
        headers: [
          {
            text: "STT",
            value: "STT",
          },
          {
            text: "Mã câu hỏi",
            value: "name",
          },
          {
            text: "Cấp độ",
            value: "email",
          },
          {
            text: "Thể loại",
            value: "phone",
          },
          {
            text: "Thể loại con",
            value: "phone",
          },
          {
            text: "Nội dung câu hỏi",
            value: "phone",
          },
          {
            text: "Ngày",
            value: "phone",
          },
          {
            text: "Action",
            value: "",
          },
        ],
        items: Users,
      },
    };
  },
  computed: {
    ...mapGetters({
      typesSub: "QUESTION/typesSub",
      status: "QUESTION/status",
    }),
    ...mapGetters({
      questions: "QUESTION/questions",
    }),
  },
  methods: {
    onInput() {
      this.$store.dispatch("QUESTION/getQuestion", {
        searchByType: this.searchByType,
        search: this.search,
      });
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
.pa {
  margin: 4xp;
}
</style>
