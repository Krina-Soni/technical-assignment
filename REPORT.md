# Bug Report Summary

## Bug Index

| Bug ID  | Title                                      | Severity | Priority |
|---------|--------------------------------------------|----------|----------|
| BUG-01  | Admin Navigation Link Visible              | Medium   | High     |
| BUG-02  | Admin Dashboard Accessible Without Auth    | Critical | High     |
| BUG-03  | No Visible Authentication State After Login| High     | Medium   |
| BUG-04  | Floating Point Precision in Price Display  | Medium   | Medium   |
| BUG-05  | Debug Info Exposed in Product Detail Page  | Medium   | Medium   |
| BUG-06  | Out-of-Stock Product Can Be Added to Cart  | High     | High     |
| BUG-07  | Cart Allows Quantity Exceeding Stock       | Critical | High     |
| BUG-08  | Cart Empties on Page Refresh               | High     | Medium   |
| BUG-09  | Product Image Loads Slowly (Layout Shift)  | Medium   | Medium   |

---

## BUG-01: Admin Navigation Link Visible to Anonymous Users

**Category:** UI Authorization / Information Disclosure  
**Severity:** Medium  
**Priority:** High  

### Description
The Admin navigation link is visible in the header for users who are not authenticated. The navigation component does not conditionally render based on authentication state or user role.

### Steps to Reproduce
1. Open browser.  
2. Navigate to `http://localhost:3000/`  
3. Do not log in.  
4. Observe the header navigation bar.  

### Expected Result
The Admin navigation link should only be visible to authenticated users with the `admin` role.

### Actual Result
The Admin link is visible to anonymous (unauthenticated) users.

### Screenshot
![Admin Navigation Visible](reports/screenshots/admin-visible.png)

### Impact
Exposes internal system structure and administrative functionality to unauthenticated users, potentially aiding targeted attacks.

### Possible Root Cause
Navigation component does not validate authentication state or user role before rendering the Admin link.

### Recommended Fix
Add conditional rendering logic based on authentication state and role.

---

## BUG-02: Admin Dashboard Accessible Without Authentication

**Category:** Authorization / Security  
**Severity:** Critical  
**Priority:** High  

### Description
The Admin Dashboard is accessible without authentication. Clicking the Admin link or navigating directly to `/admin` loads administrative data without requiring login.

### Steps to Reproduce
- **Method 1 – UI Navigation**  
  1. Navigate to homepage without logging in.  
  2. Click Admin link.  
  3. Dashboard loads.  

- **Method 2 – Direct URL Access**  
  1. Open incognito window.  
  2. Navigate to `http://localhost:3000/admin`.  
  3. Dashboard loads.  

### Expected Result
User should be redirected to login or receive `403 Forbidden`.

### Actual Result
Admin dashboard loads with sensitive data.

### Screenshot
![Admin Dashboard Accessible](reports/screenshots/admin-accessible.png)

### Impact
Critical exposure of sensitive administrative data.

### Possible Root Cause
Admin route not protected by authentication middleware; role validation missing.

### Recommended Fix
Implement server-side authentication and RBAC middleware for all admin routes.

---

## BUG-03: No Visible Authentication State After Login

**Category:** Authentication / UX  
**Severity:** High  
**Priority:** Medium  

### Description
After login, the application does not display any visible indication of authenticated state (no profile info, role, or logout option).

### Steps to Reproduce
1. Login as admin or customer.  
2. Observe header/navigation area.  

### Expected Result
UI should display user info, role, or logout option.

### Actual Result
Login button disappears, but no indication of logged-in state.

### Screenshot
![Login State Not Visible](reports/screenshots/login-visibility.png)

### Impact
Poor UX and confusion about session state.

### Possible Root Cause
Missing UI binding to authentication state; role not stored in global state/context.

### Recommended Fix
Bind authentication state to header component and display user info + logout option.

---

## BUG-04: Floating Point Precision Error in Product Price Display

**Category:** Business Logic / UI Formatting  
**Severity:** Medium  
**Priority:** Medium  

### Description
Product prices are displayed with excessive floating-point precision.

### Steps to Reproduce
1. Navigate to Electronics page.  
2. Observe product price displayed as `$25.9900000000000002`.  

### Expected Result
Price should be formatted to two decimal places (`$25.99`).

