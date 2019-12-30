<template>
    <el-form :model="value">
        <el-form-item label="属性类型" label-width="120px">
            <el-select v-model="value.productAttributeCategoryId"
                       placeholder="请选择属性类型">
                <el-option
                        v-for="item in productAttributeCategoryOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品规格">
            <el-card shadow="never">

            </el-card>
        </el-form-item>
        <el-form-item label="商品参数">
            <el-card shadow="never"></el-card>
        </el-form-item>
        <el-form-item label="商品相册">
            <multi-upload v-model="selectProductPics"/>
        </el-form-item>
        <el-form-item label="规格参数">
            <el-tabs v-model="activeHtmlName" type="card">
                <el-tab-pane label="电脑端详情" name="pc">
                </el-tab-pane>
                <el-tab-pane label="移动端详情" name="mobile">
                </el-tab-pane>
            </el-tabs>
        </el-form-item>
        <el-form-item style="text-align: center">
            <el-button size="medium" @click="prev()">上一步，填写商品基本信息</el-button>
            <el-button type="primary" size="medium" @click="next()">下一步，选择商品标签信息</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
  name: 'productOtherAttr',
  data () {
    return {
      value: {
        productAttributeCategoryId: ''

      },
      productAttributeCategoryOptions: [],
      selectProductPics: '',
      activeHtmlName: ''
    }
  },
  methods: {
    prev () {
      this.$router.push({ path: '/productBaseInfo' })
    },
    next () {
      this.$message.error('待完成')
    }
  }
}
</script>

<style scoped>
.el-form {
    margin-top: 50px;
}
</style>
