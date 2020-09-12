# Udagram Image Filtering Microservice

This is an image filtering microservice part of second project of Udacity Cloud Developer Nanodegree.
This service is intended to process user posted photos and it's hosted in AWS cloud using Elastic Beanstalk.

It communicates with the backend REST API server requiring a client id token and access token.

For the purpose of Postman testing, the expiration time of the access token has been increased.

## Installation instructions

The app is deployed in the cloud, but if you want to run it locally please the instructions below.

1. Requirements:

    - [Install Node.js](https://nodejs.org/en/) (tested with Node.Js 14);

2. Download and install the required npm packages: `npm i`
3. Run de dev server: `npm run dev`

## Registered Subdomain

A new domain was registered in AWS Route53 and a subdomain was set for this application:

-   [Udagram Image Filtering Microservice](http://imgmicroservice.udagram-dtm.com)
