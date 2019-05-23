<!--
* Created by lujianjun on 2018/12/7.
* 用例说明：
* import Pagination from 'Pagination'
* <Pagination :pageData="pageData" @pageChange="pageChange"></Pagination>
  pageData: {
    total: 0,
    pageNum: 1,
    pageSize: 10
  }
  pageChange (pageData) {
    this.pageData = pageData
    // doing something
  }
* total：总数
* pageNum：第几页
* pageSize：每页个数
* pageSizes：每页个数种类
* layout：类型
-->

<template>
  <div class="pagination clearfix" v-if="pageData.total>0">
    <el-pagination :layout="layout" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page.sync="pageData.pageNum" :total="pageData.total" :page-size.sync="pageData.pageSize" :page-sizes="pageSizes">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      pageData: {
        type: Object,
        default: () => {
          return {
            pageNum: 1,
            total: 0,
            pageSize: 10
          }
        }
      },
      layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
      },
      pageSizes: {
        type: Array,
        default: () => {
          return [10, 20, 30, 40, 50]
        }
      }
    },
    data () {
      return {
        timer: null
      }
    },
    methods: {
      handleSizeChange (val) {
        console.log(`每頁 ${val} 條`)
        this.getData()
      },
      handleCurrentChange (val) {
        console.log(`當前頁: ${val}`)
        this.getData()
      },
      getData () {
        if (!this.timer) {
          this.timer = setTimeout(() => {
            this.$emit('pageChange', this.pageData)
          }, 100)
        } else {
          clearTimeout(this.timer)
          this.timer = null
          this.getData()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    width: 100%;
    margin: 10px 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .el-pagination {
      display: inline-block;
      float: right;
      max-width: 100%;
    }
  }
</style>
