<template>
  <UserForm title="Login" @submit="handleSubmit" />
</template>

<script setup>
import store from '@/store/index'
import UserForm from '@/components/UserForm.vue'

const handleSubmit = (e, formData) => {
  store.dispatch('user/login', formData.value).catch((err) => console.log(err))
}
</script>
