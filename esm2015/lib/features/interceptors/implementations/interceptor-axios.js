import { __awaiter } from "tslib";
import { preValidators } from '../pre/validators';
import { preModifiers } from '../pre/modifiers';
import { posValidators } from '../pos/validators';
export class AxiosInterceptor {
    constructor(config, fleuryHttpEvents, oauthService) {
        this.config = config;
        this.fleuryHttpEvents = fleuryHttpEvents;
        this.oauthService = oauthService;
    }
    requestTransformation(httpRequest) {
        const hasBaseUrl = httpRequest.url.indexOf(this.config.baseUrl);
        const addBaseUrl = hasBaseUrl === -1 ? this.config.baseUrl : '';
        return {
            baseUrl: this.config.baseUrl,
            headers: httpRequest.headers,
            url: addBaseUrl + httpRequest.url,
            body: httpRequest.data,
            fleuryHttpEvents: this.fleuryHttpEvents,
            oauthService: this.oauthService
        };
    }
    handle(instance) {
        instance.interceptors.request.use((req) => this.preValidators(req));
        instance.interceptors.response.use((req) => this.posValidators(req));
    }
    preModifiers(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let req = this.requestTransformation(httpRequest);
            for (let fn of preModifiers) {
                req = yield fn(req);
            }
            httpRequest.headers = req.headers;
            httpRequest.data = req.body;
            httpRequest.url = req.url;
            return httpRequest;
        });
    }
    preValidators(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = this.requestTransformation(httpRequest);
            const error = preValidators.find(fn => {
                return fn(req) === false;
            });
            return error ? httpRequest : this.preModifiers(httpRequest);
        });
    }
    posValidators(httpResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            posValidators.forEach((fn) => {
                fn({
                    oauthService: this.oauthService,
                    status: httpResponse.status
                });
            });
            return httpResponse;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjZXB0b3ItYXhpb3MuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvUmVuYW4vcHJvamVjdHMvZmxldXJ5L2xpYnJhcmllcy9teS13b3Jrc3BhY2UvcHJvamVjdHMvZmxldXJ5LWh0dHAvc3JjLyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmVzL2ludGVyY2VwdG9ycy9pbXBsZW1lbnRhdGlvbnMvaW50ZXJjZXB0b3ItYXhpb3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWxELE1BQU0sT0FBTyxnQkFBZ0I7SUFDekIsWUFDWSxNQUFtQixFQUNuQixnQkFBa0MsRUFDbEMsWUFBMEI7UUFGMUIsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUNuQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQ25DLENBQUM7SUFFSixxQkFBcUIsQ0FBQyxXQUErQjtRQUNqRCxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sVUFBVSxHQUFHLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVoRSxPQUFPO1lBQ0gsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztZQUM1QixPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87WUFDNUIsR0FBRyxFQUFFLFVBQVUsR0FBRyxXQUFXLENBQUMsR0FBRztZQUNqQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7WUFDdEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN2QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7U0FDbEMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBdUI7UUFDMUIsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEUsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVhLFlBQVksQ0FBQyxXQUErQjs7WUFDdEQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRWxELEtBQUssSUFBSSxFQUFFLElBQUksWUFBWSxFQUFFO2dCQUN6QixHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkI7WUFFRCxXQUFXLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDbEMsV0FBVyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQzVCLFdBQVcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUUxQixPQUFPLFdBQVcsQ0FBQztRQUN2QixDQUFDO0tBQUE7SUFFYSxhQUFhLENBQUMsV0FBK0I7O1lBQ3ZELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVwRCxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNsQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQy9ELENBQUM7S0FBQTtJQUVhLGFBQWEsQ0FBQyxZQUEyQjs7WUFDbkQsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO2dCQUN6QixFQUFFLENBQUM7b0JBQ0MsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO29CQUMvQixNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU07aUJBQzlCLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxZQUFZLENBQUM7UUFDeEIsQ0FBQztLQUFBO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBeGlvc0luc3RhbmNlLCBBeGlvc1JlcXVlc3RDb25maWcsIEF4aW9zUmVzcG9uc2UgfSBmcm9tICdheGlvcyc7XHJcbmltcG9ydCB7IElJbnRlcmNlcHRvclNlcnZpY2UgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lpbnRlcmNldG9ycyc7XHJcbmltcG9ydCB7IEZsZXVyeUh0dHBFdmVudHMgfSBmcm9tICcuLi8uLi9ldmVudHMvZmxldXJ5LWh0dHAtZXZlbnRzJztcclxuaW1wb3J0IHsgT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vb2F1dGgvb2F1dGgtc2VydmljZSc7XHJcbmltcG9ydCB7IElGbGV1cnlIdHRwIH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9pZmxldXJ5LWh0dHAnO1xyXG5pbXBvcnQgeyBGbGV1cnlJbnRlcmNlcHRvclJlcXVlc3QgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lpbnRlcmNldG9ycyc7XHJcblxyXG5pbXBvcnQgeyBwcmVWYWxpZGF0b3JzIH0gZnJvbSAnLi4vcHJlL3ZhbGlkYXRvcnMnO1xyXG5pbXBvcnQgeyBwcmVNb2RpZmllcnMgfSBmcm9tICcuLi9wcmUvbW9kaWZpZXJzJztcclxuaW1wb3J0IHsgcG9zVmFsaWRhdG9ycyB9IGZyb20gJy4uL3Bvcy92YWxpZGF0b3JzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBeGlvc0ludGVyY2VwdG9yIGltcGxlbWVudHMgSUludGVyY2VwdG9yU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGNvbmZpZzogSUZsZXVyeUh0dHAsXHJcbiAgICAgICAgcHJpdmF0ZSBmbGV1cnlIdHRwRXZlbnRzOiBGbGV1cnlIdHRwRXZlbnRzLFxyXG4gICAgICAgIHByaXZhdGUgb2F1dGhTZXJ2aWNlOiBPYXV0aFNlcnZpY2VcclxuICAgICkge31cclxuXHJcbiAgICByZXF1ZXN0VHJhbnNmb3JtYXRpb24oaHR0cFJlcXVlc3Q6IEF4aW9zUmVxdWVzdENvbmZpZyk6IEZsZXVyeUludGVyY2VwdG9yUmVxdWVzdCB7XHJcbiAgICAgICAgY29uc3QgaGFzQmFzZVVybCA9IGh0dHBSZXF1ZXN0LnVybC5pbmRleE9mKHRoaXMuY29uZmlnLmJhc2VVcmwpO1xyXG4gICAgICAgIGNvbnN0IGFkZEJhc2VVcmwgPSBoYXNCYXNlVXJsID09PSAtMSA/IHRoaXMuY29uZmlnLmJhc2VVcmwgOiAnJztcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBiYXNlVXJsOiB0aGlzLmNvbmZpZy5iYXNlVXJsLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBodHRwUmVxdWVzdC5oZWFkZXJzLFxyXG4gICAgICAgICAgICB1cmw6IGFkZEJhc2VVcmwgKyBodHRwUmVxdWVzdC51cmwsXHJcbiAgICAgICAgICAgIGJvZHk6IGh0dHBSZXF1ZXN0LmRhdGEsXHJcbiAgICAgICAgICAgIGZsZXVyeUh0dHBFdmVudHM6IHRoaXMuZmxldXJ5SHR0cEV2ZW50cyxcclxuICAgICAgICAgICAgb2F1dGhTZXJ2aWNlOiB0aGlzLm9hdXRoU2VydmljZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlKGluc3RhbmNlOiBBeGlvc0luc3RhbmNlKSB7XHJcbiAgICAgICAgaW5zdGFuY2UuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKChyZXEpID0+IHRoaXMucHJlVmFsaWRhdG9ycyhyZXEpKTtcclxuICAgICAgICBpbnN0YW5jZS5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKChyZXEpID0+IHRoaXMucG9zVmFsaWRhdG9ycyhyZXEpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHByZU1vZGlmaWVycyhodHRwUmVxdWVzdDogQXhpb3NSZXF1ZXN0Q29uZmlnKTogUHJvbWlzZTxBeGlvc1JlcXVlc3RDb25maWc+IHtcclxuICAgICAgICBsZXQgcmVxID0gdGhpcy5yZXF1ZXN0VHJhbnNmb3JtYXRpb24oaHR0cFJlcXVlc3QpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGZuIG9mIHByZU1vZGlmaWVycykge1xyXG4gICAgICAgICAgICByZXEgPSBhd2FpdCBmbihyZXEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHR0cFJlcXVlc3QuaGVhZGVycyA9IHJlcS5oZWFkZXJzO1xyXG4gICAgICAgIGh0dHBSZXF1ZXN0LmRhdGEgPSByZXEuYm9keTtcclxuICAgICAgICBodHRwUmVxdWVzdC51cmwgPSByZXEudXJsO1xyXG5cclxuICAgICAgICByZXR1cm4gaHR0cFJlcXVlc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBwcmVWYWxpZGF0b3JzKGh0dHBSZXF1ZXN0OiBBeGlvc1JlcXVlc3RDb25maWcpOiBQcm9taXNlPEF4aW9zUmVxdWVzdENvbmZpZz4ge1xyXG4gICAgICAgIGNvbnN0IHJlcSA9IHRoaXMucmVxdWVzdFRyYW5zZm9ybWF0aW9uKGh0dHBSZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3IgPSBwcmVWYWxpZGF0b3JzLmZpbmQoZm4gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZm4ocmVxKSA9PT0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvciA/IGh0dHBSZXF1ZXN0IDogdGhpcy5wcmVNb2RpZmllcnMoaHR0cFJlcXVlc3QpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBwb3NWYWxpZGF0b3JzKGh0dHBSZXNwb25zZTogQXhpb3NSZXNwb25zZSk6IFByb21pc2U8QXhpb3NSZXNwb25zZT4ge1xyXG4gICAgICAgIHBvc1ZhbGlkYXRvcnMuZm9yRWFjaCgoZm4pID0+IHtcclxuICAgICAgICAgICAgZm4oe1xyXG4gICAgICAgICAgICAgICAgb2F1dGhTZXJ2aWNlOiB0aGlzLm9hdXRoU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHN0YXR1czogaHR0cFJlc3BvbnNlLnN0YXR1c1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGh0dHBSZXNwb25zZTtcclxuICAgIH1cclxufSJdfQ==