<template>
  <el-container>
    <el-aside :width="isCollapse ? '65px' : '200px'">
      <el-menu unique-opened :collapse="isCollapse" :collapse-transition="false" router>
        <!--一级菜单-->
        <el-menu-item index="01">
          <i class="el-icon-s-home"/>
          <span>首页</span>
        </el-menu-item>
        <el-submenu v-for="item in menuList" :key="item.id" :index="item.id+''">
          <template slot="title">
            <i :class="item.icon"/>
            <span>{{ item.title }}</span>
          </template>
          <!--二级菜单-->
          <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="'/'+ subItem.path">
            <template slot="title">
              <i :class="subItem.icon"/>
              <span>{{ subItem.title }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="navbar">
          <i class="el-icon-files collapse-icon" @click="toggleCollapse()"/>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuList from '../assets/config/menuList.json'

export default {
  name: 'Home',
  data () {
    return {
      menuList: MenuList,
      isCollapse: false
    }
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
.el-header {
  padding: 0;
}

.collapse-icon {
  font-size: 20px;
  line-height: 60px;
  height: 60px;
  float: left;
  padding: 0 10px;
  cursor: pointer;
}

.navbar {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #eeeeee;
}

.el-breadcrumb {
  height: 60px;
  line-height: 60px;
}
</style>
