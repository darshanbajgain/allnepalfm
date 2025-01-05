import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 500 }); // Add delay for realism

// Mock station data
const stations = [
  {
    id: 1,
    name: "Radio Nepal",
    province: "Bagmati Province",
    url: "http://radionepal.gov.np/live/",
  },
  {
    id: 2,
    name: "Kantipur FM",
    province: "Bagmati Province",
    url: "https://radio-broadcast.ekantipur.com/stream",
  },
  {
    id: 3,
    name: "Radio Sarangi",
    province: "Koshi Province",
    url: "http://streaming.softnep.net:8037/;stream.nsv&type=mp3",
  },
  {
    id: 4,
    name: "Radio Lumbini",
    province: "Lumbini Province",
    url: "http://streaming.softnep.net:8065/;stream.nsv&type=mp3",
  },
  {
    id: 5,
    name: "Radio Annapurna",
    province: "Gandaki Province",
    url: "http://streaming.softnep.net:8091/;stream.nsv&type=mp3",
  },
  {
    id: 6,
    name: "Radio Karnali",
    province: "Karnali Province",
    url: "http://streaming.softnep.net:8037/;stream.nsv&type=mp3",
  },
  {
    id: 7,
    name: "Sudurpashchim FM",
    province: "Sudurpashchim Province",
    url: "http://streaming.softnep.net:8037/;stream.nsv&type=mp3",
  },
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
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Mount_Everest_as_seen_from_Drukair2_PLW_edit_Cropped.jpg",
  },
  {
    name: "Madhesh Province",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/a2/de/04/oyo-308-hotel-shubham.jpg?w=1000&h=1000&s=1",
  },
  {
    name: "Bagmati Province",
    image:
      "https://www.holidaystonepal.in/media/files/Blogs/Pashupatinath-Temple-Photos/Pashupatinath-Temple.png",
  },
  {
    name: "Gandaki Province",
    image:
      "https://admin.ntb.gov.np/image-cache/Banner_and_thumbnail_pic-1630040937.JPG?p=main&s=0e6ed0d57e9fe532e4b1b345f9d62e12",
  },
  {
    name: "Lumbini Province",
    image:
      "https://www.holidaystonepal.in/media/files/Blogs/LumbiniOfNepal/lumbini-of-nepal.png",
  },
  {
    name: "Karnali Province",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/85/3f/22/rara-lake-lies-in-western.jpg?w=900&h=500&s=1",
  },
  {
    name: "Sudurpashchim Province",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipPAm2MdG46_MXlFvJ8UABlOICUnGAkhaE8AwDeG=s1360-w1360-h1020",
  },
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
