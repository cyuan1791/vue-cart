<script setup lang="ts">
import { computed } from 'vue'
import CartCard from '../components/CartCard.vue'
import CartCardSkeleton from '../components/CartCardSkeleton.vue'
import { useCartStore } from '../store/cart'
import { useProductStore } from '../store/products'
import { useRouter } from 'vue-router';
import { toCurrency, asoneArea, asonePath, fetchData } from '../shared/utils'


const router = useRouter();



const cartStore = useCartStore()
const productStore = useProductStore()

const formattedCart = computed(() => cartStore.formattedCart)

const handleClick = () => {
  console.log('Button clicked!, cartStore.total:', cartStore.total);
  //cartStore.clear();
  router.push(`checkout`);
};

</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <div v-if="!productStore.loaded" class="space-y-4">
      <CartCardSkeleton v-for="n in 15" :key="n" />
    </div>
    <div v-else-if="!formattedCart.length">
      <h1 class="text-xl">
        Cart is empty.
      </h1>
    </div>
    <div v-else class="space-y-4">
      <CartCard v-for="(cartProduct, index) in formattedCart" :key="index" :cart-product="cartProduct" />
      <div class="text-right text-2xl md:text-4xl">
        Total: {{ toCurrency(cartStore.total) }}
      </div>
      <a @click="handleClick" class="btn btn-primary btn-lg float-right">Checkout</a>

    </div>
  </div>
</template>
