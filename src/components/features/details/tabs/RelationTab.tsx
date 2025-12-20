import { useAnimeRelations } from "@/query/useAnime";
import TabsHeader from "../TabsHeader";
import EmptyState from "@/components/empty-state";
import { useState } from "react";
import type { MalEntity } from "@/type/common";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const RelationTab = ({ animeId }: { animeId: string }) => {
  const [expandedRelations, setExpandedRelations] = useState<Set<string>>(
    new Set()
  );
  const { data: relations, isLoading } = useAnimeRelations(animeId);
  const navigate = useNavigate();

  const handleToggleRelation = (relationType: string) => {
    setExpandedRelations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(relationType)) {
        newSet.delete(relationType);
      } else {
        newSet.add(relationType);
      }
      return newSet;
    });
  };

  const getDisplayedEntries = (entries: MalEntity[], relationType: string) => {
    const isExpanded = expandedRelations.has(relationType);
    return isExpanded ? entries : entries.slice(0, 6);
  };

  const handleNavigate = (mal_id: number, type: string) => {
    if (type === "anime") {
      navigate(`/anime/${mal_id}`);
    }

    return;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-8 p-4">
        <Skeleton className="hidden sm:block sticky top-32 w-18 h-96" />
        <div className="w-full space-y-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="space-y-2 border-b pb-8 last:border-b-0 last:pb-0 flex flex-wrap gap-2"
            >
              <Skeleton className="w-52 h-8 mb-4" />
              <div className="flex flex-row flex-wrap gap-2">
                <Skeleton className="w-32 h-6" />
                <Skeleton className="w-72 h-6" />
                <Skeleton className="w-96 h-6" />
                <Skeleton className="w-52 h-6" />
                <Skeleton className="w-72 h-6" />
                <Skeleton className="w-64 h-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!relations || relations.length === 0) {
    return (
      <EmptyState
        title="No relations found"
        description="This anime has no related entries"
      />
    );
  }

  return (
    <div className="p-4 flex sm:flex-row flex-col items-center sm:items-start sm:gap-8">
      <TabsHeader className="sticky top-32">Relations</TabsHeader>
      <div className="w-full space-y-6">
        {relations.map((relation) => {
          const displayedEntries = getDisplayedEntries(
            relation.entry,
            relation.relation
          );
          const isExpanded = expandedRelations.has(relation.relation);
          const hasMore = relation.entry.length > 6;

          return (
            <div
              key={relation.relation}
              className="space-y-2 border-b pb-8 last:border-b-0 last:pb-0"
            >
              <h3 className="text-lg font-semibold font-secondary mb-4">
                {relation.relation}
              </h3>
              <div className="flex flex-wrap gap-2">
                {displayedEntries.map((item) => (
                  <div
                    className="relative flex items-center gap-2 border rounded-sm px-4 py-2 hover:bg-card hover:ring-2 hover:ring-primary cursor-pointer group"
                    key={item.mal_id}
                    onClick={() => handleNavigate(item.mal_id, item.type)}
                  >
                    <Badge
                      variant={
                        item.type === "anime" ? "default" : "destructive"
                      }
                      className="absolute -top-4 left-2 group-hover:block hidden"
                    >
                      {item.type.toUpperCase()}
                    </Badge>
                    <h4>{item.name} </h4>
                  </div>
                ))}
              </div>
              {hasMore && (
                <Button
                  variant="ghost"
                  onClick={() => handleToggleRelation(relation.relation)}
                  className="w-fit text-primary"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelationTab;
