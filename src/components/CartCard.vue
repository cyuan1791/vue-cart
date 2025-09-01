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
  <div class="col-12 col-md-3"></div>
  <div class="col-12 col-md-3">


    <img :src="cartProduct.image" alt="Card Image" class="img-fluid">
  </div>
  <div class="col-12 col-md-3">
    <div class=" card-body">
      <h5 class="card-title">
        <router-link class="link link-hover" :to="`/product/${cartProduct.id}`">
          {{ cartProduct.title }}
        </router-link>
      </h5>
      <p>{{ toCurrency(cartProduct.cost) }}</p>
      <div class="card-actions">
        <div class="btn-group">
          <button class="btn btn-primary btn-sm" @click="cartStore.remove(cartProduct.id)">
            -
          </button>
          <button class="btn btn-ghost no-animation">
            {{ cartProduct.quantity }}
          </button>
          <button class="btn btn-primary btn-sm" @click="cartStore.add(cartProduct.id)">
            +
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-3"></div>
</template>
