<template>
  <UserForm title="Sign Up" @submit="handleSubmit" />
</template>

<script setup>
import UserForm from '@/components/UserForm.vue'
import { register } from '@/api/user'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
const handleSubmit = async (e, formData) => {
  const { status, message } = await register(formData.value)
  if (status === 0) {
    ElMessage.success(message)
    router.replace({ path: '/login' })
  } else {
    ElMessage.error(message)
  }
}
</script>

<style></style>
