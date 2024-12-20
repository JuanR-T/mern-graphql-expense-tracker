import { users } from "../fakeData/data.js";

const userResolver = {
    Query: {
        users: ({req, res}) => {
            return users
        },
        user: (_: any, { userId }: any) => {
            return users.find(user => user._id === userId)
        }
    },
    Mutation: {
        login: (_: any, { input }: any) => {        
            const user = users.find(user => user.username === input.username && user.password === input.password)
            return user
        }
    }
}

export default userResolver;