"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Description = ({ description }: { description: string }) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="space-y-2">
        <p
          className={`text-white/80 leading-relaxed text-justify ${
            !isDescriptionOpen ? "line-clamp-3" : ""
          }`}
        >
          {description || "Description not available"}
        </p>
      </div>
      <Button
        variant="ghost"
        className="mt-2 p-0 h-auto font-normal text-cyan-300 hover:text-cyan-200"
        onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
      >
        {isDescriptionOpen ? (
          <>
            Show Less <ChevronUp className="h-4 w-4 ml-1" />
          </>
        ) : (
          <>
            Show More <ChevronDown className="h-4 w-4 ml-1" />
          </>
        )}
      </Button>
    </div>
  );
};

export default Description;
