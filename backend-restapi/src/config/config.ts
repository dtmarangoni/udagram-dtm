import { props } from 'bluebird';

export const config = {
    dev: {
        username: process.env.POSTGRESS_USERNAME,
        password: process.env.POSTGRESS_PASSWORD,
        database: process.env.POSTGRESS_DATABASE,
        host: process.env.POSTGRESS_HOST,
        dialect: 'postgres',
        aws_region: process.env.AWS_REGION,
        aws_profile: process.env.AWS_PROFILE,
        aws_media_bucket: process.env.AWS_MEDIA_BUCKET,
        jwt_secret: process.env.JWT_SECRET,
        img_microservice_host: process.env.IMG_MICROSERVICE_HOST,
        restapi_client_id: process.env.RESTAPI_CLIENT_ID,
        restapi_private_key: process.env.RESTAPI_PRIVATE_KEY,
    },
    prod: {
        username: '',
        password: '',
        database: '',
        host: '',
        dialect: '',
        aws_region: '',
        aws_profile: '',
        aws_media_bucket: '',
        jwt_secret: '',
        img_microservice_host: '',
    },
};
