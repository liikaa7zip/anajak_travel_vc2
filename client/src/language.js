import { createI18n } from 'vue-i18n'
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
        blog: 'Blog Page',
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
                Attractions: "Top Attractions",
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
        },
    },

    km: {

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
                Attractions: "ទីកន្លែងទាក់ទាញ",
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
        home: 'ទំព័រដើម',
        about: 'អំពីពួកយើង',
        guide: 'មគ្គុទ្ទេសក៍ដំណើរកំសាន្ត',
        travelBookings: 'ការកក់ដំណើរកំសាន្ត',
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
        blog: 'ទំព័រប្លុក',
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
                description: "សម្បូរទៅដោយស្ថាបត្យកម្មអាណានិគម និងវាលស្រែ។",
            },
            SiemReap: {
                name: "សៀមរាប",
                description: "ទីក្រុងមានសារៈសំខាន់ផ្លូវប្រវត្តិសាស្ត្រនិងស្ថាបត្យកម្មយុគកុលនី។",
            },
            PhnomPenh: {
                name: "ភ្នំពេញ",
                description: "រាជធានីពោរពេញដោយប្រវត្តិសាស្ត្រនិងវប្បធម៌។",
            },
            Kampot: {
                name: "កំពត",
                description: "ទីក្រុងនៅជាប់ទន្លេ មានដំណាំម្រេចល្បីឈ្មោះ។",
            },
            Kep: {
                name: "កែប",
                description: "ល្បីពីផ្សារក្តាមនិងទេសភាពឆ្នេរខ្សាច់។",
            },
            Sihanoukville: {
                name: "ព្រះសីហនុ",
                description: "ច្រកចូលទៅកាន់កោះនិងឆ្នេរខ្សាច់នៅកម្ពុជា។",
            },
            Pailin: {
                name: "ប៉ៃលិន",
                description: "តំបន់ភ្នំ គ្រឿងអលង្ការ និងជនបទស្ងប់ស្ងាត់។",
            },
            KohKong: {
                name: "កោះកុង",
                description: "ព្រៃរហ័សនិងឆ្នេរដែលមិនទាន់មានអ្នកទស្សនា។",
            },
            Takeo: {
                name: "តាកែវ",
                description: "ប្រាសាទបុរាណនិងបេតិកភណ្ឌវប្បធម៌។",
            },
            Kandal: {
                name: "កណ្ដាល",
                description: "លំនៅដ្ឋានជុំវិញភ្នំពេញ មានភូមិនិងស្រែចម្ការ។",
            },
            KampongCham: {
                name: "កំពង់ចាម",
                description: "ល្បីពីចម្ការជ័រនិងស្ពាន។",
            },
            KampongChhnang: {
                name: "កំពង់ឆ្នាំង",
                description: "ភូមិលើទឹកនិងការចម្ការ៉ូបបុរាណ។",
            },
            KampongSpeu: {
                name: "កំពង់ស្ពឺ",
                description: "កន្លែងធ្វើដំណើរជិះភ្នំនិងទឹកជ្រោះក្បែរភ្នំអូរ៉ាល់។",
            },
            KampongThom: {
                name: "កំពង់ធំ",
                description: "កណ្ដាលប្រទេស មានប្រាសាទសំបូរព្រៃគុក។",
            },
            Kratie: {
                name: "ក្រចេះ",
                description: "ផ្ទះរស់នៅរបស់ដាល់ហ្វាំងអ៊ីរ៉ាវ៉ាឌីនៅទន្លេមេគង្គ។",
            },
            PreyVeng: {
                name: "ព្រៃវែង",
                description: "ខេត្តស្រស់ស្អាតជាមួយទេសភាពជនបទលាក់ខ្លួន។",
            },
            SvayRieng: {
                name: "ស្វាយរៀង",
                description: "នៅជាប់ព្រំដែនវៀតណាម ពោរពេញដោយស្រែស្រូវ។",
            },
            Pursat: {
                name: "ពោធិ៍សាត់",
                description: "ល្បីពីការប៉ាន់ថ្មនិងភ្នំកាដាម៉ូម។",
            },
            OddarMeanchey: {
                name: "ឧត្តរមានជ័យ",
                description: "ខេត្តដាច់ស្រយាល មានព្រៃឈើនិងប្រាសាទ។",
            },
            PreahVihear: {
                name: "ព្រះវិហារ",
                description: "ប្រាសាទបេតិកភណ្ឌពិភពលោកលើភ្នំនៅព្រំដែន។",
            },
            StungTreng: {
                name: "ស្ទឹងត្រែង",
                description: "ទីក្រុងនៅត្បូងប្រទេសជិតព្រំដែនឡាវ។",
            },
            Rattanakiri: {
                name: "រតនគិរី",
                description: "ទឹកជ្រោះ ព្រៃឈើនិងភូមិជនជាតិភាគតិច។",
            },
            Mondulkiri: {
                name: "មណ្ឌលគិរី",
                description: "អាកាសធាតុត្រជាក់និងមជ្ឈមណ្ឌលដំឡូងដំឡង់។",
            },
            TbongKhmum: {
                name: "ត្បូងឃ្មុំ",
                description: "បានបំបែកចេញពីកំពង់ចាម មានជនបទស្ងប់ស្ងាត់។",
            },
            BanteayMeanchey: {
                name: "បន្ទាយមានជ័យ",
                description: "ខេត្តជាប់ព្រំដែន ល្បីពីប្រាសាទនិងផ្សារ។",
            }
        },
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
