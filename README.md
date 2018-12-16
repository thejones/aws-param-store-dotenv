# aws-param-store-dotenv
Node module that sets process.env variables from AWS param store values. 

## About
Uses your local .aws/credentials file (make sure this is setup) to get values from Systems Manager. For that part is uses the aws=param-store module.
This package adds the ability to simply set `process.env` values from the `Name` & `Value` properties that come back. 

## Usage


```
const awsParamStoreEnv = require('aws-param-store-dotenv');

awsParamStoreEnv({
  ssmPath: '/nutrien/',
  region: 'us-east-2',
});

```

`ssmPath` and `region` are both required. 
`ssmPath` must be a valid path and start with a `/` example `/api/super/secret/key/`

## testing
This is hard for your to run the test as you will need AWS setup and will need to provide a value that exists in your AWS account.
