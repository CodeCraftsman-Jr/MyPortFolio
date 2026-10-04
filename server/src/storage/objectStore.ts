import { randomUUID } from "node:crypto";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ApiError } from "../http/errors.js";

export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

/** Checks the real file bytes, not just the name or the browser's claimed type. */
export const sniffImageType = (bytes: Uint8Array): string | null => {
  const at = (i: number) => bytes[i];
  if (at(0) === 0xff && at(1) === 0xd8 && at(2) === 0xff) return "image/jpeg";
  if (at(0) === 0x89 && at(1) === 0x50 && at(2) === 0x4e && at(3) === 0x47) return "image/png";
  if (at(0) === 0x47 && at(1) === 0x49 && at(2) === 0x46) return "image/gif";
  const ascii = (from: number, to: number) => String.fromCharCode(...bytes.slice(from, to));
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  if (ascii(4, 8) === "ftyp" && /^(avif|avis)/.test(ascii(8, 12))) return "image/avif";
  return null;
};

export interface ObjectStore {
  ready: boolean;
  putImage(bytes: Uint8Array, mimeType: string): Promise<string>;
  remove(key: string): Promise<void>;
  publicUrl(key: string): string;
}

/** SeaweedFS through its S3 gateway (server side only); browsers get the public filer URL. */
export const makeObjectStore = (options: { endpoint: string; accessKey: string; secretKey: string; bucket: string; publicBase: string }): ObjectStore => {
  const ready = Boolean(options.endpoint && options.accessKey && options.secretKey);
  const s3 = ready
    ? new S3Client({
        endpoint: options.endpoint,
        region: "us-east-1",
        forcePathStyle: true,
        credentials: { accessKeyId: options.accessKey, secretAccessKey: options.secretKey },
      })
    : null;
  const needS3 = () => {
    if (!s3) throw new ApiError(503, "STORAGE_OFF", "Image uploads are not set up on this server.");
    return s3;
  };

  return {
    ready,
    async putImage(bytes, mimeType) {
      const key = `${new Date().toISOString().slice(0, 7)}/${randomUUID()}.${IMAGE_TYPES[mimeType]}`;
      await needS3().send(new PutObjectCommand({
        Bucket: options.bucket,
        Key: key,
        Body: bytes,
        ContentType: mimeType,
        CacheControl: "public, max-age=31536000, immutable",
      }));
      return key;
    },
    async remove(key) {
      await needS3().send(new DeleteObjectCommand({ Bucket: options.bucket, Key: key }));
    },
    publicUrl(key) {
      return `${options.publicBase.replace(/\/$/, "")}/${options.bucket}/${key}`;
    },
  };
};
