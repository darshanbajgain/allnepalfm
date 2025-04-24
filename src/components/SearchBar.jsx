import useSearchStore from "@/store/searchStore";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearchStore();
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search FM stations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 py-2 h-10 text-sm bg-card border-border/30 focus:ring-1 focus:ring-primary/30 transition-all duration-200 rounded-md"
      />
    </div>
  );
}
