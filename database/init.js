db = db.getSiblingDB('pohod_project');

db.createCollection('users')
db.users.insertOne(
    {
        username: 'Hello',
        password: 'World',
        email: 'hello@world.com'
    }
)