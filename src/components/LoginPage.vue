<template lang="html">
  <div class="animated fadeIn">
    <el-row >
      <h1>Login</h1>
      <div class="form">
        <el-form label-width="120px" class="demo-ruleForm">
          <el-form-item label="Username" prop="username">
            <el-input type="text" auto-complete="off" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input type="password" auto-complete="off" v-model="user.password"></el-input>
          </el-form-item>
          <el-button class="btn-login" type="primary" @click="signIn()">Login</el-button>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  data(){
    return {
      user: {
        username	: null,
        password: null
      }
    }
  },
  methods: {

    signIn() {
      var self = this;
      axios.post(`${self.$store.state.endpoint}/login`, {
        username: self.user.username,
        password: self.user.password
      })
      .then((res) => {
        if(res.data.success) {
          window.localStorage.setItem('token', res.data.token);
          window.localStorage.setItem('id', res.data.id);
          window.location.reload();
        } else {
          self.showError(res.data.msg)
        }

      })
      .catch((err) => {
        console.log(err);
      })
    },
    showError(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error'
      });
    }
  },
  mounted() {
    if(localStorage.getItem('token')) {
      location.href="/#/"
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

  .form{
    width: 60%;
    margin: 0 auto;
  }
</style>
