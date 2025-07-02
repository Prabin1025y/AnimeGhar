import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Loader2, RefreshCw } from 'lucide-react';
import React from 'react';

const PlayerError: React.FC = () => {
    return (
        <div className="w-full col-span-3 row-span-1 max-w-7xl aspect-video bg-black rounded-lg flex items-center justify-center">
            <Card className="w-full max-w-md bg-transparent border-none">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-400">Server Error</CardTitle>
                    <CardDescription className="text-gray-600">
                        Something went wrong on our end. Please tune in when it is fixed.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center">
                        <p className="text-sm text-gray-500 mb-4">
                            We're working to resolve this issue. In meantime feel free to explore other anime.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PlayerError;
