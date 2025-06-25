const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure AWS
AWS.config.update({
  region: 'us-east-1'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// API Endpoints
app.get('/api/dishes', async (req, res) => {
  const params = {
    TableName: 'MulticulturalDishes'
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AI endpoint using Lambda
app.post('/api/ask-ai', async (req, res) => {
  const lambda = new AWS.Lambda();
  const { question } = req.body;

  const params = {
    FunctionName: 'multicultural-foods-ai',
    Payload: JSON.stringify({ question })
  };

  try {
    const result = await lambda.invoke(params).promise();
    const response = JSON.parse(result.Payload);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  });