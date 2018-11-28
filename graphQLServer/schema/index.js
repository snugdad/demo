const GraphQL = require('graphql');
const axios = require('axios')
const { 
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLString } = GraphQL;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        isActive:  { type: GraphQLBoolean},
        isEntryAdmin: { type: GraphQLBoolean},
        isOperatorAdmin: { type: GraphQLBoolean},
        isLocationManager: { type: GraphQLBoolean},
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, args){
                return axios.get(`http://localhost:5000/users/${args.id}`)
                    .then(res => res.data)
                    .catch(err => console.error(err))
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})