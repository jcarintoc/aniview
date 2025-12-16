import CarouselImage from "@/components/carousel-image"
import {ChessQueen} from "lucide-react"

const MostPopularSection = () => {
  return (
    <section className="max-w-7xl mx-auto p-3 xl:p-0">
    <CarouselImage sectionTitle="Season Now" Icon={ChessQueen} />
  </section>
  )
}

export default MostPopularSection
