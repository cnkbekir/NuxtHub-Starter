<script setup lang="ts">
const { data: images, refresh } = await useFetch('/api/images')

async function uploadImage (e: Event) {
  // https://hub.nuxt.com/docs/storage/blob#useupload
  const upload = useUpload('/api/images/upload', {
    multiple: false
  })
  const form = e.target as HTMLFormElement
  await upload(form.image)
    .then(async () => {
      form.reset()
      await refresh()
    })
    .catch((err) => alert('Failed to upload image:\n'+ err.data?.message))
}

async function deleteImage (pathname: string) {
  await $fetch(`/api/images/${pathname}`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4">Images</h3>
    <form @submit.prevent="uploadImage" class="mb-4">
      <label class="block mb-2">Upload an image: 
        <input type="file" name="image" accept="image/jpg,image/png" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
      </label>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Upload
      </button>
    </form>
    <p>
      <img
        v-for="image of images"
        :key="image.pathname"
        width="200"
        :src="`/images/${image.pathname}`"
        :alt="image.pathname"
        class="inline-block mb-4 cursor-pointer"
        @dblclick="deleteImage(image.pathname)"
      >
    </p>
    <p v-if="images?.length" class="text-sm text-gray-500">
      <i>Tip: delete an image by double-clicking on it.</i>
    </p>
  </div>
</template>
