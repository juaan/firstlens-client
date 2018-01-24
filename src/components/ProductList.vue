<template>
    <div id="table">
      <el-row>
      <h1>TEST</h1>
        <el-col :span="24">
          <el-table
            :data="products"
            stripe
            style="width: 90%; margin:0 auto; text-align:left;">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="Name"></el-table-column>
            <el-table-column prop="description" label="Description"></el-table-column>
            <el-table-column prop="price" label="Price"></el-table-column>
            <el-table-column label="Operations">
              <template scope="scope">
                <el-button size="small" @click="onEdit(scope.row)">Edit</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

</template>

<script>
export default {
  props: ['products'],
  methods: {
    onEdit(prodak) {
      this.$emit('edit', prodak)
    }
  }
}
</script>

<style scoped>
  .h1 {
    font-size: 4rem;
  }

  #table {
    width: 80%;
    margin:0 auto;
  }
</style>