# Project-2
1. Clone the repo

        git@github.com:Wilvanson/Project-2.git

2. Install all dependencies at the root of your directory

        npm install

3. Create a POSTGRESQL user with Create database access and a password in PSQL

        CREATE USER <name> WITH PASSWORD 'password' WITH CREATEDB;

4. Create a .env file .gitignore in your backend directory based on the .env.example found within the directory.

5. Enter your username and password that you used to create the database and put the same information your .env file, along with your JWT_Secret and the PORT of 5000

        JWT_Secret = U/x5RMC3XE2N1w==

6. add the following proxy to your package.json file within the frontend directory to match the PORT defined in your backend .env file

        "proxy": "http://localhost:5000"

7. Create, Migrate, and Seed your Database with the following commands

        npx dotenv sequelize db:create
        npx dotenv sequelize db:migrate
        npx dotenv sequelize db:seed:all

8. Start the service in the backend directory

        npm start

9. Start the service in the frontend directory

        npm start

10. Congrats you are now ready to start using MiddleGround.