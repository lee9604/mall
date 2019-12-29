<template>
  <div class="main">
    <el-card shadow="never">
      <div>
        <i class="el-icon-search"/>
        <span>筛选搜索</span>
        <el-button style="float: right" size="small">开始查询</el-button>
        <el-button style="float: right;margin: 0 15px" size="small">重置</el-button>
      </div>
      <div style="margin-top: 20px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="商品名称"/>
          </el-form-item>
          <el-form-item label="商品货号：">
            <el-input style="width: 203px" v-model="listQuery.productSn" placeholder="商品货号"/>
          </el-form-item>
          <el-form-item label="商品分类：">
            <el-cascader
              clearable
              v-model="selectProductCateValue"
              :options="productCateOptions">
            </el-cascader>
          </el-form-item>
          <el-form-item label="商品品牌：">
            <el-select v-model="listQuery.brandId" placeholder="请选择品牌" clearable>
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上架状态：">
            <el-select v-model="listQuery.publishStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in publishStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-table :data="list" border style="margin-top: 15px;">
      <el-table-column type="selection" align="center"/>
      <el-table-column label="编号" width="100px" align="center">
        <template v-slot="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="商品图片" width="120px" align="center">
        <template v-slot="scope">
          <img :src="scope.row.pic" alt="" style="height: 80px">
        </template>
      </el-table-column>
      <el-table-column label="商品名称" align="center">
        <template v-slot="scope">
          <p>{{ scope.row.name }}</p>
          <p>品牌：{{ scope.row.brandName }}</p>
        </template>
      </el-table-column>
      <el-table-column label="价格/货号" width="120px" align="center">
        <template v-slot="scope">
          <p>价格：￥{{ scope.row.price }}</p>
          <p>货号：{{ scope.row.productSn }}</p>
        </template>
      </el-table-column>
      <el-table-column label="标签" width="140px" align="center">
        <template v-slot="scope">
          <p>上架：
            <el-switch v-model="scope.row.publishStatus"
                       active-color="#13ce66"
                       inactive-color="#ff4949"/>
          </p>
          <p>推荐：
            <el-switch v-model="scope.row.recommandStatus"
                       active-color="#13ce66"
                       inactive-color="#ff4949"/>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="100px" align="center">
        <template v-slot="scope">{{ scope.row.sort }}</template>
      </el-table-column>
      <el-table-column label="SKU库存" width="100px" align="center">
        <template v-slot="scope">
          <el-button icon="el-icon-edit" circle/>
        </template>
      </el-table-column>
      <el-table-column label="销量" width="100px" align="center">
        <template v-slot="scope">{{ scope.row.sale }}</template>
      </el-table-column>
      <el-table-column label="操作" width="250px" align="center">
        <template v-slot="scope">
          <el-button
            size="mini">
            查看
          </el-button>
          <el-button
            size="mini">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="float: right;margin-top: 20px">
      <el-pagination
        background
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'productList',
  data () {
    return {
      listQuery: {
        keyword: '',
        productSn: '',
        brandId: '',
        publishStatus: ''
      },
      selectProductCateValue: null,
      productCateOptions: [],
      brandOptions: [],
      publishStatusOptions: [
        {
          value: 1,
          label: '上架'
        }, {
          value: 0,
          label: '下架'
        }],
      list: [
        {
          id: 1,
          pic: 'xiaomi.jpg',
          name: '手机',
          brandName: '手机商',
          price: 999,
          productSn: 'a01',
          publishStatus: 1,
          recommandStatus: 1,
          sort: 100,
          sale: '999'
        }
      ]
    }
  }
}
</script>

<style scoped>
.main {
  width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
