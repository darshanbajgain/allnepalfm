import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  provinces,
  selectedProvince,
  handleProvinceSelect,
}) {
  return (
    <div className="mb-6 max-w-screen-sm flex flex-col sm:flex-row gap-4">
      <Input
        type="text"
        placeholder="Search FM stations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1"
      />
      <Select value={selectedProvince} onValueChange={handleProvinceSelect}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter by Province" />
        </SelectTrigger>
        <SelectContent>
          {provinces.map((province) => (
            <SelectItem key={province} value={province}>
              {province}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
