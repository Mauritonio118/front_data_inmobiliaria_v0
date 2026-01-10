import React from 'react';
import { PlatformDataSource } from '@/types/platform';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface PlatformDataSourcesProps {
    dataSources: PlatformDataSource[] | null;
}

export default function PlatformDataSources({ dataSources }: PlatformDataSourcesProps) {
    if (!dataSources || dataSources.length === 0) {
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-card text-card-foreground shadow-lg rounded-xl mb-8 border border-border">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaExternalLinkAlt className="w-5 h-5 text-muted-foreground" />
                Data Sources & Links
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                        <tr>
                            <th className="px-4 py-3 font-medium">Role</th>
                            <th className="px-4 py-3 font-medium">Kind</th>
                            <th className="px-4 py-3 font-medium">URL</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {dataSources.map((source, index) => (
                            <tr key={index} className="hover:bg-muted/20 transition-colors">
                                <td className="px-4 py-3 font-medium text-foreground">{source.role || 'General'}</td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                                        {source.kind || 'Web'}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline hover:text-primary/80 flex items-center gap-1.5 font-mono text-xs truncate max-w-md"
                                    >
                                        {source.url}
                                        <FaExternalLinkAlt className="w-2.5 h-2.5 opacity-70" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
