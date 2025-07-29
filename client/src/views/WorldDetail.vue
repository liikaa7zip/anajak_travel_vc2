<template>
  <section class="py-20 px-4 max-w-4xl mx-auto">
    <div v-if="card">
      <h2 class="text-3xl font-bold mb-4">{{ card.title }}</h2>
      <img :src="card.image" :alt="card.title" class="rounded-lg w-full h-96 object-cover mb-6" />
      <p class="text-lg text-gray-700">{{ card.description }}</p>
    </div>
    <div v-else>
      <p class="text-red-500">Card not found!</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const cardId = Number(route.params.id)

const allCards = ref([
  {
    id: 1,
    title: 'Zoo',
    image: 'https://english.cambodiadaily.com/wp-content/uploads/2016/04/cam-photo-tiger.jpg',
    description: 'This is a zoo with exotic animals.'
  },
  {
    id: 2,
    title: 'Beach',
    image: 'https://hanoivoyage.com/uploads//Blogs/Cambodia/Visit-Cambodia/thumnail/sihanoukville-thumbnail-01.jpg',
    description: 'A beautiful sandy beach with clear waters.'
  },
  {
    id: 3,
    title: 'Waterfall',
    image: 'https://www.guidingcambodia.com/wp-content/uploads/2023/12/Phnom-Kulen-Waterfall-02-853x640-1.jpg',
    description: 'A relaxing and scenic waterfall in the forest.'
  },
  {
    id: 4,
    title: 'Mountain',
    image: 'https://khmerplaces.com/storage/posts/May2020/36WfY2yWwYZV6ll9icXs.jpg',
    description: 'A majestic mountain perfect for hiking.'
  },
  {
    id: 5,
    title: 'Forest',
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0f/99/03/fd.jpg',
    description: 'A dense forest with wildlife and adventure.'
  }
])

const card = allCards.value.find(c => c.id === cardId)
</script>
