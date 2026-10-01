import type { Sql } from "../db/client.js";
import { notFound } from "../http/errors.js";

export interface MediaRow {
  id: string | number;
  storage_key: string;
  file_name: string;
  mime_type: string;
  byte_size: number;
  alt_text: string;
  created_at: Date;
}

export const listMedia = (sql: Sql) =>
  sql<MediaRow[]>`select id, storage_key, file_name, mime_type, byte_size, alt_text, created_at from media order by created_at desc limit 500`;

export const addMedia = async (sql: Sql, values: { storageKey: string; fileName: string; mimeType: string; byteSize: number; altText: string }) => {
  const [row] = await sql<MediaRow[]>`
    insert into media (storage_key, file_name, mime_type, byte_size, alt_text)
    values (${values.storageKey}, ${values.fileName}, ${values.mimeType}, ${values.byteSize}, ${values.altText})
    returning id, storage_key, file_name, mime_type, byte_size, alt_text, created_at`;
  return row;
};

export const deleteMedia = async (sql: Sql, id: number) => {
  const [row] = await sql<{ storage_key: string }[]>`delete from media where id = ${id} returning storage_key`;
  if (!row) throw notFound(`Media ${id}`);
  return row.storage_key;
};
