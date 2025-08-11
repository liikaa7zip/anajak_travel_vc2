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
                comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.'
            },
            evangeline: {
                name: 'Evangeline',
                role: 'Model',
                comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.'
            },
            alexander: {
                name: 'Alexander',
                role: 'Software Engineer',
                comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.'
            },
            michael: {
                name: 'Michael',
                role: 'Travel Blogger',
                comment: 'Amazing experience exploring Cambodia with Anajak Travel. The guides were knowledgeable and the destinations were breathtaking.'
            },
            sarah: {
                name: 'Sarah',
                role: 'Photographer',
                comment: 'Perfect trip planning and execution. Highly recommend for anyone visiting Cambodia! The cultural sites were incredible.'
            },
            david: {
                name: 'David',
                role: 'Adventure Seeker',
                comment: 'Unforgettable memories created with professional service and great attention to detail. Will definitely book again!'
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
                id: 'siem-reap',
                title: 'Angkor Wat',
                description: 'The world\'s largest religious monument',
                image: 'https://cms.siemreaper.click/uploads/angkor_wat_sunrise_discovery2712_997b977984.jpg'
            },
            {
                id: 'kampot',
                title: 'Kampot River',
                description: 'Scenic riverside and countryside life',
                image: 'https://pippalihotel.com/wp-content/uploads/2023/03/Get-To-Know-Kampot-River-3.jpg'
            },
            {
                id: 'phnom-penh',
                title: 'Phnom Penh',
                description: 'Capital city with rich culture',
                image: 'https://blog.bangkokair.com/wp-content/uploads/2025/01/01_phnom-penh-travel-guide.jpg'
            },
            {
                id: 'battambang',
                title: 'Banan Temple',
                description: 'Many temples in Battambang',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJqvmkc5uAXt4MA0aPAawOVhKYY28coyMFiA&s'
            }
        ]

    },
    km: {
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
                name: 'ការជិះទូក',
                description: 'ដំណើរកម្សាន្តកោះដ៏ស្រស់ស្អាត',
                badge: 'ពេញនិយម'
            },
            beachTours: {
                name: 'កម្សាន្តឆ្នេរ',
                description: 'ការសម្រាកលើឆ្នេរត្រូពិច',
                badge: 'ពេញនិយម'
            },
            museumTour: {
                name: 'ទស្សនកិច្ចសារមន្ទីរ',
                description: 'ស្វែងយល់ពីប្រវត្តិសាស្ត្រនិងវប្បធម៌ខ្មែរ',
                badge: 'កំពុងពេញនិយម'
            },
            food: {
                name: 'អាហារ',
                description: 'ម្ហូបខ្មែរសុទ្ធដោយទន្លេ',
                badge: 'ពេញនិយម'
            },
            hiking: {
                name: 'ដើរព្រៃ',
                description: 'ដំណើរព្រៃនិងធម្មជាតិ',
                badge: 'ពេញនិយម'
            },
            cityTours: {
                name: 'កម្សាន្តក្នុងទីក្រុង',
                description: 'ស្វែងយល់ពីភាពទាក់ទាញនៃទីក្រុងភ្នំពេញ',
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
                comment: 'Lorem Ipsum គឺជាអត្ថបទសាកល្បងនៃឧស្សាហកម្មបោះពុម្ពនិងការតម្រៀបអក្សរ។'
            },
            evangeline: {
                name: 'អេវ៉ានជែលីន',
                role: 'តារាម៉ូដែល',
                comment: 'Lorem Ipsum គឺជាអត្ថបទសាកល្បងនៃឧស្សាហកម្មបោះពុម្ពនិងការតម្រៀបអក្សរ។'
            },
            alexander: {
                name: 'អាឡិចសាន់ឌឺ',
                role: 'វិស្វករផ្នែកទន់',
                comment: 'Lorem Ipsum គឺជាអត្ថបទសាកល្បងនៃឧស្សាហកម្មបោះពុម្ពនិងការតម្រៀបអក្សរ។'
            },
            michael: {
                name: 'ម៉ៃឃល',
                role: 'អ្នកសរសេរប្លុកទេសចរណ៍',
                comment: 'បទពិសោធន៍ដ៏អស្ចារ្យក្នុងការរុករកកម្ពុជាជាមួយអាណាចក្រទេសចរណ៍។ មគ្គុទ្ទេសក៍មានចំណេះដឹង និងគោលដៅទេសចរណ៍គួរឱ្យចាប់អារម្មណ៍។'
            },
            sarah: {
                name: 'សារ៉ា',
                role: 'អ្នកថតរូប',
                comment: 'ការរៀបចំដំណើរកម្សាន្តល្អឥតខ្ចោះ។ សូមណែនាំយ៉ាងខ្លាំងសម្រាប់អ្នកដែលទៅលេងកម្ពុជា! ទីតាំងវប្បធម៌គឺអស្ចារ្យណាស់។'
            },
            david: {
                name: 'ដេវីដ',
                role: 'អ្នកស្វែងរកដំណើរផ្សងព្រេង',
                comment: 'ការចងចាំដែលមិនអាចបំភ្លេចបានជាមួយសេវាកម្មប្រកបដោយវិជ្ជាជីវៈនិងការយកចិត្តទុកដាក់លើព័ត៌មានលម្អិត។ នឹងកក់ម្តងទៀតជាមិនខាន!'
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
        ]
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