### Actual Result
Floating-point precision error visible.

### Screenshot
![Price Formatting Issue](reports/screenshots/invalid-formatting.png)

### Impact
Reduces user trust and appears unprofessional.

### Possible Root Cause
Price values not formatted using proper rounding method.

### Recommended Fix
Use `.toFixed(2)` or Intl.NumberFormat for currency formatting.

---

## BUG-05: Debug Information Exposed in Product Detail Page

**Category:** Security / UX  
**Severity:** Medium  
**Priority:** Medium  

### Description
Debug information is visible to end users on product detail page.

### Steps to Reproduce
1. Open product detail page.  
2. Scroll to product info section.  
3. Observe debug text `"Debug info: Screen Width 1280px"`.  

### Expected Result
Debug info should not be visible in production.

### Actual Result
Debug info displayed to users.

### Screenshot
![Debug Info Visible](reports/screenshots/debug-screen.png)

### Impact
Reveals internal implementation details.

### Possible Root Cause
Debug flag not disabled for production build.

### Recommended Fix
Remove debug logs and disable debug flags in production.

---

## BUG-06: Out-of-Stock Product Can Be Added to Cart

**Category:** Functionality / Business Logic  
**Severity:** High  
**Priority:** High  

### Description
Out-of-stock products can still be added to cart.

### Steps to Reproduce
1. Navigate to product listing.  
2. Select product with stock = 0.  
3. Click Add to Cart.  

### Expected Result
Product should not be added.

### Actual Result
Product added successfully.

### Screenshot
![Out of Stock Added](reports/screenshots/out-of-stock.png)
![Out of Stock Added To Cart](reports/screenshots/out-of-stock-added-to-cart.png)
![Out of Stock Added in The Cart](reports/screenshots/out-of-stock-in-shopping-cart.png)

### Impact
Inventory validation failure; risk of overselling.

### Possible Root Cause
Missing stock validation in frontend/backend.

### Recommended Fix
Disable Add to Cart button for stock=0 and enforce backend validation.

---

## BUG-07: Cart Allows Quantity Exceeding Available Stock

**Category:** Business Logic / Inventory Validation  
**Severity:** Critical  
**Priority:** High  

### Description
Users can add more items than available stock.

### Steps to Reproduce
1. Open product with stock 6.  
2. Add more than 6 items.  
3. Observe cart.  

### Expected Result
Quantity restricted to available stock.

### Actual Result
Cart exceeds inventory.

### Screenshot
![Product In Stock](reports/screenshots/product-in-stock.png)
![Exceeds Quantity](reports/screenshots/exceeds-quantity.png)

### Impact
Inventory inconsistency; financial risk.

### Possible Root Cause
Backend does not enforce stock limits.

### Recommended Fix
Add backend validation to restrict cart quantity to stock.

---

## BUG-08: Cart Empties on Page Refresh

**Category:** Functionality / State Management  
**Severity:** High  
**Priority:** Medium  

### Description
Cart items are removed on page refresh.

### Steps to Reproduce
1. Add products to cart.  
2. Refresh page.  

### Expected Result
Cart items should persist.

### Actual Result
Cart becomes empty.

### Screenshot
![Cart With Produtcs](reports/screenshots/cart-with-products.png)
![Cart Empties](reports/screenshots/page-refresh.png)

### Impact
Poor UX; loss of user state.

### Possible Root Cause
Cart state stored only in memory.

### Recommended Fix
Persist cart state in localStorage or backend session.

---

## BUG-09: Product Image Loads Slowly and Causes Layout Shift

**Category:** UX / Performance  
**Severity:** Medium  
**Priority:** Medium  

### Description
Product image loads slowly and causes layout shift.

### Steps to Reproduce
1. Open product detail page.  
2. Observe image loading behavior.  

### Expected Result
Image container space reserved; no layout shift.

### Actual Result
Blank area initially; layout shifts when image loads.

### Screenshot
![Image Load Issue](reports/screenshots/no-product-load.png)
![Image Loads](reports/screenshots/product-loads.png)

### Impact
Poor UX; layout instability (CLS issue).

### Possible Root Cause
Image loading not optimized; placeholder missing.

### Recommended Fix
Use Next.js `<Image>` component with `placeholder="blur"` or reserve container space.

---
