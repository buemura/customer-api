export const mockValidateTokenInput = {
  access_token: 'mock-access-token',
};

export const mockValidateTokenResponse = {
  status: 200,
  data: {
    sub: 'string',
    email_verified: false,
    preferred_username: 'string',
  },
};
