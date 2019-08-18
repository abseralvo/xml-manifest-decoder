/// <reference types="node" />
import { docNode, manifestType, applicationType, activityType } from './types';
declare class ManifestParser {
    private readonly buffer;
    private xmlParser;
    constructor(buffer: Buffer);
    collapseAttributes(element: docNode): any;
    parseIntents(element: docNode, target: activityType): void;
    parseApplication(element: docNode): applicationType;
    isLauncherActivity(activity: activityType): boolean;
    parse(): manifestType;
}
export default ManifestParser;
