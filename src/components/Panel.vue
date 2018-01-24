<template lang="html">
  <div class="">
    <el-row >
      <el-col :span="16" :offset="2" >
          <h1>Halo {{this.$store.state.username}}</h1>
          <router-link to="/login"><el-button type="primary" v-if="this.$store.state.statusLogin == false">Ask Question</el-button></router-link>
          <router-link to="/questions/ask"><el-button type="primary" v-if="this.$store.state.statusLogin == true">Ask Question</el-button></router-link>
          <br>
          <br>
          <h3>Your Questions :</h3>
          <el-card class="box-card" v-for="question in questions" :key="question._id">

              <el-row>
                <router-link :to="'/questions/'+question._id">
                <el-col :span="18">
                  {{ question.title }}
                </el-col>
                </router-link>
                <el-col :span="6">
                  <el-button type="danger" @click="deleteQuestion(question._id)">Delete</el-button>
                  <el-button type="info" @click="getDataEdit(question)">Edit</el-button>
                  <el-dialog title="Shipping address" v-model="dialogFormVisible">
                    <el-form>
                      <el-form-item label="Title" prop="title">
                        <el-input type="text" auto-complete="off" v-model="form.title"></el-input>
                      </el-form-item>
                      <el-form-item label="" prop="content">
                        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" auto-complete="off" v-model="form.content"></el-input>
                      </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">Cancel</el-button>
                      <el-button type="primary" @click="postEdit()">Confirm</el-button>
                    </span>
                  </el-dialog>
                </el-col>
              </el-row>

          </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      questions: [],
      id: this.$route.params.id,
      visible2 : false,
      dialogFormVisible: false,
      form: {
        title:'',
        content:'',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
      }
  },
  methods: {
    postEdit() {
      let self = this
      let editObj = {
        title: self.form.title,
        content: self.form.content
      }
      axios.put(`${self.$store.state.endpoint}/questions/${this.id}`,
      editObj
      ,{headers: {'token': window.localStorage.getItem('token')}})
      .then(function(res) {
        if(res.data.success) {
          self.dialogFormVisible = false
          self.getQuestionById()
        }
      })

    },
    getDataEdit(question) {
      this.form.title = question.title
      this.form.content = question.content
      this.dialogFormVisible = true
    },
    getQuestionById() {
      let self = this
      axios.get(
           `${self.$store.state.endpoint}/users/${this.id}/panel`,
           {headers: {'token': window.localStorage.getItem('token')}})
           .then(function(res){
             self.questions = res.data.data;
           })
    },
    deleteQuestion(id) {
      this.$alert('Are you sure?', 'Warning', {
        confirmButtonText: 'OK',
        callback: action => {
          if (action == 'confirm') {
            let self = this
            axios.delete(
                  `${self.$store.state.endpoint}/questions/${id}`,
                  {headers: {'token': window.localStorage.getItem('token')}})
                 .then(function(res) {
                   if(res.data.success){
                     self.getQuestionById()
                   }
                 })
          }
        }
      });
    }
  },
  mounted() {
    this.getQuestionById()
  }
}
</script>

<style lang="css">
</style>
