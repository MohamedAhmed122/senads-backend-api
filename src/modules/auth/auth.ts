export interface IAuth {
  register(
    phone: string,
    code: number,
  ): Promise<{ accessToken: string; refreshToken: string }>;

  login(
    email: string,
    code: number,
  ): Promise<{ accessToken: string; refreshToken: string }>;

  logout(deviceUUID: string): Promise<void>;

  refresh(
    deviceUUID: string,
    userUUID: string,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;

  generateOTP(email: string): Promise<void>;
}
