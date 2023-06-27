import { SetCacheDto } from './dtos/set-cache.dto';

export abstract class CacheService {
  abstract get<T>(key: string): Promise<T | null>;
  abstract set(data: SetCacheDto): Promise<void>;
  abstract remove(key: string): Promise<void>;
}
