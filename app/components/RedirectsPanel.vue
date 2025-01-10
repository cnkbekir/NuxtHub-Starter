<script setup lang="ts">
const { data: redirects, refresh } = await useFetch('/api/redirects', {
  transform: (data: { [key: string]: string }) => {
    // Transform to text for the textarea
    return { text: Object.entries(data).map(([from, to]) => `${from} ${to}`).join('\n') }
  }
})

async function updateRedirects () {
  const body = Object.fromEntries(
    redirects.value!.text.split('\n').map(line => line.split(' '))
  )
  await $fetch('/api/redirects', {
    method: 'PUT',
    body
  })
  await refresh()
}
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4">Server redirects</h3>
    <form @submit.prevent="updateRedirects" class="mb-4">
      <p><textarea v-model="redirects.text" rows="6" placeholder="/from /to (one redirect per line)" class="block w-full p-2 mb-2 border rounded-md" /></p>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Save redirects
      </button>
    </form>
  </div>
</template>
