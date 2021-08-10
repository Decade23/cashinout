<template>
  <Navbar />
  <div class="mt-10"></div>
  <router-view />
</template>

<script>
import Navbar from '@/components/layouts/Navbar'

export default {
  components: { Navbar },
}
</script>