export interface CacheStructDto {
  key: string;
  value: any;
}

export abstract class CacheRepository {
  abstract get<T>(key: string): Promise<T | null>;
  abstract set(data: CacheStructDto): Promise<void>;
  abstract remove(key: string): Promise<void>;
}