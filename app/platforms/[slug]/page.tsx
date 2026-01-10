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
    let platform = null;
    let error = null;

    try {
        platform = await getPlatformBySlug(slug);
    } catch (e: any) {
        console.error(`Error fetching platform ${slug}:`, e);
        error = e.message;
    }

    if (error) {
        return (
            <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl text-center">
                    <h1 className="text-xl font-bold text-red-600 mb-2">Error Loading Platform</h1>
                    <p className="text-gray-700">{error}</p>
                </div>
            </main>
        );
    }

    if (!platform) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <PlatformDetails platform={platform} />
        </main>
    );
}
