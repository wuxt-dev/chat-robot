<template>
  <el-dialog :model-value="dialogVisible" title="search user" width="50%">
    <el-tabs v-model="tab" type="card">
      <el-tab-pane label="search by id" name="id"></el-tab-pane>
      <el-tab-pane label="search by username" name="username"></el-tab-pane>
    </el-tabs>
    <el-input size="large" v-model.trim="userinfo" @keyup.enter="handleSearch">
      <template #append>
        <el-button :icon="Search" @click="handleSearch" />
      </template>
    </el-input>
    <div class="user-list" v-if="user.username">
      <Userinfo
        v-if="user.username"
        :user="user"
        bgColor="#ecf5ff"
        color="#409eff"
        fontSize="20px"
      />
      <el-button
        type="primary"
        plain
        :icon="Plus"
        circle
        v-if="enableAddButton()"
        @click="handleAddFriend"
      />
    </div>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
import { getFriendList, searchUser, addFriend } from '@/api/friend'
import Userinfo from './Userinfo.vue'
import store from '@/store/index'

defineProps({
  dialogVisible: Boolean
})
const emits = defineEmits(['update:model-value'])

const tab = ref('id')
const user = ref({})

const userinfo = ref('')
const handleSearch = async () => {
  const data = { username: '', id: '' }
  data[tab.value] = userinfo.value
  const res = await searchUser(data)
  user.value = res.data
}

const enableAddButton = () => {
  return (
    user.value.username !== store.getters.username &&
    !store.getters.friendList.some((friend) => friend.id === user.value.id)
  )
}
const handleAddFriend = async () => {
  await addFriend(store.getters.userId, user.value.id)
  const res = await getFriendList(store.getters.userId)
  store.commit('friend/setFriendList', res.data.friendList)
  emits('update:model-value', false)
}
</script>
<style scoped>
.user-list {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
