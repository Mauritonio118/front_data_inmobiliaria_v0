
import clientPromise from '@/lib/mongodb';

const COLLECTION_NAME = 'platforms';

export interface AuditStats {
    totalDocuments: number;
    slugAnalysis: {
        missing: number;
        duplicates: Array<{ value: string | null; count: number }>;
    };
    domainAnalysis: {
        missing: number;
        duplicates: Array<{ value: string | null; count: number }>;
    };
    statusDistribution: Array<{ status: string | null; count: number }>;
    enrichment: {
        withMobileApps: number;
        withSocialProfiles: number;
    };
}

export async function getPlatformAuditStats(): Promise<AuditStats> {
    try {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection(COLLECTION_NAME);

        const pipeline = [
            {
                $facet: {
                    // 1. Total Documents
                    totalCount: [{ $count: "count" }],

                    // 2. Slug Analysis
                    missingSlug: [
                        { $match: { slug: { $exists: false } } },
                        { $count: "count" }
                    ],
                    duplicateSlugs: [
                        { $match: { slug: { $exists: true } } },
                        { $group: { _id: "$slug", count: { $sum: 1 } } },
                        { $match: { count: { $gt: 1 } } }
                    ],

                    // 3. Primary Domain Analysis
                    missingDomain: [
                        { $match: { primaryDomain: { $exists: false } } },
                        { $count: "count" }
                    ],
                    duplicateDomains: [
                        { $match: { primaryDomain: { $exists: true } } },
                        { $group: { _id: "$primaryDomain", count: { $sum: 1 } } },
                        { $match: { count: { $gt: 1 } } }
                    ],

                    // 4. Status Distribution (includes missing status)
                    statusDistribution: [
                        { $group: { _id: "$operational.status", count: { $sum: 1 } } }
                    ],

                    // 5. Enrichment Stats
                    enrichment: [
                        {
                            $group: {
                                _id: null,
                                withMobileApps: {
                                    $sum: {
                                        $cond: [
                                            {
                                                $and: [
                                                    { $isArray: "$mobileApps" },
                                                    { $gt: [{ $size: "$mobileApps" }, 0] }
                                                ]
                                            }, 1, 0
                                        ]
                                    }
                                },
                                withSocialProfiles: {
                                    $sum: {
                                        $cond: [
                                            {
                                                $and: [
                                                    { $isArray: "$socialProfiles" },
                                                    { $gt: [{ $size: "$socialProfiles" }, 0] }
                                                ]
                                            }, 1, 0
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        ];

        const results = await collection.aggregate(pipeline).toArray();
        const stats = results[0];

        // Format the raw Mongo result into our clean Interface
        return {
            totalDocuments: stats.totalCount[0]?.count || 0,

            slugAnalysis: {
                missing: stats.missingSlug[0]?.count || 0,
                duplicates: stats.duplicateSlugs.map((d: any) => ({ value: d._id, count: d.count }))
            },

            domainAnalysis: {
                missing: stats.missingDomain[0]?.count || 0,
                duplicates: stats.duplicateDomains.map((d: any) => ({ value: d._id, count: d.count }))
            },

            statusDistribution: stats.statusDistribution.map((d: any) => ({
                status: d._id || 'missing/undefined',
                count: d.count
            })),

            enrichment: {
                withMobileApps: stats.enrichment[0]?.withMobileApps || 0,
                withSocialProfiles: stats.enrichment[0]?.withSocialProfiles || 0
            }
        };

    } catch (error) {
        console.error("Audit aggregation failed:", error);
        throw new Error("Failed to perform platform audit");
    }
}
