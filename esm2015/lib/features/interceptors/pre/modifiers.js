import { __awaiter } from "tslib";
import { filter, take } from 'rxjs/operators';
const insertBaseUrl = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        req.url = req.url.indexOf(req.baseUrl) === -1 ? req.baseUrl + req.url : req.url;
        resolve(req);
    });
});
// This function refresh the token if necessary
const isTokenValid = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        req.fleuryHttpEvents.isReady
            .pipe(filter(value => value), take(1)).subscribe(() => {
            if (!req.oauthService.isTokenValid())
                req.oauthService.refreshToken();
            resolve(req);
        });
    });
});
// Se dominio eh o mesmo do gateway entao continuar interceptor
const insertAccessToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        req.fleuryHttpEvents.isReady
            .pipe(filter(value => value), take(1)).subscribe(() => {
            req.headers['access_token'] = req.oauthService.getAccessToken();
            req.headers['client_id'] = req.oauthService.getApplicationId();
            resolve(req);
        });
    });
});
export const preModifiers = [
    insertBaseUrl,
    isTokenValid,
    insertAccessToken
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZpZXJzLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL1JlbmFuL3Byb2plY3RzL2ZsZXVyeS9saWJyYXJpZXMvbXktd29ya3NwYWNlL3Byb2plY3RzL2ZsZXVyeS1odHRwL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlcy9pbnRlcmNlcHRvcnMvcHJlL21vZGlmaWVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzRCxNQUFNLGFBQWEsR0FBRyxDQUFPLEdBQTZCLEVBQXFDLEVBQUU7SUFDN0YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQzNCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDaEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBLENBQUE7QUFFRCwrQ0FBK0M7QUFDL0MsTUFBTSxZQUFZLEdBQUcsQ0FBTyxHQUE2QixFQUFxQyxFQUFFO0lBQzVGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUMzQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTzthQUMzQixJQUFJLENBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQ3RCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDVixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUU7Z0JBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSxDQUFBO0FBRUQsK0RBQStEO0FBQy9ELE1BQU0saUJBQWlCLEdBQUcsQ0FBTyxHQUE2QixFQUFxQyxFQUFFO0lBQ2pHLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUMzQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTzthQUMzQixJQUFJLENBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQ3RCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDVixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDYixHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDaEUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUEsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBZ0Y7SUFDckcsYUFBYTtJQUNiLFlBQVk7SUFDWixpQkFBaUI7Q0FDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZsZXVyeUludGVyY2VwdG9yUmVxdWVzdCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWludGVyY2V0b3JzJztcclxuaW1wb3J0IHsgZmlsdGVyLCB0YWtlLCBzdWJzY3JpYmVPbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmNvbnN0IGluc2VydEJhc2VVcmwgPSBhc3luYyAocmVxOiBGbGV1cnlJbnRlcmNlcHRvclJlcXVlc3QpOiBQcm9taXNlPEZsZXVyeUludGVyY2VwdG9yUmVxdWVzdD4gPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgcmVxLnVybCA9IHJlcS51cmwuaW5kZXhPZihyZXEuYmFzZVVybCkgPT09IC0xID8gcmVxLmJhc2VVcmwgKyByZXEudXJsIDogcmVxLnVybDtcclxuICAgICAgICByZXNvbHZlKHJlcSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gVGhpcyBmdW5jdGlvbiByZWZyZXNoIHRoZSB0b2tlbiBpZiBuZWNlc3NhcnlcclxuY29uc3QgaXNUb2tlblZhbGlkID0gYXN5bmMgKHJlcTogRmxldXJ5SW50ZXJjZXB0b3JSZXF1ZXN0KTogUHJvbWlzZTxGbGV1cnlJbnRlcmNlcHRvclJlcXVlc3Q+ID0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIHJlcS5mbGV1cnlIdHRwRXZlbnRzLmlzUmVhZHlcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+IHZhbHVlKSxcclxuICAgICAgICAgICAgdGFrZSgxKVxyXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFyZXEub2F1dGhTZXJ2aWNlLmlzVG9rZW5WYWxpZCgpKSByZXEub2F1dGhTZXJ2aWNlLnJlZnJlc2hUb2tlbigpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gU2UgZG9taW5pbyBlaCBvIG1lc21vIGRvIGdhdGV3YXkgZW50YW8gY29udGludWFyIGludGVyY2VwdG9yXHJcbmNvbnN0IGluc2VydEFjY2Vzc1Rva2VuID0gYXN5bmMgKHJlcTogRmxldXJ5SW50ZXJjZXB0b3JSZXF1ZXN0KTogUHJvbWlzZTxGbGV1cnlJbnRlcmNlcHRvclJlcXVlc3Q+ID0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIHJlcS5mbGV1cnlIdHRwRXZlbnRzLmlzUmVhZHlcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+IHZhbHVlKSxcclxuICAgICAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlcS5oZWFkZXJzWydhY2Nlc3NfdG9rZW4nXSA9IHJlcS5vYXV0aFNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKTtcclxuICAgICAgICAgICAgcmVxLmhlYWRlcnNbJ2NsaWVudF9pZCddID0gcmVxLm9hdXRoU2VydmljZS5nZXRBcHBsaWNhdGlvbklkKCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVxKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHByZU1vZGlmaWVyczogQXJyYXk8KHJlcTogRmxldXJ5SW50ZXJjZXB0b3JSZXF1ZXN0KSA9PiBQcm9taXNlPEZsZXVyeUludGVyY2VwdG9yUmVxdWVzdD4+ID0gW1xyXG4gICAgaW5zZXJ0QmFzZVVybCxcclxuICAgIGlzVG9rZW5WYWxpZCxcclxuICAgIGluc2VydEFjY2Vzc1Rva2VuXHJcbl07Il19