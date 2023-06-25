export class CacheUnavailableError extends Error {
  constructor(message?: string) {
    super(message ?? 'Cache unavailable');
    Object.setPrototypeOf(this, CacheUnavailableError.prototype);
  }
}
