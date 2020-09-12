# Udagram

Udagram is the second project of Udacity Cloud Developer Nanodegree.

Users will be able to post photos to a feed and process it using an image filtering.

These are the components that compose the complete solution:

-   An Ionic frontend UI;
-   A Node-Express backend providing endpoints through a Rest API;
-   A Node-Express image filtering microservice;
-   AWS S3 file store;
-   AWS RDS database;

The Ionic frontend is deployed in AWS S3 as a static web application and it consumes the Node-Express REST API.

The REST API is deployed in AWS Elastic Beanstalk and it communicates with the Ionic Frontend, a S3 file store, with the RDS database and with the image filtering microservice.

Lastly, the image filtering microservice is deployed in another AWS Elastic Beanstalk.

The project challenges were implemented:

-   REST API communicates with the image filtering microservice;
-   The image filtering endpoint is protected with client id token and access token;
-   A new domain and subdomains were registered in AWS Route53 for this application.

For more details on which implementation and changes according to the project specification, please visit each application sub-folder README.

## Domain Name

A new domain was registered in AWS Route53 for this application: udagram-dtm.com
And subdomains were assigned to ionic frontend, backend REST API and image microservice:

-   [Udagram Ionic Frontend](http://www.udagram-dtm.com)
-   [Udagram Backend REST API](http://restapi.udagram-dtm.com)
-   [Udagram Image Filtering Microservice](http://imgmicroservice.udagram-dtm.com)
