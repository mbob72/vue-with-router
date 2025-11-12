<template>
  <div>I am a good's list</div>
  <ListItem :list="list" @turn="turn" @add="add" @reset-status="resetStatus" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ListItem from './ListItem.vue'

const list = reactive([
  { name: 'Bread', done: false },
  { name: 'Milk', done: true },
])

function resetStatus() {
  list.forEach((g) => {
    g.done = false
  })
}

function add(name: string, done: (e: boolean) => void) {
  const good = list.find((g) => g.name === name)
  if (good) {
    alert('Good exists')
    done(false)
    return
  }
  list.push({ name, done: false })
  done(true)
}

function turn(name: string) {
  const good = list.find((g) => g.name === name)
  if (good) {
    good.done = !good.done
  }
}
</script>
