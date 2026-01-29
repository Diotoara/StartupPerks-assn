# 🚀 Startup Deals Platform  
API Documentation & System Architecture

This document explains the **technical flow**, **architecture**, and **API structure** of the Startup Deals Platform.

---

## 🌍 End-to-End Application Flow

### 1️⃣ Discovery
Users browse the **Deals Page**.  
The frontend fetches all available deals from:

GET /api/deals

---

### 2️⃣ Filtering
Users can filter deals by:

- Category  
- Search keyword  

Filtering is:
- ⚡ **Client-side** for fast UI response  
- 🗄 **Server-side supported** using query parameters (`req.query`)

---

### 3️⃣ Authentication
Users sign up or log in to receive a **JWT token**.

- Token is stored in **localStorage**
- A custom **Axios instance** automatically attaches the token to requests

---

### 4️⃣ Claiming a Deal
When a verified user clicks **"Claim"**, the frontend sends:

POST /api/deals/claim

---

### 5️⃣ Tracking Claims
Users can visit **"My Claims"** to see deals they have requested:

GET /api/deals/my-claims

The backend uses **.populate()** to return deal details.

---

## 🔑 Authentication & Authorization Strategy

The application uses **JWT (JSON Web Tokens)** for stateless authentication.

### Token Handling
- **Storage:** localStorage  
- **Transmission:** Axios Request Interceptor adds  
  `Authorization: Bearer <token>` header  
- **Protection:** `authCheck` middleware verifies JWT and attaches `req.user`

### Access Levels

| Type        | Routes | Description |
|------------|-------|-------------|
| Public | `GET /api/deals`, `GET /api/deals/:id` | Anyone can browse deals |
| Private | `POST /api/deals/claim`, `GET /api/deals/my-claims` | Requires login |
| Conditional | Locked deals | Requires `user.isVerified = true` |

---

## 🛠 Internal Flow: Claiming a Deal

1. **Validation**  
   System checks if `dealId` exists.

2. **Verification Check**  
   If `deal.isLocked === true`, the user must be verified.

3. **Duplication Prevention**  
   Database checks if a claim already exists for that user & deal.

4. **Creation**  
   A new Claim document is created with status: "pending"
   
---

## 📡 Frontend–Backend Interaction

- A pre-configured **Axios instance** handles baseURL & headers  
- Backend responses are wrapped:

```json
{ "AllDeals": [] }
{ "userClaims": [] }
# 🚀 Startup Deals Platform  
API Documentation & System Architecture

This document explains the **technical flow**, **architecture**, and **API structure** of the Startup Deals Platform.

---

## 🌍 End-to-End Application Flow

### 1️⃣ Discovery
Users browse the **Deals Page**.  
The frontend fetches all available deals from:

GET /api/deals

---

### 2️⃣ Filtering
Users can filter deals by:

- Category  
- Search keyword  

Filtering is:
- ⚡ Client-side for fast UI response  
- 🗄 Server-side supported using query parameters (`req.query`)

---

### 3️⃣ Authentication
Users sign up or log in to receive a **JWT token**.

- Token is stored in **localStorage**
- A custom **Axios instance** automatically attaches the token to requests

---

### 4️⃣ Claiming a Deal
When a verified user clicks **"Claim"**, the frontend sends:

POST /api/deals/claim

---

### 5️⃣ Tracking Claims
Users can visit **"My Claims"** to see deals they have requested:

GET /api/deals/my-claims

The backend uses **.populate()** to return deal details.

---

## 🔑 Authentication & Authorization Strategy

The application uses **JWT (JSON Web Tokens)** for stateless authentication.

### Token Handling
- Storage: localStorage  
- Transmission: Axios Request Interceptor adds  
  `Authorization: Bearer <token>` header  
- Protection: `authCheck` middleware verifies JWT and attaches `req.user`

### Access Levels

| Type | Routes | Description |
|------|-------|-------------|
| Public | GET /api/deals, GET /api/deals/:id | Anyone can browse deals |
| Private | POST /api/deals/claim, GET /api/deals/my-claims | Requires login |
| Conditional | Locked deals | Requires `user.isVerified = true` |

---

## 🛠 Internal Flow: Claiming a Deal

1. Validation  
   System checks if `dealId` exists.

2. Verification Check  
   If `deal.isLocked === true`, the user must be verified.

3. Duplication Prevention  
   Database checks if a claim already exists for that user & deal.

4. Creation  
   A new Claim document is created with status: `"pending"`

---

## 📡 Frontend–Backend Interaction

- A pre-configured Axios instance handles baseURL & headers  
- Backend responses are wrapped:

{ "AllDeals": [] }  
{ "userClaims": [] }

- React uses:
  - useState
  - useEffect

Loading skeletons are shown while data loads.

---

## ⚠️ Known Limitations & Weak Points

- Hardcoded categories in frontend dropdown  
- No refresh token system  
- No auto logout on token expiry (401)  
- MongoDB `_id` used in URLs instead of slugs  

---

## 🏗 Production Readiness Improvements

| Area | Improvement |
|------|-------------|
| Environment Variables | Secure JWT_SECRET, MONGO_URI |
| Input Validation | Use Zod or Joi |
| Error Handling | Global Express error middleware |
| Security | Add rate limiting to /claim |

---

## 🎨 UI & Performance Considerations

- Optimistic UI for instant claim feedback  
- Skeleton screens to avoid layout shift  
- Pagination using limit & skip  
- Memoization using React.memo or useMemo  

---

## 🛣 API Route Map

| Method | Endpoint | Access | Description |
|-------|----------|--------|-------------|
| GET | /api/deals | Public | Get all deals (supports ?category & ?isLocked) |
| GET | /api/deals/my-claims | Private | Get logged-in user's claims |
| GET | /api/deals/:id | Public | Get single deal details |
| POST | /api/deals/claim | Private | Create a new claim |
| GET | /api/deals/health | Public | API health check |

---

✅ This architecture ensures scalability, security, and smooth frontend–backend communication.
