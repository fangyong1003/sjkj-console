<template>
  <div>
    <input v-model="example0"/>
    <input v-model="example1"/>
    <input v-model="example2.inner0"/>
  </div>
  <!--<input v-model="example0"/>-->
  <!--　　 <input v-model="example1"/>-->
</template>
<script type="text/babel">
  export default{
    data() {
      return {
        example0: '',
        example1: '',
        example2: {
          inner0: 1,
          innner1: 2
        }
      }
    },
    watch: {
      example0(curVal, oldVal) {
        console.log(curVal, oldVal);
      },
      example2: {
        handler: function (val, oldval) {
          console.log(val.inner0, oldval.inner0);
//          console.log(oldval);
        },
        deep: true//对象内部的属性监听，也叫深度监听
      },
      'example2.inner0': function (val, oldval) {
        console.log(val, oldval);
      }//键路径必须加上引号
    }
  }
</script>
