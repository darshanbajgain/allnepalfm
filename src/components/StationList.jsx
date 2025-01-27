import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { usePlayerStore } from "@/store/playerStore"
import useSearchStore from "@/store/searchStore"
import axios from "@/mockApi"
import Loader from "./Loader"
import useStationsStore from "@/store/stationsStore"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function StationList() {
  const { searchTerm, selectedProvince } = useSearchStore()
  const { setStations, setCurrentStation, stations, setShowPlayer } = usePlayerStore()
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(false)
  const { selectedFilter } = useStationsStore()

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/stations")
        setStations(response.data)
      } catch (error) {
        console.error("Error fetching stations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStations()
  }, [setStations])

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const filteredStations = stations?.filter((station) => {
    const matchesProvince = selectedProvince === "All" || station.province === selectedProvince
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || station.categories.includes(selectedFilter)

    return matchesProvince && matchesSearch && matchesFilter
  })

  const handlePlayClick = (station) => {
    setCurrentStation(station)
    setShowPlayer(true)
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-32">
        <Loader className="text-primary h-12 w-12 border-4" />
      </div>
    )

  if (filteredStations.length === 0) return <p>No stations found.</p>


  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 gap-4  lg:gap-6">
      {filteredStations.map((station) => (
        <Card
          key={station.id}
          className="group overflow-hidden border-border/30 rounded-xl transition-all duration-300 hover:shadow-lg flex flex-col"
        >
          <div className="relative flex flex-col lg:flex-row items-center p-4 gap-2 justify-start">


            <div className="flex items-center justify-between w-full gap-2">
              <Avatar className="h-6 w-6 lg:h-8 lg:w-8 rounded-lg">
                <AvatarImage src={station.imageUrl} alt={station.name} className="object-cover" />
                <AvatarFallback className="rounded-lg text-xs lg:text-sm font-medium bg-border/80 text-white">
                  {station.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-xs lg:text-sm leading-tight truncate flex-1">{station.name}</h3>
            </div>
          </div>
          <CardContent className="p-4 border-t border-border/30 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between ">
              <span className="text-xs md:text-sm font-semibold text-muted-foreground">
                {station.frequency || "92 MHz"}
              </span>
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 px-2 py-2 rounded-full text-white hover:text-primary-foreground hover:bg-border/50 bg-border"
                onClick={() => handlePlayClick(station)}
              >
                <Play className="h-6 w-6 text-white" />
              </Button>

            </div>

            <div>
              <p className="text-xs text-muted-foreground truncate">
                {station.province}
              </p>
            </div>

          </CardContent>
        </Card>
      ))}
    </div>
  )
}