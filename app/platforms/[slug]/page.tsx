import { getPlatformBySlug } from '@/lib/services/platformService';
import PlatformDetails from '@/components/PlatformDetails';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PlatformPage({ params }: PageProps) {
    const { slug } = await params;
    const platform = await getPlatformBySlug(slug);

    if (!platform) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <PlatformDetails platform={platform} />
        </main>
    );
}
