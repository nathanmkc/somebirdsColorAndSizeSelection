# somebirdsColorAndSizeSelection
Shoe color &amp; size selection service

<img src="/sampleScreenshot.png" width="100">

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

- Request with JSON object in body containing the name of the new shoe, it's model number, and an array of strings containing quantities available for each color/size combination of that shoe.

```
Endpoint: `/shoes`

Request Body:
{ "name": string,
  "model": number,
  "colors": [{"shoe_id": number, "color_id": number}],
  "sizes": [{"shoe_id": number, "size_id": number}],
  "qantities": [{"shoe_id": number, "color_id": number, "quantities": string}]
}

Request Body example:
{ "name": "test shoe",
  "model": 10,
  "quantities": [{"shoe_id": 10, "color_id": 1, "quantities": "7:1 8:1 9:2 10:1 11:9 12:0 13:4 14:8 15:1 16:0 17:2 18:0 19:6"}, {"shoe_id": 10, "color_id": 7, "quantities": "7:1 8:1 9:2 10:1 11:9 12:0 13:4 14:8 15:1 16:0 17:2 18:0 19:6"}, {"shoe_id": 10, "color_id": 9, "quantities": "7:1 8:1 9:2 10:1 11:9 12:0 13:4 14:8 15:1 16:0 17:2 18:0 19:6"}, {"shoe_id": 10, "color_id": 14,  "quantities": "7:1 8:1 9:2 10:1 11:9 12:0 13:4 14:8 15:1 16:0 17:2 18:0 19:6"}]
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
Colors:
[{
    "id": number,
    "name": string,
    "shoe_color": string,
    "sole_color": string,
    "shoe_hex": string,
    "sole_hex": string,
    "limited": boolean
}]
Example response:
[
    {
        "id": 1,
        "name": "Blue Whale",
        "shoe_color": "Dodger Blue",
        "sole_color": "Light Cyan",
        "shoe_hex": "#1E90FF",
        "sole_hex": "#E0FFFF",
        "limited": false
    },
    {
        "id": 7,
        "name": "Red Waters",
        "shoe_color": "Crimson",
        "sole_color": "Aqua",
        "shoe_hex": "#DC143C",
        "sole_hex": "#00FFFF",
        "limited": false
    },
    {
        "id": 9,
        "name": "Cement",
        "shoe_color": "Light Gray",
        "sole_color": "Dark Gray",
        "shoe_hex": "#D3D3D3",
        "sole_hex": "#A9A9A9",
        "limited": false
    },
    {
        "id": 14,
        "name": "Azure Canyon",
        "shoe_color": "Dark Cyan",
        "sole_color": "Pale Goldenrod",
        "shoe_hex": "#008B8B",
        "sole_hex": "#EEE8AA",
        "limited": true
    }
]

Sizes:
[{
    "id": number,
    "size": number
}]
Example Response:
[
    {
        "id": 7,
        "size": 8
    },
    {
        "id": 8,
        "size": 8.5
    },
    {
        "id": 9,
        "size": 9
    },
    {
        "id": 10,
        "size": 9.5
    },
    {
        "id": 11,
        "size": 10
    },
    {
        "id": 12,
        "size": 10.5
    },
    {
        "id": 13,
        "size": 11
    },
    {
        "id": 14,
        "size": 11.5
    },
    {
        "id": 15,
        "size": 12
    },
    {
        "id": 16,
        "size": 12.5
    },
    {
        "id": 17,
        "size": 13
    },
    {
        "id": 18,
        "size": 13.5
    }
]

Quantities:
[{
  "size_id": number,
  "quantity": number
}]
Example Response:
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
{ "color_id": number "quantities": string }

Request Body example:
{ "color_id": 7, "quantities": "7:1 8:1 9:2 10:1 11:9 12:0 13:4 14:8 15:1 16:0 17:2 18:0 19:6" }
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