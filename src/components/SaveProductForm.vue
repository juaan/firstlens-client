<template lang="html">
  <div id="form">
    <el-row>
      <el-form ref="form">
        <el-form-item label="Product Name">
          <el-input v-model="product.name"></el-input>
        </el-form-item>
        <el-form-item label="Product Description">
          <el-input type="textarea" v-model="product.description"></el-input>
        </el-form-item>
        <el-form-item label="Product Price">
          <el-input type="number" v-model="product.price"></el-input>
        </el-form-item>

      </el-form>
      <el-button type="primary" @click="onSubmit">Add Product</el-button>
    </el-row>
  </div>

</template>

<script>
export default {
  props: ['product'],
  methods: {
    onSubmit() {
      this.$emit('submit', this.product);
    }
  }
}
</script>

<style lang="css">

#form {
  width: 80%;
  margin: 0 auto;
}

</style>
