/// <reference types="node" />
export declare type typedType = {
    value: number | string | boolean | dimensionType | typedType | null;
    type: string | null;
    rawType: number | null;
};
export declare type dimensionType = {
    value: number | null;
    unit: string | null;
    rawUnit: number | null;
};
export declare type attributeNode = {
    name?: string | null;
    namespaceURI: string | null;
    nodeName: string | null;
    nodeType: number;
    typedValue: typedType | null;
    value?: string | null;
};
export declare type docNode = {
    attributes?: attributeNode[];
    childNodes?: docNode[];
    namespaceURI: string | null;
    nodeName: string | null;
    nodeType: number | null;
    data?: string[] | null;
    typedValue?: typedType | null;
};
export declare type chunkHeaderType = {
    chunkType: number;
    startOffset: number;
    chunkSize: number;
    headerSize: number;
    stringCount?: number;
    styleCount?: number;
    flags?: number;
    stringsStart?: number;
    stylesStart?: number;
};
export declare type manifestType = {
    usesPermissions: string[];
    permissions: string[];
    permissionTrees: string[];
    permissionGroups: string[];
    instrumentation: string | null;
    usesSdk: string | null;
    usesConfiguration: string | null;
    usesFeatures: string[];
    supportsScreens: string | null;
    compatibleScreens: string[];
    supportsGlTextures: string[];
    application: applicationType;
    package: string;
};
export declare type applicationType = {
    label: string;
    icon: string;
    name: string;
    debuggable: boolean;
    allowBackup: boolean;
    supportsRtl: boolean;
    roundIcon: string;
    appComponentFactory: string;
    activities: activityType[];
    activityAliases: string[];
    launcherActivities: launcherActivitiesType[];
    services: servicesAndReceiversType[];
    receivers: servicesAndReceiversType[];
    providers: string[];
    usesLibraries: string[];
};
export declare type activityType = {
    theme: string;
    name: string;
    windowSoftInputMode: number;
    intentFilters: intentFiltersType[];
    metaData: metaDataType[];
};
export declare type intentFiltersType = {
    actions: {
        name: string;
    }[];
    categories: {
        name: string;
    }[];
    data: {
        name: string;
    }[];
};
export declare type launcherActivitiesType = {
    theme: string;
    name: string;
    intentFilters: intentFiltersType[];
    metaData: metaDataType[];
};
export declare type metaDataType = {
    [k: string]: string;
};
export declare type servicesAndReceiversType = {
    name: string;
    exported: boolean;
    intentFilters: intentFiltersType[];
    metaData: metaDataType[];
};
declare class BinaryXmlParser {
    private readonly buffer;
    private cursor;
    private strings;
    private resources;
    private document;
    private parent;
    private stack;
    constructor(buffer: Buffer);
    readU8(): number;
    readU16(): number;
    readS32(): number;
    readU32(): number;
    readLength8(): number;
    readLength16(): number;
    readDimension(): dimensionType;
    readFraction(): typedType;
    readHex24(): string;
    readHex32(): string;
    readTypedValue(): typedType;
    convertIntToFloat(int: number): number;
    readString(encoding: string): string;
    readChunkHeader(): chunkHeaderType;
    readStringPool(header: chunkHeaderType): null;
    readResourceMap(header: chunkHeaderType): null;
    readXmlNamespaceStart(): null;
    readXmlNamespaceEnd(): null;
    readXmlElementStart(): docNode;
    readXmlAttribute(): attributeNode;
    readXmlElementEnd(): null;
    readXmlCData(): docNode;
    readNull(header: chunkHeaderType): null;
    parse(): docNode;
}
export default BinaryXmlParser;
