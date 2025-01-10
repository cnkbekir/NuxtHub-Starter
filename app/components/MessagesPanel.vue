<script setup lang="ts">
const { data: messages, refresh } = await useFetch('/api/messages')
const newMessage = ref('')

async function sendMessage (){
  if (!newMessage.value.trim()) return
  await $fetch('/api/messages', {
    method: 'POST',
    body: {
      text: newMessage.value
    }
  })
  newMessage.value = ''
  await refresh()
}
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4">Messages</h3>
    <form @submit.prevent="sendMessage" class="mb-4">
      <input v-model="newMessage" placeholder="Type a message" class="block w-full p-2 mb-2 border rounded-md">
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Send
      </button>
    </form>
    <p v-for="message of messages" :key="message.id" class="mb-2">
      {{ message.text }} - {{ new Date(message.created_at).toLocaleString('fr-FR') }}
    </p>
    <p v-if="!messages?.length" class="text-sm text-gray-500">
      No messages yet
    </p>
  </div>
</template>
