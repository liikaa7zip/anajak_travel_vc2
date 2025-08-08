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

    },
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
