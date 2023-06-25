import {
  CacheRepository,
  CacheStructDto,
} from '@modules/cache/cache.repository';

export class FakeRedisCacheRepository implements CacheRepository {
  private data: CacheStructDto[] = [
    {
      key: 'customer:c0358342-caa7-46d5-b86b-f803899f71bc',
      value:
        '{"id": "c0358342-caa7-46d5-b86b-f803899f71bc", "document": 1, "name": "john doe"}',
    },
  ];

  get<T>(key: string): Promise<T | null> {
    const result = this.data.find((d) => d.key === key)?.value;
    if (!result) {
      return Promise.resolve(null);
    }

    const parsedResult = JSON.parse(result);
    return Promise.resolve(parsedResult);
  }

  set(data: CacheStructDto): Promise<void> {
    this.data.push(data);
    return Promise.resolve();
  }

  remove(key: string): Promise<void> {
    const resultIndex = this.data.findIndex((d) => d.key === key);
    this.data.splice(resultIndex, 1);
    return Promise.resolve();
  }
}
