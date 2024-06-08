// Create db for Authentication Users
db = db.getSiblingDB('auth_db');

db.createCollection('users')
db.users.insertOne(
    {
        username: 'Hello',
        password: 'World',
        email: 'hello@world.com'
    }
)