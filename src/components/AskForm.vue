<template lang="html">
  <div class="animated fadeIn">
    <el-row >
      <el-col :span="12" :offset="5">
        <el-form label-width="120px" class="demo-ruleForm">
          <el-form-item label="Title" prop="title">
            <el-input type="text" auto-complete="off" v-model="question.title"></el-input>
          </el-form-item>
          <el-form-item label="" prop="content">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" auto-complete="off" v-model="question.content"></el-input>
          </el-form-item>
          <el-button class="btn-login" type="primary" @click="postQuestion()">Post Your Tips</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      question: {
        title	: null,
        content: null
      }
    }
  },
  methods: {
    postQuestion() {
      const self = this
      let newQuestion = {
        user: localStorage.getItem('id'),
        title: this.question.title,
        content: this.question.content
      }
      axios.post(
        `${self.$store.state.endpoint}/questions`,
        newQuestion,
        {headers: {'token': window.localStorage.getItem('token')}})
           .then(function(res) {
             location.href = "/#/"
           })
           .catch(function(err) {
             console.log(err);
           })
    }
  }

}
</script>

<style lang="css" scoped>
  h1 {
    text-align: center;
  }

  .btn-login {
    float: right;
  }

</style>

