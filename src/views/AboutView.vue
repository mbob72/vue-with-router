<template>
  <div class="about">
    <h1>This is an about page</h1>
    <GoodsList />
  </div>
</template>

<script setup lang="ts">
import GoodsList from '@/components/GoodsList.vue'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
