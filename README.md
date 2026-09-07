# 🛍️ NababMart - Premium E-Commerce Web Platform (Flipkart / Amazon Clone)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with HTML5, CSS3 & Bootstrap 5](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20Bootstrap%205%20%7C%20Vanilla%20JS-brightgreen)](https://github.com)
[![Developer: Nabab](https://img.shields.io/badge/Developer-Nabab-orange)](mailto:nabab9695ali@gmail.com)

A high-performance, fully-responsive, modern E-Commerce web application inspired by **Flipkart, Amazon, and Myntra**. Built completely from scratch using **Semantic HTML5, Custom Modern CSS3, Bootstrap 5.3, and Modular Vanilla JavaScript (ES6+)**.

Designed specifically as a flagship **Frontend Developer Portfolio Project** to present in technical interviews, demonstrating clean code architecture, responsive design principles, interactive state management, and real-world e-commerce UX workflows.

---

## 🚀 Live Features & Capabilities

### 1. 🔍 Smart Search & Real-Time Autocomplete
- Real-time debounced search input matching titles, brands, categories, and descriptions.
- Instant dropdown suggestions previewing product thumbnails, titles, and live prices.
- Supports keyboard navigation and enter-to-search.

### 2. 🎛️ Multi-Criteria Filter & Sort Engine
- **Category Filter**: All Products, Mobiles & Tablets, Electronics, Fashion, Watches, and Home & Kitchen.
- **Dynamic Price Range Slider**: Real-time filtering up to ₹1,50,000 with formatted Indian currency labels.
- **Brand Checkboxes**: Dynamically generated brand filters with product inventory counts (Apple, Samsung, Sony, Nike, Levis, Philips, Fossil, Casio, etc.).
- **Customer Ratings**: Filter by 4.5★, 4.0★, 3.5★ and above.
- **Discount Filter**: 10%, 30%, 50%+ discounts.
- **Sorting Options**: Popularity, Price (Low to High, High to Low), Customer Rating, and Highest Discount.
- **Active Filter Chips**: Removable filter tags with one-click "Clear All".

### 3. ⚡ Flash Sale & "Deal of the Day"
- Live real-time countdown timer (Hours : Minutes : Seconds) refreshing every 24 hours.
- One-click "View All Offers" applying instant festive discount filters.

### 4. 🛒 Interactive Shopping Cart & Drawer
- Slide-out Offcanvas cart with smooth transitions.
- Quantity controllers (`+` / `-`) with instant price recalculations.
- Item removal with automatic balance updates.
- **Coupon Code System**: Test promo codes like `NABAB50` (50% Off Developer Special) and `SAVE10`.
- Dynamic calculation of Subtotal, Savings, Free Delivery threshold (orders above ₹499), and Final Total.
- Full `localStorage` persistence — cart remains saved across page refreshes.

### 5. ❤️ Wishlist System
- Animated heart icon toggle on all product cards.
- Offcanvas Wishlist drawer with instant "Move to Cart" one-click action.
- Synced count badge in the header.

### 6. 👁️ Product Quick View Modal
- Detailed product preview with high-definition image gallery and clickable thumbnail switcher.
- Star ratings, customer review counts, discount breakdown.
- Detailed technical specifications table.
- "Add to Cart" and immediate "Buy Now" checkout trigger.

### 7. 💳 Multi-Step Checkout Simulation
- **Step 1 - Shipping Address**: Input validation for recipient name, phone, street address, city, and PIN code.
- **Step 2 - Payment Selection**: Realistic UI supporting UPI (Google Pay / PhonePe / Paytm), Credit/Debit Cards, and Cash on Delivery (COD).
- **Step 3 - Order Confirmation**: Animated success checkmark, unique generated Order ID (`ORD-XXXXXX`), estimated delivery date, summary breakdown, and printable invoice.

### 8. 🌓 Dark & Light Mode Theme Toggle
- Seamless switch between crisp Light Mode and Slate Dark Mode.
- Persisted user preference via `localStorage`.

### 9. 📍 Location & City Selector
- Pincode and quick city switcher (New Delhi, Mumbai, Bengaluru, Hyderabad, Kolkata) updating the delivery header.

### 10. 👤 User Authentication & Developer Profile
- Sign In & Create Account modal with interactive form validation.
- Dedicated "About Developer" modal showcasing Nabab's frontend skills, email, and GitHub repository.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure, accessibility (`aria-*`), SEO meta tags |
| **CSS3** | Custom CSS variables, glassmorphism, flexbox & grid, keyframe animations |
| **Bootstrap 5.3** | Responsive grid system, modals, offcanvas drawers, tooltips, toasts |
| **Vanilla JavaScript (ES6+)** | State management, dynamic DOM rendering, event delegation, LocalStorage |
| **Bootstrap Icons & FontAwesome 6** | E-commerce iconography & payment partner logos |
| **Google Fonts** | `Inter` (body copy) & `Outfit` (display headings & branding) |

---

## 📁 Project Architecture

```text
FlipCart/
├── index.html              # Core semantic layout & UI modals
├── css/
│   └── style.css           # Custom styling, color tokens, dark theme & animations
├── js/
│   ├── data.js             # 16+ realistic products catalog with specs, images & banners
│   └── app.js              # Application logic: Cart, Wishlist, Filter engine, Checkout, LocalStorage
└── README.md               # Project documentation & interview guide
```

---

## 💻 How to Run Locally

1. Clone or download the repository to your computer:
   ```bash
   git clone https://github.com/your-username/FlipCart.git
   ```
2. Navigate to the project directory:
   ```bash
   cd FlipCart
   ```
3. Open `index.html` directly in your favorite web browser (Chrome, Edge, Firefox):
   - You can double-click `index.html`, or
   - Use VS Code Live Server extension.

---

## 🎯 Key Talking Points for Technical Interviews

When presenting this project to interviewers:
1. **State Management without Frameworks**: Explain how `AppState` tracks cart items, wishlist, active filters, and themes with single-source-of-truth principles and persists data using `localStorage`.
2. **Filtering Architecture**: Discuss the multi-stage filter pipeline in `renderProducts()` that chains Category, Price, Brand arrays, Ratings, Discounts, and Search queries before executing user-selected sorting.
3. **Clean UX Patterns**: Highlight the use of micro-animations, Toast notifications for instant feedback, and responsive offcanvas drawers for mobile usability.
4. **Modularity & Scalability**: Point out the separation of concerns between `data.js` (data layer), `style.css` (presentation layer), and `app.js` (business logic).

---

## 👨‍💻 Developer Profile

- **Developer**: Nabab
- **Email**: [nabab9695ali@gmail.com](mailto:nabab9695ali@gmail.com)
- **Role**: Frontend Web Developer
- **Focus**: Responsive Web Design, JavaScript, React, UI/UX Engineering

*Feel free to star ⭐ this repository if you find it helpful!*
