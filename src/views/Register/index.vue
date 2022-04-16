<template>
  <UserForm title="Sign Up" @submit="handleSubmit" />
</template>

<script setup>
import UserForm from '@/components/UserForm.vue'
import { register } from '@/api/user'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
const handleSubmit = (e, formData) => {
  register(formData.value)
    .then((res) => {
      const { status, message } = res
      if (status === 0) {
        ElMessage.success(message)
        router.replace({ path: '/login' })
      } else {
        ElMessage.error(message)
      }
    })
    .catch((err) => ElMessage.error(err))
}
</script>

<style></style>
