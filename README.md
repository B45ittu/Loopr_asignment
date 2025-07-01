# 💸Finance Dashboard

A modern full-stack finance dashboard for managing and visualizing transactions with advanced filtering, CRUD operations, and beautiful UI.

---

## 🚀 Tech Stack

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcryptjs with strength validation
- **Development:** ts-node-dev for hot reloading

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Library:** Material UI (MUI)
- **Charts:** Chart.js with react-chartjs-2
- **Styling:** CSS Modules with glassmorphism effects
- **Routing:** React Router DOM

---

## 📂 Project Structure

```
Looper_assignment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                 # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.ts      # Authentication logic
│   │   │   └── transactionController.ts # Transaction CRUD operations
│   │   ├── middleware/
│   │   │   ├── auth.ts               # JWT authentication middleware
│   │   │   └── passwordValidation.ts # Password strength validation
│   │   ├── models/
│   │   │   ├── User.ts               # User schema
│   │   │   └── Transaction.ts        # Transaction schema
│   │   ├── routes/
│   │   │   ├── authRoutes.ts         # Authentication routes
│   │   │   └── transactionRoutes.ts  # Transaction routes
│   │   ├── seed/
│   │   │   ├── importTransactions.ts # Transaction seeding
│   │   │   └── sampleData.ts         # Sample data
│   │   └── index.ts                  # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   ├── FilterBar.tsx     # Filtering and export
│   │   │   │   ├── OverviewChart.tsx # Chart visualization
│   │   │   │   ├── RecentTransactions.tsx # Recent transactions widget
│   │   │   │   ├── SummaryCards.tsx  # Financial summary cards
│   │   │   │   └── TransactionsTable.tsx # Main transactions table
│   │   │   ├── LoginForm.tsx         # Login form
│   │   │   ├── SignUpForm.tsx        # Registration form
│   │   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   │   ├── TopBar.tsx            # Top navigation bar
│   │   │   └── TransactionForm.tsx   # CRUD transaction form
│   │   ├── pages/
│   │   │   ├── HomePage.tsx          # Main dashboard
│   │   │   ├── LoginPage.tsx         # Login page
│   │   │   └── SignUpPage.tsx        # Registration page
│   │   ├── css/                      # CSS modules
│   │   ├── App.tsx                   # Main app component
│   │   └── main.tsx                  # App entry point
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── transactions.json                  # Sample transaction data
└── README.md
```

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the `backend/` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/looper_assignment
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=3000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The backend will be running on [http://localhost:3000]

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will be running on [http://localhost:5173]

---

## 🔐 Authentication & Security

### Password Validation
- **Minimum Requirements:**
  - 8+ characters
  - At least one uppercase letter (A-Z)
  - At least one lowercase letter (a-z)
  - At least one number (0-9)
  - At least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)

- **Strength Scoring:**
  - Score 0-1: Very Weak/Weak
  - Score 2: Fair
  - Score 3: Good
  - Score 4: Strong
  - Score 5: Very Strong

### JWT Authentication
- Secure token-based authentication
- Automatic token refresh
- Protected routes with middleware
- Secure logout functionality

---

## 💳 Transaction Management

### CRUD Operations
- **Create:** Add new transactions with validation
- **Read:** View all transactions with filtering and pagination
- **Update:** Edit existing transactions
- **Delete:** Remove transactions with confirmation



### Transaction Statuses
- Pending
- paid

---

## 📊 Dashboard Features

### Summary Cards
- **Balance:** Total financial position
- **Revenue:** Total income
- **Expenses:** Total expenditures
- **Savings:** Net savings amount

### Data Visualization
- **Overview Chart:** Monthly income vs expenses line chart
- **Recent Transactions:** Latest 3 transactions widget
- **Interactive Charts:** Hover effects and tooltips

### Advanced Filtering
- **User Filter:** Filter by specific users
- **Category Filter:** Filter by transaction categories
- **Status Filter:** Filter by transaction status
- **Search:** Real-time search across user names and categories
- **Combined Filters:** Multiple filters work together

### Export Functionality
- **CSV Export:** Download filtered transactions as CSV
- **Formatted Data:** Proper headers and data formatting

---

## 🎨 UI/UX Design

### Theme & Colors
- **Primary Background:** `#111217` (Dark)
- **Secondary Background:** `#181a20` (Card backgrounds)
- **Accent Color:** `#9c27b0` (Purple)
- **Text:** White and light grays
- **Success:** `#4caf50` (Green)
- **Warning:** `#ff9800` (Orange)
- **Error:** `#ff6b6b` (Red)

### Design Elements
- **Glassmorphism:** Translucent glass effects
- **Smooth Animations:** Hover effects and transitions
- **Responsive Design:** Works on all screen sizes
- **Modern Icons:** Material UI icon set
- **Professional Typography:** Clear hierarchy and readability

### Components
- **Sidebar:** Navigation with icons
- **TopBar:** Search, notifications, and user profile
- **Modal Forms:** Glassmorphism transaction forms
- **Data Tables:** Sortable and paginated
- **Charts:** Interactive data visualization

---

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/register    # Register new user
POST /api/auth/login       # Login user
```

### Transactions
```
GET    /api/transactions                    # Get all transactions
GET    /api/transactions/filter             # Filter transactions
GET    /api/transactions/:id                # Get transaction by ID
POST   /api/transactions                    # Create new transaction
PUT    /api/transactions/:id                # Update transaction
DELETE /api/transactions/:id                # Delete transaction
```

### Filter Parameters
```

?status=Paid               # Filter by status
?Category=Paid               # Filter by Category

```

---

## 📋 Data Models

### User Schema
```typescript
{
  id: string;
  name: string;
  email: string;
  password: string; // Hashed with bcrypt
  createdAt: Date;
}
```

### Transaction Schema
```typescript
{
  id: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
  user_profile?: string;
}
```

---

## 🚀 Performance Features

### Backend
- **Database Indexing:** Optimized queries
- **Pagination:** Efficient data loading
- **Caching:** JWT token caching
- **Error Handling:** Comprehensive error management

### Frontend
- **Lazy Loading:** Components load on demand
- **Virtual Scrolling:** Efficient large data rendering
- **Debounced Search:** Optimized search performance
- **Memoization:** React.memo for performance

---

## 🧪 Testing

### Manual Testing
1. **Authentication:**
   - Register with weak password (should fail)
   - Register with strong password (should succeed)
   - Login with valid credentials
   - Access protected routes

2. **Transactions:**
   - Create new transaction
   - Edit existing transaction
   - Delete transaction
   - Filter transactions
   - Export to CSV

3. **UI/UX:**
   - Responsive design on different screen sizes
   - Hover effects and animations
   - Form validation and error messages

---

## 🐛 Troubleshooting

### Common Issues

**Frontend Build Issues:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**CORS Issues:**
- Ensure backend allows frontend origin
- Check browser console for CORS errors

**Authentication Issues:**
- Verify JWT_SECRET in .env file
- Check token expiration
- Clear browser localStorage

---

**Happy Coding! 🚀**
