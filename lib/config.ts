export const config = {
    port: process.env.PORT || 3100,
    supportedDevicesNum: 17,
    JwtSecret: process.env.JWT_SECRET || 'defaultSecretKey',
    databaseUrl: process.env.MONGODB_URI || 'ADRES MONGO',////
    tokenExpiration: '3h' as const,       // czas życia tokena JWT (np. '3h', '30s')
    tokenExpirationMs: 3 * 60 * 60 * 1000 // czas życia tokena w ms (np. 3h)
 };
