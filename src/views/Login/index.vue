<template>
  <UserForm title="Login" @submit="handleSubmit" />
</template>

<script setup>
import router from '@/router/index'
import store from '@/store/index'
import UserForm from '@/components/UserForm.vue'
import { ElMessage } from 'element-plus'

const handleSubmit = async (e, formData) => {
  store
    .dispatch('login', formData.value)
    .then((res) => {
      ElMessage.success(res)
      router.replace({ path: '/contact' })
    })
    .catch((err) => ElMessage.err(err))
}
</script>
