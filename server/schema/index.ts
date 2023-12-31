let users = [
    { id: '1', name: 'Joshua' },
    { id: '2', name: 'Sydney' },
    { id: '3', name: 'Jabbar'}
]

export const typeDefs = `#graphql
    type Query {
        info: String!
        user(id: ID!): User
        allUsers: [User!]!
    }
    type Mutation {
        addUser(id: ID!, name: String!): User!
        updateUser(id: ID!, name: String!): User
        deleteUser(id: ID!): User
    }
    type User {
        id: ID!
        name: String!
    }
`

export const resolvers = {
    Query: {
        info: () => 'Hello World',
        user: (parent: any, args: { id: any }, contextValue: any, info: any) => {
            const user = users.find(user => user.id === args.id)
            return user || null
        },
        allUsers: () => users
    },
    User: {
        id: (parent: { id: number }) => parent.id,
        name: (parent: { name : string }) => parent.name
    },
    Mutation: {
        addUser: (parent: any, args: { id: any; name: any }) => {
            const user = {
                id: args.id,
                name: args.name
            }
            users.push(user)
            return user
        },
        updateUser: (parent: any, args: { id: any; name: any }) => {
            const user = users.find(user => user.id === args.id)
            if (user) {
                user.name = args.name
            }
            return user
        },
        deleteUser: (parent: any, args: { id: any; }) => {
            const userIndex = users.findIndex(user => user.id === args.id)
            return users.splice(userIndex, 1)[0] 
        }
    }
}