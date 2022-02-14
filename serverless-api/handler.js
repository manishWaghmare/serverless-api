const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");
const uuid = require('uuid');

const app = express();


const EMPLOYEES_TABLE = process.env.TableName
AWS.config.update({
  region: process.env.REGION,
  endpoint:process.env.ENDPOINT
});
const  dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get('/employees', (req, res) => {
  const params = {
      TableName: EMPLOYEES_TABLE
  };
  dynamoDb.scan(params, (error, result) => {
      if (error) {
          res.status(400).json({ error: 'Error fetching the employees' });
      }
      res.json(result.Items);
  });
});

app.get('/employees/:id', (req, res) => {
  const id = req.params.id;

  const params = {
      TableName: EMPLOYEES_TABLE,
      Key: {
          id
      }
  };

  dynamoDb.get(params, (error, result) => {
      if (error) {
          res.status(400).json({ error: 'Error retrieving Employee' });
      }
      if (result.Item) {
          res.json(result.Item);
      } else {
          res.status(404).json({ error: `Employee with id: ${id} not found` });
      }
  });
});

app.post('/employees', (req, res) => {
  const name = req.body.name;
  const id = uuid.v4();

  const params = {
      TableName: EMPLOYEES_TABLE,
      Item: {
          id,
          name
      },
  };

  dynamoDb.put(params, (error) => {
      if (error) {
          res.status(400).json({ error: 'Could not create Employee' });
      }
      res.json({
          id,
          name
      });
  });
});

app.delete('/employees/:id', (req, res) => {
  const id = req.params.id;

  const params = {
      TableName: EMPLOYEES_TABLE,
      Key: {
          id
      }
  };

  dynamoDb.delete(params, (error) => {
      if (error) {
          res.status(400).json({ error: 'Could not delete Employee' });
      }
      res.json({ success: true });
  });
});

app.put('/employees', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;

  const params = {
      TableName: EMPLOYEES_TABLE,
      Key: {
          id
      },
      UpdateExpression: 'set #name = :name',
      ExpressionAttributeNames: { '#name': 'name' },
      ExpressionAttributeValues: { ':name': name },
      ReturnValues: "ALL_NEW"
  }

  dynamoDb.update(params, (error, result) => {
      if (error) {
          res.status(400).json({ error: 'Could not update Employee' });
      }
      res.json(result.Attributes);
  })
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
