'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { Platform } from '@/types/platform';

type SortOption = 'default' | 'name-asc' | 'name-desc';
type FilterOption = 'all' | 'with-mobile' | 'without-mobile';

interface PlatformListProps {
    platforms: Platform[];
}

export default function PlatformList({ platforms }: PlatformListProps) {

    const router = useRouter();
    const [sortOption, setSortOption] = useState<SortOption>('default');
    const [filterOption, setFilterOption] = useState<FilterOption>('all');

    const filteredAndSortedPlatforms = useMemo(() => {
        // Primero filtrar
        const filtered = platforms.filter((platform) => {
            const hasMobile = platform.mobileApps && platform.mobileApps.length > 0;
            switch (filterOption) {
                case 'with-mobile':
                    return hasMobile;
                case 'without-mobile':
                    return !hasMobile;
                default:
                    return true;
            }
        });

        // Luego ordenar
        const sorted = [...filtered].sort((a, b) => {
            // Demo siempre primero
            if (a.slug === 'demo') return -1;
            if (b.slug === 'demo') return 1;

            // Aplicar ordenamiento según la opción seleccionada
            switch (sortOption) {
                case 'name-asc':
                    return (a.name || '').localeCompare(b.name || '');
                case 'name-desc':
                    return (b.name || '').localeCompare(a.name || '');
                default:
                    return 0;
            }
        });
        return sorted;
    }, [platforms, sortOption, filterOption]);

    const handleRowClick = (slug: string) => {
        router.push(`/platforms/${slug}`);
    };

    const handleVisitClick = (e: React.MouseEvent, slug?: string) => {
        e.stopPropagation();
        if (slug) {
            router.push(`/platforms/${slug}`);
        }
    };

    return (
        <div className="w-full overflow-x-auto">
            {/* Filters and Sort Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 px-4">
                {/* Mobile App Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground mr-1">Mobile App:</span>
                    <div className="inline-flex rounded-lg border border-border p-1 bg-muted/30">
                        <button
                            onClick={() => setFilterOption('all')}
                            className={`
                                px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200
                                ${filterOption === 'all'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                }
                            `}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterOption('with-mobile')}
                            className={`
                                px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 flex items-center gap-1.5
                                ${filterOption === 'with-mobile'
                                    ? 'bg-green-500/10 text-green-500 shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                }
                            `}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                                <path d="M12 18h.01" />
                            </svg>
                            Yes
                        </button>
                        <button
                            onClick={() => setFilterOption('without-mobile')}
                            className={`
                                px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 flex items-center gap-1.5
                                ${filterOption === 'without-mobile'
                                    ? 'bg-orange-500/10 text-orange-500 shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                }
                            `}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                                <path d="M12 18h.01" />
                            </svg>
                            No
                        </button>
                    </div>
                </div>

                {/* Sort Selector */}
                <div className="flex items-center gap-3">
                    <label htmlFor="sort-select" className="text-sm font-medium text-muted-foreground">
                        Sort by:
                    </label>
                    <div className="relative">
                        <select
                            id="sort-select"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                            className="
                                appearance-none cursor-pointer
                                bg-background border border-border rounded-lg
                                px-4 py-2 pr-10 text-sm font-medium text-foreground
                                hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20
                                transition-all duration-200 outline-none
                                shadow-sm hover:shadow-md
                            "
                        >
                            <option value="default">Default</option>
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                        </select>
                        {/* Custom dropdown arrow */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <table className="w-full text-left border-collapse">
                <thead className="text-xs uppercase text-muted-foreground border-b border-border">
                    <tr>
                        <th className="px-4 py-3 font-medium">#</th>
                        <th className="px-4 py-3 font-medium">Platform</th>
                        <th className="px-4 py-3 font-medium text-center">Mobile App</th>
                        <th className="px-4 py-3 font-medium text-right">Profile</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {filteredAndSortedPlatforms.map((platform, index) => {
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
                                        {platform.slug && (
                                            <img
                                                src={`/images/platforms/${platform.slug}.png`}
                                                alt={`${platform.name} icon`}
                                                className="w-5 h-5 object-contain"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
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
                                        onClick={(e) => handleVisitClick(e, platform.slug)}
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
