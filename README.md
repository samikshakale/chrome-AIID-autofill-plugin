# chrome-AIID-autofill-plugin
## Overview
Created a chrome extension that uses multiple large language models to summarize and query news article text in order to autofill fields of the AIID (artificial intelligence incidents database) incident report.

## Adding the extension
Go to `chrome://extensions` and make sure developer mode (seen in the top right) is turned on. Then click on `load unpacked` and select the folder named `extension` from this repo. Now, this extension should show up on the develoepr page and the icon for it should be on the toolbar.

## Setting up the website
Navigate to the `site` folder within the repo. This is where the code for webscraping, summarizing, and querying using LLMs resides. Then, use the command `flask run` from the command line to start the development server. This will allow the chrome extension to make calls to this local server when it is called upon.

## Using the extension
To use this extension, you need to first open up a new incident report on the AIID website. Then, enter in the information for pages 1 and 2 of the report. When you reach page 3 of the report, you can click on the extension icon in the toolbar. Then, paste the url of the news article in the text box and click the `Fill form` button. The LLMs take some time to run so, after about 20-30 seconds, you should see the fields on page 3 automatically populated with information. Thats it!

## Common bugs
If you see the following error on the `chrome://extensions` page: `receiving end does not exist`, then you need to simply reload the tab where you have the AIID incident report pulled up. Then, simply click through until you reach page 3 and try the extension again. This extension sends data to the current window you are working with. So if you reload another tab, then it will misconstrue the active current tab.

If you see an error regarding the `fetch` method, then you need to check that you have indeed started the development server (i.e. the local host is active).
