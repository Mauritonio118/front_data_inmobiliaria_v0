import { getPlatforms } from '@/lib/services/platformService';
import PlatformList from '@/components/PlatformList';

export const dynamic = 'force-dynamic';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PlatformsPage(props: PageProps) {

    const searchParams = await props.searchParams;
    const isTestMode = searchParams?.test === 'true';
    const filter = isTestMode ? { status: 'all' } : { status: 'active' };

    let platforms: any[] = [];
    let error = null;

    try {
        platforms = await getPlatforms(filter);
    } catch (e: any) {
        console.error('Error fetching platforms:', e);
        error = e.message || 'Failed to load platforms';
    }

    if (error) {
        return (
            <main className="container mx-auto px-4 py-8">
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20">
                    <h3 className="font-bold text-lg mb-2">Error Loading Platforms</h3>
                    <p>{error}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Real Estate Platforms</h1>
                <p className="text-muted-foreground">
                    Top Real Estate Tokenization & Crowdfunding Platforms
                </p>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <PlatformList platforms={platforms} />
            </div>

            {/* Dev Mode Indicator */}
            {isTestMode && (
                <div className="mt-4 p-2 bg-yellow-500/10 text-yellow-500 text-xs rounded border border-yellow-500/20 inline-block">
                    ⚠️ Test Mode: Showing all platforms (including undefined status)
                </div>
            )}
        </main>
    );
}
