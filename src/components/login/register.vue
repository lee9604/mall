<template>
  <el-card>
    <el-form size="mini" :model="registerForm" ref="registerFormRef" label-position="left" label-width="80px">
      <el-form-item label="账号名称" prop="username">
        <el-input v-model="registerForm.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" show-password/>
      </el-form-item>
      <el-form-item label="密码确认" prop="confirmPassword">
        <el-input v-model="registerForm.confirmPassword" show-password/>
      </el-form-item>
      <el-form-item label="账号昵称" prop="nickName">
        <el-input v-model="registerForm.nickName"/>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input v-model="registerForm.email"/>
      </el-form-item>
      <el-form-item>
        <div class="button-container">
          <el-button round class="form-button" @click="register()">注册</el-button>
          <el-button round class="form-button" @click="reset()">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        nickName: '',
        email: ''
      }
    }
  },
  methods: {
    async register () {
      const { data: res } = await this.$http.post('/register', this.registerForm)
      if (res.meta.status !== 200) return this.$message.error('注册失败')
      this.$message.success('注册成功')
      this.$router.push('/login')
    },
    reset () {
      this.$refs.registerFormRef.resetFields()
    }
  }
}
</script>

<style scoped>

.el-card {
  width: 400px;
  height: 400px;
  background-color: #202345;
  border: #202345;
  position: relative;
  margin: 0 auto;
  padding-top: 60px;
  top: 50%;
  transform: translateY(-50%);
}

/deep/ input.el-input__inner {
  background: #2a2f61;
  border: #2a2f61;
  color: aliceblue;
}

.button-container {
  width: 210px;
  margin: 0 auto;
}

.form-button {
  width: 100px;
  color: white;
  border: #df2f76;
  background-color: #df2f76;
}
</style>
