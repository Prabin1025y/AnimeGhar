import React from "react";
import { Skeleton } from "../ui/skeleton";

const AnimeCardSkeleton = () => {
  return (
    <div className="group cursor-pointer transition-all duration-300 hover:scale-105 max-w-52">
      <div className="bg-card dark:bg-slate-800/50 border rounded-md overflow-hidden shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
        <div className="relative">
          {/* Image skeleton */}
          <Skeleton className="w-full h-64" />
        </div>
        
        <div className="p-4">
          {/* Title skeleton */}
          <Skeleton className="h-4 w-3/4 mb-2" />
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {/* Type skeleton */}
            <Skeleton className="h-3 w-12" />
            
            <div className="flex gap-[2px]">
              {/* Episode badges skeleton */}
              <Skeleton className="h-6 w-8 rounded" />
              <Skeleton className="h-6 w-8 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCardSkeleton;
