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

    const platforms = await getPlatforms(filter);

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
