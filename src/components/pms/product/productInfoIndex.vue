<template>
  <el-card shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="商品基本信息"/>
      <el-step title="商品其他属性"/>
      <el-step title="查看商品信息"/>
    </el-steps>
    <product-base-info
      v-show="showStatus[0]"
      v-model="productParam"
      @nextStep="nextStep"/>
    <product-other-attr
      v-show="showStatus[1]"
      v-model="productParam"
      @prevStep="prevStep"
      @finishCommit="finishCommit"/>
  </el-card>
</template>

<script>
import ProductBaseInfo from './productBaseInfo'
import ProductOtherAttr from './productOtherAttr'

const defaultProductParam = {}
export default {
  name: 'index',
  components: { ProductOtherAttr, ProductBaseInfo },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: 0,
      showStatus: [true, false],
      productParam: Object.assign({}, defaultProductParam)
    }
  },
  created () {
    // 判断访问是不是具备编辑功能
    if (this.isEdit) {
      // 请求接口，获取商品信息
      this.$http.get('', { params: { id: this.$route.query.id } }).then(ret => {
        this.productParam = ret.data
      })
    }
  },
  methods: {
    // 上一步，显示上一步组件，隐藏自身
    prevStep () {
      this.showStatus[this.active] = false
      this.active--
      this.showStatus[this.active] = true
    },
    // 下一步，显示下一步组件，隐藏自身
    nextStep () {
      this.showStatus[this.active] = false
      this.active++
      this.showStatus[this.active] = true
    },
    // 完成提交动作
    finishCommit () {
      const isEdit = this.isEdit
      this.$confirm('确定要提交表单？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (isEdit) {
          this.$http.put('/updateProduct', { id: this.$route.query.id, productParam: this.productParam })
            .then(ret => {
              this.$message.success('修改成功')
              // TODO 添加跳转成功信息
            })
        } else {
          this.$http.put('/addProduct', { id: this.$route.query.id, productParam: this.productParam })
            .then(ret => {
              this.$message.success('添加成功')
              // TODO 添加跳转成功信息
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.el-card {
  width: 720px;
  margin: 0 auto;
  padding: 60px 60px 40px;
}
</style>
