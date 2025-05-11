# Social Network API

## Description

A RESTful API for a social network web application where users can share their thoughts, react to friends’ thoughts, and build a friends list. Built with Express.js, MongoDB, and Mongoose, this API supports full CRUD operations on users and thoughts, plus subdocument reactions and self-referencing friend relationships.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Screenshots](#screenshots)
* [Walkthrough Video](#walkthrough-video)
* [API Routes](#api-routes)

  * [Users](#users)
  * [Friends](#friends)
  * [Thoughts](#thoughts)
  * [Reactions](#reactions)
* [Data Models](#data-models)
* [Schema Settings & Virtuals](#schema-settings--virtuals)
* [Technologies](#technologies)
* [License](#license)
* [Contact](#contact)

## Installation

1. Clone the repo

   ```bash
   git clone git@github.com:LPerez21/NoSQL-Social-Network-API.git
   ```
2. Install dependencies

   ```bash
   cd social-network-api
   npm install
   npm start
   ```

## Usage

1. Start the server

   ```bash
   npm start
   ```
2. The API will be running at `http://localhost:3001`.
3. Use Insomnia (or Postman) to test the routes listed below.


## Walkthrough Video

A full walkthrough demonstrating how to start the server and all route functionality in Insomnia:
**[View the Walkthrough Video](https://drive.google.com/file/d/11FRJEL8KNBGLSisjYbrMomU5asn6V5o_/view?usp=drive_link)**

## API Routes

### Users

* **GET** `/api/users`
  Retrieve all users.

* **GET** `/api/users/:userId`
  Retrieve a single user by ID, populated with their thoughts & friends.

* **POST** `/api/users`
  Create a new user.
  **Body Example:**

  ```json
  {
    "username": "lernantino",
    "email": "lernantino@gmail.com"
  }
  ```

* **PUT** `/api/users/:userId`
  Update a user by ID.

* **DELETE** `/api/users/:userId`
  Remove a user by ID (BONUS: also deletes their associated thoughts).

### Friends

* **POST** `/api/users/:userId/friends/:friendId`
  Add a friend to a user’s friend list.

* **DELETE** `/api/users/:userId/friends/:friendId`
  Remove a friend from a user’s friend list.

### Thoughts

* **GET** `/api/thoughts`
  Retrieve all thoughts.

* **GET** `/api/thoughts/:thoughtId`
  Retrieve a single thought by ID.

* **POST** `/api/thoughts`
  Create a new thought and push its ID to the associated user’s `thoughts` array.
  **Body Example:**

  ```json
  {
    "thoughtText": "Here's a cool thought…",
    "username": "lernantino",
    "userId": "5edff358a0fcb779aa7b118b"
  }
  ```

* **PUT** `/api/thoughts/:thoughtId`
  Update a thought by ID.

* **DELETE** `/api/thoughts/:thoughtId`
  Delete a thought by ID.

### Reactions

* **POST** `/api/thoughts/:thoughtId/reactions`
  Create a reaction stored in a single thought’s `reactions` array.
  **Body Example:**

  ```json
  {
    "reactionBody": "Great thought!",
    "username": "friendUser"
  }
  ```

* **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId`
  Pull and remove a reaction by its `reactionId`.

## Data Models

### User

| Field    | Type   | Constraints                     |
| -------- | ------ | ------------------------------- |
| username | String | Required, Unique, Trimmed       |
| email    | String | Required, Unique, Validated     |
| thoughts | Array  | ObjectId references Thought     |
| friends  | Array  | ObjectId references User (self) |

**Virtual:** `friendCount` — returns the number of friends.

---

### Thought

| Field       | Type   | Constraints                   |
| ----------- | ------ | ----------------------------- |
| thoughtText | String | Required, 1–280 characters    |
| createdAt   | Date   | Defaults to current timestamp |
| username    | String | Required (creator’s username) |
| reactions   | Array  | Nested reaction subdocuments  |

**Virtual:** `reactionCount` — returns the number of reactions.

---

### Reaction (Schema Only)

| Field        | Type     | Constraints                    |
| ------------ | -------- | ------------------------------ |
| reactionId   | ObjectId | Default generated ObjectId     |
| reactionBody | String   | Required, up to 280 characters |
| username     | String   | Required                       |
| createdAt    | Date     | Defaults to current timestamp  |

## Schema Settings & Virtuals

* **Timestamps** formatted via getters (e.g. with a date library or `toLocaleString()`).
* **Virtuals** for `friendCount` and `reactionCount` are included in JSON responses.

## Technologies

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Testing:** Insomnia (or Postman)
* **Date Formatting:** (e.g. Day.js, Moment.js, or native Date)

## License

This project is licensed under the MIT License.

## Contact

Created by **Luis Perez**
Feel free to reach out with any questions or feedback!
