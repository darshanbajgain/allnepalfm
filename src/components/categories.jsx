import { Card, CardContent } from "@/components/ui/card";

const provinces = [
  "Koshi Province",
  "Madhesh Province",
  "Bagmati Province",
  "Gandaki Province",
  "Lumbini Province",
  "Karnali Province",
  "Sudurpashchim Province",
];

const colors = [
  "bg-red-300 hover:bg-red-200",
  "bg-blue-300 hover:bg-blue-200",
  "bg-green-300 hover:bg-green-200",
  "bg-yellow-300 hover:bg-yellow-200",
  "bg-purple-300 hover:bg-purple-200",
  "bg-pink-300 hover:bg-pink-200",
  "bg-indigo-300 hover:bg-indigo-200",
];

export function CategoriesSection({ selectedProvince, setSelectedProvince }) {
  // This is a mock function. In a real application, you'd fetch this data from your backend.
  const getStationCount = (province) => {
    return Math.floor(Math.random() * 50) + 10; // Returns a random number between 10 and 59
  };

  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold mb-6 mx-2">Listen by Provinces</h2>
      <div className=" sticky top-4 grid grid-cols-1 sm:grid-cols-2 gap-4 m-2 mb-6">
        {provinces.map((province, index) => (
          <Card
            key={province}
            className={`cursor-pointer rounded-xl transition-all duration-300 transform hover:scale-95 ${
              colors[index % colors.length]
            } ${selectedProvince === province ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => setSelectedProvince(province)}
          >
            <CardContent className="p-4">
              <div className="w-full flex items-center justify-center">
                <img
                  src={`https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Koshi_Province%2C_Nepal.png/600px-Koshi_Province%2C_Nepal.png?20170729155451`}
                  alt={`Map of ${province}`}
                  className="w-44 h-auto object-cover mb-2 rounded"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                {province}
              </h3>
              <p className="text-xs text-gray-600">
                {getStationCount(province)} FM Stations
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
