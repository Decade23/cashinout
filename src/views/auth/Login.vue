<template>
  <div class="container">
    <div class="w-full md:w-1/3">
      <div class="border rounded-lg overflow-hidden">
        <div class="bg-indigo-200 p-4">Login</div>
        <div class="p-4">
          <form @submit.prevent="login" autocomplete="off">
            <div class="mb-5">
              <label for="email" class="text-xs font-semibold uppercase"
                >Email</label
              >
              <input
                type="text"
                name="email"
                id="email"
                v-model="credential.email"
                placeholder="your email here..."
                class="text-xs w-full border rounded-lg px-4 h-10 focus:outline-none focus:border-indigo-400"
              />
              <div class="text-xs text-red-500 mt-2" v-if="errors['email']">{{ errors['email'][0] }}</div>
            </div>

            <div class="mb-5">
              <label for="password" class="text-xs font-semibold uppercase"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                v-model="credential.password"
                placeholder="your password here..."
                class="text-xs w-full border rounded-lg px-4 h-10 focus:outline-none focus:border-indigo-400"
              />
              <div class="text-xs text-red-500 mt-2" v-if="errors['password']">{{ errors['password'][0] }}</div>
            </div>

            <div class="mb-5">
              <button
                class="h-10 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import router from "@/router";
import { reactive, ref } from "vue";
export default {
  setup() {
    const errors = ref([])
    const credential = reactive({
      email: "",
      password: "",
    });

    const login = async () => {
      try {
        await store.dispatch("auth/login", credential);
        router.replace("/");
      } catch (e) {
          errors.value = e.response.data.errors
      }
    };

    return { login, credential, errors };
  },
};
</script>

<style></style>
