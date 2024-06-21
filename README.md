
# Backend Slidely AI task

This server-side application serves as the backend for managing submissions data. It provides endpoints to handle Create and Retrieve operations on submission data.



## Technologies Used

 * TypeScript

 * Express.js

 * Node.js

 * npm (Node Package Manager)


## Prerequisites

 * Node.js

 * npm (Node Package Manager)

## Getting Started

To get a local copy of the project up and running, follow these steps:


1. Clone the Repository:

```bash
  git clone https://github.com/PRITISH-TOMAR/Task_Slidely_Backend
  cd Task_Slidely_Backend
```
2. Install dependencies:
```bash
 npm install
```
3. Run the server:
```bash
 npm run dev
```


## API Reference



#### Get /read

Retrieve submissions from the database.

Parameters
* index : Index of the submission to retrieve.
* email : Email of the submission to retrieve.

```http
  GET /read/?
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `index` | `Integer` | **Required**. Index of requested data|




![App Screenshot](https://i.ibb.co/D1LXhNr/GetIndex.png)

...................................................................................................................................................


![App Screenshot](https://i.ibb.co/M8kQwTj/GetEmail.png)


#### POST /create 

Create a new submission.



```http
  GET /read/?
```
* Request Body
```bash
  {
  "name": "Jane Smith",
  "email": "janesmith@example.com",
  "phone": "9876543210",
  "github_link": "https://github.com/janesmith",
  "stopwatch_time": "00:00:25"
}

```
* Response Body
```bash
  {
  "message": "Submission created successfully",
  "submission": {
    "name": "Jane Smith",
    "email": "janesmith@example.com",
    "phone": "9876543210",
    "github_link": "https://github.com/janesmith",
    "stopwatch_time": "00:00:25"
  }
}

```
![App Screenshot](https://i.ibb.co/pLK9XyF/Post-Submit.png)

*  Error Handling : 
   Errors are returned with appropriate HTTP status codes and messages.

#### GET /PING 

Returns a True value if uccessfully connected.
![App Screenshot](https://i.ibb.co/hYLX9rg/GetPing.png)
