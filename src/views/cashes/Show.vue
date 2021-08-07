<template>
  <div class="container">
    <div class="w-full md:w-1/2">
      <div class="border rounded-lg overflow-hidden">
        <div
          class="border-b p-4 bg-indigo-100 uppercase font-semibold leading-relaxed"
        >
          {{ cash.name }}
        </div>
        <div class="p-4 -mx-2">
          <div class="mb-3">
            <label class="text-xs text-gray-500">When</label>
            <div class="leading-relaxed text-gray-800 font-semibold">
              {{ cash.when }}
            </div>
          </div>
          <div class="mb-3">
            <label class="text-xs text-gray-500">Amount</label>
            <div
              :class="
                cash.isCredit === true ? 'text-red-500' : 'text-green-500'
              "
              class="leading-relaxed font-semibold"
            >
              Rp. {{ cash.amount }},-
            </div>
          </div>
          <div class="mb-3">
            <label class="text-xs text-gray-500">Description</label>
            <div class="leading-relaxed text-gray-800 font-semibold">
              {{ cash.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from '@/router';
import axios from "axios";
export default {
  setup() {
    const cash = ref([]);
    let { params } = useRoute();

    const getCash = async () => {
      try {
        let { data } = await axios.get(`api/cash/${params.slug}`);
        cash.value = data.data;
      } catch (error) {
        router.replace('/cashes');
      }
    };

    onMounted(() => {
      getCash();
    });
    return { cash };
  },
};
</script>

<style></style>
