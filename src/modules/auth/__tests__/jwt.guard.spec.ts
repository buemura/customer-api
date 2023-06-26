import {
  BadGatewayException,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';

import { SsoService } from '@modules/auth/sso.service';
import { mockValidateTokenResponse } from 'test/__mocks__/validate-token.mock';
import { AuthService } from '../auth.service';
import { JwtGuard } from '../guards/jwt.guard';

describe('JwtGuard', () => {
  let sut: JwtGuard;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        JwtGuard,
        AuthService,
        {
          provide: SsoService,
          useValue: () => null,
        },
      ],
    }).compile();

    sut = moduleRef.get<JwtGuard>(JwtGuard);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should return true if token is valid', async () => {
    const mockToken = 'valid-token';
    const mockRequest = {
      headers: {
        authorization: `Bearer ${mockToken}`,
      },
    } as Request;
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as ExecutionContext;

    jest
      .spyOn(authService, 'validateTokenSSO')
      .mockResolvedValueOnce(mockValidateTokenResponse);
    const result = await sut.canActivate(mockExecutionContext);
    expect(authService.validateTokenSSO).toHaveBeenCalledWith(mockToken);
    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException if token is missing', async () => {
    const mockRequest = {
      headers: {},
    } as Request;
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as ExecutionContext;
    await expect(sut.canActivate(mockExecutionContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if validateTokenSSO fails with 401', async () => {
    const mockToken = 'invalid-token';
    const mockRequest = {
      headers: {
        authorization: `Bearer ${mockToken}`,
      },
    } as Request;
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as ExecutionContext;
    jest
      .spyOn(authService, 'validateTokenSSO')
      .mockRejectedValueOnce({ response: { status: 401 } });
    await expect(sut.canActivate(mockExecutionContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw BadGatewayException if validateTokenSSO fails with other status', async () => {
    const mockToken = 'invalid-token';
    const mockRequest = {
      headers: {
        authorization: `Bearer ${mockToken}`,
      },
    } as Request;
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as ExecutionContext;
    jest
      .spyOn(authService, 'validateTokenSSO')
      .mockRejectedValueOnce({ response: { status: 500 } });
    await expect(sut.canActivate(mockExecutionContext)).rejects.toThrow(
      BadGatewayException,
    );
  });
});
