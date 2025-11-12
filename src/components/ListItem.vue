<script setup lang="ts">
import { defineProps, ref } from 'vue'

const newName = ref('')
const { list } = defineProps<{ list: { name: string; done: boolean }[] }>()
const emit = defineEmits<{
  (e: 'turn', name: string): void
  (e: 'add', name: string, done: (r: boolean) => void): void
}>()

const add = () => {
  emit('add', newName.value, (res: boolean) => {
    if (res) {
      newName.value = ''
    }
  })
}
</script>

<template>
  <div class="list">
    <template v-for="item of list" :key="item.name">
      <span>{{ item.name }}</span>
      <span @click="emit('turn', item.name)"
        >[ <span :class="!item.done ? 'hidden' : ''">+</span> ]</span
      >
    </template>
  </div>
  <input placeholder="New good name" v-model="newName" />
  <button @click="add">Add new one</button>
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
