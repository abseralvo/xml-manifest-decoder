import _ManifestParser from './parser/manifestParser';
export declare const ManifestParser: typeof _ManifestParser;
declare const parseManifest: (file: File) => Promise<import("./parser/binaryxml").manifestType>;
export default parseManifest;
