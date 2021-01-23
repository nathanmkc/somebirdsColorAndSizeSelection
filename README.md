# somebirdsColorAndSizeSelection
Shoe color &amp; size selection service

## Repo Setup
### Run npm install
```
npm install
```
### Environment Variables
Create a .env file within repo root directory and add
```
DEV_DB_HOST=localhost
```

### MySQL Database Setup
```
npm run db:seed
```
This will create a database called fec_somebirds_shoeinventory

*in order to seed the database, there must be a 'student' account with create, insert, and drop permissions.
To create this login account with all the available permissions (for simplicity), log in to MySQL on an administrative account and run the following commands
```
CREATE USER 'student'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'student'@'localhost';
```

### Build Bundle Using Webpack
Run the following to generate the bundle.js file that is needed to generate our color & size selection component
```
npm run build
```

### After Set Up
Run the following to initiate the server
```
npm run start
```
and point your browser to **localhost:3001**

## CRUD

### Create / POST - create a new item

#### Input

- Request with JSON object in body containing the name of the new shoe, it's model number, an array of the colors the shoe is available in, an array of the sizes the shoe is available in, and an array of the quantities available for each color/size combination of that shoe.

```
Endpoint: `/shoes`

Request Body:
{ "name": string,
  "model": number,
  "colors": [{"shoe_id": number, "color_id": number}],
  "sizes": [{"shoe_id": number, "size_id": number}],
  "qantities": [{"shoe_id": number, "color_id": number, "size_id": number, "quantity": number}]
}

Request Body example:
{ "name": "test shoe",
  "model": 101,
  "colors": [{"shoe_id": 101, "color_id": 1},{"shoe_id": 101, "color_id": 7},{"shoe_id": 101, "color_id": 9},{"shoe_id": 101, "color_id": 14}],
  "sizes": [{"shoe_id": 101, "size_id": 4},{"shoe_id": 101, "size_id": 7},{"shoe_id": 101, "size_id": 10},{"shoe_id": 101, "size_id": 13}],
  "quantities": [{"shoe_id": 101, "color_id": 1, "size_id": 4, "quantity": 6}, {"shoe_id": 101, "color_id": 1, "size_id": 7, "quantity": 2}, {"shoe_id": 101, "color_id": 1, "size_id": 10, "quantity": 0}, {"shoe_id": 101, "color_id": 1, "size_id": 13, "quantity": 5}, {"shoe_id": 101, "color_id": 7, "size_id": 4, "quantity": 6}, {"shoe_id": 101, "color_id": 7, "size_id": 7, "quantity": 2}, {"shoe_id": 101, "color_id": 7, "size_id": 10, "quantity": 0}, {"shoe_id": 101, "color_id": 7, "size_id": 13, "quantity": 5}, {"shoe_id": 101, "color_id": 9, "size_id": 4, "quantity": 6}, {"shoe_id": 101, "color_id": 9, "size_id": 7, "quantity": 2}, {"shoe_id": 101, "color_id": 9, "size_id": 10, "quantity": 0}, {"shoe_id": 101, "color_id": 9, "size_id": 13, "quantity": 5}, {"shoe_id": 101, "color_id": 14, "size_id": 4, "quantity": 6}, {"shoe_id": 101, "color_id": 14, "size_id": 7, "quantity": 2}, {"shoe_id": 101, "color_id": 14, "size_id": 10, "quantity": 0}, {"shoe_id": 101, "color_id": 14, "size_id": 13, "quantity": 5}]
}
```

#### Output

- If successful, 200 status code with 'Shoe created successfully' in body of response.

- If shoe model number already exists, 404 status code and message 'Error creating new shoe'.

### Read / GET - read an item

#### Input

None

```
Endpoints:
GET colors of shoe: `/shoes/:shoeId/colors`
GET sizes of shoe: `/shoes/:shoeId/sizes`
GET quantity of shoe in particular color for each size: '/shoes/:shoeId/colors/:colorId/quantities'
```

#### Output

```
[{
  "size_id": number,
  "quantity": number
}]

Response example:
  [
    {
        "size_id": 7,
        "quantity": 0
    },
    {
        "size_id": 8,
        "quantity": 6
    },
    {
        "size_id": 9,
        "quantity": 1
    },
    {
        "size_id": 10,
        "quantity": 7
    },
    {
        "size_id": 11,
        "quantity": 6
    },
    {
        "size_id": 12,
        "quantity": 8
    },
    {
        "size_id": 13,
        "quantity": 9
    },
    {
        "size_id": 14,
        "quantity": 8
    },
    {
        "size_id": 15,
        "quantity": 8
    },
    {
        "size_id": 16,
        "quantity": 1
    },
    {
        "size_id": 17,
        "quantity": 0
    },
    {
        "size_id": 18,
        "quantity": 0
    },
    {
        "size_id": 19,
        "quantity": 0
    }
]
```

### Update / PUT - update an item

#### Input

```
Endpoint: `/shoes/:shoeId`

Request Body:
{ "color_id": number, "size_id": number, "quantity": number }

Request Body example:
{"color_id": 7, "size_id": 2, "quantity": 11}
```

#### Output

- If successful, 200 status code with "Shoe successfully updated" in response body.
- If unsuccessful, 404 status code and message "Error updating shoe" in response body.

### Delete / DELETE - delete an item

#### Input

None

```
Endpoint: `/shoes/:shoeId`
```

#### Output

- If successful, 200 status code with message "Shoe successfully deleted" in response body.
- If unsuccessful, 404 status code with message "Error deleting shoe" in response body.