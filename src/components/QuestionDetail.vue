<template lang="html">
  <el-row v-if="question !== null">
    <el-col :span="16" :offset="2">
        <h1>{{question.title}}</h1>
        <router-link to="/login"><el-button type="primary" v-if="status == false">Post your tips</el-button></router-link>
        <router-link to="/questions/ask"><el-button type="primary" v-if="status == true">Post your tips</el-button></router-link>
        <br>
        <br>
        <el-card class="box-card">
            <el-row>
              <el-col :span="18">
                <p style="font-size:24px;">{{ question.content }}</p>
                <p style="font-size:14px;">Asked at {{question.createdAt}}</p>
                <p style="font-size:14px;">by : <b>{{question.user.username}}</b></p>
              </el-col>
              <el-col :span="6">
                <p><b style="font-size:20px">Votes: {{ upVote - downVote }}</b></p>
                <el-button v-if="this.$store.state.statusLogin" :plain="true" type="success" @click="voteQuestion('up')">Upvote</el-button>
                <el-button v-if="this.$store.state.statusLogin" :plain="true" type="warning" @click="voteQuestion('down')">Downvote</el-button>
              </el-col>

            </el-row>
        </el-card>
        <br>
        <el-tabs type="card">
          <el-tab-pane v-if="question.answers.length <= 1" :label="question.answers.length +' Answer'">
            <el-row v-if="question.answers.length == 1">
              <el-col :span="18">
                <div class="answer" v-if="question.answers.length > 0">
                  <p style="font-size:24px;">{{question.answers[0].post}}</p>
                  <p> posted By : <b>{{question.answers[0].user.username}}</b></p>
                  <p style="font-size:14px;">{{question.answers[0].createdAt}}</p>
                </div>
              </el-col>
              <el-col :span="6">
                  <p style="font-size:20px;"><b> Votes : {{question.answers[0].upVotes.length - question.answers[0].downVotes.length}}</b></p>
                  <el-button v-if="this.$store.state.statusLogin" :plain="true" type="success" @click="voteAnswer('up',question.answers[0]._id)">Upvote</el-button>
                  <el-button v-if="this.$store.state.statusLogin" :plain="true" type="warning" @click="voteAnswer('down',question.answers[0]._id)">Downvote</el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane v-if="answers.length > 1" :label="answers.length+' Answers'">
            <div v-for="answer in answers" class="answer">
              <el-row>
                <el-col :span="18">
                  <p style="font-size:24px;">{{answer.post}}</p>
                  <p>posted By : <b>{{answer.user.username}}</b></p>
                  <p style="font-size:14px;">{{answer.createdAt}}</p>
                </el-col>
                <el-col :span="6">
                  <p style="font-size:20px;"><b> Votes : {{answer.upVotes.length - answer.downVotes.length}}</b></p>
                  <el-button v-if="this.$store.state.statusLogin" :plain="true" type="success" @click="voteAnswer('up',answer._id)">Upvote</el-button>
                  <el-button v-if="this.$store.state.statusLogin" :plain="true" type="warning" @click="voteAnswer('down',answer._id)">Downvote</el-button>
                </el-col>
              </el-row>

              <hr>
            </div>

          </el-tab-pane>
          <br>
          <el-form label-width="120px" class="demo-ruleForm">
            <el-form-item label="" prop="content">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" auto-complete="off" v-model="answer"></el-input>
            </el-form-item>
            <el-button v-if="status == true" style="float:right;" type="primary" @click="postAnswer()">Reply</el-button>
            <router-link to="/login"><el-button v-if="status == false" style="float:right;" type="primary">Reply</el-button></router-link>
          </el-form>

        </el-tabs>
    </el-col>
  </el-row>


</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      status: this.$store.state.statusLogin,
      question: null,
      answer: '',
      id: this.$route.params.id,
      upVote: 0,
      downVote: 0,
      answers: []
    }
  },
  methods: {
    getOneQuestion() {
      let self = this
      axios.get(`${self.$store.state.endpoint}/questions/${self.id}`)
           .then(function(res) {
             self.question = res.data.data
             self.upVote = self.question.upVotes.length
             self.downVote = self.question.downVotes.length
             self.answers = self.question.answers
            //  console.log(self.question);
           })
           .catch(function(err) {
             console.log(err);
           })
    },
    postAnswer() {
      let self = this
      let newAnswer = {
        user: window.localStorage.id,
        post: this.answer
      }
      axios.post(
        `${self.$store.state.endpoint}/questions/answers/${this.id}`,
        newAnswer,
        {headers: {'token': window.localStorage.getItem('token')}})
        .then(function(res) {
          if(res.data.success) {
            let resultAnswers = res.data.msg.answers
            let newAnswer = {
              createdAt: resultAnswers[resultAnswers.length-1].createdAt,
              downVotes: resultAnswers[resultAnswers.length-1].downVotes,
              upVotes: resultAnswers[resultAnswers.length-1].upVotes,
              post: resultAnswers[resultAnswers.length-1].post,
              user: {
                username: self.$store.state.username
              }

            }

            self.answers.push(newAnswer)
          }

        })
    },
    voteAnswer(stat,idanswer) {
      let self = this
      let vote = {
        user: window.localStorage.getItem('id'),
        answer: idanswer
      }

      if(stat == 'up') {
        axios.put(
          `${self.$store.state.endpoint}/questions/answers/upvotes/${self.id}`,
          vote,
          {headers: {'token': window.localStorage.getItem('token')}})
          .then(function(res) {
            if(res.data.success) {
              // console.log('jancok');
              location.reload()
            }
          })
      } else {
        axios.put(
          `${self.$store.state.endpoint}/questions/answers/downvotes/${this.id}`,
          vote,
          {headers: {'token': window.localStorage.getItem('token')}})
          .then(function(res) {
            if(res.data.success) {
              location.reload()
            }
          })
      }

    },
    warning() {
      this.$message({
        showClose: true,
        message: 'Oops, this is a error message.',
        type: 'error'
      });
    },
    voteQuestion(stat) {
      let self = this
      if(stat == 'up') {
        axios.put(
          `${self.$store.state.endpoint}/questions/upvotes/${self.id}`,
          {
            user: window.localStorage.getItem('id')
          },
          {headers: {'token': window.localStorage.getItem('token')}})
          .then(function(res) {
            // console.log(res.data);
            if(res.data.success) {
              self.upVote += 1
            } else {
              self.notify()
            }
          })
      } else {
        axios.put(
          `${self.$store.state.endpoint}/questions/downvotes/${self.id}`,
          {
            user: window.localStorage.getItem('id')
          },
          {headers: {'token': window.localStorage.getItem('token')}})
          .then(function(res) {

            // console.log('downvotes jaalan');
            if(res.data.success) {
              self.downVote += 1
            }else {
              self.notify()
            }
          })
      }

    },
    notify() {
      this.$message({
        showClose: true,
        message: 'You already vote',
        type: 'error'
      });
    }
  },
  mounted() {
    this.getOneQuestion();
  }
}
</script>

<style lang="css">
</style>
