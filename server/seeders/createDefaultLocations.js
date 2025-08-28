const db = require('../models');

async function createDefaultLocations() {
  try {
    const locations = [
      {
    name: 'Banteay Meanchey',
    country: 'Cambodia',
    image: 'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Banteay-Meanchey2.jpg',
  },
  {
    name: 'Preah Vihear',
    country: 'Cambodia',
    image: 'https://www.birdguideasso.org/wp-content/uploads/2018/09/Preah-Vihear-Temple-1-e1545105862913.jpg',
  },
  {
    name: 'Phnom Penh',
    country: 'Cambodia',
    image: 'https://www.ppmlgroup.com/wp-content/uploads/2022/02/5b2b2134f3661.jpg',
  },
  {
    name: 'Kandal',
    country: 'Cambodia',
    image: 'https://dnf06fpg9xipc.cloudfront.net/geocambodia/province-landmark/21.jpg',
  },
  {
    name: 'Svay Rieng',
    country: 'Cambodia',
    image: 'https://tourismcambodia.org/storage/uploads/category_banner/ministry-of-tourism-cambodia-2019-02-11-07-23-27am-Svay-Rieng-Taxi-in-Cambodia.png',
  },
  {
    name: 'Stung Treng',
    country: 'Cambodia',
    image: 'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Stueng-Treng-5.jpg',
  },
  {
    name: 'Takeo',
    country: 'Cambodia',
    image: 'https://mediaim.expedia.com/destination/1/492c45494b515ffc04169afcad554808.jpg',
  },
  {
    name: 'Siem Reap',
    country: 'Cambodia',
    image: 'https://cms.siemreaper.click/uploads/angkor_wat2712_4e0d04bf8f.jpeg',
  },
  {
    name: 'Pursat',
    country: 'Cambodia',
    image: 'https://visitlocaltravel.com/blog/wp-content/uploads/2024/03/Pursat-Province.png',
  },
  {
    name: 'Prey Veng',
    country: 'Cambodia',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkgdLEtXKbWJfrmIc-2vfaSfDEh5pOFu-RZg&s',
  },
  {
    name: 'Pailin',
    country: 'Cambodia',
    image: 'https://www.shutterstock.com/image-photo/pailin-city-province-cambodia-july-260nw-2332159129.jpg',
  },
  {
    name: 'Oddar Meanchey',
    country: 'Cambodia',
    image: 'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/03/ministry-of-tourism-cambodia-2019-02-18-07-39-42am-Oddar-Meanchey-01.jpg',
  },
  {
    name: 'Mondulkiri',
    country: 'Cambodia',
    image: 'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Mondulkiri3.jpg',
  },
  {
    name: 'Kratie',
    country: 'Cambodia',
    image: 'https://visitlocaltravel.com/blog/wp-content/uploads/2024/02/Kratie-Province.png',
  },
  {
    name: 'Kampong Cham',
    country: 'Cambodia',
    image: ' https://khmerplaces.com/storage/provinces/August2020/SKG2ZykZUT7xz4q6t9kF.jpg',
  },
  {
    name: 'Kampong Chhnang',
    country: 'Cambodia',
    image: 'https://pppenglish.sgp1.digitaloceanspaces.com/image/main/field/image/img_6722.jpg',
  },
 
  {
    name: 'Battambang',
    country: 'Cambodia',
    image: 'https://pppenglish.sgp1.digitaloceanspaces.com/image/main/field/image/a_statue_of_lok_ta_dambang_kronhung_at_his_namesake_roundabout_on_national_road_5_in_battambang_town._yousos_apdoulrashim.jpg',
  },
  {
    name: 'Kampong Speu',
    country: 'Cambodia',
    image: 'https://www.asiakingtravel.com/cuploads/files/Kampong-Speu-1(2).jpg',
  },
  {
    name: 'Tbong Khmum',
    country: 'Cambodia',
    image: 'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Tbong-Khmum-3.jpg',
  },
  {
    name: 'Koh Kong',
    country: 'Cambodia',
    image: 'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Koh-Kong3.jpg',
  },
  {
    name: 'Kampot',
    country: 'Cambodia',
    image: 'https://img.harbor-property.com/bkarticle/2021/10/25/173634624.jpg',
  },
  {
    name: 'Ratanakiri',
    country: 'Cambodia',
    image: 'https://soprita.com/wp-content/uploads/2025/03/LleWYPYfulce13Kazygv.jpg',
  },
  {
    name: 'Kampong Thom',
    country: 'Cambodia',
    image: 'https://dnf06fpg9xipc.cloudfront.net/geocambodia/province-landmark/07.jpg',
  },
    ];

    const existingLocations = await db.Location.findAll();
    if (existingLocations.length === 0) {
      await db.Location.bulkCreate(locations);
      console.log('✅ Default locations with images created');
    } else {
      console.log('ℹ️ Locations already exist');
    }
  } catch (error) {
    console.error('❌ Error creating default locations:', error.message);
  }
}

module.exports = createDefaultLocations;
