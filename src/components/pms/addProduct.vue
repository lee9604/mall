<template>
  <el-card shadow="never">
    <el-steps :active="active" finish-status="success" align-center="true">
      <el-step title="商品基本信息"/>
      <el-step title="商品其他属性"/>
      <el-step title="商品标签信息"/>
    </el-steps>
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
          @change="handleBrandChange"
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
    </el-form>
  </el-card>

</template>

<script>
export default {
  name: 'addProduct',
  props: {
    value: Object
  }
}
</script>

<style scoped>
.el-card {
  width: 800px;
  margin: 0 auto;
  padding: 40px;
}
</style>
