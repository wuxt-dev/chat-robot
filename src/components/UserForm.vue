<template>
  <el-card class="login">
    <template #header>
      <span>{{ title }}</span>
      <el-link :href="linkAddress" type="primary" class="register">
        {{ title === 'Login' ? 'sign up' : 'login' }}
      </el-link>
    </template>
    <el-form
      label-position="top"
      label-width="120px"
      :model="formData"
      ref="formRef"
      :rules="rules"
    >
      <el-form-item label="username" prop="username">
        <el-input v-model="formData.username" :suffix-icon="Avatar" />
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="formData.password" :type="passwordType">
          <template #suffix>
            <el-icon class="el-input__icon" @click="togglePassword">
              <component :is="passwordType === 'text' ? Unlock : Lock" />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button class="button" type="primary" round @click="validateForm">
      {{ title }}
    </el-button>
  </el-card>
</template>
<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Lock, Unlock, Avatar } from '@element-plus/icons-vue'
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
  return props.title === 'Login' ? '#/register' : '#/login'
})

const passwordType = ref('password')
const togglePassword = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
</script>

<style scoped>
.login {
  width: 420px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
}
.register {
  float: right;
}
.button {
  width: 100%;
}
.el-input__icon {
  cursor: pointer;
}
</style>
