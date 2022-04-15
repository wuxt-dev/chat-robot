<template>
  <el-row>
    <el-col :span="20">
      <el-input
        autocomplete="off"
        :modelValue="message"
        @input="$emit('update:message', $event)"
        @keyup.enter="sendMessage"
      />
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="sendMessage" class="button"
        >Send</el-button
      >
    </el-col>
  </el-row>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  message: String,
  sendMessage: Function
})
defineEmits(['update:message'])
</script>

<style scoped>
.button {
  width: 100%;
}
</style>
