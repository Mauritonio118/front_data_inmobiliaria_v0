'use client';

import { Platform } from '@/types/platform';

interface PlatformListProps {
    platforms: Platform[];
}

export default function PlatformList({ platforms }: PlatformListProps) {

    const handleRowClick = (slug: string) => {
        // Open the platform details page in a new tab
        window.open(`/platforms/${slug}`, '_blank', 'noopener,noreferrer');
    };

    const handleVisitClick = (e: React.MouseEvent, url?: string) => {
        e.stopPropagation();
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="text-xs uppercase text-muted-foreground border-b border-border">
                    <tr>
                        <th className="px-4 py-3 font-medium">#</th>
                        <th className="px-4 py-3 font-medium">Platform</th>
                        <th className="px-4 py-3 font-medium text-center">App</th>
                        <th className="px-4 py-3 font-medium text-right">Web site</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {platforms.map((platform, index) => {
                        const websiteUrl = platform.primaryDomain;

                        return (
                            <tr
                                key={platform._id || platform.slug}
                                onClick={() => platform.slug && handleRowClick(platform.slug)}
                                className="group cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                                <td className="px-4 py-4 text-sm font-medium text-muted-foreground">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        {platform.pageRoutes?.faviconRoute && (
                                            <img
                                                src={platform.pageRoutes.faviconRoute}
                                                alt={`${platform.name} icon`}
                                                className="w-5 h-5 object-contain"
                                            />
                                        )}
                                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {platform.name || 'Unknown Platform'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    {/* Mobile Apps Indicator */}
                                    {platform.mobileApps && platform.mobileApps.length > 0 ? (
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 text-green-500" title="Has Mobile App">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted/50 text-muted-foreground/30" title="No Mobile App">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <button
                                        onClick={(e) => handleVisitClick(e, websiteUrl)}
                                        className={`
                        inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold rounded-lg
                        border transition-all duration-200
                        ${websiteUrl
                                                ? 'border-green-500/50 text-green-500 hover:bg-green-500 hover:text-white dark:border-green-400/50 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-black shadow-[0_0_10px_-3px_rgba(74,222,128,0.2)] hover:shadow-[0_0_15px_-3px_rgba(74,222,128,0.4)]'
                                                : 'border-muted text-muted-foreground cursor-not-allowed opacity-50'
                                            }
                      `}
                                        disabled={!websiteUrl}
                                    >
                                        Visit Platform
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {platforms.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                    No platforms found.
                </div>
            )}
        </div>
    );
}
