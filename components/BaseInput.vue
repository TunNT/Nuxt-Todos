<template>
  <input type="text" v-model="newItem" placeholder="Search..." @input="listSuggest" />
</template>

<script setup>
const newItem = ref('');
const emits = defineEmits(['listSuggest']);
const listSuggest = () => {
    emits('listSuggest', newItem.value);
}
</script>

<style>

</style>