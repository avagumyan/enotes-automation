import {After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status} from '@cucumber/cucumber'
import {Browser, BrowserContext, chromium, Page} from 'playwright';
import {config} from "./config";
import {devices} from "@playwright/test";

let page: Page;
let browser: Browser;
let context:BrowserContext
let deviceType;
BeforeAll(async() => {
    deviceType = devices['Desktop Chrome']
    browser = await chromium.launch(config.browserOptions);
})

AfterAll(async() => {
    await browser.close();
})


Before(async() => {
    context = await browser.newContext({viewport: { width: 1920, height: 1080 }});
    page = await context.newPage();
    page.setDefaultTimeout(20000);
    return page;
})

After (async function (Scenario){
    if(Scenario.result!.status === Status.FAILED){
        await this.attach(await  page.screenshot({path:`./Screenshots/${Scenario.pickle.name}.png`, fullPage:true}), "image/png");
    }
    await page.close();
    await context.close();
})



setDefaultTimeout(20000);
export {page, browser}