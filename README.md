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

The REST API is deployed in AWS Elastic Beanstalk and it communicates with a S3 file store, with the RDS database and with the image filtering microservice.

Lastly, the image filtering microservice is deployed in another AWS Elastic Beanstalk.

## Domain Name

Project domain name:

-   udagram-dtm.com.br

Web application address:

-   http://www.udagram-dtm.com.br
