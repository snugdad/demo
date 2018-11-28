const express = require('express');
const graphQLHTTP = require('express-graphql')
const app = express();
const schema = require('./schema')


app.use('/graphql', graphQLHTTP({
    schema,
    graphiql: true,
}));

app.listen(4000, () => {
    console.log('GraphQL Server running on port 4000');
});