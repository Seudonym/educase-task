# Educase India Backend task
Hosted at http://educase.wahidk.com/api/school
## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually comes with Docker Desktop)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Seudonym/educase-task
   cd educase-task
   ```
2. Create a `.env` file in the root directory of the project and add your environment variables:
   ```bash
   cp sample.env .env
   vi .env
   ```
4. Build and run the Docker container:
   ```
   docker compose up --build
   ```
   This command will build the Docker image and start the container. The `--build` flag ensures that the image is rebuilt if there are any changes.

5. The server should now be running and accessible at `http://localhost:3000`.

## Documentation
# School Management API Documentation

## Add School API

### Endpoint
`/addSchool`

### Method
POST

### Payload
The request body should be in JSON format and include the following fields:

| Field | Type | Description |
|-------|------|-------------|
| name | string | The name of the school |
| address | string | The full address of the school |
| latitude | number | The latitude coordinate of the school's location |
| longitude | number | The longitude coordinate of the school's location |

Example payload:
```json
{
  "name": "Springfield Elementary School",
  "address": "123 School St, Springfield, ST 12345",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

### Functionality
This endpoint validates the input data and adds a new school to the schools table in the database.

### Validation
The API performs the following validations:
- All fields (name, address, latitude, longitude) are required and must not be empty.
- `name` and `address` must be strings.
- `latitude` and `longitude` must be valid numbers within the correct range:
  - Latitude: -90 to 90
  - Longitude: -180 to 180

### Response
- **Success:** HTTP 200 (Created)
  ```json
  {
    "schoolId": 123
  }
  ```
- **Error:** HTTP 400 (Bad Request) if validation fails

## List Schools API

### Endpoint
`/listSchools`

### Method
GET

### Parameters
The following query parameters are required:

| Parameter | Type | Description |
|-----------|------|-------------|
| latitude | number | The latitude of the user's current location |
| longitude | number | The longitude of the user's current location |


### Functionality
This endpoint fetches all schools from the database, calculates their distance from the user's provided location, sorts them based on proximity, and returns the sorted list.

### Sorting Mechanism
The API uses the Haversine formula to calculate the geographical distance between the user's coordinates and each school's coordinates. The list is then sorted in ascending order of distance.

### Response
- **Success:** HTTP 200 (OK)
  ```json
  {
    "schools": [
      {
        "id": 1,
        "name": "Nearby School",
        "address": "456 Close St, Springfield, ST 12345",
        "latitude": 37.7750,
        "longitude": -122.4195,
        "distance": 0.1
      },
      {
        "id": 2,
        "name": "Farther School",
        "address": "789 Far Ave, Springfield, ST 12345",
        "latitude": 37.7760,
        "longitude": -122.4205,
        "distance": 1.5
      }
    ]
  }
  ```
  The `distance` field represents the distance in kilometers.

- **Error:** HTTP 400 (Bad Request) if parameters are missing or invalid
