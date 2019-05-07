export declare class JWTHandler {
    secret: string;
    expiresIn: Number;
    sign(payload: any): any;
    verify(tokenId: any): Promise<{}>;
    setSecret(secret: string): void;
    setExpiresIn(expiresIn: Number): void;
}
