<template>
  <div class="container mb-10">
    <div class="flex flex-col-reverse md:flex-row">
      <div class="w-full md:w-8/12 mr-10">
        <div class="w-full mb-8 ">
          <div class="bg-gray-200 transform -rotate-2 rounded-2xl">
            <div
              class="bg-gradient-to-br from-cyan-400 to-indigo-600 transform rotate-2 p-6 rounded-2xl"
            >
              <label
                class="block uppercase text-xs tracking-wider font-semibold mb-1"
                >Balances</label
              >
              <div class="text-3xl font-semibold">
                Rp. {{ state.balances }},-
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row items-center -mx-2">
          <div class="w-full px-2 mb-6 md:mb-0">
            <div class="bg-gray-200 transform -rotate-3 rounded-2xl">
              <div
                class="bg-gradient-to-br from-lime-600 to-teal-300 transform rotate-3 p-6 rounded-2xl"
              >
                <label
                  class="block uppercase text-xs tracking-wider font-semibold mb-1"
                  >Debit</label
                >
                <div class="text-3xl font-semibold">
                  Rp. {{ state.debit }},-
                </div>
              </div>
            </div>
          </div>
          <div class="w-full px-2">
            <div class="bg-gray-200 transform -rotate-3 rounded-2xl">
              <div
                class="bg-gradient-to-br from-teal-300 to-red-600 transform rotate-3 p-6 rounded-2xl"
              >
                <label
                  class="block uppercase text-xs tracking-wider font-semibold mb-1"
                  >Credit</label
                >
                <div class="text-3xl font-semibold">
                  Rp. {{ state.credit }},-
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10">
          <div class="border rounded-lg overflow-hidden">
            <div
              class="flex flex-col md:flex-row items-center justify-between px-4 py-6 pl-7 bg-indigo-50 border-b"
            >
              <div class="uppercase font-semibold leading-relaxed mb-2 md:mb-0">
                transaction
              </div>
              <form
                @submit.prevent="getCashes"
                class="flex flex-col md:flex-row"
              >
                <input
                  type="date"
                  v-model="form.begin"
                  class="px-3 py-2 border rounded"
                />
                <input
                  type="date"
                  v-model="form.to"
                  class="mx-0 md:mx-2 px-3 py-2 border rounded my-2 md:my-0"
                />
                <input
                  type="submit"
                  class="px-3 py-2 border rounded bg-indigo-300 hover:bg-indigo-400 text-white cursor-pointer"
                  value="Go"
                />
              </form>
            </div>
            <div class="px-4 py-6 overflow-y-scroll h-112">
              <template v-for="t in state.transactions" :key="t.id">
                <router-link
                  :to="`/cashes/${t.slug}`"
                  class="flex items-center justify-between hover:bg-indigo-100 hover:shadow p-4 rounded-lg mb-4"
                >
                  <span class="flex flex-col">
                    <span class="text-xs text-gray-500">{{ t.when }}</span>
                    <span class="font-semibold leading-relaxed">{{
                      t.name
                    }}</span>
                  </span>
                  <span :class="t.isCredit === true ? 'text-red-500' : 'text-green-500'">
                    Rp. {{ t.amount }},-
                  </span>
                </router-link>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-4/12">
        <h1 class="mb-3">Add Transactions</h1>
        <form @submit.prevent="add">
          <div class="mb-3">
            <input
              type="text"
              name="name"
              id="name"
              v-model="form.name"
              placeholder="name of transaction here..."
              class="text-xs w-full border rounded-lg px-4 h-10 focus:outline-none focus:border-indigo-400"
            />
            <!-- <div class="text-xs text-red-500 mt-2" v-if="errors['email']">
              {{ errors["email"][0] }}
            </div> -->
          </div>
          <div class="mb-3">
            <input
              type="date"
              name="when"
              id="when"
              v-model="form.when"
              placeholder="when of transaction here..."
              class="text-xs w-full border rounded-lg px-4 h-10 focus:outline-none focus:border-indigo-400"
            />
            <!-- <div class="text-xs text-red-500 mt-2" v-if="errors['when']">
              {{ errors["when"][0] }}
            </div> -->
          </div>

          <div class="mb-3">
            <input
              type="number"
              name="amount"
              id="amount"
              v-model="form.amount"
              placeholder="amount of transaction here..."
              class="text-xs w-full border rounded-lg px-4 h-10 focus:outline-none focus:border-indigo-400"
            />
            <!-- <div class="text-xs text-red-500 mt-2" v-if="errors['amount']">
              {{ errors["amount"][0] }}
            </div> -->
          </div>

          <div class="mb-3">
            <textarea
              name="description"
              id="description"
              v-model="form.description"
              placeholder="description of transaction here..."
              class="text-xs w-full border rounded-lg p-4 focus:outline-none focus:border-indigo-400"
            ></textarea>
            <!-- <div class="text-xs text-red-500 mt-2" v-if="errors['email']">
              {{ errors["email"][0] }}
            </div> -->
          </div>
          <div class="mb-3">
            <button
                class="h-10 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white">
                Submit
              </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
export default {
  setup() {
    const state = ref([]);
    const form = reactive({
      begin: "",
      to: "",

      name: '',
      when: '',
      amount: '',
      description: ''
    });

    const getCashes = async () => {
      let { data } = await axios.get("api/cash", {
        params: {
          begin: form.begin,
          to: form.to,
        },
      });
      state.value = data;
      form.begin = data.begin;
      form.to = data.to;
    };

    const add = async () => {
        let r = await axios.post(`api/cash`, form)
  
        state.value.transactions.unshift(r.data.cash)
    }

    onMounted(() => {
      getCashes();
    });

    return { state, form, getCashes, add };
  },
};
</script>

<style></style>
