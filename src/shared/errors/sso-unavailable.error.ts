export class SsoUnavailableError extends Error {
  constructor(message?: string) {
    super(message ?? 'SSO unavailable');
    Object.setPrototypeOf(this, SsoUnavailableError.prototype);
  }
}
