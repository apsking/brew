
# Earth and Fire Brewing
[![Netlify Status](https://api.netlify.com/api/v1/badges/72fded29-abb4-4cf3-81ef-8c667ef5e32f/deploy-status)](https://app.netlify.com/sites/frosty-hugle-d9caaa/deploys)



## Developing
### Prerequisites
* `git` needs to be installed
* `NodeJS` needs to be installed
* `npm` needs to be installed

### Get started

1.  Clone your repo to your local machine

    `git clone https://github.com/earthandfirebrewing/brew.git`

1.  Install dependencies

    `npm install`

1.  Run the development server

    `npm run start`

If you are adding or editing content locally in the CMS, a couple of things to note:

1.  Changes will be pushed to the remote repo.

1.  You will be prompted to enter your site's url, this is necessary for Netlify Identity to manage user login. This is stored in `localStorage`, so you might have to empty your browser cache if you are switching projects but remaining on `localhost:8000`.

### I want to update a CMS field value
You can either update values directly via code or via the online CMS.

**Code:**

You can update the CMS values in the `/content/pages` directory. Each page has its own CMS
metadata. You can update values here. Just make sure that they follow the required types
defined in `/static/admin/config.yml`. You can confirm this by running your instance locally (see above) and confirming that you can access the `/admin` route on your `localhost`.

NOTE - Before making any changes, make sure to `git pull` the latest in case any CMS changes were made since you last pulled the code.

**Online CMS:**
Navigate to https://www.earthandfirebrewery.com/admin and edit the values there.

One you click 'Publish', the updates will take 3-4 minutes to reflect on the live site.

### I want to add new CMS fields
There are 3 areas that you'll need to update:
1. `/static/admin/config.yml` - This is the YAML definition for the Admin config panel. [Read more about widgets](https://www.netlifycms.org/docs/widgets/).
2. `/content/pages` - This is the markdown representation of your CMS data. You must add the required data attributes here
3. `/src/templates` - This is the actual ReactJS code that renders the content. You must update the GraphQL query here and then consume your new value as a `prop`.

## Editing CMS fields

The Netlify CMS configuration is located in `public/admin/config.yml`. This is where you will configure the pages, fields, posts and settings that are editable by the CMS.

Find out more in the [Netlify CMS Docs](https://www.netlifycms.org/docs/#configuration).

## Uploadcare setup

Uploadcare is our file upload system. It hosts the files for us and delivers them trough their CDN network.
Each site you'll create need its own Uploadcare API key's. See below how to set this up

1. Create new project in Uploadcare and save API keys in project

- Go to [Uploadcare.com](https://uploadcare.com/accounts/login/) and login
- Once on the dashboard create a new project
- Set the name and hit create
- In the left menu click in API Keys and copy the public key
- Now open your project and open the CMS congif.yml file
- find the `media_library` settings and paste in the public key after `publicKey:`
- Done!!

For more details see the [Netlify CMS Docs](https://www.netlifycms.org/docs/uploadcare/)

## Attribution:
* Pouring beer - https://www.pexels.com/video/pouring-beer-into-a-glass-2356468/
* Netlify theme - https://github.com/thriveweb/yellowcake
* Facebook, Instagram, Twitter base64 logos - https://www.iconfinder.com/search/?q=instagram