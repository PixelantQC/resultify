# Introduction
This is a template project which helps you to automate and check your site's **layout** with a help of [Galen Faramework](http://galenframework.com/).
And site's **functionality** using [Nightwatch.js](http://nightwatchjs.org/).
This project also contains configuration for selenium server to run tests locally. It also includes cloud based configuration to run your tests on web services like: [SauceLabs](https://saucelabs.com/) and [Browserstack](http://browserstack.com/).


# Installation
To run these tests, you need to _setup_ your environment _first_:


## Node and NPM
[https://nodejs.org/en/](https://nodejs.org/en/)


## Selenium server
You need to fire up selenium server(standalone or chrome or safari for firing up your locally installed specific browser) to run your Nightwatch test _locally_.

**Download:** [http://www.seleniumhq.org/download/](http://www.seleniumhq.org/download/)


## Java
You need _java_(JDK and JRE) to run selenium server:

**Download:** [http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html)


## Nightwatch and Galen
_Two simple commands to install testing frameworks globally(-g flag) after you've installed npm:_

`$ sudo npm install -g galenframework-cli`

`$ sudo npm install -g nightwatch`


## SauceLabs and Browserstack environment variables
I set my **username** and **access_key** for these services as environment variables. I need these for running **Nightwatch** tests. So my configuration needs you to export this variables in .bash_profile like this:

`$ sudo nano ~/.bash_profile`

And paste there your new variables:

    export BROWSERSTACK_USER="_your_browserstack_user_"
    export BROWSERSTACK_KEY="_your_browserstack_access_key_"
    export SAUCE_USER="_your_saucelabs_user_"
    export SAUCE_KEY="_your_saucelabs_access_key_"


## SauceLabs and Browserstack secret.test
To run **Galen** tests you need to create `secret.test` file in Galen/ root folder(same folder for Galen configuration files).
You need to set there `browserstack_url` and `saucelabs_url`. It should look like this:


_# your secret.test_

    @@ set
      browserstack_url http://browserstack_username:access_key@hub.browserstack.com/wd/hub
      saucelabs_url http://saucelabs_username:access_key@ondemand.saucelabs.com:80/wd/hub

## Install html-reports npm module for Nightwatch.js

`$ cd Nightwatch/`

`$ npm install`


# Running your tests
To run sample tests you should look into both _package.json_ in Nightwatch and Galen folders. There are many predefined scripts for easily running your tests in any environment you want: Saucelabs, Browserstack or just locally. Also in package.json you could see my scripts for exporting Nightwatch and Galen test reports to my Dropbox Desktop folder on my Mac. You can freely redefine them for you needs or write new ones.

For example to run all Nightwatch desktop tests on Saucelabs:

    $ cd Nightwatch/
    $ npm run sl-desktop

Or to run _home-page.js_ test locally(don't forget to fire up your local **selenium server**). _**Note**_: to run **Galen** tests - you **don't need** to run your selenium-server instance:

    $ cd Nightwatch/
    $ npm run home

Same logic works for Galen Framework. To run all your browserstack mobile tests silently(-s flag means - no npm errors in terminal are shown):

    $ cd Galen/
    $ npm run bs-mobile


# Reports
All the html reports of completed tests you can open in your prefered browser. Local reports located in `Nightwatch/reports/` and `Galen/reports/` folders. All Browserstack and Saucelabs reports situated in `Nightwatch/browserstack_reports/` and `Galen/saucelabs_reports/` folders.


# SauceLabs/Nightwatch specialties
In [Nightwatch/scripts](https://github.com/PixelantQC/project-template/tree/master/Nightwatch/scripts) folder there is a script called [report.js](https://github.com/PixelantQC/project-template/blob/master/Nightwatch/scripts/report.js). This script(if combined with `afterEach` method which defined in _home-page.js_) defines the status of the job which ran in SauceLabs dashboard. I mean it sets 'passed' or 'failed' status of finished test instead of 'completed'. This is quite helpful when analysing your testing results.
