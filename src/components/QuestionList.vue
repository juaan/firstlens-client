<template lang="html">
  <div class="">
    <el-row v-if="this.$store.state.statusLogin == false">
      <el-col :span="20" :offset="2" >
        <el-alert
          type="info"
          show-icon>
          <el-row>
            <el-col :span="21">
              <p class="inform">FirstLens is a community of 7.0 million photographer, just like you, helping each other by giving good tips based on your experience. Join them. it only takes a minute:</p>
            </el-col>
            <el-col :span="3">
              <router-link to="/signup"><p><a href="#" class="button">sign up</a></p></router-link>
            </el-col>

          </el-row>
        </el-alert>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="16" :offset="2" >
          <h1>Top Tips</h1>
          <router-link to="/login"><el-button type="primary" v-if="this.$store.state.statusLogin == false">Post your tips</el-button></router-link>
          <router-link to="/questions/ask"><el-button type="primary" v-if="this.$store.state.statusLogin == true">Post your tips</el-button></router-link>
          <br>
          <br>
          <el-card class="box-card" v-for="question in questions" :key="question._id">
            <router-link :to="'/questions/'+question._id">
              <el-row>
                <el-col :span="18">
                  <p>{{ question.title }}</p>
                </el-col>
                <el-col :span="3">
                  <p>Votes : {{question.votes}}</p>
                </el-col>
                <el-col :span="3">
                  <p>Answers : {{question.answers}}</p>
                </el-col>
              </el-row>
            </router-link>
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
      questions: []
    }
  },
  methods: {
    getQuestion() {
      let self = this
      axios.get(`${self.$store.state.endpoint}/questions`)
           .then(function(res) {
             res.data.forEach(function(x) {
               let obj = {}
               obj.title = x.title
               obj._id = x._id
               obj.votes = x.upVotes.length - x.downVotes.length
               obj.answers = x.answers.length
               self.questions.push(obj)
             })
            //  console.log(self.questions);
           })
           .catch(function(err) {
             console.log(err);
           })
    }
  },
  mounted() {
    this.getQuestion()
    // this.getOneUser()

  }
}
</script>

<style lang="css" scoped>

  .inform {
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }

  .button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 10px;
  }
  .box-card {
    margin-bottom: 10px;
  }

</style>
