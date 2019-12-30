<template>
    <el-card shadow="never">
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="商品基本信息"/>
            <el-step title="商品其他属性"/>
            <el-step title="商品标签信息"/>
        </el-steps>
        <router-view/>
    </el-card>

</template>

<script>
export default {
  name: 'addProduct',
  data () {
    return {
      value: {
        brandId: ''
      },
      active: 1,
      selectProductCateValue: [],
      productCateOptions: [],
      brandOptions: [],
      sort: ''
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
