
import clientPromise from '@/lib/mongodb';
import { Platform } from '@/types/platform';


const COLLECTION_NAME = 'platforms';

/**
 * Retrieves the total count of platforms in the database.
 * @returns The number of platforms.
 */
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

/**
 * Retrieves a single platform by its slug.
 * Excludes heavy fields like dataSources, theCrowdSpace, meta, and projectRoutes by default.
 * @param slug - The unique slug of the platform.
 * @returns The platform object or null if not found.
 */
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

        if (!platform) return null;

        return {
            ...platform,
            _id: platform._id?.toString()
        };
    } catch (error) {
        console.error(`Failed to get platform with slug ${slug}:`, error);
        throw new Error(`Failed to get platform with slug ${slug}`);
    }
}

/**
 * Retrieves a list of platforms, optionally filtered by operational status.
 * Returns a lightweight version of the platforms with only minimal fields needed for listing (name, slug, status, primaryDomain).
 * @param filter - Optional filter object. Can filter by 'status'. If 'status' is 'all', no filter is applied.
 * @returns An array of platforms.
 */
export async function getPlatforms(filter: { status?: string } = {}): Promise<Platform[]> {
    try {
        const client = await clientPromise;
        const db = client.db();

        const query: any = {};

        if (filter.status && filter.status !== 'all') {
            query['operational.status'] = filter.status;
        } else if (!filter.status) {
            query['operational.status'] = 'active';
        }

        const platforms = await db
            .collection<Platform>(COLLECTION_NAME)
            .find(query, {
                projection: {
                    name: 1,
                    slug: 1,
                    'operational.status': 1,
                    primaryDomain: 1,
                    mobileApps: 1 // Include mobileApps to check existence
                }
            })
            .toArray();

        return platforms.map(platform => ({
            ...platform,
            _id: platform._id?.toString()
        }));
    } catch (error) {
        console.error('Failed to get platforms:', error);
        throw new Error('Failed to get platforms');
    }
}
