import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-md ml-16">
      {/* Search Icon */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

      {/* Input */}
      <Input
        type="text"
        placeholder="Search for items, users, or keywords..."
        className="pl-10 pr-4 h-12 w-full rounded-2xl border-2 border-gray-200 bg-white text-gray-800 placeholder:text-gray-400
                   focus:border-[#A5B68D] focus:ring-2 focus:ring-[#A5B68D]/30 transition-all shadow-sm hover:shadow-md"
      />
    </div>
  )
}
