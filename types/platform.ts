
export interface PlatformIdentity {
    slug?: string;
    name?: string;
    primaryDomain?: string;
    description?: string;
    foundedAt?: string | Date;
}

export interface PlatformOperational {
    status?: 'active' | 'inactive' | 'in_development' | 'uncertain';
    updatedAt?: string | Date;
    notes?: string;
}

export interface PlatformClassifications {
    productType?: string[];
    businessModel?: string[];
    targetInvestors?: string[];
    assetFocus?: string[];
    categories?: string[];
    tags?: string[];
}

export interface PlatformLocation {
    country?: string;
    city?: string;
    address?: string;
}

export interface PlatformGeography {
    hq?: PlatformLocation;
    offices?: PlatformLocation[];
    operatingCountries?: string[];
}

export interface PlatformCompliance {
    kycRequired?: boolean;
    accreditationRequired?: boolean;
    regulation?: {
        scopes?: string[];
        regulators?: string[];
        licenses?: Array<{
            jurisdiction?: string;
            regulatorName?: string;
            licenseNumber?: string;
            status?: string;
            licenseType?: string | null;
            scopes?: string[];
        }>;
    };
}

export interface PlatformTech {
    isOnChain?: boolean;
    chains?: Array<{
        name?: string;
        network?: string;
        chainId?: number;
    }>;
    tokenStandards?: string[];
    techStack?: string[];
    supportsFractionalOwnership?: boolean;
    supportsSecondaryMarket?: boolean;
}

export interface PlatformMobileApp {
    url?: string;
    store?: 'google_play' | 'apple_store';
}

export interface PlatformSocialProfile {
    url?: string;
    platform?: 'linkedin' | 'X' | 'facebook' | 'instagram' | 'youtube' | 'telegram' | 'discord' | string;
}

export interface PlatformLegal {
    legalName?: string;
    legalForm?: string;
    registrationNumber?: string;
    registrationCountry?: string;
    registeredAddress?: string;
}

export interface PlatformDataSource {
    role?: string;
    kind?: string;
    url?: string;
    links?: Record<string, string[]>;
    texts?: Record<string, string[]>;
    meta?: Record<string, any>;
}

export interface PlatformTheCrowdSpace {
    theCrowdSpaceUrl?: string;
    lastScrapedAt?: string;
    hero?: {
        logoUrls?: string[];
        ecspLicense?: boolean;
        isVerified?: boolean;
        description?: string;
        industries?: string[];
    };
    content?: {
        topCards?: Array<{ title?: string; value?: string }>;
        descriptions?: Array<{ title?: string; text?: string }>;
    };
    sidebar?: {
        stats?: Record<string, any>;
        operatesIn?: {
            region?: string;
            countries?: string[];
        };
        trustpilot?: {
            url?: string;
        };
        socials?: string[];
        status?: string;
        websiteUrl?: string;
        features?: Array<{
            name?: string;
            available?: boolean;
            metaUrl?: string;
        }>;
    };
    p2p?: {
        sneakypeerScoring?: string;
        transparency?: string;
        redFlags?: string[];
    };
    team?: Array<{
        name?: string;
        position?: string;
    }>;
}

export interface Platform {
    _id?: string;
    slug?: string;
    name?: string;
    primaryDomain?: string;
    description?: string;
    foundedAt?: string | Date;

    operational?: PlatformOperational;
    classifications?: PlatformClassifications;
    geography?: PlatformGeography;
    compliance?: PlatformCompliance;
    tech?: PlatformTech;
    projectRoutes?: {
        baseUrls?: string[];
        pathPrefixes?: string[];
        updatedAt?: string | Date;
    };
    mobileApps?: PlatformMobileApp[];
    socialProfiles?: PlatformSocialProfile[];
    legal?: PlatformLegal;
    dataSources?: PlatformDataSource[];
    theCrowdSpace?: PlatformTheCrowdSpace;

    meta?: {
        createdAt?: string | Date;
        updatedAt?: string | Date;
    };
}
