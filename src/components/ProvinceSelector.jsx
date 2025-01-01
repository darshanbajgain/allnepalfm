import { Button } from "@components/ui/button"

const provinces = [
  'All',
  'Province 1',
  'Madhesh Province',
  'Bagmati Province',
  'Gandaki Province',
  'Lumbini Province',
  'Karnali Province',
  'Sudurpashchim Province'
]

export default function ProvinceSelector({ selectedProvince, setSelectedProvince }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Select Province</h2>
      <div className="flex flex-wrap gap-2">
        {provinces.map((province) => (
          <Button
            key={province}
            variant={selectedProvince === province ? "default" : "outline"}
            onClick={() => setSelectedProvince(province)}
          >
            {province}
          </Button>
        ))}
      </div>
    </div>
  )
}

