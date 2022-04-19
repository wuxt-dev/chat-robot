<template>
  <UserForm title="Login" @submit="handleSubmit" />
</template>

<script setup>
import router from '@/router/index'
import store from '@/store/index'
import UserForm from '@/components/UserForm.vue'

const handleSubmit = (e, formData) => {
  store
    .dispatch('user/login', formData.value)
    .then((res) => {
      router.replace({ path: '/' })
    })
    .catch()
}
</script>
