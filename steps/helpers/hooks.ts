import {before, binding} from "cucumber-tsflow";
import {page} from "../../world";

@binding()
export class Hooks {
    @before('clearBasket')
    public async clearBasket():Promise<void>{
        try {
            // Step 1: Fetch login page to obtain initial CSRF token
            const loginUrl = 'https://enotes.pointschool.ru/login';
            const loginPageResponse = await page.request.get(loginUrl);
            const loginPageHtml = (await loginPageResponse.body()).toString('utf-8'); // Convert Buffer to string

            // Extract CSRF token from the HTML response
            const csrfToken = loginPageHtml.match(/<meta name="csrf-token" content="(.+?)">/)?.[1];

            if (!csrfToken) {
                console.error('CSRF token not found in HTML response');
                return;
            }

            // Step 2: Perform login with obtained CSRF token
            const loginResponse = await page.request.post('https://enotes.pointschool.ru/login', {
                form: {
                    '_csrf': csrfToken,
                    'LoginForm[username]': 'test',
                    'LoginForm[password]': 'test',
                    'LoginForm[rememberMe]': 0 // Adjust as per your requirements
                }
            });

            // Check if login was successful (status 302 or 200)
            if (loginResponse.status() !== 302 && loginResponse.status() !== 200) {
                console.error('Failed to login. Status:', loginResponse.status());
                return;
            }

            // Step 3: Retrieve cookies after successful login
            const cookies = await page.context().cookies();
            const phpSessionIdCookie = cookies.find(cookie => cookie.name === 'PHPSESSID');
            const csrfTokenCookie = cookies.find(cookie => cookie.name === '_csrf');

            if (!phpSessionIdCookie || !csrfTokenCookie) {
                console.error('PHP session ID or CSRF token cookie not found');
                return;
            }

            const phpSessionId = phpSessionIdCookie.value;
            const csrfTokenFromCookies = csrfTokenCookie.value;

            console.log('PHP Session ID:', phpSessionId);
            console.log('CSRF Token (from cookies):', csrfTokenFromCookies);

            // Step 4: Retrieve X-CSRF-Token from another endpoint (example: home page)
            const homePageUrl = 'https://enotes.pointschool.ru';
            const homePageResponse = await page.request.get(homePageUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${phpSessionIdCookie.name}=${phpSessionId}; ${csrfTokenCookie.name}=${csrfTokenFromCookies}`
                }
            });

            const homePageHtml = (await homePageResponse.body()).toString('utf-8'); // Convert Buffer to string

            // Extract X-CSRF-Token from the HTML response
            const XcsrfToken = homePageHtml.match(/<meta name="csrf-token" content="(.+?)">/)?.[1];

            if (!XcsrfToken) {
                console.error('X-CSRF token not found in HTML response');
                return;
            }

            // Step 5: Example action - Clear the basket
            const clearBasketUrl = 'https://enotes.pointschool.ru/basket/clear';
            const clearBasketResponse = await page.request.post(clearBasketUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Csrf-Token': XcsrfToken,
                    'Cookie': `${phpSessionIdCookie.name}=${phpSessionId}; ${csrfTokenCookie.name}=${csrfTokenFromCookies}`
                },
                data: { response: true }
            });

            if (clearBasketResponse.ok()) {
                console.log('Basket cleared successfully');
            } else {
                console.error('Failed to clear basket', clearBasketResponse.status());
            }

            // Step 6: Perform other actions as needed after login

        } catch (error) {
            console.error('Error:', error);
        }
        await page.context().clearCookies();
    }
}