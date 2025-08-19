<template>
    <div class="w-full min-h-screen  font-poppins px-4 py-8">
        <h2 class="text-4xl font-bold mb-10 text-purple-700 text-center drop-shadow-lg">{{ $t('FavoriteTitle') }}</h2>
        <div v-if="favorites.length === 0" class="text-center text-gray-500 text-lg mt-20">
            <i class="fa-regular fa-heart text-3xl mb-2"></i>
            <div>{{ $t('NoFavorite') }}</div>
        </div>
        <div v-else class="flex justify-center">
            <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-12 w-full max-w-7xl">
                <div v-for="place in favorites" :key="place.routeName"
                    class="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col overflow-hidden border border-purple-100 relative">
                    <!-- Heart icon for toggle favorite -->
                    <button class="absolute top-2 right-2 px-3 py-2 rounded-full transition text-sm shadow-lg"
                        @click.stop="toggleFavorite(place.routeName)" aria-label="Remove from favorites">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                            <!-- Filled heart, now white color -->
                            <path fill="pink" fill-rule="evenodd"
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </button>
                    <img :src="place.image" :alt="place.name" class="w-full h-44 object-cover" />
                    <div class="p-5 flex flex-col flex-1">
                        <h3 class="text-lg font-bold text-purple-700 mb-2">{{ place.name }}</h3>
                        <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ place.description }}</p>
                        <button
                            class="mt-auto bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded font-semibold transition"
                            @click.stop="goToProvince(place.routeName)">
                            {{ $t('GotoGuide') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Favorite',
    data() {
        return {
            favorites: [],
        };
    },
    mounted() {
        const stored = localStorage.getItem('favorites');
        this.favorites = stored ? JSON.parse(stored) : [];
    },
    methods: {
        goToProvince(routeName) {
            this.$router.push(`/guide/${routeName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`);
        },
        toggleFavorite(routeName) {
            this.favorites = this.favorites.filter(p => p.routeName !== routeName);
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        },
    },
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>