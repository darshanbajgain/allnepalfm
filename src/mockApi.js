import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 500 }); // Add delay for realism

// Mock station data
const stations = [
  {
    id: 1,
    name: "Radio Nepal",
    province: "Bagmati Province",
    url: "https://stream1.radionepal.gov.np/live/?play",
    categories: ["popular", "music", "news"],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzgIkj8j9CkJV_pCmaFDsv3bpMfWdFgE4S5g&s",
    frequency: "100 MHz"
  },
  {
    id: 2,
    name: "Kantipur FM",
    province: "Bagmati Province",
    url: "https://radio-broadcast.ekantipur.com/stream",
    categories: ["popular", "music", "news"],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu4clGkf4E3n_LEL-vyTCOC_xSRcguZU5pCA&s",
    frequency: "96.1 MHz"
  },
  {
    id: 3,
    name: "Radio Sarangi",
    province: "Koshi Province",
    url: "http://streaming.softnep.net:8037/;stream.nsv&type=mp3",
    categories: ["music"],
    frequency: "101.3 MHz",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ68DS0RdPmlU6ABkdW7thOFyDjyb6THALmX5g_Cr-iPjN-86v_-sUKDj8dmeg9WRjzpuo&usqp=CAU"
  },
  {
    id: 4,
    name: "Ujyaalo 90 Netwrok",
    province: "Bagmati Province",
    url: "https://stream-147.zeno.fm/wtuvp08xq1duv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJ3dHV2cDA4eHExZHV2IiwiaG9zdCI6InN0cmVhbS0xNDcuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6ImZ2N09wVHhkUmItRncyX0h2bjlKVHciLCJpYXQiOjE3MzgzMzU5MjgsImV4cCI6MTczODMzNTk4OH0.hyY3k94h6F4RMkV1F_pEoVNu5EQI_aFQcGXRXK3RuYI",
    categories: ["news"],
    frequency: "90 MHz",
    img: "https://unncdn.prixacdn.net/static/frontend/img/logo.png"
  },

  {
    id: 5,
    name: "Radio Vision",
    province: "Koshi Province",
    url: "https://live.itech.host:3765/stream",
    categories: ["news", "music"],
    frequency: "91.6 MHz",
    img: "https://images.hamro-files.com/iZMMi5Jpe0c2c_QIQ3hxEfb6Bls=/500x500/https://sgp1.digitaloceanspaces.com/everestdb/hamropatro-backend/radio/bd20e093-874b-4fa7-b75f-fdafc35dea07"
  }
];

// Utility function to calculate station counts
const calculateProvinceStationCounts = () => {
  const stationCounts = {};
  stations.forEach((station) => {
    const province = station.province;
    stationCounts[province] = (stationCounts[province] || 0) + 1;
  });
  return stationCounts;
};

// Mock province data with dynamic station counts
const provinceData = [
  {
    name: "Koshi Province",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Mount_Everest_as_seen_from_Drukair2_PLW_edit_Cropped.jpg"
  },
  {
    name: "Madhesh Province",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/a2/de/04/oyo-308-hotel-shubham.jpg?w=1000&h=1000&s=1"
  },
  {
    name: "Bagmati Province",
    image:
      "https://www.holidaystonepal.in/media/files/Blogs/Pashupatinath-Temple-Photos/Pashupatinath-Temple.png"
  },
  {
    name: "Gandaki Province",
    image:
      "https://admin.ntb.gov.np/image-cache/Banner_and_thumbnail_pic-1630040937.JPG?p=main&s=0e6ed0d57e9fe532e4b1b345f9d62e12"
  },
  {
    name: "Lumbini Province",
    image:
      "https://www.holidaystonepal.in/media/files/Blogs/LumbiniOfNepal/lumbini-of-nepal.png"
  },
  {
    name: "Karnali Province",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/85/3f/22/rara-lake-lies-in-western.jpg?w=900&h=500&s=1"
  },
  {
    name: "Sudurpashchim Province",
    image: "https://farsightnepal.com/media/photos/Sudurpaschim.jpg"
  }
];

// Add station counts dynamically to province data
const stationCounts = calculateProvinceStationCounts();
provinceData.forEach((province) => {
  province.stationCount = stationCounts[province.name] || 0;
});

// Mock endpoints
mock.onGet("/stations").reply(200, stations); // List all stations
mock.onGet("/provinces").reply(200, provinceData); // Province data with station counts

// Export Axios instance
export default axios;
