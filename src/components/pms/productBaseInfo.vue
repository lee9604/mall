<template>
  <el-form :model="value" size="small" label-position="left" label-width="120px">
    <el-form-item label="商品分类" prop="productCategoryId">
      <el-cascader
        v-model="selectProductCateValue"
        :options="productCateOptions">
      </el-cascader>
    </el-form-item>
    <el-form-item label="商品品牌" prop="brandId">
      <el-select
        v-model="value.brandId"
        placeholder="请选择品牌">
        <el-option
          v-for="item in brandOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品名称" prop="name">
      <el-input/>
    </el-form-item>
    <el-form-item label="商品介绍" prop="desc">
      <el-input type="textarea" placeholder="请在此输入内容"/>
    </el-form-item>
    <el-form-item label="商品价格" prop="price">
      <el-input/>
    </el-form-item>
    <el-form-item label="市场价格" prop="originalPrice">
      <el-input/>
    </el-form-item>
    <el-form-item label="商品库存" prop="stock">
      <el-input/>
    </el-form-item>
    <el-form-item label="计量单位" prop="unit">
      <el-input/>
    </el-form-item>
    <el-form-item label="商品重量" prop="weight">
      <el-input/>
    </el-form-item>
    <el-form-item label="商品排序" prop="sort">
      <el-slider
        v-model="sort"
        show-input>
      </el-slider>
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button type="primary" size="medium" @click="handleNext()">下一步，填写商品其他属性</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'productBaseInfo',
  props: {
    value: Object
  },
  data () {
    return {
      selectProductCateValue: [],
      productCateOptions: [],
      brandOptions: [],
      sort: ''
    }
  },
  created () {
    this.getProductCateList()
    this.getBrand()
  },
  methods: {
    // 获取商品分类
    async getProductCateList () {
      let { data: res } = await this.$http.get('/category/list')
      for (let item of res) {
        let children = []
        // 判断是否有子类并且进行赋值
        if (item.children != null && item.children.length > 0) {
          for (let subItem of item.children) {
            children.push({ label: subItem.name, value: subItem.id })
          }
        }
        this.productCateOptions.push({ label: item.name, value: item.id, children: children })
      }
    },
    // 获取品牌列表
    async getBrand () {
      let { data: res } = await this.$http.get('/brand/list')
      for (const item of res.list) {
        this.brandOptions.push({ label: item.name, value: item.id })
      }
    },
    // TODO 下一步操作
    handleNext () {
      this.$router.push({ path: '/productOtherAttr' })
    }
  }
}
</script>

<style scoped>
.el-form {
  margin-top: 50px;
}
</style>
