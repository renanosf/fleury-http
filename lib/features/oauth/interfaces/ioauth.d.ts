export interface IOauthService {
    callGrantCode(): any;
    callAccessToken(code: string): any;
}
export interface IOauthApplication {
    clientId: string;
    secret?: string;
}
export declare enum OauthFlows {
    GRANT = 0,
    IMPLICIT = 1
}
export interface IOauth {
    application: IOauthApplication;
    flow: OauthFlows;
}
export interface IOauthToken {
    accessToken: string;
    expires: number;
    refreshToken?: string;
}
