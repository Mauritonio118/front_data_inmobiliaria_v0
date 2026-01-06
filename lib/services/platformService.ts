
import clientPromise from '@/lib/mongodb';
import { Platform } from '@/types/platform';


const COLLECTION_NAME = 'platforms';

export async function getPlatformsCount(): Promise<number> {
    try {
        const client = await clientPromise;
        const db = client.db();
        const count = await db.collection(COLLECTION_NAME).countDocuments();
        return count;
    } catch (error) {
        console.error('Failed to get platforms count:', error);
        throw new Error('Failed to get platforms count');
    }
}

export async function getPlatformBySlug(slug: string): Promise<Platform | null> {
    try {
        const client = await clientPromise;
        const db = client.db();

        const platform = await db
            .collection<Platform>(COLLECTION_NAME)
            .findOne(
                { slug: slug },
                {
                    projection: {
                        dataSources: 0,
                        theCrowdSpace: 0,
                        meta: 0,
                        projectRoutes: 0
                    }
                }
            );

        return platform;
    } catch (error) {
        console.error(`Failed to get platform with slug ${slug}:`, error);
        throw new Error(`Failed to get platform with slug ${slug}`);
    }
}

