<script setup lang="ts">
import { computed } from 'vue'
import Search from './Search.vue'
import { useCartStore } from '@/store/cart'

const cartStore = useCartStore()

const count = computed(() => cartStore.count)
</script>

<template>
  <div class="d-flex justify-content-center ">
    <div class="btn-group m-4 p-3 w-75 bg-success-subtle" role="group" aria-label="Basic mixed styles example">
      <router-link class="btn btn-ghost rounded-btn" to="/">
        Shop-Home
      </router-link>
      <router-link class="btn btn-ghost rounded-btn" to="/cart">
        Cart
        <div class="badge text-bg-secondary" v-text="count" />
      </router-link>
      <Search />
    </div>
  </div>
</template>
