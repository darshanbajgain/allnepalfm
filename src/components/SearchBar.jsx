import useSearchStore from "@/store/searchStore";
import { Input } from "@components/ui/input";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearchStore();
  return (
    <Input
      type="text"
      placeholder="Search FM stations..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="flex-1"
    />
  );
}
