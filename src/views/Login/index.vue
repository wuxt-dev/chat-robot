<template>
  <UserForm title="Login" @submit="handleSubmit" />
</template>

<script setup>
import { login } from '@/api/user'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import store from '@/store/index'
import UserForm from '@/components/UserForm.vue'

const handleSubmit = async (e, formData) => {
  const { status, message, data } = await login(formData.value)
  if (status === 0) {
    localStorage.setItem('token', data.token)
    store.commit('setUser', data.user)
    ElMessage.success(message)
    router.replace({ path: '/contact' })
  } else {
    ElMessage.error(message)
  }
}
</script>
