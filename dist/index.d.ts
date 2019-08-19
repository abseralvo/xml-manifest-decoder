import _ManifestParser from './parser/manifestParser';
export declare const ManifestParser: typeof _ManifestParser;
export default function (file: File): Promise<import("./parser/binaryxml").manifestType>;
