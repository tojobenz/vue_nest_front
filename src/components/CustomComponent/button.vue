<template>
   <t-button class="text-my-color" @click="onClickButton()" >{{ value }}</t-button>
</template>

<script>
export default {
      props: {
    value: String,
  },
  methods: {
    onClickButton () {
      this.$emit('clickChild', this.value)
    }
  }
}
</script>