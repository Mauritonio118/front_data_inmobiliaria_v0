import { getPlatformBySlug, getPlatformDataSources } from '@/lib/services/platformService';
import PlatformDetails from '@/components/PlatformDetails';
import PlatformDataSources from '@/components/PlatformDataSources';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PlatformPage({ params }: PageProps) {
    const { slug } = await params;

    // Parallel data fetching
    const [platform, dataSources] = await Promise.all([
        getPlatformBySlug(slug).catch(e => {
            console.error(`Error fetching platform ${slug}:`, e);
            return null;
        }),
        getPlatformDataSources(slug).catch(e => {
            console.error(`Error fetching dataSources for ${slug}:`, e);
            return null;
        })
    ]);

    if (!platform) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <PlatformDetails platform={platform} />
            <PlatformDataSources dataSources={dataSources} />
        </main>
    );
}
