const reporter = require('cucumber-html-reporter')
let options = {
    brandTitle: 'enotes',
    theme: 'bootstrap',
    jsonFile: './Reports/cucumber_report.json',
    output: './Reports/cucumber_report.html',
    screenshotsDirectory: './Screenshots/',
    storeScreenshots: true,
    reportSuiteAsScenarios: true,
    launchReport: true,

};
reporter.generate(options)

