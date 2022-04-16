<template>
  <UserForm title="Sign Up" @submit="handleSubmit" />
</template>

<script setup>
import UserForm from '@/components/UserForm.vue'
import { register } from '@/api/user'
import router from '@/router/index'
const handleSubmit = (e, formData) => {
  register(formData.value)
    .then((res) => {
      const { status } = res
      if (status === 0) {
        router.replace({ path: '/login' })
      }
    })
    .catch()
}
</script>

<style></style>
