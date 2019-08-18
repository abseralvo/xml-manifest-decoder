/// <reference types="node" />
import { typedType, dimensionType, attributeNode, docNode, chunkHeaderType } from './types';
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
