

# Serverless Framework Node Express API on AWS

This template demonstrates how to develop and deploy a simple Node Express API service, backed by DynamoDB database.




### Deployment

Install dependencies with:

```
npm install
```

and set aws secret key 

```
Run on local serverless config credentials --provider aws --key <Access Key ID> --secret <Secret Access Key>
```

and then deploy with:

```
serverless deploy
```

After running deploy, you should see output similar to:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service aws-node-express-dynamodb-api.zip file to S3 (718.53 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
....................................
Serverless: Stack update finished...
Service Information
service: aws-node-express-dynamodb-api
stage: dev
region: us-east-1
stack: aws-node-express-dynamodb-api-dev
resources: 13
api keys:
  None
endpoints:
  ANY - https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  api: aws-node-express-dynamodb-api-dev-api
layers:
  None
```

_

### Invocation

After successful deployment, you can create a new employee by calling the corresponding endpoint:

```
I have checked this rest api on postman

--request POST
url https://xxxxxxx.execute-api.us-east-1.amazonaws.com/employees
{
    "name":"David"
}

Which should result in the following response:

```{
        "id": "30ef8475-9a08-4aee-9615-a1bd67afb316",
        "name": "David"
    }
```

You can later retrieve the get all employee table data  by calling the following endpoint:

```
--request GET
url https://xxxxxxx.execute-api.us-east-1.amazonaws.com/employees
```

Which should result in the following response:

```bash
[
    {
        "id": "30ef8475-9a08-4aee-9615-a1bd67afb316",
        "name": "David"
    },
    {
        "id": "f4c26273-eb42-48d6-a120-e33d25da6cf0",
        "name": "test"
    }
]
```


You can later retrieve the employee by `id` by calling the following endpoint:

```bash
url https://xxxxxxx.execute-api.us-east-1.amazonaws.com/employees/:id
```

Which should result in the following response:

```bash
{
        "id": "30ef8475-9a08-4aee-9615-a1bd67afb316",
        "name": "David"
    }
```


if You can later update the employee by `id` by calling the following endpoint:

```bash
--request PUT
url https://xxxxxxx.execute-api.us-east-1.amazonaws.com/employees/:id
```
Which should result in the following response:

```{
        "name": "david1"
    }
```

Which should result in the following response:

```bash
{
        "id": "30ef8475-9a08-4aee-9615-a1bd67afb316",
        "name": "david1"
    }
```


if You can later delete the employee by `id` by calling the following endpoint:

```bash
--request DELETE
url https://xxxxxxx.execute-api.us-east-1.amazonaws.com/employees/:id
```


Which should result in the following response:

```bash
{
        "success": true,
       
    }
```
