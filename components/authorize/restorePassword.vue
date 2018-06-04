<template>
  <div class="authorize">
    <el-row class="flex-center flex-column">
      <h1 class="h3">Forgot password?</h1>
      <p>Enter the email assosiated with your account to recover the password</p>
      <el-form :model="signInForm" :rules="signInFormRules" ref="signInForm" class="authorize_form">
        <el-form-item prop="email">
          <el-input v-model="signInForm.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-tooltip placement="bottom" effect="light">
            <div slot="content" class="tooltip-help">
              Temporary password protects your account from MITM attack and mail hack. You need to create and remember
              your temporary password to insert it after you follow the link in your email. This is some kind of a
              two-factor authentication.
            </div>
            <el-input v-model="signInForm.tempPassword" type="password"
                      placeholder="Create temporary password (for next step confirmation)"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-row class="authorize__footer">
          <el-button type="text" @click="back">Back</el-button>
          <el-button type="primary" class="neon" @click="submitForm" :loading="loading">Sign In</el-button>
        </el-row>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "restorePassword",
    data() {
      return {
        loading: false,
        signInForm: {
          email: '',
          tempPassword: '',
        },
        signInFormRules: {
          email: [
            {required: true, message: 'This field can not be empty'}
          ],
          tempPassword: [
            {required: true, message: 'This field can not be empty'}
          ]
        }
      }
    },
    methods: {
      back() {
        this.$emit('back');
      },
      submitForm() {
        let form = this.$refs.signInForm;
        form.validate((valid) => {
          if (valid) {
            this.recoveryPwd();
          } else {
            setTimeout(() => {
              form.clearValidate();
            }, 3000);
            return false;
          }
        });
      },
      recoveryPwd() {
        let data = this.signInForm;
        if (this.cq_user) {
          data.append('cq_user', this.cq_user);
        }
        this.loading = true;
        let isSended = this.$store.dispatch('resetPassword', data);
        isSended.then((res) => {
          if (res.ok) {
            //a.send({category: 'subscribe', eventAction: 'send', eventLabel: 'subscribe'});
            this.$message({
              type: "success",
              message: res.success
            });
            this.$refs['signInForm'].resetFields();
          } else {
            this.$message({
              type: "error",
              message: res.error
            });
          }
          this.loading = false;
        }).catch(() => {
          this.$message({
            type: "error",
            message: "Something went wrong, sorry"
          });
        });
      }
    }
  }
</script>