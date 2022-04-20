<template>
  <el-card class="login">
    <template #header>
      <span class="title">{{ title }}</span>
      <router-link :to="linkAddress" class="link">
        {{ title === 'Login' ? 'sign up' : 'login' }}
      </router-link>
    </template>
    <el-form
      label-position="top"
      label-width="120px"
      :model="formData"
      ref="formRef"
      :rules="rules"
      class="form"
    >
      <el-form-item label="Username" prop="username">
        <el-input v-model="formData.username" :suffix-icon="Avatar"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="formData.password" :type="passwordType">
          <template #suffix>
            <el-icon class="el-input__icon" @click="togglePassword">
              <component :is="passwordType === 'text' ? View : Hide" />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button class="button" color="#5662c5" plain round @click="validateForm">
      {{ title }}
    </el-button>
  </el-card>
</template>
<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { View, Hide, Avatar } from '@element-plus/icons-vue'
import store from '@/store/index'

const props = defineProps({
  title: String
})
const emits = defineEmits(['submit'])

const formData = ref({
  username: '',
  password: ''
})
formData.value.username = store.getters.username
const rules = ref({
  username: [
    { required: true, message: 'Username is required', trigger: 'blur' },
    { min: 1, max: 5, message: 'Length should be 1 to 5', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, max: 12, message: 'Length should be 6 to 12', trigger: 'blur' }
  ]
})
const formRef = ref(null)
const validateForm = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      emits('submit', event, formData)
    } else {
      ElMessage.error('error submit')
      return false
    }
  })
}

const linkAddress = computed(() => {
  return props.title === 'Login' ? '/register' : '/login'
})

const passwordType = ref('password')
const togglePassword = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
</script>

<style scoped>
:deep(*) {
  background-color: #6b7bf6;
}
:deep(.el-card__header) {
  background-color: #5b6ef9;
}
:deep(.el-input__icon),
:deep(.el-icon svg),
:deep(.el-input__suffix-inner) {
  background-color: #fff;
}

:deep(.el-form-item__label) {
  color: #fff;
  font-size: 15px;
}
:deep(.el-form-el-input__icon) {
  background-color: #fff;
}
:deep(.el-button > span) {
  background: transparent;
}
:deep(.el-input__suffix) {
  height: 88%;
  top: 2px;
}
.login {
  width: 420px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
}
.title {
  background-color: #5b6ef9;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}
.link {
  background-color: #5b6ef9;
  color: #fff;
  float: right;
  text-decoration: none;
}

.button {
  width: 100%;
  font-weight: bold;
}
.el-input__icon {
  cursor: pointer;
}
</style>
