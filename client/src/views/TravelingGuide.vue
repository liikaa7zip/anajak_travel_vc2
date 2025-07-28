<template>

<div class="w-full font-poppins bg-gray-100 text-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative w-full h-80 overflow-hidden rounded-b-md">
        <img
            src="https://asiapioneertravel.com/wp-content/uploads/2024/04/cambodia-family-holiday.jpg"
            alt="Cambodia"
            class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black bg-opacity-40 justify-center flex items-center px-6">
            <h1 class="text-white text-3xl sm:text-4xl font-bold text-center">
                🗺️ Welcome to the travel guide, <br />
                <span class="text-xl">and go to your dream place in Cambodia.</span>
            </h1>
        </div>
    </section>

    <!-- Destinations List -->
    <section class="bg-white mx-6 mb-6 p-6 rounded-xl shadow-md sm:mx-1 sm:p-4">
        <h3 class="mb-4 font-semibold text-lg">Travel for destinations</h3>
        <div class="flex flex-wrap gap-8 sm:gap-4 justify-between">
            <div class="min-w-[140px] flex flex-col gap-1 text-sm">
                <span>Banteay Meanchey</span>
                <span>Kampong Thom</span>
                <span>Stung Treng</span>
                <span>Rattanakiri</span>
                <span>Oddar Meanchey</span>
            </div>
            <div class="min-w-[140px] flex flex-col gap-1 text-sm">
                <span>Preah Vihear</span>
                <span>Takeo</span>
                <span>Sihanouk ville</span>
                <span>Pursat</span>
                <span>Mondulkiri</span>
            </div>
            <div class="min-w-[140px] flex flex-col gap-1 text-sm">
                <span>Svay Rieng</span>
                <span>Siem Reap</span>
                <span>Prey Veng</span>
                <span>Kratie</span>
                <span>Kampong Chhnang</span>
            </div>
            <div class="min-w-[140px] flex flex-col gap-1 text-sm">
                <span>Kampong Cham</span>
                <span>Battambang</span>
                <span>Phnom Penh</span>
                <span>Tbong Khmum</span>
                <span>Koh Kong</span>
            </div>
            <div class="min-w-[140px] flex flex-col gap-1 text-sm">
                <span>Kep</span>
                <span>Kandal</span>
                <span>Kampot</span>
                <span>Kampong Speu</span>
                <span>Pailin</span>
            </div>
        </div>
    </section>

    <!-- Province Cards -->
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-6">
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'BanteayMeanchey' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
                <img src="https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Banteay-Meanchey2.jpg?fit=1024%2C683&ssl=1" alt="Banteay Meanchey" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Banteay Meanchey</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
            
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'PreahVihear' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://www.birdguideasso.org/wp-content/uploads/2018/09/Preah-Vihear-Temple-1-e1545105862913.jpg" alt="Preah Vihear" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Preah Vihear</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'KampongThom' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://www.ppmlgroup.com/wp-content/uploads/2022/02/5b2b2134f3661.jpg" alt="Kampong Thom" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Kampong Thom</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'Takeo' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://dnf06fpg9xipc.cloudfront.net/geocambodia/province-landmark/21.jpg" alt="Takeo" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Takeo</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'SvayRieng' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://tourismcambodia.org/storage/uploads/category_banner/ministry-of-tourism-cambodia-2019-02-11-07-23-27am-Svay-Rieng-Taxi-in-Cambodia.png" alt="Svay Rieng" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Svay Rieng</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'StungTreng' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Stueng-Treng-5.jpg?fit=1001%2C683&ssl=1" alt="Stung Treng" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Stung Treng</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'Sihanoukville' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://mediaim.expedia.com/destination/1/492c45494b515ffc04169afcad554808.jpg" alt="Sihanoukville" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Sihanouk ville</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'SiemReap' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://cms.siemreaper.click/uploads/angkor_wat2712_4e0d04bf8f.jpeg" alt="Siem Reap" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Siem Reap</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'Rattanakiri' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://khmerplaces.com/storage/provinces/September2020/QDgd8Maca0dOirc0xI4v.jpg" alt="Rattanakiri" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Rattanakiri</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'Pursat' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://visitlocaltravel.com/blog/wp-content/uploads/2024/03/Pursat-Province.png" alt="Pursat" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Pursat</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'PreyVeng' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkgdLEtXKbWJfrmIc-2vfaSfDEh5pOFu-RZg&s" alt="Prey Veng" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Prey Veng</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'Pailin' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://www.shutterstock.com/image-photo/pailin-city-province-cambodia-july-260nw-2332159129.jpg" alt="Pailin" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Pailin</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'OddarMeanchey' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/03/ministry-of-tourism-cambodia-2019-02-18-07-39-42am-Oddar-Meanchey-01.jpg" alt="Oddar Meanchey" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Oddar Meanchey</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'Mondulkiri' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Mondulkiri3.jpg?fit=1024%2C751&ssl=1" alt="Mondulkiri" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Mondulkiri</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'Kratie' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://visitlocaltravel.com/blog/wp-content/uploads/2024/02/Kratie-Province.png" alt="Kratie" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Kratie</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'KampongChhnang' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://pppenglish.sgp1.digitaloceanspaces.com/image/main/field/image/img_6722.jpg" alt="Kampong Chhnang" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Kampong Chhnang</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'KampongCham' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://khmerplaces.com/storage/provinces/August2020/SKG2ZykZUT7xz4q6t9kF.jpg" alt="Kampong Cham" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Kampong Cham</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'BattamBang' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://pppenglish.sgp1.digitaloceanspaces.com/image/main/field/image/a_statue_of_lok_ta_dambang_kronhung_at_his_namesake_roundabout_on_national_road_5_in_battambang_town._yousos_apdoulrashim.jpg" alt="Battambang" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Battambang</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'PhnomPenh' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://www.angkor7thtravel.com/images/destination/1673244202_0!!-!!Independence%20Monument.jpg" alt="Phnom Penh" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Phnom Penh</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'TbongKhmum' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Tbong-Khmum-3.jpg?fit=600%2C428&ssl=1" alt="Tbong Khmum" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Tbong Khmum</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'KohKong' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Koh-Kong3.jpg?fit=1024%2C722&ssl=1" alt="Koh Kong" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Koh Kong</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'Kep' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://img.harbor-property.com/bkarticle/2021/10/25/173634624.jpg" alt="Kep" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Kep</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'Kandal' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://soprita.com/wp-content/uploads/2025/03/LleWYPYfulce13Kazygv.jpg" alt="Kandal" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Kandal</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'Kampot' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://dnf06fpg9xipc.cloudfront.net/geocambodia/province-landmark/07.jpg" alt="Kampot" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Kampot</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition">
            <router-link :to="{ name: 'KampongSpeu' }" class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
            <img src="https://www.asiakingtravel.com/cuploads/files/Kampong-Speu-1(2).jpg" alt="Kampong Speu" class="w-full h-60 object-cover" />
            <div class="p-4 pb-2">
                <h4 class="text-lg font-semibold mb-2">Kampong Speu</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-house-chimney"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bowl-food"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-bus"></i></button>
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"><i class="fa-solid fa-cloud-sun"></i></button>
                </div>
            </div>
            </router-link>
        </div>
    </section>
</div>
</template>

<script>
   
</script>

<style>
  body {
    font-family: 'Poppins', sans-serif;
  }
</style>