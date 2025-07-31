<template>
  <div class="font-poppins text-gray-900 bg-white">
    <!-- Hero Section -->
    <section class="relative w-full h-80 sm:h-96">
      <img
        src="https://images.unsplash.com/photo-1566928102313-7c0d3bc7c59f?auto=format&fit=crop&w=1400&q=80"
        alt="Prey Veng"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 class="text-white text-4xl font-bold">Welcome to Prey Veng</h1>
      </div>
    </section>

    <!-- About -->
    <section class="pt-12 pb-6 pr-16 pl-16 py-10 max-w-5xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">About Prey Veng</h2>
      <p>
        Prey Veng, meaning "Long Forest" in Khmer, is a largely agricultural province in southeastern Cambodia. Known for its scenic rice paddies and friendly local communities, Prey Veng offers a quiet countryside atmosphere.
      </p>
    </section>

    <!-- Top Attractions -->
    <section class="bg-gray-50 pt-12 pb-6 pr-16 pl-16 py-10">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl font-bold mb-6">Top Attractions</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white rounded shadow p-4">
            <img class="rounded mb-2" src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Prey_Veng_landscape.jpg" alt="Rice Fields" />
            <h3 class="text-xl font-semibold">Endless Rice Fields</h3>
            <p>Experience the peaceful and picturesque landscapes of Cambodia’s countryside.</p>
          </div>
          <div class="bg-white rounded shadow p-4">
            <img class="rounded mb-2" src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Prey_Veng_River.jpg" alt="Mekong Side" />
            <h3 class="text-xl font-semibold">Mekong River Views</h3>
            <p>Relax along the riverbanks and watch the sunset over the water.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Things to Do -->
    <section class="pt-12 pb-6 pr-16 pl-16 py-10 max-w-5xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">Things to Do</h2>
      <ul class="list-disc pl-6">
        <li>Explore traditional Khmer villages</li>
        <li>Bike around rice paddies and rivers</li>
        <li>Join in on local festivals and cultural events</li>
        <li>Try regional dishes and local snacks</li>
      </ul>
    </section>

    <!-- Travel Tips -->
    <section class="bg-gray-50 pt-12 pb-6 pr-16 pl-16 py-10">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl font-bold mb-4">Travel Tips</h2>
        <ul class="list-disc pl-6">
          <li>Bring sunscreen and a hat for sunny days</li>
          <li>English is not widely spoken – basic Khmer phrases help!</li>
          <li>Use bicycles or tuk-tuks to get around locally</li>
        </ul>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="pt-12 pb-6 pr-16 pl-16 py-10 max-w-5xl mx-auto">
      <h2 class="text-2xl font-bold mb-6">Photo Gallery</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/52/Prey_Veng_paddy.jpg" alt="Gallery 1" class="rounded" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Prey_Veng_farmers.jpg" alt="Gallery 2" class="rounded" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Countryside_Prey_Veng.jpg" alt="Gallery 3" class="rounded" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Prey_Veng_Temple.jpg" alt="Gallery 4" class="rounded" />
      </div>
    </section>

    <!-- Map -->
    <section class="pt-12 pb-6 pr-16 pl-16 py-10">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl font-bold mb-4">Province Map</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7832030.040007476!2d104.50014113092404!3d11.509255788374085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310cdb5274d4c5f3%3A0xe6f0b03b1c946398!2sPrey%20Veng!5e0!3m2!1sen!2skh!4v1625262067795"
          width="100%"
          height="400"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PreyVeng',
}
</script>

<style scoped>
</style>
