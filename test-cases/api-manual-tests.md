# API Manual Test Suite - InvenTree Parts Module

This document lists manual API test cases for the InvenTree Parts module, targeting the REST API endpoints `/api/part/` and `/api/part/category/`.

---

## Suite Summary
- **Total Test Cases**: 15
- **Endpoints Covered**:
  - `/api/part/` (GET, POST, PUT, PATCH, DELETE)
  - `/api/part/category/` (GET, POST, PUT, PATCH, DELETE)
- **Authorization**: Basic auth, Session token, or Token header (`Token <key>`)

---

## 1. Part Category API CRUD Operations

### TC-API-001: Create Part Category (POST /api/part/category/)
- **Goal**: Verify successful category creation with required fields.
- **Request Method**: `POST`
- **Path**: `/api/part/category/`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Token <token>`
- **Request Body**:
  ```json
  {
    "name": "Microcontrollers",
    "description": "ICs that integrate processing, memory and peripherals",
    "parent": null
  }
  ```
- **Expected Result**:
  - Status Code: `201 Created`
  - Response Body contains generated ID (e.g. `"pk": 12`), `name`, and default fields.

### TC-API-002: Read Part Category List & Detail (GET)
- **Goal**: Verify retrieving single category detail and full listing.
- **Request Method**: `GET`
- **Paths**:
  - List: `/api/part/category/`
  - Detail: `/api/part/category/12/`
- **Headers**: `Authorization: Token <token>`
- **Expected Result**:
  - Status Code: `200 OK`
  - List returns array of category objects. Detail returns the specific category object with `"pk": 12` and `"name": "Microcontrollers"`.

### TC-API-003: Update Part Category (PUT & PATCH)
- **Goal**: Verify updating category description and partial name edit.
- **Request Method**: `PATCH`
- **Path**: `/api/part/category/12/`
- **Request Body**:
  ```json
  {
    "name": "MCU & Processors"
  }
  ```
- **Expected Result**:
  - Status Code: `200 OK`
  - Response displays updated name `"MCU & Processors"` with description unchanged.

### TC-API-004: Delete Part Category (DELETE)
- **Goal**: Verify deleting an empty category.
- **Request Method**: `DELETE`
- **Path**: `/api/part/category/12/`
- **Expected Result**:
  - Status Code: `204 No Content`

---

## 2. Part API CRUD Operations

### TC-API-005: Create Part (POST /api/part/)
- **Goal**: Verify creation of a part linked to a category.
- **Request Method**: `POST`
- **Path**: `/api/part/`
- **Request Body**:
  ```json
  {
    "name": "STM32F103C8T6",
    "IPN": "IC-MCU-STM32-001",
    "description": "32-bit ARM Cortex-M3 MCU",
    "category": 12,
    "active": true
  }
  ```
- **Expected Result**:
  - Status Code: `201 Created`
  - Response contains `"pk": 105`, `"IPN": "IC-MCU-STM32-001"`, and defaults like `"locked": false`, `"assembly": false`.

### TC-API-006: Read Part List & Detail (GET)
- **Goal**: Verify reading single part details.
- **Request Method**: `GET`
- **Path**: `/api/part/105/`
- **Expected Result**:
  - Status Code: `200 OK`
  - Body contains all details of part 105.

### TC-API-007: Update Part Attributes (PATCH /api/part/{id}/)
- **Goal**: Verify partial update of assembly and salable flags.
- **Request Method**: `PATCH`
- **Path**: `/api/part/105/`
- **Request Body**:
  ```json
  {
    "assembly": true,
    "salable": false
  }
  ```
- **Expected Result**:
  - Status Code: `200 OK`
  - Response reflects updated boolean flags.

### TC-API-008: Delete Part (DELETE /api/part/{id}/)
- **Goal**: Verify deleting a part.
- **Request Method**: `DELETE`
- **Path**: `/api/part/105/`
- **Expected Result**:
  - Status Code: `204 No Content`

---

## 3. Filtering, Pagination, and Search

### TC-API-009: Filtering & Search (GET /api/part/)
- **Goal**: Verify filtering parts by category, active state, and search query.
- **Request Method**: `GET`
- **Path**: `/api/part/`
- **Query Parameters**:
  - `category`: `12`
  - `active`: `true`
  - `search`: `STM32`
- **Expected Result**:
  - Status Code: `200 OK`
  - Response contains array of parts belonging to category 12, active, and matching search "STM32".

### TC-API-010: Pagination (GET /api/part/)
- **Goal**: Verify offset/limit pagination parameters.
- **Request Method**: `GET`
- **Path**: `/api/part/`
- **Query Parameters**:
  - `limit`: `5`
  - `offset`: `0`
- **Expected Result**:
  - Status Code: `200 OK`
  - Response body contains keys `"count"`, `"next"`, `"previous"`, and `"results"` containing exactly 5 items.

---

## 4. Field-level Validation Constraints (Negative)

### TC-API-011: Field Validation - Required Fields Missing (Negative)
- **Goal**: Verify 400 Bad Request when "name" is missing.
- **Request Method**: `POST`
- **Path**: `/api/part/`
- **Request Body**:
  ```json
  {
    "IPN": "IC-MCU-STM32-002",
    "category": 12
  }
  ```
- **Expected Result**:
  - Status Code: `400 Bad Request`
  - Response: `{"name": ["This field is required."]}`

### TC-API-012: Field Validation - Max Length Exceeded (Negative)
- **Goal**: Verify 400 when name exceeds 100 characters.
- **Request Method**: `POST`
- **Path**: `/api/part/`
- **Request Body**:
  ```json
  {
    "name": "STM32F103C8T6 STM32F103C8T6 STM32F103C8T6 STM32F103C8T6 STM32F103C8T6 STM32F103C8T6 STM32F103C8T6 STM32F103C8T6",
    "category": 12
  }
  ```
- **Expected Result**:
  - Status Code: `400 Bad Request`
  - Response: `{"name": ["Ensure this field has at most 100 characters."]}`

---

## 5. Relational Integrity & Edge Cases (Negative)

### TC-API-013: Relational Integrity - Invalid Category ID (Negative)
- **Goal**: Verify error when linking a part to a non-existent category.
- **Request Method**: `POST`
- **Path**: `/api/part/`
- **Request Body**:
  ```json
  {
    "name": "Test Part",
    "category": 99999
  }
  ```
- **Expected Result**:
  - Status Code: `400 Bad Request`
  - Response: `{"category": ["Invalid pk \"99999\" - object does not exist."]}`

### TC-API-014: Relational Integrity - Incompatible Units on Supplier Part (Negative)
- **Goal**: Verify error when setting incompatible units for supplier parts via API.
- **Request Method**: `POST`
- **Path**: `/api/part/105/` (with base units "meters")
- **Expected Result**: Specifying a supplier part with "liters" via API returns `400 Bad Request` with message indicating units are incompatible.

### TC-API-015: Unauthorized Access (Negative)
- **Goal**: Verify that requests without auth token are rejected.
- **Request Method**: `GET`
- **Path**: `/api/part/`
- **Headers**: Omit Authorization header.
- **Expected Result**:
  - Status Code: `401 Unauthorized` or `403 Forbidden`
  - Response: `{"detail": "Authentication credentials were not provided."}`

---

## 6. Security & Corner Cases (API Non-Functional Test Cases)

### TC-API-016: SQL Injection (SQLi) Vulnerability Check (Security)
- **Goal**: Verify that input sanitization blocks SQL injection payloads in query parameters.
- **Request Method**: `GET`
- **Path**: `/api/part/`
- **Query Parameters**:
  - `search`: `admin' OR '1'='1`
- **Expected Result**:
  - Status Code: `200 OK`
  - Response: The query is treated as a literal search string. It returns 0 matching results (or only rows literally containing `admin' OR '1'='1`) and does not leak or delete database records.

### TC-API-017: Extreme Integer Overflow in Stock Quantity (Corner Case)
- **Goal**: Verify that sending an extremely large number for stock quantity is rejected gracefully.
- **Request Method**: `POST`
- **Path**: `/api/part/stocktake/`
- **Request Body**:
  ```json
  {
    "quantity": 999999999999999999999999999999,
    "part": 105
  }
  ```
- **Expected Result**:
  - Status Code: `400 Bad Request`
  - Response: Server returns a JSON validation error: `{"quantity": ["Ensure this value is less than or equal to ..."]}` or does not crash with a 500 Internal Server Error database overflow.

### TC-API-018: API Rate Limiting (Security)
- **Goal**: Verify the system limits excessive concurrent requests to prevent Denial of Service (DoS).
- **Request Method**: `GET`
- **Path**: `/api/part/`
- **Execution Steps**:
  1. Trigger 100 requests sequentially within a 1-second window.
- **Expected Result**:
  - Status Code: `429 Too Many Requests` for request #61 onwards (depending on configured rate limit profile).
  - Response: Contains a `Retry-After` header.

