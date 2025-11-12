<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'

const newName = ref('')
const showAll = ref(true)
const { list: rowList } = defineProps<{ list: { name: string; done: boolean }[] }>()
const emit = defineEmits<{
  (e: 'turn', name: string): void
  (e: 'add', name: string, done: (r: boolean) => void): void
  (e: 'resetStatus'): void
}>()

const list = computed(() => (showAll.value ? rowList : rowList.filter((g) => !g.done)))

const turnShowed = () => {
  showAll.value = !showAll.value
}

const add = () => {
  emit('add', newName.value, (res: boolean) => {
    if (res) {
      newName.value = ''
    }
  })
}
</script>

<template>
  <button @click="turnShowed">{{ showAll ? 'Filter out which is done' : 'Show all goods' }}</button>
  <input placeholder="New good name" v-model="newName" />
  <button @click="add">Add new one</button>
  <button @click="emit('resetStatus')">Reset status</button>

  <h3>Total: {{ rowList.length }}</h3>
  <h3>Rest of goods: {{ rowList.length - rowList.filter((g) => g.done).length }}</h3>
  <div class="list">
    <template v-for="item of list" :key="item.name">
      <span>{{ item.name }}</span>
      <span @click="emit('turn', item.name)"
        >[ <span :class="!item.done ? 'hidden' : ''">+</span> ]</span
      >
    </template>
  </div>
</template>

<style scope>
.list {
  min-width: 200px;
  display: grid;

  align-items: start;
  justify-items: start;
  gap: 0 1rem;
  grid-template-columns: max-content 1fr;
}

.list :nth-child(even) {
  cursor: pointer;
}

.hidden {
  color: white;
}
</style>
