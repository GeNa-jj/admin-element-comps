<template>
  <div>
    <el-input v-model="test"></el-input>
    <el-button v-waves v-clipboard:copy="test" v-clipboard:success="seccess" type="primary">waves</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        test: '123'
      }
    },
    methods: {
      seccess (e) {
        this.$message({
          type: 'success',
          message: `${e.action} success`
        })
      }
    }
  }
</script>
