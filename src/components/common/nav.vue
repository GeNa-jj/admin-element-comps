<!--
* Created by lujianjun on 2018/12/7.
* 用例说明：
* import HtNav from 'Nav'
* <HtNav :routes="navList"></HtNav>
  navList: [
    {
      title: '导航一',
      icon: 'el-icon-location',
      path: '/'
    },
    {
      title: '导航二',
      icon: 'el-icon-location',
      // path: '/',  有二级并且一级导航也能跳转
      children: [
        {path: '/a', title: '選項1'},
        {path: '/b', title: '選項2'}
      ]
    }
  ]
* title：標題
* icon：图标
* path：跳转的路由
* children：二级导航
-->

<template>
  <div class="ht-navbar">
    <!-- logo -->
    <div class="logo" v-if="showTitle">
      管理後台
    </div>
    <!-- 菜单 -->
    <el-menu
      :default-active="$route.path"
      router
      unique-opened
      :collapse="isCollapse"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- 一级菜单 -->
      <template v-for="(menu, $index) in routes">
        <!-- 叶子菜单 -->
        <el-menu-item :route="menu.path" :index="menu.path" :key="$index"
                      v-if="!hasChildMenu(menu)">
          <i :class="menu.icon || 'el-icon-location'"></i>
          <span>{{menu.title}}</span>
        </el-menu-item>
        <el-submenu :index="$index + ''" :key="$index" v-else>
          <template slot="title">
            <i :class="menu.icon || 'el-icon-location'"></i>
            <span>{{menu.title}}</span>
          </template>

          <!-- 二级菜单 -->
          <template v-for="(child, $childIndex) in menu.children">
            <!-- 叶子菜单 -->
            <el-menu-item :route="child.path"
                          :index="child.path"
                          :key="$index + '-' + $childIndex"
                          v-if="!hasChildMenu(child)">
              {{child.title}}
            </el-menu-item>
            <el-submenu :index="$index + '-' + $childIndex"
                        :key="$index + '-' + $childIndex"
                        v-else>
              <template slot="title">
                <!-- 如果二级菜单有链接地址，则也可以跳转 -->
                <el-menu-item v-if="child.path"
                              class="el-child-menu"
                              :route="child.path"
                              :index="child.path">
                  {{child.title}}
                </el-menu-item>
                <span v-else>{{child.title}}</span>
              </template>
              <!-- 三级菜单,叶子菜单 -->
              <el-menu-item
                v-for="(grandchild, $grandchildIndex ) in child.children"
                :route="grandchild.path"
                :key="$grandchildIndex"
                :index="grandchild.path">
                {{ grandchild.title }}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    props: ['routes', 'isCollapse'],
    data () {
      return {
        showTitle: true
      }
    },
    watch: {
      isCollapse () {
        if (this.isCollapse) {
          this.showTitle = false
        } else {
          setTimeout(() => {
            this.showTitle = true
          }, 300)
        }
      }
    },
    methods: {
      /**
       * 是否有子菜单
       */
      hasChildMenu (item) {
        return item.children && item.children.length > 0
      },
      handleOpen (key, keyPath) {
        // console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        // console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="less" scoped>
  .ht-navbar {
    background-color: rgb(84, 92, 100);
    height: 100%;
    position: relative;
    .logo {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 100%;
      color: #fff;
      font-size: 14px;
    }
    .el-menu-vertical {
      width: 0;
      border: 0 none;
      top: 40px;
      &:not(.el-menu--collapse) {
        width: 200px;
      }
    }
  }
</style>
