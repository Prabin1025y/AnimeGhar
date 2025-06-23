import { Loader2 } from 'lucide-react';
import React from 'react';

const PlayerSkeleton: React.FC = () => {
    return (
        <div className="w-full col-span-3 row-span-1 max-w-7xl aspect-video bg-black rounded-lg flex items-center justify-center">
            <Loader2 className="w-16 h-16 text-gray-500 animate-spin" />
        </div>
    );
};

export default PlayerSkeleton;
