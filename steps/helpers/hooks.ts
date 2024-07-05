import {before, binding} from "cucumber-tsflow";
import {page} from "../../world";

@binding()
export class Hooks {
    private async loginAndGetTokens(): Promise<{ phpSessionId: string, csrfToken: string }> {
        const loginUrl = 'https://enotes.pointschool.ru/login';
        const loginPageResponse = await page.request.get(loginUrl);
        const loginPageHtml = (await loginPageResponse.body()).toString('utf-8');

        const csrfToken = loginPageHtml.match(/<meta name="csrf-token" content="(.+?)">/)?.[1];

        if (!csrfToken) {
            throw new Error('CSRF token not found in HTML response');
        }

        const loginResponse = await page.request.post('https://enotes.pointschool.ru/login', {
            form: {
                '_csrf': csrfToken,
                'LoginForm[username]': 'test',
                'LoginForm[password]': 'test',
                'LoginForm[rememberMe]': 0
            }
        });

        if (loginResponse.status() !== 302 && loginResponse.status() !== 200) {
            throw new Error(`Failed to login. Status: ${loginResponse.status()}`);
        }

        const cookies = await page.context().cookies();
        const phpSessionIdCookie = cookies.find(cookie => cookie.name === 'PHPSESSID');
        const csrfTokenCookie = cookies.find(cookie => cookie.name === '_csrf');

        if (!phpSessionIdCookie || !csrfTokenCookie) {
            throw new Error('PHP session ID or CSRF token cookie not found');
        }

        return {
            phpSessionId: phpSessionIdCookie.value,
            csrfToken: csrfTokenCookie.value
        };
    }

    private async getXcsrfToken(phpSessionId: string, csrfToken: string): Promise<string> {
        const homePageUrl = 'https://enotes.pointschool.ru';
        const homePageResponse = await page.request.get(homePageUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `PHPSESSID=${phpSessionId}; _csrf=${csrfToken}`
            }
        });

        const homePageHtml = (await homePageResponse.body()).toString('utf-8');
        const XcsrfToken = homePageHtml.match(/<meta name="csrf-token" content="(.+?)">/)?.[1];

        if (!XcsrfToken) {
            throw new Error('X-CSRF token not found in HTML response');
        }

        return XcsrfToken;
    }

    @before('clearBasket')
    public async clearBasket(): Promise<void> {
        try {
            const { phpSessionId, csrfToken } = await this.loginAndGetTokens();
            const XcsrfToken = await this.getXcsrfToken(phpSessionId, csrfToken);

            const clearBasketUrl = 'https://enotes.pointschool.ru/basket/clear';
            const clearBasketResponse = await page.request.post(clearBasketUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Csrf-Token': XcsrfToken,
                    'Cookie': `PHPSESSID=${phpSessionId}; _csrf=${csrfToken}`
                },
                data: { response: true }
            });

            if (clearBasketResponse.ok()) {
                console.log('Basket cleared successfully');
            } else {
                console.error('Failed to clear basket', clearBasketResponse.status());
            }
        } catch (error) {
            console.error('Error:', error);
        }
         finally {
            await page.context().clearCookies();
        }
    }

    @before('addSaledItemInBasket')
    public async addSaledItem(): Promise<void> {
        try {
            const { phpSessionId, csrfToken } = await this.loginAndGetTokens();
            const XcsrfToken = await this.getXcsrfToken(phpSessionId, csrfToken);

            const addSaledItemUrl = 'https://enotes.pointschool.ru/basket/create';
            const addSaledItemResponse = await page.request.post(addSaledItemUrl, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Csrf-Token': XcsrfToken,
                    'Cookie': `PHPSESSID=${phpSessionId}; _csrf=${csrfToken}`
                },
                data: `product=3&count=1`
            });

            if (addSaledItemResponse.ok()) {
                console.log('Item added to basket successfully');
            } else {
                console.error('Failed to add item to basket', addSaledItemResponse.status());
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            await page.context().clearCookies();
        }
    }

}