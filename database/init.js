// Create db for Authentication Users
db = db.getSiblingDB('auth_db');
db.createCollection('users')