<template>
  <nav class="mb:py-3 border-b">
    <div class="flex flex-col md:flex-row justify-between">
      <div
        class="flex md:items-center justify-between px-6 py-4 md:pr-0 border-b md:border-b-0"
      >
        <router-link exact-active-class="bg-transparent" to="/" class="font-semibold uppercase">
        CashInOut</router-link>
        <button @click="isOn = !isOn" class="block md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 focus:outline-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
          <!-- Menu Bar -->
            <path
            :class="!isOn ? 'block' : 'hidden'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
            <!-- X close -->
            <path
              :class="isOn ? 'block' : 'hidden'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div
        :class="isOn ? 'block' : 'hidden md:flex'"
        class="flex py-6 flex-col md:flex-row justify-between md:items-center w-full px-6"
      >
        <div class="flex flex-col md:flex-row md:items-center">
          <router-link :class="className" to="/about">About</router-link>
          <router-link :class="className" to="/cashes">Cashes</router-link>
        </div>
        <div class="flex flex-col md:flex-row items-start md:items-center" v-if="authenticated">
          <router-link :class="className" to="/login">{{ user.name }}</router-link>
          <button @click="logout" class="focus:outline-none" :class="className">Logout</button>
        </div>
        <div class="flex flex-col md:flex-row md:items-center" v-else>
          <router-link :class="className" to="/login">Login</router-link>
          <router-link :class="className" to="/register">Register</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from "vue";

import store from '@/store';
export default {
  setup() {
    const className = "px-4 py-2";
    const isOn = ref(false);

    const authenticated = computed(() => store.getters['auth/authenticated'])
    const user = computed(() => store.getters['auth/user'])

    const logout = async () => {
      store.dispatch("auth/logout")
      
    }
    return { className, isOn, authenticated, user, logout };
  },
};
</script>

<style></style>
