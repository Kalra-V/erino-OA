# Erino SDE Intern Assessment

## Instructions on how to run the code:
1. Clone the repository:
```
git clone https://github.com/Kalra-V/erino-OA.git
cd erino-OA
```

2. Install dependencies in the backend folder:
```
cd backend
npm install
```
Also create a .env file in the backend folder. I have attached the .env file in the mail with the MongoDB URI for connecting the database.

3. Install dependencies in the frontend folder:
```
cd ../frontend
npm install
```

4. Run the project:
- Backend:
  ```
  #from the backend directory
  npm start
  ```
  The port will also be mentioned in the terminal for the backend.
- Frontend:
  ```
  #from the frontend directory
  npm start
  ```
  The port for frontend is localhost:3000 by default.

## API Endpoints:

1. `/contacts` GET: retrieves all contacts
2. `/contacts` POST: creates a contact
3. `/contacts/:id` PUT: updates a contact
4. `/contacts/:id` DELETE: deletes a contact

