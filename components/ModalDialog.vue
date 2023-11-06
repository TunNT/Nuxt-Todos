
<template>
  <div class="modal-overlay">
    <div class="modal">
      <span>Title: </span>
      <input type="text" v-model="syncItem.title" />
      <button @click="onSubmitEdit">Confirm edit</button>
    </div>
    <div class="close" @click="$emit('close-modal')">
      <button class="close-img">x</button>
    </div>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      title: ''
      description: ''
      distanceFromSun: ''
      radius: ''
      image: ''
      dir: ''
      path: ''
      slug: ''
      updatedAt: ''
    }
  }
})
const emits = defineEmits(["updateValue'", 'close-modal'])

const syncItem = ref({
      title: '',
      description: '',
      distanceFromSun: '',
      radius: '',
      image: '',
      dir: '',
      path: '',
      slug: '',
      updatedAt: '',
    })
syncItem.value = { ...(props.data) };
// onMounted(() => {
//   syncItem.value = { ...(props.data) };
// })

const onSubmitEdit = () => {
  emits('updateValue', syncItem)
}
</script>
  
  <style scoped>
.box-checked {
  margin-top: 20px;
  padding: 0 50px;
  display: flex;
  text-align: center;
  justify-content: space-between;
}
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
  margin: 8% 0 0 3px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

span {
  font-weight: 900;
  font-weight: 500;
  font-size: 16px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}
input {
  width: 80%;
}
button {
  background-color: #ac003e;
  width: 100px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
</style>