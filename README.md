# 📚 Educase India Assignment – School API

This is a simple Node.js + MySQL API that allows you to:

- ✅ Add school details with geolocation
- 📍 Retrieve a list of all schools sorted by proximity to a user's location

---
  
## 🚀 API Endpoints

### 1. `POST /api/v1/addSchool`

Adds a new school to the database.

**Request Body (JSON):**

```json
{
  "name": "Sunrise High School",
  "address": "123 Main Street",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

### 2. `GET /api/v1/listSchools?latitude=<lat>&longitude=<lon>`

Fetches a list of schools sorted by their distance from the provided location.

Query Parameters:

latitude – User's latitude

longitude – User's longitude

**Query Parameters (JSON):**

```json
 GET /api/v1/listSchools?latitude=28.6139&longitude=77.2090
```

## 📌Important Links

### Api Endpoint Link: [`Click here`](https://educase-assignment-school-endpoint-production.up.railway.app)

### Postman Workspace Link: [`Click here`](https://web.postman.co/workspace/8406390f-ec6c-493b-96b0-21bec5310edf)

