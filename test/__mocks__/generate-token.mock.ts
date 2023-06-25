export const mockGenerateTokenInput = {
  grant_type: 'string',
  client_id: 'string',
  client_secret: 'string',
  username: 'string',
  password: 'string',
  scope: 'string',
};

export const mockGenerateTokenResponse = {
  status: 200,
  data: {
    access_token: 'string',
    expires_in: 0,
    refresh_expires_in: 0,
    token_type: 'string',
    id_token: 'string',
    'not-before-policy': 0,
    scope: 'string',
  },
};
