<template>
  <div class="text-center">
    <BaseInput class="search" @listSuggest="listSuggest" />
    <button class="btn-add" @click="addItem">ADD ITEM</button>
  </div>
  <ClientOnly>
    <va-data-table
      class="table-crud"
      v-bind:items="planetStore.planetData"
      v-bind:columns="columns"
      striped
    >
      <template #cell(actions)="{ rowIndex }">
        <va-button preset="plain" icon="edit" @click="openDialogEdit(rowIndex)" />
        <va-button preset="plain" icon="delete" class="ml-3" @click="deleteItemById(rowIndex)" />
      </template>
    </va-data-table>
    <va-modal
      class="modal-crud"
      v-bind:model-value="!!editedItem"
      title="Edit item"
      size="small"
      @ok="updateValue"
      @cancel="resetEditedItem"
    >
      <va-input
        v-for="key in Object.keys(editedItem)"
        v-bind:key="key"
        v-model="editedItem[key]"
        class="my-6"
        v-bind:label="key"
      />
    </va-modal>
  </ClientOnly>
</template>

<script>

import { usePlanets } from '../../store/planets/getPlanet';

export default {
  setup() {
    const newItem = ref({
      title: '',
      description: '',
      distanceFromSun: '',
      radius: ''
    })
    const editedItem = ref(null)
    const editedItemId = ref(null)
    const showModal = ref(false)
    const columns = [
      {
        key: 'title'
      },
      {
        key: 'description',
        sortable: true
      },
      {
        key: 'distanceFromSun',
        sortable: true
      },
      {
        key: 'radius',
        label: 'Radius',
        sortable: true,
        direction: 'desc'
      },
      { key: 'actions', width: 80 }
    ]

    const planetStore = usePlanets();
    onMounted(async() => {
        await planetStore.listPlanet();
    })
    const deleteItemById = (id) => {
      planetStore.deletePl(id);
    }
    const openDialogEdit = (id) => {
      editedItemId.value = id
      editedItem.value = { ...planetStore.planetData[id] }
    }
    const closeModal = () => {
      showModal.value = false
    }
    const updateValue = () => {
      if (editedItemId.value !== null) {
        planetStore.planetData = [
          ...planetStore.planetData.slice(0, editedItemId.value),
          { ...editedItem.value },
          ...planetStore.planetData.slice(editedItemId.value + 1)
        ]
      } else {
        planetStore.planetData.push(editedItem.value)
      }
      resetEditedItem()
    }
    const resetEditedItem = () => {
      editedItem.value = null
      editedItemId.value = null
    }
    const addItem = () => {
      editedItem.value = { ...newItem.value }
    }
    const listSuggest = (data) => {
      if (data.length !== 0) {
        planetStore.planetData = planetStore.planetData.filter((planet) =>
          planet.description.includes(data)
        )
      } else {
        planetStore.listPlanet()
      }
    }
    return {
      planetStore,
      editedItem,
      columns,
      showModal,
      newItem,
      deleteItemById,
      openDialogEdit,
      closeModal,
      updateValue,
      resetEditedItem,
      addItem,
      listSuggest
    }
  }
}
</script>

<style lang="scss" scoped>

.text-center {
  text-align: center;
}
@mixin header {
  margin: 50px 10px;
  height: 50px;
}
.btn-add {
  @include header;
  border: 1px solid #3914bd;
  width: 100px;
  margin-right: 50px;
  background-color: #3914bd;
  color: #fff;
}
.search {
  @include header();
  width: 500px;
  margin-left: 50px;
}
</style>