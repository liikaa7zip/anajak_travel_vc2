import { createI18n } from 'vue-i18n'
import PhnomPenh from './views/provinces/PhnomPenh.vue'
import KohKong from './views/provinces/KohKong.vue'
import Kandal from './views/provinces/Kandal.vue'
import KampongCham from './views/provinces/KampongCham.vue'
import KampongChhnang from './views/provinces/KampongChhnang.vue'
import KampongSpeu from './views/provinces/KampongSpeu.vue'
import KampongThom from './views/provinces/KampongThom.vue'
import Kratie from './views/provinces/Kratie.vue'
import PreyVeng from './views/provinces/PreyVeng.vue'
import SvayRieng from './views/provinces/SvayRieng.vue'
import Pursat from './views/provinces/Pursat.vue'
import OddarMeanchey from './views/provinces/OddarMeanchey.vue'
import StungTreng from './views/provinces/StungTreng.vue'
import Rattanakiri from './views/provinces/Rattanakiri.vue'
import Mondulkiri from './views/provinces/Mondulkiri.vue'
import TbongKhmum from './views/provinces/TbongKhmum.vue'
import Register from './views/Register.vue'
import { Title } from 'chart.js'
import Login from './views/Login.vue'
// Translation messages
const messages = {
    en: {
        // navbar
        logo: 'Anajak Travel',
        home: 'Home',
        about: 'About Us',
        guide: 'Traveling Guide',
        travelBookings: 'Travel Bookings',
        transportations: 'TRANSPORTATIONS',
        hotelsDining: 'HOTELS & DINING',
        moreServices: 'MORE SERVICES',
        flight: 'Flight Reservation',
        car: 'Car Rental',
        bus: 'Bus Tickets',
        boat: 'Boat Tickets',
        hotel: 'Hotel Booking',
        restaurant: 'Restaurant Reservations',
        plan: 'User Plan',
        itinerary: 'Travel Itinerary',
        favorite: 'My Favorite',
        blog: 'Blog Page',
        Review: 'Review',
        english: 'English',
        khmer: 'Khmer',
        login: 'Login',
        signup: 'Sign Up',
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout',
        adminDashboard: 'Admin Dashboard',
        hotelDashboard: 'Hotel Dashboard',
        restaurantDashboard: 'Restaurant Dashboard',

        // Home page
        heroTagline: 'Explore the world!',
        heroTitleFrom: 'From',
        heroTitleCambodia: 'Cambodia',
        heroTitleWorld: 'to the World.',
        heroDescription:
            'Stay updated with recommendations and discover amazing destinations across Cambodia and beyond.',
        heroImageAlt: 'Cambodia destination',
        explore: 'Explore',
        learnMore: 'Learn More',
        popularThingsTitle: 'Popular things to do',
        seeAll: 'See all',
        cityTours: 'City Tours',
        culturalTours: 'Cultural Tours',
        dayCruises: 'Day Cruises',
        busTours: 'Bus Tours',
        beachTours: 'Beach Tours',
        foodTours: 'Food Tours',
        toursCount: '99+ Tours',
        trendingDestinationsTitle: 'Trending Destinations',
        destinations: {
            cruises: {
                name: 'Cruises',
                description: 'Scenic island cruise adventure',
                badge: 'Popular'
            },
            beachTours: {
                name: 'Beach Tours',
                description: 'Tropical beach getaway',
                badge: 'Popular'
            },
            museumTour: {
                name: 'Museum Tour',
                description: 'Explore Khmer history and culture',
                badge: 'Trending'
            },
            food: {
                name: 'Food',
                description: 'Authentic Khmer dishes by the river',
                badge: 'Popular'
            },
            hiking: {
                name: 'Hiking',
                description: 'Jungle trek and nature walk',
                badge: 'Popular'
            },
            cityTours: {
                name: 'City Tours',
                description: 'Discover Phnom Penh\'s urban charm',
                badge: 'Popular'
            }
        },
        keyFeaturesSubtitle: 'KEY FEATURES',
        keyFeaturesTitle: 'We offer best services',
        keyFeaturesDescription:
            'Hay! Anajak Travel there to help you find your dream holiday. Easy you just find where you want to go and buy the ticket.',
        feature1Title: 'Select itinerary',
        feature1Description:
            'Choose from our curated travel plans or create your own custom itinerary.',
        feature2Title: 'Schedule your trip',
        feature2Description:
            'Plan your perfect timing with our flexible scheduling system.',
        feature3Title: 'Big discount',
        feature3Description:
            'Enjoy exclusive deals and discounts on all our travel packages.',
        featureImageAlt: 'Cambodia destination',
        reviewsTitle: 'Customer Reviews',
        reviewsBackgroundAlt: 'Cambodia temple background',
        reviews: {
            sebastian: {
                name: 'Sebastian',
                role: 'Graphic Designer',
                comment: 'This app is amazing! I love how easy it is to find beautiful places in Cambodia. The design is clean and simple to use. Great job!'
            },
            evangeline: {
                name: 'Evangeline',
                role: 'Model',
                comment: 'I planned my whole trip using this app. The itinerary feature is super helpful. Would love to see more destinations added soon!'
            },
            alexander: {
                name: 'Alexander',
                role: 'Software Engineer',
                comment: 'I really like the Khmer and English language switch—it makes it so easy for me and my friends to use together. Thank you for thinking of that!'
            },
            michael: {
                name: 'Michael',
                role: 'Travel Blogger',
                comment: 'Nice UI and fast performance. I especially love the "Favorites" feature. Please add booking functionality next!'
            },
            sarah: {
                name: 'Sarah',
                role: 'Photographer',
                comment: 'I’m so impressed! It’s perfect for students like me who want to travel on a budget. Very informative and helpful.'
            },
            david: {
                name: 'David',
                role: 'Adventure Seeker',
                comment: 'A great travel app overall. It helped me discover places I’ve never heard of before. Just wish it had offline support too.'
            }
        },

        // About page
        contact: 'Contact',
        ourWorldsTitle: 'Our Worlds',
        ourWorldsDescription: 'As a family run business, nothing is more important than our relationship with our clients.',
        ourStory: 'Our Story',
        aboutUs: 'About Us',
        aboutUsDescription: 'We are a passionate travel team dedicated to helping you discover the beauty of Cambodia. From ancient temples and cultural heritage to stunning natural landscapes, we offer unforgettable travel experiences. Whether you\'re planning an adventure, a family trip, or a relaxing getaway, we make your journey easy, safe, and memorable.',
        contactUs: 'Contact Us',
        imageAlt: 'Cambodia destination',
        destinationsTitle: 'Discover Your Destinations',
        viewAll: 'View All',
        faqsTitle: 'FAQs',
        faqsDescription: 'Find quick answers to common questions about booking, payments, cancellations, security, and travel requirements. This section helps you get the information you need—fast and hassle-free.',
        insightsTitle: 'Popular Blogs',
        slides: [
            {
                title: 'Unveil the Mysteries of Ancient Cambodia',
                subtitle: 'Explore the beauty and culture of Cambodia and beyond.',
                image: 'https://blog.takemetour.com/wp-content/uploads/2019/07/Ta-Prohm-Temple-1024x681.jpg'
            },
            {
                title: 'Embrace the Serenity of Sunset Temples',
                subtitle: 'Join us for unforgettable experiences.',
                image: 'https://plus.unsplash.com/premium_photo-1661907933652-9f43a2a6031c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtYm9kaWElMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D'
            },
            {
                title: 'Journey Through Rural Traditions',
                subtitle: 'Immerse yourself in local traditions.',
                image: 'https://beta-planet.gvi.co.uk/wp-content/uploads/2023/02/1662325452-2023-feb-24-16-17-14-000000-tonle-sap-cambodia-2021-08-26-18-15-03-utc.jpg'
            }
        ],
        worldCards: [
            {
                id: 1,
                title: 'Zoo',
                image: 'https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYTdlMmI1MDIwLTRlNTEtMTFlZi04MTJjLTliYTA0YmVhNDc2Zi5qcGc=',
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
        ],
        faqs: [
            {
                id: 1,
                question: 'How do I book a trip on your website?',
                answer: 'Just choose your destination, select your travel dates, click “Book Now,” fill in your details, and make the payment. You’ll get a confirmation email right after!'
            },
            {
                id: 2,
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, including Visa, MasterCard, American Express, and Discover. We also support payments via PayPal and bank transfers for certain bookings.'
            },
            {
                id: 3,
                question: 'Is my payment secure?',
                answer: 'Yes, your payment security is our top priority. We use industry-standard encryption and secure payment gateways to protect your personal and financial information.'
            },
            {
                id: 4,
                question: 'When will my credit card be charged?',
                answer: 'Your credit card will typically be charged at the time of booking confirmation. For some specific packages or services, a deposit might be charged initially, with the remaining balance due closer to your travel date.'
            },
            {
                id: 5,
                question: 'Can I cancel or modify my booking?',
                answer: 'Cancellation and modification policies vary depending on the specific trip or service booked. Please refer to the terms and conditions provided during the booking process or contact our support team for assistance.'
            },
            {
                id: 6,
                question: 'What are your cancellation and refund policies?',
                answer: 'Our cancellation and refund policies are detailed in the terms and conditions of each booking. Generally, refunds are subject to cancellation fees and timing relative to your departure date. We recommend reviewing these policies carefully before confirming your booking.'
            },
            {
                id: 7,
                question: 'Do I need a visa to travel to my destination?',
                answer: 'Visa requirements depend on your nationality and the destination country. We advise checking the latest visa regulations with the embassy or consulate of your destination country well in advance of your travel date.'
            }
        ],
        insights: [
            {
                id: 1,
                title: 'Sampov Mountain',
                description: 'A scenic mountain with caves, temples, and deep historical stories.',
                image: 'https://www.gocambodia.tours/wp-content/uploads/2016/12/On-the-top-of-Phnom-Sampeou-Mountain.jpg'
            },
            {
                id: 2,
                title: 'Ta Muen Thom Temple',
                description: 'An ancient Khmer temple hidden in the forest near the Thai border.',
                image: 'https://mel365.com/wp-content/uploads/2015/03/Prasat-Hin-Muang-Tum_20121227_037_Historical-Park_-Khmer_-Prasat-Ta-Moan-Thom_-Temple_-Thailand.jpg'
            },
            {
                id: 3,
                title: 'Koh Rong',
                description: 'A tropical island with white sand beaches and crystal-clear waters.',
                image: 'https://images.mrandmrssmith.com/images/698x522/4390977-song-saa-private-island-koh-rong-islands-cambodia.jpg'
            },
            {
                id: 4,
                title: 'Kirirom',
                description: 'A peaceful national park with pine forests, cool air, and waterfalls.',
                image: 'https://www.asiakingtravel.com/cUploads/files/Kampong-Speu/Kirirom%20National%20Park/Kirirom-National-Park-1.jpg'
            }
        ],
        destinations: [
            {
                AngkorWat: 'Angkor Wat',
                description: 'The world\'s largest religious monument',
            },
            {
                KampotRiver: 'Kampot River',
                description: 'Scenic riverside and countryside life',
            },
            {
                PhnomPenh: 'Phnom Penh',
                description: 'Capital city with rich culture',
            },
            {
                BananTemple: 'Banan Temple',
                description: 'Many temples in Battambang',
            }
        ],

        // Favorite 
        FavoriteTitle: 'My Favorite Places',
        GotoGuide: 'Go to guide',
        NoFavorite: 'No favorite places yet.',

        // Traveling Guide page
        heroTitle: '🗺️ Welcome to the travel guide, ',
        heroSubtitle: 'and go to your dream place in Cambodia.',
        travelGuideTitle: 'Explore Cambodian Provinces',
        BanteayMeanchey: "Banteay Meanchey",
        KampongThom: "Kampong Thom",
        StungTreng: "Stung Treng",
        Rattanakiri: "Rattanakiri",
        OddarMeanchey: "Oddar Meanchey",
        PreahVihear: "Preah Vihear",
        Takeo: "Takeo",
        SihanoukVille: "Sihanouk Ville",
        Pursat: "Pursat",
        Mondulkiri: "Mondulkiri",
        SvayRieng: "Svay Rieng",
        SiemReap: "Siem Reap",
        PreyVeng: "Prey Veng",
        Kratie: "Kratie",
        KampongChhnang: "Kampong Chhnang",
        KampongCham: "Kampong Cham",
        Battambang: "Battambang",
        PhnomPenh: "Phnom Penh",
        TbongKhmum: "Tbong Khmum",
        KohKong: "Koh Kong",
        Kep: "Kep",
        Kandal: "Kandal",
        Kampot: "Kampot",
        KampongSpeu: "Kampong Speu",
        Pailin: "Pailin",
        provinces: {
            Battambang: {
                name: "Battambang",
                description: "Rich in colonial architecture and rice fields.",
            },
            SiemReap: {
                name: "Siem Reap",
                description: "A city with significant historical importance and colonial architecture.",
            },
            PhnomPenh: {
                name: "Phnom Penh",
                description: "Bustling capital with rich history and culture.",
            },
            Kampot: {
                name: "Kampot",
                description: "Charming riverside town with pepper farms.",
            },
            Kep: {
                name: "Kep",
                description: "Famous for crab market and coastal views.",
            },
            Sihanoukville: {
                name: "Sihanoukville",
                description: "Gateway to Cambodia’s islands and beaches.",
            },
            Pailin: {
                name: "Pailin",
                description: "Mountains, gems, and peaceful countryside.",
            },
            KohKong: {
                name: "Koh Kong",
                description: "Lush rainforest and untouched beaches.",
            },
            Takeo: {
                name: "Takeo",
                description: "Ancient temples and cultural sites.",
            },
            Kandal: {
                name: "Kandal",
                description: "Surrounds Phnom Penh with villages and farms.",
            },
            KampongCham: {
                name: "Kampong Cham",
                description: "Known for rubber plantations and bridges.",
            },
            KampongChhnang: {
                name: "Kampong Chhnang",
                description: "Floating villages and traditional pottery.",
            },
            KampongSpeu: {
                name: "Kampong Speu",
                description: "Hiking and waterfalls near Phnom Aural.",
            },
            KampongThom: {
                name: "Kampong Thom",
                description: "Central hub with ancient Sambor Prei Kuk.",
            },
            Kratie: {
                name: "Kratie",
                description: "Home of Irrawaddy dolphins along the Mekong.",
            },
            PreyVeng: {
                name: "Prey Veng",
                description: "Scenic province with hidden countryside charm.",
            },
            SvayRieng: {
                name: "Svay Rieng",
                description: "Borders Vietnam and full of rice fields.",
            },
            Pursat: {
                name: "Pursat",
                description: "Marble carving and Cardamom Mountains.",
            },
            OddarMeanchey: {
                name: "Oddar Meanchey",
                description: "Remote province with forests and temples.",
            },
            PreahVihear: {
                name: "Preah Vihear",
                description: "UNESCO temple on a mountaintop border.",
            },
            StungTreng: {
                name: "Stung Treng",
                description: "River town at the Laos border.",
            },
            Rattanakiri: {
                name: "Rattanakiri",
                description: "Waterfalls, forests, and ethnic villages.",
            },
            Mondulkiri: {
                name: "Mondulkiri",
                description: "Cool climate and elephant sanctuaries.",
            },
            TbongKhmum: {
                name: "Tbong Khmum",
                description: "Split from Kampong Cham; rural and peaceful.",
            },
            BanteayMeanchey: {
                name: "Banteay Meanchey",
                description: "Border province with temples and markets.",
            }
        },
        // Province details
        Province: {
            Battambang: {
                btbHeroTitle: "Battambang",
                btbHeroSubtitle: "Province",
                aboutBTB: "About Battambang Province",
                aboutBTBDescription: "Battambang is the second-largest city in Cambodia and serves as the capital of Battambang Province. Though less hectic than Phnom Penh or Siem Reap, it offers a more authentic, peaceful Cambodian experience. It is known for its preserved French colonial buildings, vibrant art scene, and rice-producing countryside.",
                Attractions: "Top Attractions",
                ThingsToDo: "Things to Do",
                BambooTrain: "Ride the Bamboo Train",
                CookingClass: "Join a Khmer Cooking Class",
                ArtGalleries: "Visit Art Galleries",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Apr",
                Transport: "Transport: Bus, Taxi, Train, Plane",
                DressCode: "Dress modestly for temple visits",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            BanteayMeanchey: {
                BMCHeroTitle: "Banteay Meanchey",
                BMCHeroSubtitle: "Province",
                aboutBMC: "About Banteay Meanchey Province",
                aboutBMCDescription: "This province is in the northwest of Cambodia. It’s close to Thailand and has old temples and quiet countryside. The city is called Sisophon.Banteay Meanchey lies in northwestern Cambodia, bordering Thailand, with its capital Sisophon (Serei Saophoan) and the historic temple of Banteay Chhmar. Highlights include hilltop shrines like Phnom Bak and Phnom Chenh Chiang, wetlands at Ang Trapeang Thma, and unique local markets.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Banteay Chhmar Temple",
                    Second: "Phnom Bak",
                    Third: "Wat Banteay Neang",
                    Fourth: "Ang Trapeang Thmor"
                },

                ThingsToDo: "Things to Do",
                First: "Visit Banteay Chhmar",
                Second: "Go bird-watching at the Ang Trapeang Thmor lake",
                Third: "Explore Sisophon Market to see local life",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Apr",
                Transport: "Transport: Bus, Taxi, Train, Plane",
                DressCode: "Dress modestly for temple visits",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            SiemReap: {
                SRHeroTitle: "Siem Reap",
                SRHeroSubtitle: "Province",
                aboutSR: "About Siem Reap Province",
                aboutSRDescription: "Siem Reap, meaning “Defeat of Siam”, is the tourism capital of Cambodia. While its name originates from historical conflict, today Siem Reap is a peaceful hub that blends ancient Khmer heritage with a bustling modern lifestyle. The city offers a wide range of experiences — from exploring ancient temples and traditional villages to enjoying luxury hotels, nightlife, and artisan markets.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Angkor Wat",
                    Second: "Bayon Temple",
                    Third: "Ta Prohm",
                    Fourth: "Tonle Sap Lake"
                },
                ThingsToDo: "Things to Do",
                First: "Visit Angkor Wat",
                Second: "Visit the Floating Villages on Tonle Sap Lake",
                Third: "Enjoy the night market",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Feb",
                Transport: "Transport: Tuk-tuk, Taxi, Bicycle",
                DressCode: "Wear comfortable shoes for temple visits",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            PhnomPenh: {
                PPHeroTitle: "Phnom Penh",
                PPHeroSubtitle: "Capital City",
                aboutPP: "About Phnom Penh Capital City",
                aboutPPDescription: "Phnom Penh is Cambodia’s bustling capital located at the confluence of the Mekong and Tonle Sap Rivers. The city blends French colonial charm with modern development and Khmer culture. Attractions include the Royal Palace, Silver Pagoda, and historic sites like the Killing Fields and Tuol Sleng Genocide Museum.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Royal Palace",
                    Second: "Tuol Sleng Genocide Museum",
                    Third: "Wat Phnom",
                    Fourth: "Central Market"
                },
                ThingsToDo: "Things to Do",
                First: "Tour the Royal Palace and Silver Pagoda",
                Second: "Visit Tuol Sleng Genocide Museum (S21)",
                Third: "Shop at Central and Russian Markets",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Feb",
                Transport: "Transport: Tuk-tuks, taxis, Grab app",
                DressCode: "Stay alert in busy traffic and markets",
                PhotoGallery: "Photo Gallery",
                Map: "City Map",
            },
            Kampot: {
                KPHeroTitle: "Kampot",
                KPHeroSubtitle: "Province",
                aboutKP: "About Kampot Province",
                aboutKPDescription: "Kampot is a charming province in southern Cambodia, famous for its French colonial architecture, riverside atmosphere, and world-renowned Kampot pepper. The town lies along the Praek Tuek Chhu River with scenic views of nearby Bokor Mountain. Kampot offers a blend of natural beauty, history, and relaxed vibes.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Bokor National Park",
                    Second: "Kampot Pepper Farms",
                    Third: "Kampot River",
                    Fourth: "Old French Quarter"
                },
                ThingsToDo: "Things to Do",
                First: "Take a boat ride on Kampot River",
                Second: "Visit Bokor National Park",
                Third: "Explore the pepper plantations",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Mar",
                Transport: "Transport: Minivan, taxi, or motorbike",
                DressCode: "Bring insect repellent for nature areas",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            Kep: {
                KepHeroTitle: "Kep",
                KepHeroSubtitle: "Province",
                aboutKep: "About Kep Province",
                aboutKepDescription: "Kep is Cambodia’s smallest province, located in the country’s southern coastal region. Once a vibrant beach retreat for French colonials and Cambodian elites in the 1960s, today it offers a quiet, charming escape with a mix of crumbling villas, seafood delights, serene beaches, and natural beauty. Known for its blue crab, pepper farms, and lush hills, Kep is a perfect destination for relaxation and eco-tourism, with nearby access to islands and national parks.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Kep Crab Market",
                    Second: "Koh Tonsay",
                    Third: "Kep National Park",
                    Fourth: "Abandoned Villas"
                },
                ThingsToDo: "Things to Do",
                First: "Visit the famous Kep Crab Market",
                Second: "Hike in Kep National Park",
                Third: "Take a boat to Rabbit Island (Koh Tonsay)",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Mar (cool and dry)",
                Transport: "Pack light clothing and insect repellent",
                DressCode: "Consider renting a scooter for flexible travel",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            Sihanoukville: {
                SHVHeroTitle: "Sihanoukville",
                SHVHeroSubtitle: "City",
                aboutSHV: "About Sihanoukville City",
                aboutSHVDescription: "Also known as Kampong Som, Sihanoukville is Cambodia’s primary coastal province, named after the late King Norodom Sihanouk. Once a backpacker's beach town, it has transformed into a city of high-rise casinos, luxury resorts, and economic development. Beyond the urban expansion, Sihanoukville offers access to some of the most beautiful islands in Southeast Asia.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Otres Beach",
                    Second: "Koh Rong Island",
                    Third: "Serendipity Beach",
                    Fourth: "Golden Lion Circle"
                },
                ThingsToDo: "Things to Do",
                First: "Relax at Otres Beach",
                Second: "Visit Koh Rong Island",
                Third: "Explore the casinos",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Feb",
                Transport: "Transport: Taxi, Ferry",
                DressCode: "Book accommodations in advance",
                PhotoGallery: "Photo Gallery",
                Map: "City Map",
            },
            Pailin: {
                PLHeroTitle: "Pailin",
                PLHeroSubtitle: "Province",
                aboutPL: "About Pailin Province",
                aboutPLDescription: "Pailin is a small, quiet province located in western Cambodia, near the border with Thailand. Once infamous as a Khmer Rouge stronghold and a hub for gem mining, Pailin today is a peaceful area known for its scenic landscapes, gemstone markets, and cultural blend influenced by both Cambodian and Thai traditions. Surrounded by the beautiful Cardamom Mountains, it offers a tranquil getaway for nature lovers, history buffs, and off-the-beaten-path travelers.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Phnom Yat Waterfall",
                    Second: "Wat Rattanak Sophoan",
                    Third: "Pailin Waterfall",
                    Fourth: "Gem Museum"
                },
                ThingsToDo: "Things to Do",
                First: "Visit Phnom Yat Waterfall",
                Second: "Explore O’Smach Border Area",
                Third: "Discover local gem markets",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Mar",
                Transport: "Transport: Motorbike, Taxi",
                DressCode: "Carry cash for small vendors",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            KohKong: {
                KKHeroTitle: "Koh Kong",
                KKHeroSubtitle: "Province",
                aboutKK: "About Koh Kong Province",
                aboutKKDescription: "Koh Kong is a province located in southwest Cambodia, known for its lush rainforests, pristine beaches, and the Cardamom Mountains. It borders Thailand and offers adventure activities like trekking, waterfall visits, and wildlife spotting. The region is still largely untouched by mass tourism, offering a tranquil nature escape.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Cardamom Mountains",
                    Second: "Koh Kong Beaches",
                    Third: "Tatai Waterfalls",
                    Fourth: "Koh Kong Islands"
                },
                ThingsToDo: "Things to Do",
                First: "Explore the Cardamom Mountains and waterfalls",
                Second: "Relax on Koh Kong’s secluded beaches",
                Third: "Visit the Tatai River and nearby islands",
                TravelTips: "Travel Tips",
                BestTime: "Best time to visit: Nov – Apr",
                Transport: "Prepare for remote travel conditions and limited facilities",
                DressCode: "Use local guides for trekking and eco-tours",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            Takeo: {
                TKHeroTitle: "Takeo",
                TKHeroSubtitle: "Province",
                aboutTK: "About Takeo Province",
                aboutTKDescription: "Takeo, often referred to as the \"Cradle of Khmer Civilization\", is a province rich in ancient history and archaeological wonders. It is home to Angkor Borei and Phnom Da, two sites that provide a glimpse into Cambodia's pre-Angkorian past. Surrounded by rice paddies and small fishing communities, the province offers a peaceful and cultural escape.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Angkor Borei",
                    Second: "Phnom Da",
                    Third: "Tonle Bati",
                    Fourth: "Chiso Mountain"
                },
                ThingsToDo: "Things to Do",
                First: "Explore Angkor Borei archaeological site",
                Second: "Climb Phnom Da Temple mountain",
                Third: "Visit the ancient Ta Prohm Temple in Tonle Bati",
                TravelTips: "Travel Tips",
                BestTime: "Visit during dry season (Nov–Mar) for best access",
                Transport: "Bring sunscreen, hat, and water for temple hikes",
                DressCode: "Local guides can enrich your historical experience",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            Kandal: {
                KDHeroTitle: "Kandal",
                KDHeroSubtitle: "Province",
                aboutKD: "About Kandal Province",
                aboutKDDescription: "Kandal Province surrounds Cambodia’s capital, Phnom Penh, making it a strategically important and accessible region. Despite its proximity to the bustling capital, Kandal retains a peaceful, rural atmosphere with traditional Khmer villages, lush rice fields, and tranquil riverfronts. The province is divided by the mighty Mekong and Bassac Rivers, offering beautiful landscapes and fertile farmlands. It’s a great destination for travelers seeking a short escape from Phnom Penh to experience authentic countryside life, local industries, and pagoda-filled scenery.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Udong Mountain",
                    Second: "Takhmao Town",
                    Third: "Koh Dach Island",
                    Fourth: "Kien Svay Floating Market"
                },
                ThingsToDo: "Things to Do",
                First: "Visit Udong Mountain",
                Second: "Explore the Mekong River islands",
                Third: "Experience local markets",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Mar",
                Transport: "Transport: Bus, Taxi, Boat",
                DressCode: "Dress comfortably for river trips",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            KampongCham: {
                KPCHeroTitle: "Kampong Cham",
                KPCHeroSubtitle: "Province",
                aboutKPC: "About Kampong Cham Province",
                aboutKPCDescription: "Kampong Cham is one of Cambodia’s most culturally rich provinces. The name means 'Port of the Chams,' referencing the Cham people, an ethnic minority group with Islamic heritage. The province is known for its peaceful riverside atmosphere, historical temples, and old French colonial buildings. It offers an authentic glimpse into rural Cambodian life.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Phnom Pros and Phnom Srey",
                    Second: "Bamboo Bridge",
                    Third: "Mekong River",
                    Fourth: "Wat Nokor"
                },
                ThingsToDo: "Things to Do",
                First: "Visit Phnom Pros and Phnom Srey",
                Second: "Explore the Bamboo Bridge",
                Third: "Enjoy the Mekong River views",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Mar",
                Transport: "Transport: Bus, Motorbike",
                DressCode: "Bring a hat for sun protection",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            KampongChhnang: {
                KPCHHeroTitle: "Kampong Chhnang",
                KPCHeroSubtitle: "Province",
                aboutKPCH: "About Kampong Chhnang Province",
                aboutKPCHDescription: "Kampong Chhnang, meaning “Port of Pottery,” is a central province in Cambodia, located along the Tonlé Sap River. Known for its scenic landscapes, floating villages, and traditional pottery, Kampong Chhnang is rich in history, culture, and natural beauty. It serves as a vital agricultural hub, especially for rice farming, due to its fertile plains and proximity to waterways.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Pottery Villages",
                    Second: "Floating Villages",
                    Third: "Tonle Sap River",
                    Fourth: "Makong River"
                },
                ThingsToDo: "Things to Do",
                First: "Visit Pottery Villages",
                Second: "Explore the Floating Villages",
                Third: "Take a boat ride on Tonle Sap",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Mar",
                Transport: "Transport: Boat, Motorbike",
                DressCode: "Bring a camera for scenery",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            KampongSpeu: {
                KPSHeroTitle: "Kampong Speu",
                KPSHeroSubtitle: "Province",
                aboutKPS: "About Kampong Speu Province",
                aboutKPSDescription: "Kampong Speu, meaning 'Port of Starfruit,' is a province in central Cambodia known for its scenic natural beauty, including waterfalls and mountains. The province is home to Kirirom National Park and Phnom Aoral, the highest peak in Cambodia. It offers eco-tourism, hiking, and adventure experiences.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Phnom Aoral",
                    Second: "Kirirom National Park",
                    Third: "Chambok Ecotourism",
                    Fourth: "Te Teuk Pus Hot Spring"
                },
                ThingsToDo: "Things to Do",
                First: "Hike Phnom Aoral",
                Second: "Visit Kirirom National Park",
                Third: "Explore Chambok Community",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Feb",
                Transport: "Transport: Private car, minivan",
                DressCode: "Pack trekking shoes",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            KampongThom: {
                KPTHeroTitle: "Kampong Thom",
                KPTHeroSubtitle: "Province",
                aboutKPT: "About Kampong Thom Province",
                aboutKPTDescription: "Kampong Thom is one of Cambodia’s largest provinces by land area and lies at the heart of the country. The name means “Great Port” in Khmer, referring to its historical role as a major trading hub along the Stung Saen River, a tributary of the Tonlé Sap. Today, Kampong Thom is known for its natural beauty, rural charm, and remarkable archaeological heritage. This province is home to Sambor Prei Kuk, a UNESCO World Heritage Site and one of Southeast Asia’s oldest temple complexes, dating back to the pre-Angkorian Chenla period (7th century). Its central location also makes it an important link between Phnom Penh and Siem Reap.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Sambor Prei Kuk",
                    Second: "Stung Sen River",
                    Third: "Prasat Andet",
                    Fourth: "Phnom Santuk"
                },
                ThingsToDo: "Things to Do",
                First: "Visit Sambor Prei Kuk",
                Second: "Explore the Stung Sen River",
                Third: "Discover local villages",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Mar",
                Transport: "Transport: Bus, Motorbike",
                DressCode: "Bring insect repellent for rural areas",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            Kratie: {
                KTHeroTitle: "Kratie",
                KTHeroSubtitle: "Province",
                aboutKT: "About Kratie Province",
                aboutKTDescription: "Kratie is a picturesque province located along the Mekong River in northeastern Cambodia. Known for its endangered Irrawaddy dolphins, peaceful riverside town, and colonial architecture, Kratie is a favorite stop for eco-tourists and travelers seeking authentic, off-the-beaten-path experiences. With lush countryside, floating villages, and river islands, Kratie offers a perfect blend of nature, wildlife, and local culture.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Irrawaddy Dolphins",
                    Second: "Koh Trong Island",
                    Third: "Phnom Sombok",
                    Fourth: "Mekong River Sunset"
                },
                ThingsToDo: "Things to Do",
                First: "Watch Irrawaddy dolphins in the Mekong River",
                Second: "Cycle around Koh Trong Island",
                Third: "Explore Phnom Sombok and the countryside",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Dec – Mar (dry season)",
                Transport: "Transport: Bus or minivan from Phnom Penh",
                DressCode: "Respect local communities and dolphins’ space",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            PreyVeng: {
                PVHeroTitle: "Prey Veng",
                PVHeroSubtitle: "Province",
                aboutPV: "About Prey Veng Province",
                aboutPVDescription: "Prey Veng is a largely agricultural province in southeastern Cambodia, known for its vast rice fields and rural lifestyle. It offers a glimpse into traditional Khmer village life, with pagodas, markets, and festivals. The province is also home to several ancient temples, including Wat Preah En Kauv, dating back to the Angkor period.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Wat Preah En Kauv",
                    Second: "Prey Veng Floating Village",
                    Third: "Local Market",
                    Fourth: "Rice Fields"
                },
                ThingsToDo: "Things to Do",
                First: "Visit ancient Wat Preah En Kauv temple",
                Second: "Explore local floating villages",
                Third: "Experience rural Khmer markets and festivals",
                TravelTips: "Travel Tips",
                BestTime: "Best time to visit: Nov – Feb",
                Transport: "Travel by motorbike or local bus",
                DressCode: "Respect local customs and traditions",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            SvayRieng: {
                SRHeroTitle: "Svay Rieng",
                SRHeroSubtitle: "Province",
                aboutSR: "About Svay Rieng Province",
                aboutSRDescription: "Svay Rieng is a southeastern Cambodian province bordering Vietnam, characterized by its flat landscape and agricultural economy. It is known for its vibrant rural culture, rice farming, and traditional festivals. The province is less touristy but offers authentic local experiences and peaceful countryside views.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Local Pagodas",
                    Second: "Rural Villages",
                    Third: "Seasonal Festivals",
                    Fourth: "Rice Fields"
                },
                ThingsToDo: "Things to Do",
                First: "Visit local pagodas and temples",
                Second: "Explore traditional farming villages",
                Third: "Attend seasonal festivals and markets",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Feb for cooler weather",
                Transport: "Use local transport or rent a motorbike",
                DressCode: "Respect local customs and rural lifestyle",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            PurSat: {
                PSHeroTitle: "Pursat",
                PSHeroSubtitle: "Province",
                aboutPS: "About Pursat Province",
                aboutPSDescription: "Pursat province lies in western Cambodia, nestled between the Tonle Sap lake and the Cardamom Mountains. Known for its rich natural landscapes, including rivers and waterfalls, Pursat is also famous for its skilled stone carvers and traditional silk weaving. The province offers a mix of cultural heritage and scenic beauty.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "1005 Mountain",
                    Second: "Tonle Sap Fishing Villages",
                    Third: "Stone Carving Workshops",
                    Fourth: "Pursat River"
                },
                ThingsToDo: "Things to Do",
                First: "Trip at 1005 Mountain",
                Second: "Explore Tonle Sap lake fishing villages",
                Third: "Discover traditional stone carving workshops",
                TravelTips: "Travel Tips",
                BestTime: "Best season: Nov – Feb for cool weather",
                Transport: "Use local boats to explore lakeside areas",
                DressCode: "Hire guides for mountain trekking and cave visits",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            OddarMeanchey: {
                OMCHeroTitle: "Oddar Meanchey",
                OMCHeroSubtitle: "Province",
                aboutOMC: "About Oddar Meanchey Province",
                aboutOMCDescription: "Oddar Meanchey Province, located in northern Cambodia, is known for its remote landscapes, historical sites, and proximity to the Thai border. It offers a glimpse into rural Cambodian life.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Anlong Veng",
                    Second: "Preah Vihear Temple",
                    Third: "Samraong Town",
                    Fourth: "Border Markets"
                },
                ThingsToDo: "Things to Do",
                First: "Visit Anlong Veng",
                Second: "Explore the Preah Vihear Temple area",
                Third: "Experience local village life",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Mar",
                Transport: "Transport: Bus, Motorbike",
                DressCode: "Prepare for remote areas",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            PreahVihear: {
                PVHeroTitle: "Preah Vihear",
                PVHeroSubtitle: "Province",
                aboutPV: "About Preah Vihear Province",
                aboutPVDescription: "Preah Vihear Province, located in northern Cambodia, borders Thailand and Laos, offering a rich blend of ancient history, natural beauty, and cultural heritage. It is home to the famous Preah Vihear Temple, a UNESCO World Heritage Site perched atop the Dângrêk Mountains, overlooking vast Cambodian plains. The province is largely rural, with forested highlands, rivers, and scattered villages. It holds deep historical and spiritual significance for Cambodians and is increasingly drawing eco-tourists and history enthusiasts alike.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Preah Vihear Temple",
                    Second: "Koh Ker Temple",
                    Third: "Preah Vihear Forest",
                    Fourth: "Tbeng Meanchey Town"
                },
                ThingsToDo: "Things to Do",
                First: "Visit Preah Vihear Temple",
                Second: "Explore Koh Ker Temple",
                Third: "Hike in the local forests",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Feb",
                Transport: "Transport: 4WD, Motorbike",
                DressCode: "Prepare for remote travel",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            StungTreng: {
                STHeroTitle: "Stung Treng",
                STHeroSubtitle: "Province",
                aboutST: "About Stung Treng Province",
                aboutSTDescription: "Stung Treng is a northern Cambodian province situated along the Mekong River and near the Laos border. It is known for its dense forests, rich biodiversity, and beautiful river landscapes. The province offers excellent opportunities for ecotourism, including fishing, boat tours, and visits to protected wildlife areas.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Mekong River Tours",
                    Second: "Sekong & Sre Pok Rivers",
                    Third: "Upper Mekong Forests",
                    Fourth: "Local Villages"
                },
                ThingsToDo: "Things to Do",
                First: "Boat tours on the Mekong River",
                Second: "Visit the Sekong and Sre Pok river confluence",
                Third: "Explore the Upper Mekong protected forests",
                TravelTips: "Travel Tips",
                BestTime: "Best time to visit: Nov – Mar",
                Transport: "Bring insect repellent for forested areas",
                DressCode: "Hire local guides for nature excursions",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            Rattanakiri: {
                RTKHeroTitle: "Rattanakiri",
                RTKHeroSubtitle: "Province",
                aboutRTK: "About Rattanakiri Province",
                aboutRTKDescription: "Rattanakiri is a remote northeastern Cambodian province known for its dense forests, volcanoes, waterfalls, and indigenous hill tribes. The area is rich in natural beauty and cultural diversity, offering trekking, wildlife watching, and visits to ethnic minority villages.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Volcanic Lakes",
                    Second: "Hill Tribe Villages",
                    Third: "Virachey National Park",
                    Fourth: "Waterfalls"
                },
                ThingsToDo: "Things to Do",
                First: "Trek to volcanic lakes and waterfalls",
                Second: "Visit indigenous hill tribe villages",
                Third: "Explore the Virachey National Park",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Mar to avoid rain",
                Transport: "Bring insect repellent and hiking gear",
                DressCode: "Hire local guides for cultural tours",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            Mondulkiri: {
                MDKHeroTitle: "Mondulkiri",
                MDKHeroSubtitle: "Province",
                aboutMDK: "About Mondulkiri Province",
                aboutMDKDescription: "Located in eastern Cambodia, Mondulkiri is known for its cool climate, rolling hills, pine forests, and indigenous Bunong culture. Its capital, Sen Monorom, is a peaceful base for exploring waterfalls, elephant sanctuaries, and nature reserves like the Phnom Prich Wildlife Sanctuary. The name Mondulkiri means 'Meeting of the Hills.'",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Bou Sra Waterfall",
                    Second: "Elephant Valley Project",
                    Third: "Sen Monorom Hills",
                    Fourth: "Romnea Waterfall"
                },
                ThingsToDo: "Things to Do",
                First: "Visit Bou Sra Waterfall",
                Second: "Interact with elephants at an ethical sanctuary",
                Third: "Explore Bunong villages and traditional homes",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Feb (cool & dry)",
                Transport: "Transport: Bus or 4x4 from Phnom Penh",
                DressCode: "Respect local Bunong customs when visiting villages",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
            TbongKhmum: {
                TBKHeroTitle: "Tbong Khmum",
                TBKHeroSubtitle: "Province",
                aboutTBK: "About Tbong Khmum Province",
                aboutTBKDescription: "Tbong Khmum is a province in eastern Cambodia that was created in 2013 after splitting from Kampong Cham. It features rich agricultural lands, especially for rubber and rice production. The province offers rural charm with traditional Khmer culture and is home to several temples and natural sites.",
                Attractions: {
                    AttractionTitle: "Top Attractions",
                    First: "Wat Ek Phnom",
                    Second: "Rubber Plantations",
                    Third: "Local Villages",
                    Fourth: "Traditional Festivals"
                },
                ThingsToDo: "Things to Do",
                First: "Visit Bou Sra Waterfall",
                Second: "Interact with elephants at an ethical sanctuary",
                Third: "Explore Bunong villages and traditional homes",
                TravelTips: "Travel Tips",
                BestTime: "Best time: Nov – Feb for pleasant weather",
                Transport: "Use motorbikes or tuk-tuks for local transport",
                DressCode: "Respect local customs and dress modestly",
                PhotoGallery: "Photo Gallery",
                Map: "Province Map",
            },
        },

        // Customer Reviews
        Reviews: {
            Title: "Customer Reviews",
            Posted: "Posted",
            WriteReview: "Write a Review",
            Add: "Add",
            SubmitReview: "Submit Review",
            NoReviews: "No reviews yet. Be the first to write one!",
            NotLogIn: 'Please log in to write a review.'
        },

        // Log In
        log: {
            TitleApp: "Anajak Travel",
            Welcome: "Welcome back!",
            TitleSignIn: "Sign In",
            Email: "Email",
            placeholderEmail: "name@gmail.com",
            Password: "Password",
            SignIn: 'Sign In',
            DoNotHaveAcc: 'Do not have an account?',
            Register: 'Register'
        },
        // Register
        Register: {
            TitleApp: "Anajak Travel",
            Explore: "Explore the world with us!",
            CreateAcc: "Create Account",
            Name: "Name",
            placeholderName: "Enter your name",
            Email: "Email",
            placeholderEmail: "name@gmail.com",
            Password: "Password",
            Text: "By signing up you agree to terms and conditions at blah.",
            RegisterBtn: 'Register',
            AlreadyHaveAcc: 'Already have an account?',
            Login: 'Login'
        }
    },

    km: {
        // Log In
        log: {
            TitleApp: "អាណាចក្រធ្វើដំណើរ",
            Welcome: "សូមស្វាគមន៍ត្រឡប់មកវិញ!",
            TitleSignIn: "ចូលគណនី",
            Email: "អ៊ីមែល",
            placeholderEmail: "ឈ្មោះ@gmail.com",
            Password: "ពាក្យសម្ងាត់",
            SignIn: 'ចូលគណនី',
            DoNotHaveAcc: 'មិនទាន់មានគណនីមែនទេ?',
            Register: 'ចុះឈ្មោះ'
        },
        // Register
        Register: {
            TitleApp: "អាណាចក្រធ្វើដំណើរ",
            Explore: "ស្វែងរកពិភពលោកជាមួយយើង!",
            CreateAcc: "បង្កើតគណនី",
            Name: "ឈ្មោះ",
            placeholderName: "បញ្ចូលឈ្មោះរបស់អ្នក",
            Email: "អ៊ីមែល",
            placeholderEmail: "ឈ្មោះ@gmail.com",
            Password: "ពាក្យសម្ងាត់",
            Text: "តាមរយៈការចុះឈ្មោះ អ្នកយល់ព្រមតាមលក្ខខណ្ឌនៅ blah ",
            RegisterBtn: 'ចុះឈ្មោះ',
            AlreadyHaveAcc: 'មានគណនីរួចហើយ?',
            Login: 'ចូលគណនី'
        },

        // Province details
        Province: {
            Battambang: {
                btbHeroTitle: "បាត់ដំបង",
                btbHeroSubtitle: "ខេត្ត",
                aboutBTB: "អំពីខេត្តបាត់ដំបង",
                aboutBTBDescription: "បាត់ដំបង គឺជាទីក្រុងធំទីពីរក្នុងប្រទេសកម្ពុជា និងបម្រើជារាជធានីនៃខេត្តបាត់ដំបង។ ទោះបីជាមានភាពមមាញឹកជាងទីក្រុងភ្នំពេញ ឬខេត្តសៀមរាបក៏ដោយ វាផ្តល់នូវបទពិសោធន៍ដ៏ពិតប្រាកដ និងសន្តិភាពរបស់កម្ពុជា។ វាត្រូវបានគេស្គាល់ដោយសារអគារអាណានិគមបារាំងដែលត្រូវបានអភិរក្ស ទិដ្ឋភាពសិល្បៈដ៏រស់រវើក និងជនបទដែលផលិតស្រូវ។",
                Attractions: "ទីកន្លែងទាក់ទាញ",
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                BambooTrain: "ជិះរថភ្លើងឈើ",
                CookingClass: "ចូលរួមថ្នាក់បង្រៀនម្ហូបខ្មែរ",
                ArtGalleries: "ទស្សនាគំនូរ",
                TravelTips: "គន្លឹះដំណើរកំសាន្ត",
                BestTime: "អំឡុងពេលល្អបំផុត: វិច្ឆិកា - មីនា",
                Transport: "ការដឹកជញ្ជូន: ឡានក្រុង, តាក់ស៊ី, រថភ្លើង, យន្តហោះ",
                DressCode: "ស្លៀកពាក់សមរម្យសម្រាប់ការទស្សនាប្រាសាទ",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            BanteayMeanchey: {
                BMCHeroTitle: "បន្ទាយមានជ៍យ",
                BMCHeroSubtitle: "ខេត្ត",
                aboutBMC: "អំពីខេត្តបន្ទាយមានជ៍យ",
                aboutBMCDescription: "បន្ទាយមានជ៍យ គឺជាទីក្រុងធំទីពីរក្នុងប្រទេសកម្ពុជា និងបម្រើជារាជធានីនៃខេត្តបន្ទាយមានជ៍យ។ ទោះបីជាមានភាពមមាញឹកជាងទីក្រុងភ្នំពេញ ឬខេត្តសៀមរាបក៏ដោយ វាផ្តល់នូវបទពិសោធន៍ដ៏ពិតប្រាកដ និងសន្តិភាពរបស់កម្ពុជា។ វាត្រូវបានគេស្គាល់ដោយសារអគារអាណានិគមបារាំងដែលត្រូវបានអភិរក្ស ទិដ្ឋភាពសិល្បៈដ៏រស់រវើក និងជនបទដែលផលិតស្រូវ។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ប្រាសាទបន្ទាយឆ្មា",
                    Second: "ប្រាសាទភ្នំបាក",
                    Third: "ប្រាសាទវត្តបន្ទាយនាង",
                    Fourth: "ប្រាសាទអង្គត្រពាំងថ្ម"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាប្រាសាទបន្ទាយឆ្មា",
                Second: "ទៅមើលសត្វស្លាបនៅបឹងអាងត្រពាំងថ្ម",
                Third: "រុករកផ្សារសិរីសោភ័ណ ដើម្បីមើលជីវិតក្នុងស្រុក",
                TravelTips: "គន្លឹះដំណើរកំសាន្ត",
                BestTime: "អំឡុងពេលល្អបំផុត: វិច្ឆិកា - មេសា",
                Transport: "ការដឹកជញ្ជូន: ឡានក្រុង, តាក់ស៊ី, រថភ្លើង, យន្តហោះ",
                DressCode: "ស្លៀកពាក់សមរម្យសម្រាប់ការទស្សនាប្រាសាទ",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            SiemReap: {
                SRHeroTitle: "សៀមរាប",
                SRHeroSubtitle: "ខេត្ត",
                aboutSR: "អំពីខេត្តសៀមរាប",
                aboutSRDescription: "សៀមរាប មានន័យថា “ការបរាជ័យរបស់សៀម” គឺជារដ្ឋធានីទេសចរណ៍នៃប្រទេសកម្ពុជា។ ទោះបីជាឈ្មោះរបស់វាមកពីការប្រកួតប្រជែងប្រវត្តិសាស្ត្រ ប៉ុន្តែសៀមរាបនៅថ្ងៃនេះគឺជាគម្របស្ងប់ស្ងាត់ដែលបញ្ចូលគ្នារវាងមរតកខ្មែរបុរាណនិងរបបរស់នៅសម័យទំនើប។ ក្រុងនេះផ្តល់នូវបទពិសោធន៍ជាច្រើន — ចាប់ពីការស្វែងរកប្រាសាទបុរាណនិងភូមិប្រពៃណីរហូតដល់ការទទួលបានសណ្ឋាគារល្អឥតខ្ចោះ ការកំសាន្តនៅរាត្រី និងផ្សារអ្នកសិល្បៈ។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ប្រាសាទអង្គរ",
                    Second: "ប្រាសាទបាយ័ន",
                    Third: "ប្រាសាទតាព្រហ្ម",
                    Fourth: "ទន្លេសាប"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាប្រាសាទអង្គរ",
                Second: "ទៅមើលសត្វស្លាបនៅទន្លេសាប",
                Third: "រុករកផ្សារអ្នកសិល្បៈ",
                TravelTips: "គន្លឹះដំណើរកំសាន្ត",
                BestTime: "អំឡុងពេលល្អបំផុត: វិច្ឆិកា - កុម្ភៈ",
                Transport: "ការដឹកជញ្ជូន: តុកតុក, តាក់ស៊ី, កង់",
                DressCode: "ស្លៀកពាក់សមរម្យសម្រាប់ការទស្សនាប្រាសាទ",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            PhnomPenh: {
                PPHeroTitle: "ភ្នំពេញ",
                PPHeroSubtitle: "រាជធានី",
                aboutPP: "អំពីរាជធានីភ្នំពេញ",
                aboutPPDescription: "ភ្នំពេញ គឺជារាជធានីដ៏មមាញឹករបស់ប្រទេសកម្ពុជា ដែលមានទីតាំងនៅចំណុចប្រសព្វនៃទន្លេមេគង្គ និងទន្លេសាប។ ទីក្រុងនេះរួមបញ្ចូលគ្នានូវភាពទាក់ទាញនៃអាណានិគមបារាំងជាមួយនឹងការអភិវឌ្ឍន៍ទំនើប និងវប្បធម៌ខ្មែរ។ កន្លែងទាក់ទាញរួមមាន ព្រះបរមរាជវាំង វត្តប្រាក់ និងទីតាំងប្រវត្តិសាស្ត្រដូចជាវាលពិឃាត និងសារមន្ទីរប្រល័យពូជសាសន៍ទួលស្លែងជាដើម។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ព្រះបរមរាជវាំង",
                    Second: "មន្ទីរពិសោធន៍សម្លាប់ទួលស្លែង",
                    Third: "វត្តភ្នំ",
                    Fourth: "ផ្សារកណ្តាល"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាព្រះបរមរាជវាំង និងព្រះវិហារសំเงิน",
                Second: "ទៅមើលមន្ទីរពិសោធន៍សម្លាប់ទួលស្លែង (S21)",
                Third: "ទៅផ្សារកណ្តាល និងផ្សាររុស្ស៊ី",
                TravelTips: "គន្លឹះដំណើរកំសាន្ត",
                BestTime: "អំឡុងពេលល្អបំផុត: វិច្ឆិកា - កុម្ភៈ",
                Transport: "ការដឹកជញ្ជូន: តុកតុក, តាក់ស៊ី, កម្មវិធី Grab",
                DressCode: "ត្រូវតែប្រុងប្រយ័ត្ននៅក្នុងចរាចរដ៏មមាញឹក និងផ្សារ",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីក្រុង",
            },
            Kampot: {
                KPHeroTitle: "កំពត",
                KPHeroSubtitle: "ខេត្ត",
                aboutKP: "អំពីខេត្តកំពត",
                aboutKPDescription: "កំពតគឺជាខេត្តដ៏ទាក់ទាញមួយនៅភាគខាងត្បូងនៃប្រទេសកម្ពុជា ដែលល្បីល្បាញដោយសារស្ថាបត្យកម្មអាណានិគមបារាំង បរិយាកាសមាត់ទន្លេ និងម្រេចកំពតដ៏ល្បីល្បាញលើពិភពលោក។ ទីក្រុង​នេះ​ស្ថិត​នៅ​តាម​ដង​ទន្លេ​ប្រាកទឹកឈូ ដែល​មាន​ទេសភាព​នៅ​ក្បែរ​ភ្នំបូកគោ។ កំពតផ្តល់នូវការបញ្ចូលគ្នានៃសម្រស់ធម្មជាតិ ប្រវត្តិសាស្រ្ត និងអារម្មណ៍សម្រាកកាយ។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ព្រៃជាតិបូកគោ",
                    Second: "វាលម្រេចកំពត",
                    Third: "ទន្លេកំពត",
                    Fourth: "ត្រីមាសបារាំងចាស់"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ជិះកប៉ាល់នៅទន្លេកំពត",
                Second: "ទៅមើលព្រៃជាតិបូកគោ",
                Third: "រុករកវាលម្រេច",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "អំឡុងពេលល្អបំផុត: វិច្ឆិកា - កុម្ភៈ",
                Transport: "ការដឹកជញ្ជូន: ម៉ូតូ, តាក់ស៊ី, ឬម៉ូតូ",
                DressCode: "ត្រូវតែយកថ្នាំបំបាត់មេរោគសម្រាប់តំបន់ធម្មជាតិការពារសត្វល្អិត",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            Kep: {
                KepHeroTitle: "កែប",
                KepHeroSubtitle: "ខេត្ត",
                aboutKep: "អំពីខេត្តកែប",
                aboutKepDescription: "កែប ជា​ខេត្ត​តូច​បំផុត​របស់​ប្រទេស​កម្ពុជា ដែល​ស្ថិត​នៅ​តំបន់​ឆ្នេរ​សមុទ្រ​ភាគ​ខាង​ត្បូង​ប្រទេស។ នៅពេលដែលជាកន្លែងសម្រាកលំហែឆ្នេរដ៏រស់រវើកសម្រាប់អាណានិគមនិយមបារាំង និងឥស្សរជនកម្ពុជាក្នុងទសវត្សរ៍ឆ្នាំ 1960 ថ្ងៃនេះវាផ្តល់នូវការរត់គេចដ៏ស្ងប់ស្ងាត់ប្រកបដោយមន្តស្នេហ៍ ជាមួយនឹងវីឡាដែលដួលរលំ អាហារសមុទ្រ ឆ្នេរដ៏ស្ងប់ស្ងាត់ និងសម្រស់ធម្មជាតិ។ ល្បីល្បាញដោយសារក្តាមខៀវ កសិដ្ឋានម្រេច និងភ្នំខៀវស្រងាត់ កែបគឺជាគោលដៅដ៏ល្អឥតខ្ចោះសម្រាប់ការសម្រាកលំហែកាយ និងទេសចរណ៍ធម្មជាតិ ដោយមានផ្លូវចូលទៅជិតកោះ និងឧទ្យានជាតិ",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ផ្សារក្រពើនៅខេត្តកែប",
                    Second: "កោះទន្សាយ",
                    Third: "ឧទ្យានជាតិកែប",
                    Fourth: "វីឡាដែលគេបោះបង់ចោល"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាផ្សារក្តាម កែប ដ៏ល្បីល្បាញ",
                Second: "ដើរលេងនៅឧទ្យានជាតិកែប",
                Third: "ជិះទូកទៅកោះទន្សាយ (កោះទន្សាយ)",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត៖ ខែវិច្ឆិកា ដល់ខែមីនា (ត្រជាក់ និងស្ងួត)",
                Transport: "ចប់សម្លៀកបំពាក់ស្រាល និងថ្នាំបាញ់សត្វល្អិត",
                DressCode: "ពិចារណាជួលម៉ូតូស្កូតឺសម្រាប់ការធ្វើដំណើរដែលអាចបត់បែនបាន",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            Sihanoukville: {
                SHVHeroTitle: "ព្រះសីហនុ",
                SHVHeroSubtitle: "ក្រុង",
                aboutSHV: "អំពីក្រុងព្រះសីហនុ",
                aboutSHVDescription: "ត្រូវ​បាន​គេ​ស្គាល់​ផង​ដែរ​ថា​ជា​កំពង់សោម ខេត្ត​ព្រះសីហនុ​ជា​ខេត្ត​ជាប់​មាត់​សមុទ្រ​ចម្បង​របស់​ប្រទេស​កម្ពុជា​ដែល​ដាក់​ឈ្មោះ​តាម​ព្រះ​បរម​រតន​កោដ្ឋ​នរោត្តម​សីហនុ។ នៅពេលដែលជាទីក្រុងឆ្នេរខ្សាច់របស់អ្នកដើរលេង វាបានប្រែក្លាយទៅជាទីក្រុងនៃកាស៊ីណូខ្ពស់ រមណីយដ្ឋានប្រណិត និងការអភិវឌ្ឍន៍សេដ្ឋកិច្ច។ លើសពីការពង្រីកទីក្រុង ខេត្តព្រះសីហនុផ្តល់នូវការចូលទៅកាន់កោះដ៏ស្រស់ស្អាតបំផុតមួយចំនួននៅអាស៊ីអាគ្នេយ៍។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ឆ្នេរអូត្រេស",
                    Second: "កោះរ៉ុង",
                    Third: "ឆ្នេរ Serendipity",
                    Fourth: "ច្រកសត្វស្វា"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "សម្រាកនៅឆ្នេរអូត្រេស",
                Second: "ទស្សនាកោះរ៉ុង",
                Third: "ស្វែងរកកាស៊ីណូ",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "អំឡុងពេលល្អបំផុត: វិច្ឆិកា - កុម្ភៈ",
                Transport: "ការដឹកជញ្ជូន: តាក់ស៊ី, កប៉ាល់",
                DressCode: "កក់សណ្ឋាគារក្នុងមុន",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីក្រុង",
            },
            Pailin: {
                PLHeroTitle: "ប៉ៃលិន",
                PLHeroSubtitle: "ខេត្ត",
                aboutPL: "អំពីខេត្តប៉ៃលិន",
                aboutPLDescription: "ប៉ៃលិន​ជា​ខេត្ត​តូច​ស្ងប់ស្ងាត់​មួយ​ស្ថិត​នៅ​ភាគ​ខាងលិច​ប្រទេស​កម្ពុជា ជាប់​ព្រំដែន​ជាមួយ​ប្រទេស​ថៃ។ ធ្លាប់ល្បីថាជាបន្ទាយខ្មែរក្រហម និងជាមជ្ឈមណ្ឌលសម្រាប់ការជីកយករ៉ែត្បូង ប៉ៃលិនសព្វថ្ងៃជាតំបន់សន្តិភាពដែលគេស្គាល់សម្រាប់ទេសភាពដ៏ស្រស់ត្រកាល ទីផ្សារត្បូង និងការលាយបញ្ចូលគ្នានៃវប្បធម៌ដែលទទួលឥទ្ធិពលពីទំនៀមទម្លាប់ខ្មែរ និងថៃ។ ហ៊ុំព័ទ្ធដោយជួរភ្នំក្រវាញដ៏ស្រស់ស្អាត វាផ្តល់នូវកន្លែងកម្សាន្តដ៏ស្ងប់ស្ងាត់សម្រាប់អ្នកស្រឡាញ់ធម្មជាតិ អ្នកស្នេហាប្រវត្តិសាស្ត្រ និងអ្នកធ្វើដំណើរក្រៅផ្លូវ។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ទឹកជ្រោះភ្នំយ៉ាត",
                    Second: "វត្តរតនៈសោភ័ណ",
                    Third: "ទឹកជ្រោះប៉ៃលិន",
                    Fourth: "មហាសាលាត្បូង"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាទឹកជ្រោះភ្នំយ៉ាត",
                Second: "ស្វែងរកតំបន់ព្រំដែន អូស្មាច់",
                Third: "ស្វែងរកទីផ្សារត្បូងក្នុងស្រុក",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត: ខែវិច្ឆិកា – ខែមីនា",
                Transport: "ការដឹកជញ្ជូន: ម៉ូតូ, តាក់ស៊ី",
                DressCode: "យកលុយសម្រាប់អ្នកលក់តូចៗ",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            KohKong: {
                KKHeroTitle: "កោះកុង",
                KKHeroSubtitle: "ខេត្ត",
                aboutKK: "អំពីខេត្តកោះកុង",
                aboutKKDescription: "ខេត្តកោះកុង ជាខេត្តមួយស្ថិតនៅភាគនិរតីនៃប្រទេសកម្ពុជា ដែលល្បីល្បាញដោយសារព្រៃឈើខៀវស្រងាត់ ឆ្នេរស្អាត និងជួរភ្នំក្រវាញ។ វាមានព្រំប្រទល់ជាប់ប្រទេសថៃ និងផ្តល់នូវសកម្មភាពផ្សងព្រេងដូចជា ការដើរលេង ការទស្សនាទឹកធ្លាក់ និងការប្រទះឃើញសត្វព្រៃ។ តំបន់នេះនៅតែមិនត្រូវបានប៉ះពាល់ដោយទេសចរណ៍ដ៏ធំ ដែលផ្តល់នូវការរត់គេចពីធម្មជាតិដ៏ស្ងប់ស្ងាត់។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ភ្នំកាដាម៉ូម",
                    Second: "ឆ្នេរកោះកុង",
                    Third: "ទឹកជ្រោះតាតៃ",
                    Fourth: "កោះ ក្នុងខេត្តកោះកុង"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាភ្នំក្រវាញ និងទឹកធ្លាក់",
                Second: "សម្រាកនៅលើឆ្នេរស្ងាត់នៃខេត្តកោះកុង",
                Third: "ទស្សនាទន្លេតាតៃ និងកោះក្បែរនោះ",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត: ខែវិច្ឆិកា – ខែមេសា",
                Transport: "រៀបចំសម្រាប់លក្ខខណ្ឌធ្វើដំណើរពីចម្ងាយ និងកន្លែងមានកំណត់",
                DressCode: "ប្រើមគ្គុទ្ទេសក៍ក្នុងតំបន់សម្រាប់ការដើរលេង និងដំណើរទេសចរណ៍ធម្មជាតិ",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            Takeo: {
                TKHeroTitle: "តាកែវ",
                TKHeroSubtitle: "ខេត្ត",
                aboutTK: "អំពីខេត្តតាកែវ",
                aboutTKDescription: "តាកែវ​ដែល​គេ​តែង​ហៅ​ថា​ជា «​លំនៅ​នៃ​អរិយធម៌​ខ្មែរ​» ជា​ខេត្ត​មួយ​ដែល​សម្បូរ​ទៅ​ដោយ​ប្រវត្តិសាស្ត្រ​បុរាណ និង​អច្ឆរិយ​វត្ថុ​បុរាណវិទ្យា។ វាជាទីតាំងរបស់អង្គរបូរី និងភ្នំដា ដែលជាទីតាំងពីរដែលផ្តល់ពន្លឺដល់អតីតកាលមុនសម័យអង្គររបស់កម្ពុជា។ ហ៊ុំព័ទ្ធដោយវាលស្រែ និងសហគមន៍នេសាទតូចៗ ខេត្តនេះផ្តល់នូវភាពស្ងប់ស្ងាត់ និងវប្បធម៌។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "អង្គរបុរី",
                    Second: "ភ្នំដា",
                    Third: "ទន្លេបាទី",
                    Fourth: "ភ្នំជីសូ"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ស្វែងយល់ពីរមណីយដ្ឋានអង្គរបូរី",
                Second: "ឡើងភ្នំប្រាសាទភ្នំដា",
                Third: "ទស្សនាប្រាសាទតាព្រហ្មបុរាណនៅទន្លេបាទី",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ទស្សនាក្នុងរដូវប្រាំង (វិច្ឆិកា ដល់ មីនា) ដើម្បីចូលប្រើប្រាស់បានល្អបំផុត",
                Transport: "យកឡេការពារកំដៅថ្ងៃ មួក និងទឹកសម្រាប់ដើរលេងប្រាសាទ",
                DressCode: "មគ្គុទ្ទេសក៍ក្នុងស្រុកអាចបង្កើនបទពិសោធន៍ប្រវត្តិសាស្ត្ររបស់អ្នក",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
             Kandal: {
                KDHeroTitle: "កណ្ដាល",
                KDHeroSubtitle: "ខេត្ត",
                aboutKD: "អំពីខេត្តកណ្ដាល",
                aboutKDDescription: "ខេត្តកណ្តាល ហ៊ុំព័ទ្ធទីក្រុងភ្នំពេញរបស់ប្រទេសកម្ពុជា ដែលធ្វើឱ្យវាក្លាយជាតំបន់យុទ្ធសាស្ត្រដ៏សំខាន់ និងអាចចូលទៅដល់បាន។ ថ្វីត្បិតតែស្ថិតនៅជិតទីប្រជុំជនដ៏អ៊ូអរ ប៉ុន្តែខេត្តកណ្តាលនៅតែរក្សាបាននូវបរិយាកាសបែបជនបទប្រកបដោយសន្តិភាព ជាមួយនឹងភូមិបុរាណខ្មែរ វាលស្រែដ៏ខៀវស្រងាត់ និងមាត់ទន្លេដ៏ស្ងប់ស្ងាត់។ ខេត្តនេះត្រូវបានបែងចែកដោយទន្លេមេគង្គ និងទន្លេបាសាក់ ដែលផ្តល់នូវទេសភាពដ៏ស្រស់ស្អាត និងដីស្រែមានជីជាតិ។ វា​ជា​ទិសដៅ​ដ៏​ល្អ​សម្រាប់​អ្នក​ធ្វើ​ដំណើរ​ដែល​ស្វែង​រក​ការ​រត់​គេច​ពី​ទីក្រុង​ភ្នំពេញ​ក្នុង​រយៈពេល​ខ្លី​ដើម្បី​ទទួល​បាន​បទពិសោធន៍​ជីវិត​បែប​ជនបទ​ពិតប្រាកដ ឧស្សាហកម្ម​ក្នុង​ស្រុក និង​ទេសភាព​ពេញ​វត្ត",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ភ្នំឧត្តុង្គ",
                    Second: "ទីក្រុងតាខ្មៅ",
                    Third: "កោះដាច់",
                    Fourth: "ផ្សារបណ្តែតទឹកកៀនស្វាយ"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាភ្នំឧត្តុង្គ",
                Second: "ស្វែងយល់អំពីកោះទន្លេមេគង្គ",
                Third: "អនុស្សាវរីយ៍ទីផ្សារក្នុងស្រុក",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត: ខែវិច្ឆិកា – ខែមីនា",
                Transport: "ការដឹកជញ្ជូន: ឡានក្រុង, តាក់ស៊ី, កប៉ាល់",
                DressCode: "សម្លៀកបំពាក់សម្រួលសម្រាប់ដំណើរកំសាន្តតាមទន្លេ",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
             KampongCham: {
                KPCHeroTitle: "កំពង់ចាម",
                KPCHeroSubtitle: "ខេត្ត",
                aboutKPC: "អំពីខេត្តកំពង់ចាម",
                aboutKPCDescription: "កំពង់ចាម ជា​ខេត្ត​មួយ​ក្នុង​ចំណោម​ខេត្ត​សម្បូរ​វប្បធម៌​បំផុត​របស់​កម្ពុជា។ ឈ្មោះ​នេះ​មាន​ន័យ​ថា “កំពង់ផែ​ចាម” ដែល​សំដៅ​លើ​ជនជាតិ​ចាម ជា​ក្រុម​ជនជាតិ​ភាគតិច​ដែល​មាន​កេរដំណែល​សាសនា​ឥស្លាម។ ខេត្ត​នេះ​ត្រូវ​បាន​គេ​ស្គាល់​ថា​មាន​បរិយាកាស​ស្ងប់ស្ងាត់​តាម​មាត់​ទន្លេ ប្រាសាទ​ប្រវត្តិសាស្ត្រ និង​អគារ​សម័យ​អាណានិគម​បារាំង​ចាស់។ វា​ផ្តល់​នូវ​ទិដ្ឋភាព​ពិត​ប្រាកដ​ក្នុង​ជីវិត​ជន​បទ​ខ្មែរ។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ភ្នំប្រុស និង ភ្នំស្រី",
                    Second: "ស្ពានឈើ",
                    Third: "ទន្លេមេគង្គ",
                    Fourth: "វត្តនគរ"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាភ្នំប្រុស និង ភ្នំស្រី",
                Second: "ស្វែងយល់អំពីស្ពានឈើ",
                Third: "អនុស្សាវរីយ៍ទន្លេមេគង្គ",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត: ខែវិច្ឆិកា – ខែមីនា",
                Transport: "ការដឹកជញ្ជូន៖ ឡានក្រុង ម៉ូតូ",
                DressCode: "យកមួកសម្រាប់ការពារកំដៅថ្ងៃ",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            KampongChhnang: {
                KPCHHeroTitle: "កំពង់ឆ្នាំង",
                KPCHeroSubtitle: "ខេត្ត",
                aboutKPCH: "អំពីខេត្តកំពង់ឆ្នាំង",
                aboutKPCHDescription: "កំពង់ឆ្នាំង មានន័យថា “កំពង់ផែផូស្វ័រ” គឺជាខេត្តកណ្តាលមួយក្នុងប្រទេសកម្ពុជា ដែលមានទីតាំងនៅតាមដងទន្លេសាប។ កំពង់ឆ្នាំង​សម្បូរ​ទៅដោយ​ប្រវត្តិសាស្ត្រ វប្បធម៌ និង​សម្រស់​ធម្មជាតិ​ដែល​ល្បីល្បាញ​ដោយសារ​ទេសភាព​ភូមិ​បណ្តែត​ទឹក និង​សិប្បកម្ម​បុរាណ​។ វាបម្រើជាមជ្ឈមណ្ឌលកសិកម្មដ៏សំខាន់ ជាពិសេសសម្រាប់ការធ្វើស្រែចម្ការ ដោយសារវាលទំនាបមានជីជាតិ និងនៅជិតផ្លូវទឹក។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ភូមិសិប្បកម្ម",
                    Second: "ភូមិចង្វាក់",
                    Third: "ទន្លេសាប",
                    Fourth: "ទន្លេមេគង្គ"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាភូមិសិប្បកម្ម",
                Second: "ស្វែងយល់អំពីភូមិចង្វាក់",
                Third: "ជិះកប៉ាល់នៅទន្លេសាប",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត: ខែវិច្ឆិកា – ខែមីនា",
                Transport: "ការដឹកជញ្ជូន៖ ទូក ម៉ូតូ",
                DressCode: "យកកាមេរ៉ាសម្រាប់ថតទេសភាព",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            KampongSpeu: {
                KPSHeroTitle: "កំពង់ស្ពឺ",
                KPSHeroSubtitle: "ខេត្ត",
                aboutKPS: "អំពីខេត្តកំពង់ស្ពឺ",
                aboutKPSDescription: "កំពង់ស្ពឺ មានន័យថា “បណ្ដុំផ្លែស្ពឺ” គឺជាខេត្តមួយនៅភាគកណ្តាលនៃប្រទេសកម្ពុជា ដែលល្បីល្បាញដោយសារទេសភាពធម្មជាតិដ៏ស្រស់បំព្រង រួមមានទឹកធ្លាក់ និងភ្នំ។ ខេត្តនេះមានឧទ្យានជាតិគិរីរម្យ និងភ្នំឱរ៉ាល់ ដែលជាកំពូលភ្នំខ្ពស់បំផុតក្នុងប្រទេសកម្ពុជា។ វាផ្តល់នូវបទពិសោធន៍ទេសចរណ៍ធម្មជាតិ ការឡើងភ្នំ និងដំណើរផ្សងព្រេង។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ភ្នំអូរ៉ាល់",
                    Second: "ឧទ្យានជាតិគិរីរម្យ",
                    Third: "ទេសចរណ៍បរិស្ថានចំបុក",
                    Fourth: "កន្លែងទឹកពុះនៅនិទាឃរដូវក្តៅ"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ឡើងភ្នំអូរ៉ាល់",
                Second: "ចូលទៅឧទ្យានជាតិគិរីរម្យ",
                Third: "ស្វែងយល់អំពីសហគមន៍ចំបុក",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត៖ ខែវិច្ឆិកា - កុម្ភៈ",
                Transport: "ការដឹកជញ្ជូន៖ ឡានឯកជន ម៉ូតូ",
                DressCode: "យកស្បែកជើងដើរលេងមើលទេសភាព",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            KampongThom: {
                KPTHeroTitle: "កំពង់ធំ",
                KPTHeroSubtitle: "ខេត្ត",
                aboutKPT: "អំពីខេត្តកំពង់ធំ",
                aboutKPTDescription: "កំពង់ធំ​ជា​ខេត្ត​ធំ​បំផុត​មួយ​របស់​ប្រទេស​កម្ពុជា​តាម​ផ្ទៃ​ដី និង​ស្ថិត​នៅ​ចំ​កណ្តាល​ប្រទេស។ ឈ្មោះនេះមានន័យថា “កំពង់ផែធំ” ជាភាសាខ្មែរ សំដៅលើតួនាទីប្រវត្តិសាស្ត្ររបស់ខ្លួនជាមជ្ឈមណ្ឌលពាណិជ្ជកម្មដ៏សំខាន់នៅតាមដងទន្លេស្ទឹងសែន ដែលជាដៃទន្លេនៃទន្លេសាប។ សព្វថ្ងៃនេះ ខេត្តកំពង់ធំ ត្រូវបានគេស្គាល់ថាជាសម្រស់ធម្មជាតិ ភាពទាក់ទាញរបស់ជនបទ និងបេតិកភណ្ឌបុរាណវិទ្យាគួរឱ្យកត់សម្គាល់។ ខេត្តនេះជាទឹកដីនៃប្រាសាទសំបូរព្រៃគុក ដែលជាសម្បត្តិបេតិកភណ្ឌពិភពលោករបស់អង្គការយូណេស្កូ និងជាប្រាសាទចំណាស់ជាងគេមួយនៅអាស៊ីអាគ្នេយ៍ ដែលមានអាយុកាលតាំងពីសម័យមុនអង្គរ ចេនឡា (សតវត្សទី៧)។ ទីតាំងកណ្តាលរបស់វាក៏ធ្វើឱ្យវាក្លាយជាផ្លូវតភ្ជាប់ដ៏សំខាន់រវាងទីក្រុងភ្នំពេញ និងខេត្តសៀមរាបផងដែរ។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ប្រាសាទសំបូរព្រៃគុក",
                    Second: "ទន្លេស្ទឹងសែន",
                    Third: "ប្រាសាទអន្ទេត",
                    Fourth: "ភ្នំសន្តុក"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាប្រាសាទសំបូរព្រៃគុក",
                Second: "ស្វែងយល់អំពីទន្លេស្ទឹងសែន",
                Third: "រកឃើញភូមិជនបទ",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត៖ ខែវិច្ឆិកា - មីនា",
                Transport: "ការដឹកជញ្ជូន៖ ឡានក្រុង ម៉ូតូ",
                DressCode: "យកថ្នាំសំលាប់សត្វល្អិតសម្រាប់តំបន់ជនបទ",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            Kratie: {
                KTHeroTitle: "ក្រចេះ",
                KTHeroSubtitle: "ខេត្ត",
                aboutKT: "អំពីខេត្តក្រចេះ",
                aboutKTDescription: "ក្រចេះ​ជា​ខេត្ត​ដ៏​ស្រស់​ស្អាត​មួយ​ស្ថិត​នៅ​តាម​ដង​ទន្លេ​មេគង្គ​ភាគ​ឦសាន​ប្រទេស​កម្ពុជា។ ត្រូវបានគេស្គាល់ថាជាសត្វផ្សោត Irrawaddy ដែលជិតផុតពូជ ទីប្រជុំជនមាត់ទន្លេដ៏ស្ងប់ស្ងាត់ និងស្ថាបត្យកម្មអាណានិគម ក្រចេះគឺជាកន្លែងឈប់សម្រាកសំណព្វសម្រាប់អ្នកទេសចរណ៍ធម្មជាតិ និងអ្នកធ្វើដំណើរដែលស្វែងរកបទពិសោធន៍ពិតប្រាកដ ដែលមិនធ្លាប់មានពីមុនមក។ ជាមួយនឹងតំបន់ជនបទដ៏ខៀវស្រងាត់ ភូមិបណ្តែតទឹក និងកោះទន្លេ ខេត្តក្រចេះផ្តល់នូវការបញ្ចូលគ្នាដ៏ល្អឥតខ្ចោះនៃធម្មជាតិ សត្វព្រៃ និងវប្បធម៌ក្នុងស្រុក។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ផ្សោតអ៊ីរ៉ាវ៉ាឌី",
                    Second: "កោះត្រង់",
                    Third: "ភ្នំសំបុក",
                    Fourth: "ព្រះអាទិត្យលិចនៅទន្លេមេគង្គ"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "មើលផ្សោតអ៊ីរ៉ាវ៉ាឌីនៅទន្លេមេគង្គ",
                Second: "ជិះកង់នៅកោះត្រង់",
                Third: "ស្វែងយល់អំពីភ្នំសំបុក និងតំបន់ជនបទ",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត៖ ខែវិច្ឆិកា - មីនា (រដូវស្ងួត)",
                Transport: "ការដឹកជញ្ជូន៖ ឡានក្រុង ឬឡានតូចពីភ្នំពេញ",
                DressCode: "គោរពសហគមន៍មូលដ្ឋាន និងលំហរបស់សត្វផ្សោត",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            PreyVeng: {
                PVHeroTitle: "ព្រៃវែង",
                PVHeroSubtitle: "ខេត្ត",
                aboutPV: "អំពីខេត្តព្រៃវែង",
                aboutPVDescription: "ព្រៃវែងជាខេត្តកសិកម្មដ៏ធំមួយនៅភាគអាគ្នេយ៍នៃប្រទេសកម្ពុជា ដែលល្បីល្បាញដោយសារវាលស្រែដ៏ធំល្វឹងល្វើយ និងរបៀបរស់នៅបែបជនបទ។ វា​ផ្តល់​នូវ​ទិដ្ឋភាព​ក្នុង​ជីវភាព​ភូមិ​ប្រពៃណី​ខ្មែរ​ជាមួយ​វត្ត​អារាម ផ្សារ និង​ពិធីបុណ្យ។ ខេត្ត​នេះ​ក៏​ជា​កន្លែង​ដែល​មាន​ប្រាសាទ​បុរាណ​មួយ​ចំនួន​រួម​មាន​វត្ត​ព្រះ​អង្គ​គោ​ដែល​មាន​អាយុកាល​តាំងពី​សម័យ​អង្គរ។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "វត្តព្រះអេនកាវ",
                    Second: "ភូមិលិចព្រៃវែង",
                    Third: "ផ្សារទំនើប",
                    Fourth: "វាលស្រែ"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាប្រាសាទវត្តព្រះអេនកាវ",
                Second: "រុករកភូមិបណ្តែតទឹកក្នុងតំបន់",
                Third: "ទទួលបានបទពិសោធន៍ទីផ្សារ និង ពិធីបុណ្យខ្មែរនៅជនបទ",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត៖ ខែវិច្ឆិកា - ខែកុម្ភៈ",
                Transport: "ដឹកជញ្ជូនដោយម៉ូតូ ឬ ឡានក្រុងក្នុងស្រុក",
                DressCode: "គោរពទំនៀមទម្លាប់ និង ប្រពៃណីក្នុងស្រុក",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            SvayRieng: {
                SRHeroTitle: "ស្វាយរៀង",
                SRHeroSubtitle: "ខេត្ត",
                aboutSR: "អំពីខេត្តស្វាយរៀង",
                aboutSRDescription: "ខេត្តស្វាយរៀង ជាខេត្តភាគអាគ្នេយ៍នៃប្រទេសកម្ពុជា ជាប់ព្រំប្រទល់ប្រទេសវៀតណាម ដែលមានលក្ខណៈជាផ្ទះសំបែង និងសេដ្ឋកិច្ចកសិកម្ម។ វាត្រូវបានគេស្គាល់ដោយសារវប្បធម៌ជនបទដ៏រស់រវើក ការធ្វើស្រែ និងពិធីបុណ្យប្រពៃណី។ ខេត្តនេះមិនសូវមានអ្នកទេសចរណ៍ទេ ប៉ុន្តែផ្តល់នូវបទពិសោធន៍ក្នុងស្រុកពិតប្រាកដ និងទេសភាពជនបទដ៏ស្ងប់ស្ងាត់។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "វត្តក្នុងស្រុក",
                    Second: "ភូមិជនបទ",
                    Third: "ពិធីបុណ្យរដូវកាល",
                    Fourth: "វាលស្រែ"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាវត្តក្នុងស្រុក និង ប្រាសាទ",
                Second: "ស្វែងយល់អំពីភូមិជនបទ",
                Third: "ចូលរួមពិធីបុណ្យរដូវកាល និងផ្សារ",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត៖ ខែវិច្ឆិកា ដល់ ខែកុម្ភៈ សម្រាប់អាកាសធាតុត្រជាក់",
                Transport: "ប្រើការដឹកជញ្ជូនក្នុងស្រុក ឬជួលម៉ូតូ",
                DressCode: "គោរពទំនៀមទម្លាប់ និងប្រពៃណីក្នុងស្រុក",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            PurSat: {
                PSHeroTitle: "ពោធិ៍សាត់",
                PSHeroSubtitle: "ខេត្ត",
                aboutPS: "អំពីខេត្តពោធិ៍សាត់",
                aboutPSDescription: "ខេត្តពោធិ៍សាត់ ស្ថិតនៅភាគខាងលិចនៃប្រទេសកម្ពុជា ដែលស្ថិតនៅចន្លោះបឹងទន្លេសាប និងជួរភ្នំក្រវាញ។ ដោយ​មាន​ភាព​ល្បីល្បាញ​សម្រាប់​ទេសភាព​ធម្មជាតិ​ដ៏​សម្បូរ​បែប រួម​ទាំង​ទន្លេ និង​ទឹកជ្រោះ ពោធិ៍សាត់​ក៏​ល្បី​ខាង​ចម្លាក់​ថ្ម​ដ៏​ប៉ិនប្រសប់ និង​ការ​ត្បាញ​សូត្រ​បែប​ប្រពៃណី។ ខេត្តនេះផ្តល់នូវភាពចម្រុះនៃបេតិកភណ្ឌវប្បធម៌ និងទេសភាពដ៏ស្រស់ស្អាត។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ភ្នំ 1005",
                    Second: "ភូមិទេសចរទន្លេសាប",
                    Third: "សិក្ខាសាលាចម្លាក់ថ្ម",
                    Fourth: "ទន្លេពោធិ៍សាត់"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ដំណើរកំសាន្តភ្នំ 1005",
                Second: "ស្វែងយល់ពីភូមិនេសាទបឹងទន្លេសាប",
                Third: "ស្វែងយល់ពីសិក្ខាសាលាចម្លាក់ថ្មបុរាណ",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "រដូវល្អបំផុត៖ ខែវិច្ឆិកា - ខែកុម្ភៈ សម្រាប់អាកាសធាតុត្រជាក់",
                Transport: "ប្រើទូកក្នុងស្រុកដើម្បីរុករកតំបន់មាត់បឹងទន្លេសាប",
                DressCode: "ជួលមគ្គុទ្ទេសក៍សម្រាប់ការឡើងភ្នំ និងការទស្សនារូងភ្នំ",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            OddarMeanchey: {
                OMCHeroTitle: "ឧត្តរមានជ័យ",
                OMCHeroSubtitle: "ខេត្ត",
                aboutOMC: "អំពីខេត្តឧត្តរមានជ័យ",
                aboutOMCDescription: "ខេត្តឧត្តរមានជ័យ ស្ថិតនៅភាគខាងជើងនៃប្រទេសកម្ពុជា ត្រូវបានគេស្គាល់ថាជាតំបន់ដាច់ស្រយាល ទីតាំងប្រវត្តិសាស្ត្រ និងនៅជិតព្រំដែនថៃ។ វា​ផ្តល់​នូវ​ទិដ្ឋភាព​នៃ​ជីវិត​នៅ​ជនបទ​របស់​កម្ពុជា។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "អន្លង់វែង",
                    Second: "ប្រាសាទព្រះវិហារ",
                    Third: "ទីក្រុងសំរោង",
                    Fourth: "ផ្សារព្រំដែន"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាអន្លង់វែង",
                Second: "ស្វែងយល់អំពីតំបន់ប្រាសាទព្រះវិហារ",
                Third: "បទពិសោធន៍ជីវិតភូមិជនបទ",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត៖ ខែវិច្ឆិកា - ខែមីនា",
                Transport: "ការដឹកជញ្ជូន៖ ឡានក្រុង ម៉ូតូ",
                DressCode: "រៀបចំសម្រាប់តំបន់ឆ្ងាយ",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            PreahVihear: {
                PVHeroTitle: "ព្រះវិហារ",
                PVHeroSubtitle: "ខេត្ត",
                aboutPV: "អំពីខេត្តព្រះវិហារ",
                aboutPVDescription: "ខេត្តព្រះវិហារ ស្ថិតនៅភាគខាងជើងនៃប្រទេសកម្ពុជា មានព្រំប្រទល់ជាប់ប្រទេសថៃ និងឡាវ ដែលផ្តល់នូវការបញ្ចូលគ្នាយ៉ាងសម្បូរបែបនៃប្រវត្តិសាស្រ្តបុរាណ សម្រស់ធម្មជាតិ និងបេតិកភណ្ឌវប្បធម៌។ វាជាផ្ទះរបស់ប្រាសាទព្រះវិហារដ៏ល្បីល្បាញ ដែលជាតំបន់បេតិកភណ្ឌពិភពលោករបស់អង្គការយូណេស្កូ ដែលស្ថិតនៅលើកំពូលភ្នំដងរែក ដែលអាចមើលឃើញវាលទំនាបរបស់កម្ពុជា។ ខេត្ត​នេះ​ភាគច្រើន​ជា​តំបន់​ជនបទ​ដែល​មាន​ព្រៃឈើ​ខ្ពង់រាប ទន្លេ និង​ភូមិ​រាយប៉ាយ។ វា​មាន​សារៈសំខាន់​ផ្នែក​ប្រវត្តិសាស្ត្រ និង​ខាង​វិញ្ញាណ​យ៉ាង​ជ្រាលជ្រៅ​សម្រាប់​ប្រជាជន​កម្ពុជា ហើយ​កំពុង​ទាក់ទាញ​អ្នកទេសចរ​ធម្មជាតិ និង​អ្នក​ចូលចិត្ត​ប្រវត្តិសាស្ត្រ​កាន់តែខ្លាំង​ឡើង​។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ប្រាសាទព្រះវិហារ",
                    Second: "ប្រាសាទកោះកេរ",
                    Third: "ព្រៃព្រះវិហារ",
                    Fourth: "ទីក្រុងត្បែងមានជ័យ"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាប្រាសាទព្រះវិហារ",
                Second: "ស្វែងយល់អំពីប្រាសាទកោះកេរ",
                Third: "ដើរលេងនៅព្រៃក្នុងស្រុក",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត៖ ខែវិច្ឆិកា - ខែកុម្ភៈ",
                Transport: "ការដឹកជញ្ជូន៖ 4WD, ម៉ូតូ",
                DressCode: "រៀបចំសម្រាប់ការធ្វើដំណើរពីចម្ងាយ",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            StungTreng: {
                STHeroTitle: "ស្ទឹងត្រែង",
                STHeroSubtitle: "ខេត្ត",
                aboutST: "អំពីខេត្តស្ទឹងត្រែង",
                aboutSTDescription: "ស្ទឹងត្រែង​ជា​ខេត្ត​ភាគ​ខាងជើង​នៃ​ប្រទេស​កម្ពុជា ដែល​ស្ថិត​នៅ​តាម​ដង​ទន្លេ​មេគង្គ និង​ជាប់​ព្រំដែន​ឡាវ។ វាត្រូវបានគេស្គាល់ដោយសារព្រៃឈើក្រាស់ ជីវចម្រុះដ៏សម្បូរបែប និងទេសភាពទន្លេដ៏ស្រស់ស្អាត។ ខេត្តផ្តល់ឱកាសដ៏ល្អសម្រាប់ទេសចរណ៍ធម្មជាតិ រួមទាំងការនេសាទ ដំណើរទេសចរណ៍តាមទូក និងការទស្សនាតំបន់ការពារសត្វព្រៃ។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ការធ្វើដំណើរទន្លេមេគង្គ",
                    Second: "ទន្លេសេកុង និង ស្ទឹងស្រែពុក",
                    Third: "ព្រៃខាងលើទន្លេមេគង្គ",
                    Fourth: "ភូមិជនបទ"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ដំណើរកំសាន្តតាមទូកតាមដងទន្លេមេគង្គ",
                Second: "ទស្សនាចំណុចប្រសព្វនៃទន្លេសេកុង និងស្រែពក",
                Third: "រុករកព្រៃការពារទន្លេមេគង្គលើ",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត៖ ខែវិច្ឆិកា - ខែមីនា",
                Transport: "យកថ្នាំកំចាត់មេរោគសម្រាប់តំបន់ព្រៃ",
                DressCode: "ជួលមគ្គុទ្ទេសក៍ក្នុងស្រុកសម្រាប់ការធ្វើដំណើរធម្មជាតិ",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            Rattanakiri: {
                RTKHeroTitle: "រតតនគីរី",
                RTKHeroSubtitle: "ខេត្ត",
                aboutRTK: "អំពីខេត្តរតតនគីរី",
                aboutRTKDescription: "រតនគិរី ជាខេត្តនៅភាគឦសាននៃប្រទេសកម្ពុជា ដាច់ស្រយាលមួយ ដែលស្គាល់ដោយព្រៃក្រាស់ ភ្នំភ្លើង ទឹកជ្រោះ និងជនជាតិដើមភាគតិចភ្នំ។ តំបន់​នេះ​សម្បូរ​ទៅដោយ​សម្រស់​ធម្មជាតិ និង​ភាពចម្រុះ​នៃ​វប្បធម៌ ដែល​ផ្តល់​ជូន​ដំណើរ​កម្សាន្ត ទស្សនា​សត្វព្រៃ និង​ទស្សនា​ភូមិ​ជនជាតិភាគតិច។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "បឹងភ្នំភ្លើង",
                    Second: "ភូមិកុលសម្ព័ន្ធភ្នំ",
                    Third: "ឧទ្យានជាតិវីរៈជ័យ",
                    Fourth: "ទឹកធ្លាក់"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ធ្វើដំណើរទៅកាន់បឹងភ្នំភ្លើង និងទឹកជ្រោះ",
                Second: "ទស្សនាភូមិជនជាតិដើមភាគតិច",
                Third: "ទស្សនាឧទ្យានជាតិវីរៈជ័យ",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត៖ ខែវិច្ឆិកា - មីនា ដើម្បីជៀសវាងភ្លៀង",
                Transport: "នាំយកថ្នាំបាញ់សត្វល្អិត និងឧបករណ៍ដើរលេង",
                DressCode: "ជួលមគ្គុទ្ទេសក៍ក្នុងស្រុកសម្រាប់ដំណើរទេសចរណ៍វប្បធម៌",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            Mondulkiri: {
                MDKHeroTitle: "មណ្ឌលគីរី",
                MDKHeroSubtitle: "ខេត្ត",
                aboutMDK: "អំពីខេត្តមណ្ឌលគីរី",
                aboutMDKDescription: "មានទីតាំងនៅភាគខាងកើតនៃប្រទេសកម្ពុជា ខេត្តមណ្ឌលគិរីត្រូវបានគេស្គាល់ដោយសារអាកាសធាតុត្រជាក់ ភ្នំរំកិល ព្រៃស្រល់ និងវប្បធម៌ជនជាតិដើមភាគតិចព្នង។ រាជធានីសែនមនោរម្យ គឺជាមូលដ្ឋានសន្តិភាពសម្រាប់ការរុករកទឹកធ្លាក់ ជម្រកសត្វដំរី និងតំបន់អភិរក្សធម្មជាតិដូចជា ដែនជម្រកសត្វព្រៃភ្នំព្រិច។ ឈ្មោះ​មណ្ឌលគិរី មាន​ន័យ​ថា ប្រជុំ​ភ្នំ។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "ទឹកធ្លាក់បូស្រា",
                    Second: "គម្រោងសត្វដំរី",
                    Third: "ភ្នំសែនមនោរម្យ",
                    Fourth: "ទឹកធ្លាក់រំនា"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាទឹកធ្លាក់បូស្រា",
                Second: "ទំនាក់ទំនងជាមួយសត្វដំរីនៅសណ្ឋាគារដែលមានសុវត្ថិភាព",
                Third: "ស្វែងរកភូមិប៊ូណុង និងផ្ទះប្រពៃណី",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត៖ ខែវិច្ឆិកា - មីនា (ត្រជាក់ និងស្ងួត)",
                Transport: "ការដឹកជញ្ជូន៖ ឡានក្រុង ឬ 4x4 ពីភ្នំពេញ",
                DressCode: "គោរពប្រពៃណីជនជាតិប៊ូណុងនៅពេលទស្សនាភូមិ",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
            TbongKhmum: {
                TBKHeroTitle: "ត្បូងឃ្មុំ",
                TBKHeroSubtitle: "ខេត្ត",
                aboutTBK: "អំពីខេត្តត្បូងឃ្មុំ",
                aboutTBKDescription: "ត្បូងឃ្មុំ គឺជាខេត្តមួយនៅភាគខាងកើតនៃប្រទេសកម្ពុជា ដែលបានបង្កើតឡើងក្នុងឆ្នាំ 2013 បន្ទាប់ពីបានបំបែកចេញពីខេត្តកំពង់ចាម។ វាមានដីកសិកម្មសម្បូរបែប ជាពិសេសសម្រាប់ផលិតកៅស៊ូ និងស្រូវ។ ខេត្ត​នេះ​ផ្តល់​នូវ​ភាព​ទាក់ទាញ​បែប​ជនបទ​ជាមួយនឹង​វប្បធម៌​ប្រពៃណី​ខ្មែរ ហើយ​ជា​កន្លែង​នៃ​ប្រាសាទ និង​រមណីយដ្ឋាន​ធម្មជាតិ​មួយ​ចំនួន​។",
                Attractions: {
                    AttractionTitle: "កន្លែងទាក់ទាញ",
                    First: "វត្តអេកភ្នំ",
                    Second: "ដីកៅស៊ូ",
                    Third: "ភូមិជនជាតិ",
                    Fourth: "ពិធីបុណ្យប្រពៃណី"
                },
                ThingsToDo: "អ្វីដែលត្រូវធ្វើ",
                First: "ទស្សនាទឹកធ្លាក់បូស្រា",
                Second: "ទំនាក់ទំនងជាមួយសត្វដំរីនៅសណ្ឋាគារដែលមានសុវត្ថិភាព",
                Third: "ស្វែងរកភូមិប៊ូណុង និងផ្ទះប្រពៃណី",
                TravelTips: "គន្លឹះធ្វើដំណើរ",
                BestTime: "ពេលវេលាល្អបំផុត៖ ខែវិច្ឆិកា - មីនា (ត្រជាក់ និងស្ងួត)",
                Transport: "ប្រើម៉ូតូឬតុកតុកសម្រាប់ការដឹកជញ្ជូនក្នុងស្រុក",
                DressCode: "គោរពប្រពៃណីក្នុងស្រុក និងពាក់សម្លៀកបំពាក់យ៉ាងមធ្យម",
                PhotoGallery: "រូបថត",
                Map: "ផែនទីខេត្ត",
            },
        },

        destinations: [
            {
                AngkorWat: 'ព្រះអង្គរ វត្ត',
                description: 'វិមានសាសនាដ៏ធំបំផុតលើលោក',
            },
            {
                KampotRiver: 'ទន្លេកំពត',
                description: 'ជីវិតនៅជនបទ និងមាត់ទន្លេដ៏ស្រស់ស្អាត',
            },
            {
                PhnomPenh: 'ភ្នំពេញ',
                description: 'រដ្ឋធានីជាមួយវប្បធម៌ដ៏សម្បូរបែប',
            },
            {
                BananTemple: 'ភ្នំបាណន់',
                description: 'ប្រាសាទជាច្រើននៅខេត្តបាត់ដំបង',
            }
        ],
        // navbar
        logo: 'អាណាចក្រធ្វើដំណើរ',
        home: 'ទំព័ដើម',
        about: 'ពួកយើង',
        guide: 'មគ្គុទ្ទេសក៍ដំណើរ',
        travelBookings: 'ការកក់ដំណើរ',
        transportations: 'ការដឹកជញ្ជូន',
        hotelsDining: 'សណ្ឋាគារ និងភោជនីយដ្ឋាន',
        moreServices: 'សេវាកម្មបន្ថែម',
        flight: 'កក់សំបុត្រយន្តហោះ',
        car: 'ជួលឡាន',
        bus: 'សំបុត្រឡានក្រុង',
        boat: 'សំបុត្រកប៉ាល់',
        hotel: 'កក់សណ្ឋាគារ',
        restaurant: 'កក់ភោជនីយដ្ឋាន',
        plan: 'ផែនការរបស់អ្នក',
        itinerary: 'ផែនការធ្វើដំណើរ',
        favorite: 'សំណប់ចិត្តរបស់ខ្ញុំ',
        blog: 'ទំព័រប្លុក',
        Review: 'ការពិនិត្យ',
        english: 'អង់គ្លេស',
        khmer: 'ខ្មែរ',
        login: 'ចូលគណនី',
        signup: 'ចុះឈ្មោះ',
        profile: 'ព័ត៌មានផ្ទាល់ខ្លួន',
        settings: 'ការកំណត់',
        logout: 'ចាកចេញ',
        adminDashboard: 'ផ្ទាំងគ្រប់គ្រង',
        hotelDashboard: 'ផ្ទាំងគ្រប់គ្រងសណ្ឋាគារ',
        restaurantDashboard: 'ផ្ទាំងគ្រប់គ្រងភោជនីយដ្ឋាន',

        // Home page
        heroTagline: 'រុករកពិភពលោក!',
        heroTitleFrom: 'ពី',
        heroTitleCambodia: 'កម្ពុជា',
        heroTitleWorld: 'ទៅកាន់ពិភពលោក',
        heroDescription:
            'តាមដានអនុសាសន៍ថ្មីៗ និងស្វែងរកគោលដៅដ៏អស្ចារ្យនៅទូទាំងកម្ពុជា និងលើសពីនេះ',
        heroImageAlt: 'គោលដៅកម្ពុជា',
        explore: 'រុករក',
        learnMore: 'ស្វែងយល់បន្ថែម',
        popularThingsTitle: 'សកម្មភាពពេញនិយម',
        seeAll: 'មើលទាំងអស់',
        cityTours: 'កម្សាន្តក្នុងទីក្រុង',
        culturalTours: 'កម្សាន្តវប្បធម៌',
        dayCruises: 'ការជិះទូក',
        busTours: 'ការជិះឡានក្រុង',
        beachTours: 'កម្សាន្តតាមឆ្នេរ',
        foodTours: 'ម្ហូបអាហារ',
        toursCount: '99+ ដំណើរកម្សាន្ត',
        trendingDestinationsTitle: 'ទិសដៅពេញនិយម',
        destinations: {
            cruises: {
                name: 'កម្ពស់ទេសភាព',
                description: 'ការផ្សងព្រេងលើកប្រវត្តិសាស្ត្រនៃកោះ',
                badge: 'ពេញនិយម'
            },
            beachTours: {
                name: 'ទេសភាពឆ្នេរ',
                description: 'ការផ្សងព្រេងលើឆ្នេរខ្សាច់',
                badge: 'ពេញនិយម'
            },
            museumTour: {
                name: 'ទស្សនកិច្ចសារមន្ទីរ',
                description: 'ស្វែងយល់ពីប្រវត្តិសាស្ត្រខ្មែរ',
                badge: 'កំពុងតែមាន'
            },
            food: {
                name: 'អាហារ',
                description: 'មុខអាហារខ្មែរដើមភាព',
                badge: 'ពេញនិយម'
            },
            hiking: {
                name: 'ដើរលេងឡើងភ្នំ',
                description: 'ដំណើរកម្សាន្តក្នុងព្រៃ',
                badge: 'ពេញនិយម'
            },
            cityTours: {
                name: 'ទស្សនកិច្ចទីក្រុង',
                description: 'ស្វែងយល់ពីភាពស្រស់ស្អាតនៃទីក្រុងភ្នំពេញ',
                badge: 'ពេញនិយម'
            }
        },
        keyFeaturesSubtitle: 'លក្ខណៈពិសេស',
        keyFeaturesTitle: 'យើងផ្តល់ជូនសេវាកម្មល្អបំផុត',
        keyFeaturesDescription:
            'Hey! អាណាចក្រទេសចរណ៍នៅទីនេះដើម្បីជួយអ្នកស្វែងរកវិស្សមកាលក្នុងក្តីស្រមៃ។ ងាយស្រួល អ្នកគ្រាន់តែជ្រើសរើសកន្លែងដែលចង់ទៅ និងទិញសំបុត្រ។',
        feature1Title: 'ជ្រើសរើសផែនការដំណើរ',
        feature1Description:
            'ជ្រើសរើសពីផែនការធ្វើដំណើរដែលបានរៀបចំ ឬបង្កើតផែនការផ្ទាល់ខ្លួនរបស់អ្នក។',
        feature2Title: 'រៀបចំកាលវិភាគដំណើរកម្សាន្ត',
        feature2Description:
            'រៀបចំពេលវេលាល្អឥតខ្ចោះជាមួយប្រព័ន្ធកំណត់ពេលវេលាដែលអាចបត់បែនបាន។',
        feature3Title: 'ការបញ្ចុះតម្លៃ',
        feature3Description:
            'រីករាយជាមួយការបញ្ចុះតម្លៃ និងការផ្តល់ជូនផ្តាច់មុខលើកញ្ចប់ទេសចរណ៍ទាំងអស់។',
        featureImageAlt: 'គោលដៅកម្ពុជា',
        reviewsTitle: 'ការវាយតម្លៃរបស់អតិថិជន',
        reviewsBackgroundAlt: 'ផ្ទៃខាងក្រោយប្រាសាទកម្ពុជា',
        reviews: {
            sebastian: {
                name: 'សេបាស្ទៀន',
                role: 'អ្នករចនាក្រាហ្វិច',
                comment: 'អេបនេះអស្ចារ្យណាស់! ខ្ញុំចូលចិត្តរបៀបងាយស្រួលក្នុងការស្វែងរកទីកន្លែងស្រស់ស្អាតនៅកម្ពុជា។ រចនាប័ទ្មស្អាត និងងាយប្រើ។ ល្អមែនទែន!'
            },
            evangeline: {
                name: 'អេវ៉ានជែលីន',
                role: 'តារាម៉ូដែល',
                comment: 'ខ្ញុំបានរៀបចំដំណើរកម្សាន្តទាំងមូលរបស់ខ្ញុំដោយប្រើអេបនេះ។ មុខងារ "ការធ្វើដំណើរ" មានប្រយោជន៍ណាស់។ សូមបន្ថែមទីកន្លែងថ្មីៗទៀតនៅពេលក្រោយផង!'
            },
            alexander: {
                name: 'អាឡិចសាន់ឌឺ',
                role: 'វិស្វករផ្នែកទន់',
                comment: 'ខ្ញុំចូលចិត្តមុខងារប្ដូរភាសាខ្មែរនិងអង់គ្លេសណាស់—វាងាយស្រួលសម្រាប់ខ្ញុំ និងមិត្តភក្តិប្រើប្រាស់ជាមួយគ្នា។ អរគុណច្រើនសម្រាប់ការគិតរួចរបស់អ្នក!'
            },
            michael: {
                name: 'ម៉ៃឃល',
                role: 'អ្នកសរសេរប្លុកទេសចរណ៍',
                comment: 'រចនាប័ទ្មស្អាត និងលឿន។ ខ្ញុំចូលចិត្តពិសេសនឹងមុខងារ “ចំណូលចិត្ត”។ សូមបន្ថែមមុខងារកក់សំបុត្រផងបានទេ?'
            },
            sarah: {
                name: 'សារ៉ា',
                role: 'អ្នកថតរូប',
                comment: 'ខ្ញុំទំនក់ចិត្តខ្លាំងណាស់! វាសមស្របសម្រាប់និស្សិតដូចខ្ញុំ ដែលចង់ដំណើរកម្សាន្តដោយប្រើថវិកាតិច។ ព័ត៌មានមានប្រយោជន៍ណាស់។'
            },
            david: {
                name: 'ដេវីដ',
                role: 'អ្នកស្វែងរកដំណើរផ្សងព្រេង',
                comment: 'អេបដ៏ល្អមួយសម្រាប់ការធ្វើដំណើរ។ វាជួយឱ្យខ្ញុំស្គាល់កន្លែងថ្មីៗដែលមិនដែលបានឮពីមុន។ ប្រសិនបើមានមុខងារប្រើបានក្រៅបណ្តាញ (offline) កាន់តែប្រសើរជាងនេះទៀត។'
            }
        },

        // About page
        contact: 'ទំនាក់ទំនង',
        ourWorldsTitle: 'ពិភពរបស់យើង',
        ourWorldsDescription: 'ជាអាជីវកម្មគ្រួសារ គ្មានអ្វីសំខាន់ជាងទំនាក់ទំនងជាមួយអតិថិជនរបស់យើងទេ',
        ourStory: 'ប្រវត្តិរបស់យើង',
        aboutUs: 'អំពីយើង',
        aboutUsDescription: 'យើងជាក្រុមទេសចរណ៍ដែលមានចំណង់ចំណូលចិត្ត នាំជូនដល់ការជួយអ្នកស្វែងរកភាពស្រស់ស្អាតនៃកម្ពុជា។ ពីប្រាសាទបុរាណ និងមរតកវប្បធម៌ ទៅកាន់ទេសភាពធម្មជាតិដ៏អស្ចារ្យ យើងផ្តល់ជូនបទពិសោធន៍ទេសចរណ៍ដែលមិនអាចបំភ្លេចបាន । មិនថាអ្នករៀបចំផែនការសម្រាប់ផ្សងព្រេង ដំណើរកម្សាន្តជាមួយគ្រួសារ ឬការសម្រាកទេ យើងផ្តល់ជូនការធ្វើឱ្យដំណើររបស់អ្នកកាន់តែងាយស្រួល សុវត្ថិភាព និងមិនអាចបំភ្លេចបាន។',
        contactUs: 'ទំនាក់ទំនងមកយើង',
        imageAlt: 'គោលដៅកម្ពុជា',
        destinationsTitle: 'ស្វែងរកគោលដៅរបស់អ្នក',
        viewAll: 'មើលទាំងអស់',
        faqsTitle: 'សំណួរដែលគេសួរជាញឹកញាប់',
        faqsDescription: 'ស្វែងរកចម្លើយរហ័សចំពោះសំណួរទូទៅអំពីការកក់ ការទូទាត់ ការលុបចោល សុវត្ថិភាព និងតម្រូវការធ្វើដំណើរ។ ផ្នែកនេះជួយអ្នកទទួលបានព័ត៌មានដែលអ្នកត្រូវការ—លឿន និងគ្មានការរំខាន។',
        insightsTitle: 'ប្លុកពេញនិយម',
        slides: [
            {
                title: 'បង្ហាញអាថ៌កំបាំងនៃកម្ពុជាបុរាណ',
                subtitle: 'រុករកភាពស្រស់ស្អាត និងវប្បធម៌នៃកម្ពុជា និងលើសពីនេះ',
                image: 'https://blog.takemetour.com/wp-content/uploads/2019/07/Ta-Prohm-Temple-1024x681.jpg'
            },
            {
                title: 'ទទួលយកភាពស្ងប់ស្ងាត់នៃប្រាសាទពេលថ្ងៃលិច',
                subtitle: 'ចូលរួមជាមួយយើងសម្រាប់បទពិសោធន៍ដែលមិនអាចបំភ្លេចបាន។',
                image: 'https://plus.unsplash.com/premium_photo-1661907933652-9f43a2a6031c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtYm9kaWElMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D'
            },
            {
                title: 'ធ្វើដំណើរឆ្លងកាត់ប្រពៃណីជនបទ',
                subtitle: 'យល់ដឹងស៊ីជម្រៅនឹងប្រពៃណីក្នុងស្រុក',
                image: 'https://beta-planet.gvi.co.uk/wp-content/uploads/2023/02/1662325452-2023-feb-24-16-17-14-000000-tonle-sap-cambodia-2021-08-26-18-15-03-utc.jpg'
            }
        ],
        worldCards: [
            {
                id: 1,
                title: 'សួនសត្វ',
                image: 'https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYTdlMmI1MDIwLTRlNTEtMTFlZi04MTJjLTliYTA0YmVhNDc2Zi5qcGc=',
                description: 'នេះជាសួនសត្វដែលមានសត្វកម្រ។'
            },
            {
                id: 2,
                title: 'ឆ្នេរ',
                image: 'https://hanoivoyage.com/uploads//Blogs/Cambodia/Visit-Cambodia/thumnail/sihanoukville-thumbnail-01.jpg',
                description: 'ឆ្នេរខ្សាច់ដ៏ស្រស់ស្អាតជាមួយទឹកថ្លា។'
            },
            {
                id: 3,
                title: 'ទឹកជ្រោះ',
                image: 'https://www.guidingcambodia.com/wp-content/uploads/2023/12/Phnom-Kulen-Waterfall-02-853x640-1.jpg',
                description: 'ទឹកជ្រោះដ៏ស្រស់ស្អាតនៅក្នុងព្រៃ។'
            },
            {
                id: 4,
                title: 'ភ្នំ',
                image: 'https://khmerplaces.com/storage/posts/May2020/36WfY2yWwYZV6ll9icXs.jpg',
                description: 'ភ្នំដ៏អស្ចារ្យសម្រាប់ការឡើងភ្នំ។'
            },
            {
                id: 5,
                title: 'ព្រៃ',
                image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0f/99/03/fd.jpg',
                description: 'ព្រៃដ៏ក្រាស់ជាមួយសត្វព្រៃ និងផ្សងព្រេង។'
            }
        ],
        faqs: [
            {
                id: 1,
                question: 'តើខ្ញុំអាចកក់ដំណើរកម្សាន្តនៅលើគេហទំព័ររបស់អ្នកដោយរបៀបណា?',
                answer: 'គ្រាន់តែជ្រើសរើសគោលដៅរបស់អ្នក ជ្រើសរើសកាលបរិច្ឆេទធ្វើដំណើរ ចុច “កក់ឥឡូវ” បំពេញព័ត៌មានរបស់អ្នក និងធ្វើការទូទាត់។ អ្នកនឹងទទួលបានអ៊ីមែលបញ្ជាក់ភ្លាមៗ!'
            },
            {
                id: 2,
                question: 'តើអ្នកទទួលយកវិធីទូទាត់អ្វីខ្លះ?',
                answer: 'យើងទទួលយកកាតឥណទានសំខាន់ៗទាំងអស់ រួមមាន Visa, MasterCard, American Express និង Discover។ យើងក៏គាំទ្រការទូទាត់តាម PayPal និងការផ្ទេរប្រាក់តាមធនាគារសម្រាប់ការកក់មួយចំនួន។'
            },
            {
                id: 3,
                question: 'តើការទូទាត់របស់ខ្ញុំមានសុវត្ថិភាពទេ?',
                answer: 'បាទ/ចាស សុវត្ថិភាពនៃការទូទាត់របស់អ្នកជាអាទិភាពចម្បងរបស់យើង។ យើងប្រើប្រាស់បច្ចេកវិទ្យាអ៊ីនគ្រីបស្តង់ដារឧស្សាហកម្ម និងច្រកទូទាត់សុវត្ថិភាពដើម្បីការពារព័ត៌មានផ្ទាល់ខ្លួន និងហិរញ្ញវត្ថុរបស់អ្នក។'
            },
            {
                id: 4,
                question: 'តើកាតឥណទានរបស់ខ្ញុំនឹងត្រូវគិតប្រាក់នៅពេលណា?',
                answer: 'ជាទូទៅ កាតឥណទានរបស់អ្នកនឹងត្រូវគិតប្រាក់នៅពេលបញ្ជាក់ការកក់។ សម្រាប់កញ្ចប់ ឬសេវាកម្មជាក់លាក់មួយចំនួន អាចនឹងគិតប្រាក់កក់ជាមុន ដោយសមតុល្យនៅសល់ត្រូវបង់នៅជិតកាលបរិច្ឆេទធ្វើដំណើរ។'
            },
            {
                id: 5,
                question: 'តើខ្ញុំអាចលុបចោល ឬកែប្រែការកក់របស់ខ្ញុំបានទេ?',
                answer: 'គោលការណ៍លុបចោល និងកែប្រែអាស្រ័យលើដំណើរកម្សាន្ត ឬសេវាកម្មជាក់លាក់ដែលបានកក់។ សូមពិនិត្យលក្ខខណ្ឌដែលបានផ្តល់ជូនក្នុងអំឡុងពេលកក់ ឬទាក់ទងក្រុមគាំទ្ររបស់យើងសម្រាប់ជំនួយ។'
            },
            {
                id: 6,
                question: 'តើគោលការណ៍លុបចោល និងសងប្រាក់វិញរបស់អ្នកគឺជាអ្វី?',
                answer: 'គោលការណ៍លុបចោល និងសងប្រាក់វិញរបស់យើងត្រូវបានរៀបរាប់លម្អិតនៅក្នុងលក្ខខណ្ឌនៃការកក់នីមួយៗ។ ជាទូទៅ ការសងប្រាក់អាស្រ័យលើថ្លៃលុបចោល និងពេលវេលាធៀបនឹងកាលបរិច្ឆេទចេញដំណើររបស់អ្នក។ យើងណែនាំឱ្យពិនិត្យគោលការណ៍ទាំងនេះដោយប្រុងប្រយ័ត្នមុននឹងបញ្ជាក់ការកក់។'
            },
            {
                id: 7,
                question: 'តើខ្ញុំត្រូវការទិដ្ឋាការដើម្បីធ្វើដំណើរទៅកាន់គោលដៅរបស់ខ្ញុំទេ?',
                answer: 'តម្រូវការទិដ្ឋាការអាស្រ័យលើសញ្ជាតិរបស់អ្នក និងប្រទេសគោលដៅ។ យើងណែនាំឱ្យពិនិត្យបទប្បញ្ញត្តិទិដ្ឋាការចុងក្រោយជាមួយស្ថានទូត ឬស្ថានកុងស៊ុលនៃប្រទេសគោលដៅរបស់អ្នកជាមុន។'
            }
        ],
        insights: [
            {
                id: 1,
                title: 'ភ្នំសំពៅ',
                description: 'ភ្នំដ៏ស្រស់ស្អាតជាមួយរូងភ្នំ ប្រាសាទ និងរឿងរ៉ាវប្រវត្តិសាស្ត្រដ៏ជ្រៅ',
                image: 'https://www.gocambodia.tours/wp-content/uploads/2016/12/On-the-top-of-Phnom-Sampeou-Mountain.jpg'
            },
            {
                id: 2,
                title: 'ប្រាសាទតាមាន់ធំ',
                description: 'ប្រាសាទខ្មែរបុរាណ ដែលលាក់នៅក្នុងព្រៃជិតព្រំដែនថៃ',
                image: 'https://mel365.com/wp-content/uploads/2015/03/Prasat-Hin-Muang-Tum_20121227_037_Historical-Park_-Khmer_-Prasat-Ta-Moan-Thom_-Temple_-Thailand.jpg'
            },
            {
                id: 3,
                title: 'កោះរុង',
                description: 'កោះត្រូពិចជាមួយឆ្នេរខ្សាច់ស និងទឹកថ្លាឈ្វេង',
                image: 'https://images.mrandmrssmith.com/images/698x522/4390977-song-saa-private-island-koh-rong-islands-cambodia.jpg'
            },
            {
                id: 4,
                title: 'គីរីរម្យ',
                description: 'ឧទ្យានជាតិដ៏ស្ងប់ស្ងាត់ជាមួយព្រៃស្រល់ ខ្យល់ត្រជាក់ និងទឹកជ្រោះ',
                image: 'https://mediaim.expedia.com/destination/2/a6b9587455bb9b498534cbb829f8327e.jpg'
            }
        ],
        destinations: [
            {
                id: 'siem-reap',
                title: 'អង្គរវត្ត',
                description: 'វិមានសាសនាដ៏ធំបំផុតលើលោក',
                image: 'https://cms.siemreaper.click/uploads/angkor_wat_sunrise_discovery2712_997b977984.jpg'
            },
            {
                id: 'kampot',
                title: 'ទន្លេកំពត',
                description: 'ជីវិតនៅជនបទ និងមាត់ទន្លេដ៏ស្រស់ស្អាត',
                image: 'https://pippalihotel.com/wp-content/uploads/2023/03/Get-To-Know-Kampot-River-3.jpg'
            },
            {
                id: 'phnom-penh',
                title: 'ភ្នំពេញ',
                description: 'រដ្ឋធានីជាមួយវប្បធម៌ដ៏សម្បូរបែប',
                image: 'https://blog.bangkokair.com/wp-content/uploads/2025/01/01_phnom-penh-travel-guide.jpg'
            },
            {
                id: 'battambang',
                title: 'ប្រាសាទបាណន់',
                description: 'ប្រាសាទជាច្រើននៅខេត្តបាត់ដំបង',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJqvmkc5uAXt4MA0aPAawOVhKYY28coyMFiA&s'
            }
        ],

        // Favorite
        NoFavorite: 'គ្មានកន្លែងចូលចិត្តនៅឡើយទេ។',
        FavoriteTitle: 'កន្លែង​ដែល​ខ្ញុំ​ចូលចិត្ត',
        GotoGuide: 'ទៅកាន់ការណែនាំ',
        // Traveling Guide page
        heroTitle: 'សូមស្វាគមន៍មកកាន់មគ្គុទ្ទេសក៍ទេសចរណ៍,',
        heroSubtitle: 'ហើយទៅកន្លែងសុបិន្តរបស់អ្នកក្នុងប្រទេសកម្ពុជា',
        travelGuideTitle: 'ស្វែងយល់ពីខេត្តនានារបស់កម្ពុជា',
        BanteayMeanchey: "បន្ទាយមានជ័យ",
        KampongThom: "កំពង់ធំ",
        StungTreng: "ស្ទឹងត្រែង",
        Rattanakiri: "រតនគិរី",
        OddarMeanchey: "ឧត្តរមានជ័យ",
        PreahVihear: "ព្រះវិហារ",
        Takeo: "តាកែវ",
        SihanoukVille: "ក្រុងព្រះសីហនុ",
        Pursat: "ពោធិ៍សាត់",
        Mondulkiri: "មណ្ឌលគីរី",
        SvayRieng: "ស្វាយរៀង",
        SiemReap: "សៀមរាប",
        PreyVeng: "ព្រៃវែង",
        Kratie: "ក្រចេះ",
        KampongChhnang: "កំពង់ឆ្នាំង",
        KampongCham: "កំពង់ចាម",
        Battambang: "បាត់ដំបង",
        PhnomPenh: "ភ្នំពេញ",
        TbongKhmum: "ត្បូងឃ្មុំ",
        KohKong: "កោះកុង",
        Kep: "កែប",
        Kandal: "កណ្ដាល",
        Kampot: "កំពត",
        KampongSpeu: "កំពង់ស្ពឺ",
        Pailin: "ប៉ៃលិន",
        provinces: {
            Battambang: {
                name: "បាត់ដំបង",
                description: "សម្បូរទៅដោយស្ថាបត្យកម្មអាណានិគម និងវាលស្រែ",
            },
            SiemReap: {
                name: "សៀមរាប",
                description: "ទីក្រុងមានសារៈសំខាន់ផ្លូវប្រវត្តិសាស្ត្រនិងស្ថាបត្យកម្មយុគកុលនី",
            },
            PhnomPenh: {
                name: "ភ្នំពេញ",
                description: "រាជធានីពោរពេញដោយប្រវត្តិសាស្ត្រនិងវប្បធម៌",
            },
            Kampot: {
                name: "កំពត",
                description: "ទីក្រុងនៅជាប់ទន្លេ មានដំណាំម្រេចល្បីឈ្មោះ",
            },
            Kep: {
                name: "កែប",
                description: "ល្បីពីផ្សារក្តាមនិងទេសភាពឆ្នេរខ្សាច់",
            },
            Sihanoukville: {
                name: "ព្រះសីហនុ",
                description: "ច្រកចូលទៅកាន់កោះនិងឆ្នេរខ្សាច់នៅកម្ពុជា",
            },
            Pailin: {
                name: "ប៉ៃលិន",
                description: "តំបន់ភ្នំ គ្រឿងអលង្ការ និងជនបទស្ងប់ស្ងាត់",
            },
            KohKong: {
                name: "កោះកុង",
                description: "ព្រៃរហ័សនិងឆ្នេរដែលមិនទាន់មានអ្នកទស្សនា",
            },
            Takeo: {
                name: "តាកែវ",
                description: "ប្រាសាទបុរាណនិងបេតិកភណ្ឌវប្បធម៌",
            },
            Kandal: {
                name: "កណ្ដាល",
                description: "លំនៅដ្ឋានជុំវិញភ្នំពេញ មានភូមិនិងស្រែចម្ការ",
            },
            KampongCham: {
                name: "កំពង់ចាម",
                description: "ល្បីពីចម្ការជ័រនិងស្ពាន",
            },
            KampongChhnang: {
                name: "កំពង់ឆ្នាំង",
                description: "ភូមិលើទឹកនិងការចម្ការ៉ូបបុរាណ",
            },
            KampongSpeu: {
                name: "កំពង់ស្ពឺ",
                description: "កន្លែងធ្វើដំណើរជិះភ្នំនិងទឹកជ្រោះក្បែរភ្នំអូរ៉ាល់",
            },
            KampongThom: {
                name: "កំពង់ធំ",
                description: "កណ្ដាលប្រទេស មានប្រាសាទសំបូរព្រៃគុក",
            },
            Kratie: {
                name: "ក្រចេះ",
                description: "ផ្ទះរស់នៅរបស់ដាល់ហ្វាំងអ៊ីរ៉ាវ៉ាឌីនៅទន្លេមេគង្គ",
            },
            PreyVeng: {
                name: "ព្រៃវែង",
                description: "ខេត្តស្រស់ស្អាតជាមួយទេសភាពជនបទលាក់ខ្លួន",
            },
            SvayRieng: {
                name: "ស្វាយរៀង",
                description: "នៅជាប់ព្រំដែនវៀតណាម ពោរពេញដោយស្រែស្រូវ",
            },
            Pursat: {
                name: "ពោធិ៍សាត់",
                description: "ល្បីពីការប៉ាន់ថ្មនិងភ្នំកាដាម៉ូម",
            },
            OddarMeanchey: {
                name: "ឧត្តរមានជ័យ",
                description: "ខេត្តដាច់ស្រយាល មានព្រៃឈើនិងប្រាសាទ",
            },
            PreahVihear: {
                name: "ព្រះវិហារ",
                description: "ប្រាសាទបេតិកភណ្ឌពិភពលោកលើភ្នំនៅព្រំដែន",
            },
            StungTreng: {
                name: "ស្ទឹងត្រែង",
                description: "ទីក្រុងនៅត្បូងប្រទេសជិតព្រំដែនឡាវ",
            },
            Rattanakiri: {
                name: "រតនគិរី",
                description: "ទឹកជ្រោះ ព្រៃឈើនិងភូមិជនជាតិភាគតិច",
            },
            Mondulkiri: {
                name: "មណ្ឌលគិរី",
                description: "អាកាសធាតុត្រជាក់និងមជ្ឈមណ្ឌលដំឡូងដំឡង់",
            },
            TbongKhmum: {
                name: "ត្បូងឃ្មុំ",
                description: "បានបំបែកចេញពីកំពង់ចាម មានជនបទស្ងប់ស្ងាត់",
            },
            BanteayMeanchey: {
                name: "បន្ទាយមានជ័យ",
                description: "ខេត្តជាប់ព្រំដែន ល្បីពីប្រាសាទនិងផ្សារ",
            }
        },

        // Customer Reviews
        Reviews: {
            Title: "ការពិនិត្យអតិថិជន",
            Posted: "បានបង្ហោះ",
            WriteReview: "សរសេរការពិនិត្យ",
            Add: "បន្ថែម",
            SubmitReview: "ដាក់ស្នើការពិនិត្យ",
            NoReviews: "មិន​ទាន់​មានពិនិត្យមើល​នៅឡើយ​ទេ​។ ក្លាយជាអ្នកសរសេរដំបូង!",
            NotLogIn: 'សូមចុះឈ្មោះចូលដើម្បីសរសេរការវាយតម្លៃ។'
        }
    }
}

// Get saved locale or fallback to 'en'
const savedLocale = localStorage.getItem('locale') || 'en'

// Create i18n instance
const i18n = createI18n({
    legacy: false,
    locale: savedLocale,
    fallbackLocale: 'en',
    messages,
})

export default i18n
