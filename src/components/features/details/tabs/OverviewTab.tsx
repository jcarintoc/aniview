import TabsHeader from "../TabsHeader";
import type { Anime } from "@/type/top";

interface OverviewTabProps {
  animeData: Anime;
}

const OverviewTab = ({ animeData }: OverviewTabProps) => {
  if (!animeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" p-4 flex items-start gap-8">
      <TabsHeader>Overview</TabsHeader>
      <div className="space-y-4">
        {animeData.synopsis && (
          <div>
            <h3 className="font-semibold mb-2 font-secondary text-xl">Synopsis</h3>
            <p className="text-muted-foreground">{animeData.synopsis}</p>
          </div>
        )}
        {animeData.background && (
          <div>
            <h3 className="font-semibold mb-2 font-secondary text-xl">Background</h3>
            <p className="text-muted-foreground">{animeData.background}</p>
          </div>
        )}
        {/* Add more overview content here */}
      </div>
    </div>
  );
};

export default OverviewTab;
