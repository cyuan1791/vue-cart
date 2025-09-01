<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import type { CartPreview } from '@/store/cart'
import { toCurrency } from '@/shared/utils'

defineProps<{
  cartProduct: CartPreview
}>()

const cartStore = useCartStore()
</script>

<template>
  <div class="card md:card-side bordered">
    <div style="display: flex; flex: 1 1 auto;">

      <img :src="cartProduct.image" alt="Card Image" class="img-fluid" style="max-height: 200px;">
      <div class=" card-body">
        <h2 class="card-title">
          <router-link class="link link-hover" :to="`/product/${cartProduct.id}`">
            {{ cartProduct.title }}
          </router-link>
        </h2>
        <p>{{ toCurrency(cartProduct.cost) }}</p>
        <div class="card-actions">
          <div class="btn-group">
            <button class="btn btn-primary" @click="cartStore.remove(cartProduct.id)">
              -
            </button>
            <button class="btn btn-ghost no-animation">
              {{ cartProduct.quantity }}
            </button>
            <button class="btn btn-primary" @click="cartStore.add(cartProduct.id)">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
