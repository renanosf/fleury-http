import { __awaiter } from "tslib";
import axios from 'axios';
export class HttpAxios {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl
        });
    }
    post(uri, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.post(uri, data, {
                headers,
            });
            const fleuryResponse = {
                body: response.data,
                headers: response.headers,
                status: response.status,
                statusText: response.statusText,
            };
            return fleuryResponse;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1heGlvcy5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9SZW5hbi9wcm9qZWN0cy9mbGV1cnkvbGlicmFyaWVzL215LXdvcmtzcGFjZS9wcm9qZWN0cy9mbGV1cnktaHR0cC9zcmMvIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZXMvaHR0cENsaWVudC9pbXBsZW1lbnRhdGlvbnMvaHR0cC1heGlvcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxLQUF3QixNQUFNLE9BQU8sQ0FBQztBQUc3QyxNQUFNLE9BQU8sU0FBUztJQUVsQixZQUFvQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDOUIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3hCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFSyxJQUFJLENBQUMsR0FBVyxFQUFFLElBQVUsRUFBRSxPQUFpQzs7WUFDakUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO2dCQUN0RCxPQUFPO2FBQ1YsQ0FBQyxDQUFDO1lBRUgsTUFBTSxjQUFjLEdBQXVCO2dCQUN2QyxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7Z0JBQ25CLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztnQkFDekIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUN2QixVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7YUFDbEMsQ0FBQztZQUVGLE9BQU8sY0FBYyxDQUFDO1FBQzFCLENBQUM7S0FBQTtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zLCB7IEF4aW9zSW5zdGFuY2UgfSBmcm9tICdheGlvcyc7XHJcbmltcG9ydCB7IElIdHRwQ2xpZW50U2VydmljZSwgRmxldXJ5SHR0cFJlc3BvbnNlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9paHR0cC1jbGllbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEh0dHBBeGlvcyBpbXBsZW1lbnRzIElIdHRwQ2xpZW50U2VydmljZSB7XHJcbiAgICBwcml2YXRlIGF4aW9zSW5zdGFuY2U6IEF4aW9zSW5zdGFuY2U7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhc2VVcmw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuYXhpb3NJbnN0YW5jZSA9IGF4aW9zLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGJhc2VVUkw6IHRoaXMuYmFzZVVybFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHBvc3QodXJpOiBzdHJpbmcsIGRhdGE/OiBhbnksIGhlYWRlcnM/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSk6IFByb21pc2U8RmxldXJ5SHR0cFJlc3BvbnNlPiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmF4aW9zSW5zdGFuY2UucG9zdCh1cmksIGRhdGEsIHtcclxuICAgICAgICAgICAgaGVhZGVycyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZmxldXJ5UmVzcG9uc2U6IEZsZXVyeUh0dHBSZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgYm9keTogcmVzcG9uc2UuZGF0YSxcclxuICAgICAgICAgICAgaGVhZGVyczogcmVzcG9uc2UuaGVhZGVycyxcclxuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZsZXVyeVJlc3BvbnNlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==