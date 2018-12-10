export declare class JWTHandler {
    secret: String;
    expiresIn: Number;
    sign(payload: any): any;
    verify(tokenId: any): Promise<{}>;
    setSecret(secret: String): void;
    setExpiresIn(expiresIn: Number): void;
}
