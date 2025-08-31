<script setup lang="ts">
import { loadStripe } from "@stripe/stripe-js";
import { ref, onMounted, computed } from 'vue'

import SrMessages from '../components/SrMessages.vue';
import CartCard from '../components/CartCard.vue'
import CartCardSkeleton from '../components/CartCardSkeleton.vue'
import { toCurrency, asoneArea, asonePath, fetchData } from '../shared/utils'
import { useCartStore } from '../store/cart'
import { useProductStore } from '../store/products'


const cartStore = useCartStore()
const productStore = useProductStore()

const formattedCart = computed(() => cartStore.formattedCart)

const isLoading = ref(false);
const messages = ref([]);


//@ts-ignore
let stripe;
//@ts-ignore
let elements;

let callIntent = async (cartStore: any) => {
    if (!productStore.loaded)
        return;
    console.log('totala:', parseInt(cartStore.total) * 100);

    const { publishableKey } = await fetch(`${window.location.origin}/${asonePath}/${asoneArea}/ws/php/public/config.php`).then((res) => res.json());
    stripe = await loadStripe(publishableKey);

    const { clientSecret, data, error: backendError } = await fetchData(
        `${window.location.origin}/${asonePath}/${asoneArea}/ws/php/public/createintent.php`,
        parseInt(cartStore.total) * 100
    );
    console.log("Fetched data:", { clientSecret, data, backendError });


    if (backendError) {
        // @ts-ignore
        messages.value.push(backendError.message);
    }
    //@ts-ignore
    messages.value.push(`Client secret returned.`);

    //@ts-ignore
    elements = stripe.elements({ clientSecret });
    const paymentElement = elements.create('payment');
    paymentElement.mount("#payment-element");
    const linkAuthenticationElement = elements.create("linkAuthentication");
    linkAuthenticationElement.mount("#link-authentication-element");
    isLoading.value = false;
};

const handleSubmit = async () => {

    if (isLoading.value) {
        return;
    }
    cartStore.clear();

    isLoading.value = true;

    //@ts-ignore
    const { error } = await stripe.confirmPayment({
        //@ts-ignore
        elements,
        confirmParams: {
            return_url: `${window.location.origin}/`,
            //return_url: `${window.location.origin}/${asonePath}/return`,

        }
    });

    if (error.type === "card_error" || error.type === "validation_error") {
        //@ts-ignore
        messages.value.push(error.message);
    } else {
        //@ts-ignore
        messages.value.push("An unexpected error occured.");
    }

    isLoading.value = false;
}

</script>

<template>
    <main>
        <h1>Payment</h1>

        <p>
            Enable more payment method types
            <a href="https://dashboard.stripe.com/settings/payment_methods" target="_blank">in your dashboard</a>.
        </p>

        <form id="payment-form" @submit.prevent="handleSubmit">
            <div id="link-authentication-element" />
            <div id="payment-element" />
            <button id="submit" :disabled="isLoading">
                Pay now
            </button>
            <sr-messages :messages="messages" />
        </form>
        {{ callIntent(cartStore) }}
    </main>
    <!-- <div class="p-4 max-w-4xl mx-auto">

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
        </div>
    </div> -->
</template>
