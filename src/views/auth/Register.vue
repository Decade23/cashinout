<template>
  <div class="container">
    <div class="w-full md:w-1/3">
      <div class="border rounded-lg overflow-hidden">
        <div class="bg-indigo-200 p-4">Register</div>
        <div class="p-4">
          <form @submit.prevent="register" autocomplete="off">
            <div class="mb-5">
              <label for="email" class="text-xs font-semibold uppercase"
                >Name</label
              >
              <input
                type="text"
                name="name"
                id="name"
                v-model="form.name"
                placeholder="your name here..."
                class="text-xs w-full border rounded-lg px-4 h-10 focus:outline-none focus:border-indigo-400"
              />
              <div class="text-xs text-red-500 mt-2" v-if="errors['name']">
                {{ errors["name"][0] }}
              </div>
            </div>

            <div class="mb-5">
              <label for="email" class="text-xs font-semibold uppercase"
                >Email</label
              >
              <input
                type="text"
                name="email"
                id="email"
                v-model="form.email"
                placeholder="your email here..."
                class="text-xs w-full border rounded-lg px-4 h-10 focus:outline-none focus:border-indigo-400"
              />
              <div class="text-xs text-red-500 mt-2" v-if="errors['email']">
                {{ errors["email"][0] }}
              </div>
            </div>

            <div class="mb-5">
              <label for="password" class="text-xs font-semibold uppercase"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                v-model="form.password"
                placeholder="your password here..."
                class="text-xs w-full border rounded-lg px-4 h-10 focus:outline-none focus:border-indigo-400"
              />
              <div class="text-xs text-red-500 mt-2" v-if="errors['password']">
                {{ errors["password"][0] }}
              </div>
            </div>

            <div class="mb-5">
              <label
                for="password_confirmation"
                class="text-xs font-semibold uppercase"
                >Password Confirmation</label
              >
              <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                v-model="form.password_confirmation"
                placeholder="your password confirmation here..."
                class="text-xs w-full border rounded-lg px-4 h-10 focus:outline-none focus:border-indigo-400"
              />
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
import axios from "axios";
import store from "@/store";
import router from "@/router";
import { reactive, ref } from "vue";
export default {
  setup() {
    const errors = ref([])
    const form = reactive({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    const register = async () => {
      try {
        await axios.post("register", form);
        await store.dispatch("auth/me");
        router.replace("/");
      } catch (e) {
          errors.value = e.response.data.errors
      }
    };

    return { register, form, errors };
  },
};
</script>

<style></style>
