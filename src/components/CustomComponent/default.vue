<template>
  <p>Hi {{ firstName }} {{ lastName }}</p>
</template>

<script>
export default {
  props: {
    firstName: String,
    lastName: String
  },
}
</script>