<template lang="html">
  <div class="animated fadeIn">
    <h1>Sign up</h1>
    <el-row>
      <div class="form">
        <el-form label-width="120px" class="demo-ruleForm">
          <el-form-item label="Username" prop="username">
            <el-input type="text" auto-complete="off" v-model="datauser.username"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input type="password" auto-complete="off" v-model="datauser.password"></el-input>
          </el-form-item>

          <el-button class="btn-login" type="primary" @click="signUp()">Sign up</el-button>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      datauser: {
        username: '',
        password: ''
      },
      statusError: false
    }
  },
  methods: {
    signUp() {
      // console.log(this.datauser);
      let self = this
      if(self.datauser.username == '' || self.datauser.password == '' ) {
        self.showError("Username and password must be filled")
      } else {
        axios.post(`${self.$store.state.endpoint}/users`, self.datauser)
             .then(function(res) {
               if(res.data.success) {
                  window.localStorage.setItem('token', res.data.token);
                  window.localStorage.setItem('id', res.data.id);

                  window.location.reload();
               } else {
                 self.showError("Username has already been taken")
               }

             })
             .catch(function(err) {
               console.log(err);
             })
      }
    },
    showError(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error'
      });
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
