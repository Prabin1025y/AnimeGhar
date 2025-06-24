import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Trophy } from "lucide-react";

const Top10Skeleton = () => {
  return (
    <div style={{ gridArea: "ranked" }} className="space-y-6">
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-sm p-1 bg-slate-800/50 border hover:bg-slate-800 transition-all duration-300 cursor-pointer group"
          >
            {/* Rank number skeleton */}
            <div className="flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center">
              <Skeleton className="w-6 h-6 rounded-sm" />
            </div>

            {/* Image skeleton */}
            <Skeleton className="rounded-sm h-[80px] w-[60px] flex-shrink-0" />

            {/* Content skeleton */}
            <div className="flex-1 min-w-0">
              {/* Title skeleton */}
              <Skeleton className="h-4 w-3/4 mb-2" />
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <div className="flex gap-[2px]">
                  {/* Episode badges skeleton */}
                  <Skeleton className="h-5 w-12 rounded-l-xs" />
                  <Skeleton className="h-5 w-12 rounded-r-xs" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top10Skeleton;
