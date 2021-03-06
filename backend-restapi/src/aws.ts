import AWS = require('aws-sdk');
import { config } from './config/config';

// The dev configurations
const c = config.dev;

// Configure AWS from local saved user credentials using default
// profile
if (c.aws_profile !== 'DEPLOYED') {
    var credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
    AWS.config.credentials = credentials;
}

// AWS S3 service object
export const s3 = new AWS.S3({
    signatureVersion: 'v4',
    region: c.aws_region,
    params: { Bucket: c.aws_media_bucket },
});

/* getGetSignedUrl generates an aws signed url to user be able to
 * retrieve an item from S3 bucket
 * @Params
 *    key: string - the filename to be get from s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl(key: string): string {
    // Signed url expiration time in minutes
    const signedUrlExpireSeconds = 60 * 5;

    const url = s3.getSignedUrl('getObject', {
        Bucket: c.aws_media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds,
    });

    // Returns the signed url
    return url;
}

/* getPutSignedUrl generates an aws signed url to user be able to put
 * an item in AWS S3 bucket
 * @Params
 *    key: string - the filename to be put in s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getPutSignedUrl(key: string) {
    // The expiration time in minutes
    const signedUrlExpireSeconds = 60 * 5;

    const url = s3.getSignedUrl('putObject', {
        Bucket: c.aws_media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds,
    });

    // Returns the signed url
    return url;
}
