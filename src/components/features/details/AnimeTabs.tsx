import { lazy, Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Anime } from "@/type/top";

// Lazy load tab components - they'll only be loaded when needed
const OverviewTab = lazy(
  () => import("@/components/features/details/tabs/OverviewTab")
);
const CharactersTab = lazy(
  () => import("@/components/features/details/tabs/CharactersTab")
);
const EpisodesTab = lazy(
  () => import("@/components/features/details/tabs/EpisodesTab")
);
const CastTab = lazy(
  () => import("@/components/features/details/tabs/CastTab")
);

const tabs = [
  {
    label: "Overview",
    value: "overview",
    component: OverviewTab,
  },
  {
    label: "Characters",
    value: "characters",
    component: CharactersTab,
  },
  {
    label: "Episodes",
    value: "episodes",
    component: EpisodesTab,
  },
  {
    label: "Cast",
    value: "cast",
    component: CastTab,
  },
];

// Loading fallback component
const TabLoadingFallback = () => (
  <div className="p-4 flex items-center justify-center min-h-[200px]">
    <div>Loading...</div>
  </div>
);

const AnimeTabs = ({
  animeId,
  animeData,
}: {
  animeId: string;
  animeData: Anime;
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      defaultValue="overview"
      className="max-w-7xl mx-auto space-y-4"
    >
      <div className="flex items-start justify-center">
        <TabsList className="font-secondary">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map((tab) => {
        const LazyTabComponent = tab.component;
        // Only render the component if this tab is active
        return (
          <TabsContent key={tab.value} value={tab.value}>
            {activeTab === tab.value && (
              <Suspense fallback={<TabLoadingFallback />}>
                <LazyTabComponent animeId={animeId} animeData={animeData} />
              </Suspense>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default AnimeTabs;
