<script setup lang="ts">
import { makeMap, useDebounceRef } from './helper.ts'
import { shallowRef, computed, triggerRef, ref, markRaw } from 'vue'

const state = shallowRef({ map: markRaw(makeMap()) })
const name = useDebounceRef('', 3000)
const surname = ref('')

function add(key: string, value: { name: string; surname: string }): void {
  state.value.map.set(key, value)
  triggerRef(state)
}

const plainArr = computed(() => [...state.value.map])
</script>

<template>
  <div>Hi there!</div>
  <input v-model="name" />
  <input v-model="surname" />
  <button @click="(add(`${name}-${surname}`, { name, surname }), (name = ''), (surname = ''))">
    add
  </button>
  <ul>
    <li v-for="value in plainArr" :key="value[1].name">
      <span>{{ value[1].name }}</span
      ><span>{{ value[1].surname }}</span>
    </li>
  </ul>
</template>
