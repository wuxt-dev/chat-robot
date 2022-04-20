<template>
  <div class="container">
    <el-row>
      <el-col :span="21">
        <el-input
          autocomplete="off"
          :modelValue="message"
          @input="$emit('update:message', $event)"
          @keyup.enter="sendMessage"
        />
      </el-col>
      <el-col :span="3">
        <el-button
          color="#5662c5"
          plain
          @click="sendMessage"
          class="button"
          :icon="Promotion"
        >
          Send
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { Promotion } from '@element-plus/icons-vue'

defineProps({
  message: String,
  sendMessage: Function
})
defineEmits(['update:message'])
</script>

<style scoped>
.container {
  height: 60px;
  display: flex;
  justify-content: center;
  margin: 0 -20px -20px -20px;
  padding: 20px;
  background-color: rgb(93, 111, 249, 0.6) !important;
}
.button {
  width: 100%;
  font-weight: bold;
}
</style>
