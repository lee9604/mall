<template>
  <el-form :model="value" label-position="left" label-width="120px">
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
      <el-card>
        <el-form :model="productSpecifications">
          <div>
            <el-button @click="handleAppendToTableList()">添加</el-button>
          </div>
          <el-form-item label="颜色">
            <el-select v-model="productSpecifications.color" placeholder="请选择">
              <el-option
                      v-for="item in colorOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格">
            <el-select v-model="productSpecifications.size" placeholder="请选择">
              <el-option
                      v-for="item in sizeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售价格">
            <el-input v-model="productSpecifications.price"/>
          </el-form-item>
          <el-form-item label="商品库存">
            <el-input v-model="productSpecifications.stock"/>
          </el-form-item>
          <el-form-item label="库存预警">
            <el-input v-model="productSpecifications.lowStock"/>
          </el-form-item>
        </el-form>
      </el-card>
      <el-table :data="TableList">
        <el-table-column label="颜色" prop="color"/>
        <el-table-column label="规格" prop="size"/>
        <el-table-column label="销售价格" prop="price"/>
        <el-table-column label="商品库存" prop="stock"/>
        <el-table-column label="库存预警" prop="lowStock"/>
        <el-table-column label="操作">
          <el-button>删除</el-button>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label="商品相册">
      <multi-upload v-model="selectProductPics"/>
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button size="medium" @click="handlePrev()">上一步，填写商品基本信息</el-button>
      <el-button type="primary" size="medium" @click="finishCommit()">完成提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const defaultProductSpecifications = {
  color: '',
  size: '',
  price: '',
  stock: '',
  lowStock: ''
}
export default {
  name: 'productOtherAttr',
  props: {
    value: Object
  },
  data () {
    return {
      // 规格参数
      productSpecifications: Object.assign({}, defaultProductSpecifications),
      // 表格
      TableList: [],
      productAttributeCategoryOptions: [],
      // TODO 图片上传功能待完善
      selectProductPics: '',
      colorOptions: [],
      sizeOptions: []
    }
  },
  created () {
    this.value = this.$route.params.value
  },
  computed: {
    productAttributedCategory () {
      return this.value.productAttributeCategoryId
    },
    // eslint-disable-next-line vue/no-dupe-keys
    selectProductPics: {
      get: function () {
        return this.value.pic
      },
      set: function (newVal) {
        this.value.pic = newVal
      }
    }
  },
  watch: {
    productAttributedCategory: function (nval) {
      this.getColorOptions(nval)
      this.getSizeOptions(nval)
    }
  },
  methods: {
    // 上一步
    handlePrev () {
      this.$emit('prevStep')
    },
    // 完成提交
    finishCommit () {
      this.$emit('finishCommit')
    },
    // 把商品规格信息添加到展示列表
    handleAppendToTableList () {
      this.TableList.push(this.productSpecifications)
      Object.assign(this.value, this.productSpecifications)
      // 清空表单信息，恢复默认
      this.productSpecifications = defaultProductSpecifications
    },
    // 获取商品颜色
    getColorOptions (nval) {
      this.$http.get('', { params: { id: nval } }).then(ret => {
        this.colorOptions = ret.data
      })
    },
    // 获取商品规格
    getSizeOptions (nval) {
      this.$http.get('', { params: { id: nval } }).then(ret => {
        this.sizeOptions = ret.data
      })
    }
  }
}
</script>

<style scoped>
.el-form {
  margin-top: 50px;
}
</style>
