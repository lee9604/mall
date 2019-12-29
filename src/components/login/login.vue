<template>
  <el-card class="box-card">
    <div class="form-box">
      <div style="margin: 0 auto;width: 140px;height: auto">
        <img src="../../assets/images/login/logo.png" alt="" width="140px" height="auto">
      </div>
      <el-form ref="loginFormRef" size="mini" :rules="loginValidate" :model="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="Username" clearable/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="Password" show-password/>
        </el-form-item>
        <el-form-item>
          <div class="button-container">
            <el-button round class="form-button" @click="login()">登录</el-button>
            <el-button round class="form-button" @click="register()">注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        rememberMe: true
      },
      loginValidate: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 前端进行预校验
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请检查你的账号和密码格式')
        // await 获取异步结果，通过解构异步结果获取响应数据并起别名为res
        const { data: res } = await this.$http.post('login', this.loginForm)
        // 根据响应结果的状态码判断是否成功
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 配置登录成功后，保存用户token到sessionStorage方便以后用户身份验证
        window.sessionStorage.setItem('token', res.data.token)
        // 登录成功跳转到首页
        this.$router.push('/home')
      })
    },
    register () {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>

<style lang="scss" scoped>

.box-card {
  width: 400px;
  height: 400px;
  background-color: #202345;
  margin: 0 auto;
  border: #202345;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

/deep/ .el-card__body {
  padding-top: 60px;
}

.form-box {
  width: 260px;
  margin: 0 auto

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
