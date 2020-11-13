import { __awaiter } from "tslib";
import { extractCode } from '../utils/extract-code';
import { toBase64 } from '../utils/base64';
export class OauthSensediaService {
    constructor(config, http) {
        this.config = config;
        this.http = http;
        this.appConfig = this.config.oauth.application;
    }
    callGrantCode() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post('/oauth/grant-code', {
                client_id: this.appConfig.clientId,
                redirect_uri: `${this.config.baseUrl}/oauth/access-token`,
            });
            if (response.status === 201) {
                const code = extractCode('?code=', response.body.redirect_uri);
                return code;
            }
            else {
                throw new Error('Unable to call grant');
            }
        });
    }
    callAccessToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `${this.appConfig.clientId}:${this.appConfig.secret}`;
            const authorization = `Basic ${toBase64(key)}`;
            const response = yield this.http.post('/oauth/access-token', {
                grant_type: 'authorization_code',
                code,
            }, {
                client_id: this.appConfig.clientId,
                Authorization: authorization,
            });
            if (response.status === 201) {
                return response.body;
            }
            else {
                throw new Error('Unable to call access token');
            }
        });
    }
    callAccessTokenImplicit() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post('/oauth/access-token', {
                client_id: this.appConfig.clientId,
                grant_type: 'implicit',
                recaptcha: true,
                redirect_uri: `${this.config.baseUrl}/oauth/access-token`
            });
            if (response.status === 201) {
                response.body.access_token = extractCode('?access_token=', response.body.redirect_uri);
                return response.body;
            }
            else {
                throw new Error('Unable to call access token');
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgtc2Vuc2VkaWEtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9SZW5hbi9wcm9qZWN0cy9mbGV1cnkvbGlicmFyaWVzL215LXdvcmtzcGFjZS9wcm9qZWN0cy9mbGV1cnktaHR0cC9zcmMvIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZXMvb2F1dGgvaW1wbGVtZW50YXRpb25zL29hdXRoLXNlbnNlZGlhLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsTUFBTSxPQUFPLG9CQUFvQjtJQUc3QixZQUFvQixNQUFtQixFQUFVLElBQXdCO1FBQXJELFdBQU0sR0FBTixNQUFNLENBQWE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFvQjtRQUNyRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztJQUNuRCxDQUFDO0lBRUssYUFBYTs7WUFDZixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNqQyxtQkFBbUIsRUFDbkI7Z0JBQ0ksU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUTtnQkFDbEMsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLHFCQUFxQjthQUM1RCxDQUNKLENBQUM7WUFFRixJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN6QixNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQy9ELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7aUJBQU07Z0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2FBQzNDO1FBQ0wsQ0FBQztLQUFBO0lBRUssZUFBZSxDQUFDLElBQVk7O1lBQzlCLE1BQU0sR0FBRyxHQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxRSxNQUFNLGFBQWEsR0FBVyxTQUFTLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBRXZELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ2pDLHFCQUFxQixFQUNyQjtnQkFDSSxVQUFVLEVBQUUsb0JBQW9CO2dCQUNoQyxJQUFJO2FBQ1AsRUFDRDtnQkFDSSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRO2dCQUNsQyxhQUFhLEVBQUUsYUFBYTthQUMvQixDQUNKLENBQUM7WUFFRixJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN6QixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUE7YUFDdkI7aUJBQU07Z0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2FBQ2xEO1FBQ0wsQ0FBQztLQUFBO0lBRUssdUJBQXVCOztZQUN6QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNqQyxxQkFBcUIsRUFDckI7Z0JBQ0ksU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUTtnQkFDbEMsVUFBVSxFQUFFLFVBQVU7Z0JBQ3RCLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxxQkFBcUI7YUFDNUQsQ0FDSixDQUFDO1lBRUYsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZGLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQzthQUN4QjtpQkFBTTtnQkFDSCxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7YUFDbEQ7UUFDTCxDQUFDO0tBQUE7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElPYXV0aFNlcnZpY2UsIElPYXV0aEFwcGxpY2F0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pb2F1dGgnO1xyXG5pbXBvcnQgeyBJRmxldXJ5SHR0cCB9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvaWZsZXVyeS1odHRwJztcclxuaW1wb3J0IHsgSUh0dHBDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vaHR0cENsaWVudC9pbnRlcmZhY2VzL2lodHRwLWNsaWVudCc7XHJcbmltcG9ydCB7IGV4dHJhY3RDb2RlIH0gZnJvbSAnLi4vdXRpbHMvZXh0cmFjdC1jb2RlJztcclxuaW1wb3J0IHsgdG9CYXNlNjQgfSBmcm9tICcuLi91dGlscy9iYXNlNjQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9hdXRoU2Vuc2VkaWFTZXJ2aWNlIGltcGxlbWVudHMgSU9hdXRoU2VydmljZSB7XHJcbiAgICBwcml2YXRlIGFwcENvbmZpZzogSU9hdXRoQXBwbGljYXRpb247XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBJRmxldXJ5SHR0cCwgcHJpdmF0ZSBodHRwOiBJSHR0cENsaWVudFNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmFwcENvbmZpZyA9IHRoaXMuY29uZmlnLm9hdXRoLmFwcGxpY2F0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNhbGxHcmFudENvZGUoKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFxyXG4gICAgICAgICAgICAnL29hdXRoL2dyYW50LWNvZGUnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGllbnRfaWQ6IHRoaXMuYXBwQ29uZmlnLmNsaWVudElkLFxyXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RfdXJpOiBgJHt0aGlzLmNvbmZpZy5iYXNlVXJsfS9vYXV0aC9hY2Nlc3MtdG9rZW5gLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMSkge1xyXG4gICAgICAgICAgICBjb25zdCBjb2RlID0gZXh0cmFjdENvZGUoJz9jb2RlPScsIHJlc3BvbnNlLmJvZHkucmVkaXJlY3RfdXJpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvZGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gY2FsbCBncmFudCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBjYWxsQWNjZXNzVG9rZW4oY29kZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBjb25zdCBrZXk6IHN0cmluZyA9IGAke3RoaXMuYXBwQ29uZmlnLmNsaWVudElkfToke3RoaXMuYXBwQ29uZmlnLnNlY3JldH1gO1xyXG4gICAgICAgIGNvbnN0IGF1dGhvcml6YXRpb246IHN0cmluZyA9IGBCYXNpYyAke3RvQmFzZTY0KGtleSl9YDtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFxyXG4gICAgICAgICAgICAnL29hdXRoL2FjY2Vzcy10b2tlbicsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGdyYW50X3R5cGU6ICdhdXRob3JpemF0aW9uX2NvZGUnLFxyXG4gICAgICAgICAgICAgICAgY29kZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xpZW50X2lkOiB0aGlzLmFwcENvbmZpZy5jbGllbnRJZCxcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGF1dGhvcml6YXRpb24sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5ib2R5XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gY2FsbCBhY2Nlc3MgdG9rZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY2FsbEFjY2Vzc1Rva2VuSW1wbGljaXQoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFxyXG4gICAgICAgICAgICAnL29hdXRoL2FjY2Vzcy10b2tlbicsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNsaWVudF9pZDogdGhpcy5hcHBDb25maWcuY2xpZW50SWQsXHJcbiAgICAgICAgICAgICAgICBncmFudF90eXBlOiAnaW1wbGljaXQnLFxyXG4gICAgICAgICAgICAgICAgcmVjYXB0Y2hhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RfdXJpOiBgJHt0aGlzLmNvbmZpZy5iYXNlVXJsfS9vYXV0aC9hY2Nlc3MtdG9rZW5gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDEpIHtcclxuICAgICAgICAgICAgcmVzcG9uc2UuYm9keS5hY2Nlc3NfdG9rZW4gPSBleHRyYWN0Q29kZSgnP2FjY2Vzc190b2tlbj0nLCByZXNwb25zZS5ib2R5LnJlZGlyZWN0X3VyaSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGNhbGwgYWNjZXNzIHRva2VuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==