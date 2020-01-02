<template>
  <!--
    TODO
    1. 查看功能
    2. 编辑功能
    3. SKU库存
  -->
  <div class="main">
    <!--搜索过滤-->
    <el-card shadow="never">
      <div>
        <i class="el-icon-search"/>
        <span>筛选搜索</span>
        <el-button style="float: right" size="small" @click="handleSearchList()">开始查询</el-button>
        <el-button style="float: right;margin: 0 15px" size="small" @click="handleResetSearch()">重置</el-button>
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
    <!--批量操作-->
    <div style="margin-top: 20px">
      <el-select
              size="small"
              v-model="operateType" placeholder="批量操作">
        <el-option
                v-for="item in operates"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
      <el-button
              style="margin-left: 20px"
              class="search-button"
              @click="handleBatchOperate()"
              type="primary"
              size="small">
        确定
      </el-button>
    </div>
    <!--商品列表-->
    <el-table
            :data="list"
            border
            style="margin-top: 15px;"
            @selection-change="handleSelectionChange">
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
                       @change="handlePublishStatusChange(scope.row)"
                       :active-value="1"
                       :inactive-value="0"
                       active-color="#13ce66"
                       inactive-color="#ff4949"/>
          </p>
          <p>推荐：
            <el-switch v-model="scope.row.recommendStatus"
                       @change="handleRecommendStatusChange(scope.row)"
                       :active-value="1"
                       :inactive-value="0"
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
                  size="mini"
                  @click="handleUpdateProduct(scope.row)">
            编辑
          </el-button>
          <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" style="float: right;margin-top: 20px">
      <el-pagination
              background
              hide-on-single-page
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[5, 10, 15]"
              :page-size="listQuery.pageSize"
              :current-page.sync="listQuery.pageNum"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
const defaultListQuery = {
  keyword: null,
  productSn: null,
  productCategory: null,
  brandId: null,
  publishStatus: null,
  pageNum: 1,
  pageSize: 5
}
export default {
  name: 'productList',
  data () {
    return {
      listQuery: Object.assign({}, defaultListQuery),
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
          recommendStatus: 1,
          sort: 100,
          sale: '999'
        }
      ],
      operateType: null,
      operates: [
        {
          label: '上架商品',
          value: 'publishOn'
        },
        {
          label: '下架商品',
          value: 'publishOff'
        },
        {
          label: '设为推荐',
          value: 'recommendOn'
        },
        {
          label: '不推荐',
          value: 'recommendOn'
        },
        {
          label: '批量删除',
          value: 'batchDelete'
        }
      ],
      multipleSelection: [],
      total: 100
    }
  },
  // 获取页面数据
  created () {
    this.getList()
    this.getBrand()
    this.getProductCateList()
  },
  methods: {
    // 获取商品列表
    async getList () {
      let { data: res } = await this.$http.get('/product/list', this.listQuery)
      this.list = res.list
      this.total = res.total
    },
    // 条件查询获取商品列表
    handleSearchList () {
      this.listQuery.pageNum = 1
      this.getList()
    },
    // 获取品牌列表
    async getBrand () {
      let { data: res } = await this.$http.get('/pmsProductBrand/list')
      for (const item of res.list) {
        this.brandOptions.push({ label: item.name, value: item.id })
      }
    },
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
    // 重置搜索框
    handleResetSearch () {
      this.selectProductCateValue = []
      this.listQuery = defaultListQuery
    },
    // 监听上架状态
    handlePublishStatusChange (row) {
      // 设置数组可以批量修改上架状态
      let ids = []
      ids.push(row.id)
      this.updatePublishStatus(ids, row.publishStatus)
    },
    // 更新上架状态
    updatePublishStatus (ids, publishStatus) {
      let obj = { ids: ids, publishStatus: publishStatus }
      this.$http.put('/product/update', obj).then(ret => {
        if (ret.data.meta.status !== 200) {
          this.$message.error('更新失败')
        }
        this.$message.success('修改成功')
      }).catch(ret => {
        this.$message.error('请求失败')
      })
    },
    // 推荐状态改变
    handleRecommendStatusChange (row) {
      let ids = []
      ids.push(row.id)
      this.updateRecommendStatus(ids, row.recommendStatus)
    },
    // 更新推荐状态
    updateRecommendStatus (ids, recommendStatus) {
      let obj = { ids: ids, recommendStatus: recommendStatus }
      this.$http.put('/product/update', obj).then(ret => {
        if (ret.data.meta.status !== 200) {
          return this.$message.error('更新失败')
        }
        this.$message.success('修改成功')
      }).catch(ret => {
        this.$message.error('请求失败')
      })
    },
    // 获取selection值
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 批量操作
    handleBatchOperate () {
      // 判断用户选择，没选择这直接返回，不执行余下函数
      if (this.operateType) {
        this.$message.warning('请选择需要操作的类型')
        return
      }
      // 判断用户选择，没选择这直接返回，不执行余下函数
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message.warning('请选择需要操作的商品')
        return
      }
      // 确认用户操作
      this.$confirm('确定要进行批量操作吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        for (const item of this.multipleSelection) {
          ids.push(item.id)
        }
        switch (this.operateType) {
          case this.operates[0].value:
            this.updatePublishStatus(ids, 1)
            break
          case this.operates[1].value:
            this.updatePublishStatus(ids, 0)
            break
          case this.operates[2].value:
            this.updateRecommendStatus(ids, 1)
            break
          case this.operates[3].value:
            this.updateRecommendStatus(ids, 0)
            break
          case this.operates[4].value:
            this.updateDeleteStatus(ids, 1)
            break
        }
        this.$message({
          type: 'success',
          message: '成功操作!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 删除商品
    handleDelete (row) {
      this.$confirm('你确定要删除该商品?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        ids.push(row.id)
        this.updateDeleteStatus(ids, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 更新商品删除状态
    updateDeleteStatus (ids, deleteStatus) {
      let obj = { ids: ids, deleteStatus: deleteStatus }
      this.$http.delete('/product/update', { params: obj })
        .then(ret => {
          if (ret.data.meta.status !== 200) {
            return this.$message.error('删除失败')
          }
          this.$message.success('删除成功')
        })
    },
    // 分页页码改变时执行重新获取页面数据
    handleCurrentChange (val) {
      this.listQuery.pageNum = val
      console.log(this.listQuery.pageNum)
      this.getList()
    },
    // 分页每页显示条目改变时执行重新获取页面数据
    handleSizeChange (val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      console.log(this.listQuery.pageSize)
      this.getList()
    },
    // 编辑/更新商品信息
    handleUpdateProduct (row) {
      this.$router.push({ path: 'product/productBaseInfo', query: { id: row.id } })
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
