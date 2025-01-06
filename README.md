# Frontegg Hosted Login Box Language Selector

This project provides a Node.js server that handles metadata overrides for customizing the Frontegg login box, adding a 

## Prerequisites

- Node.js and npm (or yarn) installed on your development machine.
- A Frontegg account with a project and environment set up.

## Setup

1. Use the Frontegg builder to achieve the desired visual style for your login box, such as color changes, font choices, and logo placements.

2. Clone this repo and choose a hosting platform like Heroku or a similar service that suits your needs. Deploy your code to the chosen platform. Once deployed, obtain the publicly accessible URL of your server. It should look like https://yourserveraddress/overrides.

3. Follow [the instructions here to implement Frontegg Metadata Overrides](https://developers.frontegg.com/sdks/customizations/configuration#customization-in-the-hosted-mode) to connect your hosted login box to the server.

4. Load your hosted login box (The `Login URL` from `Frontegg Portal ➜ [ENVIRONMENT] ➜ Env Settings page`, followed by `/account/login`). For example - `https://app-frtqiefxjqn9.frontegg.com/oauth/account/login`. You should see the settings are applied.

5. If you do not see the settings applied, open the network tools, refresh the page, and search for a request from `/overrides` to see if your server was called. You can also search for the call from `/metadata?entityName=adminBox` to verify that your are passing `metadataOverrides` under `configuration` as required.

```
"metadataOverrides": {
    "url": "https://yourserveraddress/overrides"
}
```

## Testing Locally

If you want to test locally and avoid CORS issues, you can run the server on Chrome with the following command on Mac for example:

```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --user-data-dir="~/ChromeDev"
```

This will disable web security in Chrome, allowing local requests to bypass CORS restrictions temporarily.

Use this method for development and testing only. For production, host the server on a publicly accessible domain.


### Screenshots
The login box is displayed in English by default ➜
![default](/screenshots/screehot_1_english.png)

Switching to Spanish will result in a page refresh and the page will be translated.➜
![default](/screenshots/screenshot_02_spanish.png)
