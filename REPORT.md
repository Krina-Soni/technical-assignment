## BUG-01: Admin Navigation Link Visible to Anonymous Users

**Category:** UI Authorization / Information Disclosure  
**Severity:** Medium  
**Priority:** High  

---

### Description

The Admin navigation link is visible in the header for users who are not authenticated. The navigation component does not conditionally render based on authentication state or user role.

---

### Steps to Reproduce

1. Open browser.
2. Navigate to `http://localhost:3000/`
3. Do not log in.
4. Observe the header navigation bar.

---

### Expected Result

The Admin navigation link should only be visible to authenticated users with the `admin` role.

---

### Actual Result

The Admin link is visible to anonymous (unauthenticated) users.

---

### Screenshot

![Admin Navigation Visible](reports/screenshots/admin-visible.png)

---

### Impact

Although this issue alone does not grant administrative access, it exposes internal system structure and administrative functionality to unauthenticated users.

This may facilitate targeted attacks if backend protection is insufficient.

---

### Possible Root Cause

The navigation component does not validate authentication state or user role before rendering the Admin link.

---

## BUG-02: Admin Dashboard Accessible Without Authentication

**Category:** Authorization / Security  
**Severity:** Critical  
**Priority:** High  

---

### Description

The Admin Dashboard is accessible without authentication. Clicking the Admin link from the homepage, or directly navigating to `/admin`, loads administrative data without requiring login or validating user role.

This indicates missing server-side authorization enforcement.

---

### Steps to Reproduce

#### Method 1 – UI Navigation

1. Open browser.
2. Navigate to `http://localhost:3000/`
3. Do not log in.
4. Click on the Admin icon in the header.
5. Observe that the Admin Dashboard loads successfully.

#### Method 2 – Direct URL Access

1. Open a new incognito/private browsing window.
2. Navigate directly to `http://localhost:3000/admin`
3. Observe that the Admin Dashboard loads successfully.

---

### Expected Result

User should:

- Be redirected to the login page, OR  
- Receive a `403 Forbidden` response, OR  
- Be shown an access denied message.

Administrative data must not be accessible without authentication and proper role validation.

---

### Actual Result

Admin dashboard loads successfully showing:

- Total Products  
- Active Orders  
- Total Revenue  
- Inventory data  

No authentication or role validation is enforced.

---

### Screenshot

![Admin Dashboard Accessible](reports/screenshots/admin-accessible.png)

---

### Impact

Sensitive administrative data is publicly exposed, leading to a critical security vulnerability.

This demonstrates:

- Missing authentication guard  
- Missing role-based access control (RBAC)  
- Lack of backend authorization middleware enforcement  

Any user (including anonymous users) can access administrative functionality and data.

---

### Possible Root Cause

- Admin route is not protected by authentication middleware.
- Role validation is not enforced on the backend.
- UI and backend both lack proper authorization checks.

---

## BUG-03: No Visible Authentication State After Login

**Category:** Authentication / UX  
**Severity:** High  
**Priority:** Medium  

---

### Description

After successful login (either as admin or customer), the application does not display any visible indication of the authenticated state.

The login button disappears, but no profile information, username, role indicator, or logout option is shown.

Users cannot determine:

- Whether they are logged in  
- Which role they are logged in as  
- Whether authentication was successful  

---

### Steps to Reproduce

1. Navigate to `http://localhost:3000/login`
2. Login using:
   - Admin credentials, OR
   - Customer credentials
3. Observe the header/navigation area after login.

---

### Expected Result

After successful login, the application should:

- Display user information (e.g., username or role), OR  
- Show a logout option, OR  
- Clearly indicate authenticated state in the UI.

---

### Actual Result

- Login button disappears.
- No profile, username, or role indicator is shown.
- No visible confirmation of logged-in state.

---

### Screenshot

![Login State Not Visible](reports/screenshots/login-visibility.png)

---

### Impact

- Poor user experience.
- Confusing session state.
- Makes it difficult to verify authorization behavior.

---

### Possible Root Cause

- Missing UI binding to authentication state.
- Role not stored in global state/context.
- Header component not reacting to auth changes.

---

## BUG-04: Floating Point Precision Error in Product Price Display

**Category:** Business Logic / UI Formatting  
**Severity:** Medium  
**Priority:** Medium  

---

### Description

Product prices are displayed with excessive floating-point precision instead of proper currency formatting.

---

### Steps to Reproduce

1. Navigate to the Electronics page.
2. Observe product price displayed as:
   `$25.9900000000000002`

---

### Expected Result

Price should be formatted to two decimal places:
`$25.99`

---

### Actual Result

Floating-point precision error is visible in the UI.

---

### Screenshot

![Price Formatting Issue](reports/screenshots/invalid-formatting.png)

---

### Impact

- Reduces user trust.
- Appears unprofessional.
- Indicates improper currency formatting logic.

---

### Possible Root Cause

Price values are not formatted using proper rounding method (e.g., `.toFixed(2)` or currency formatter) before rendering.

---

## BUG-05: Debug Information Exposed in Product Detail Page

**Category:** Security / UX  
**Severity:** Medium  
**Priority:** Medium  

---

### Description

Debug information is visible to end users on the product detail page.

---

### Steps to Reproduce

1. Open any product detail page.
2. Scroll to product information section.
3. Observe the debug text:
   `"Debug info: Screen Width 1280px"`

---

### Expected Result

Debug or development-related information should not be visible in production UI.

---

### Actual Result

Debug information is displayed to users.

---

### Screenshot

![Debug Info Visible](reports/screenshots/debug-screen.png)

---

### Impact

- Reveals internal implementation details.
- Indicates improper environment configuration.

---

### Possible Root Cause

Debug flag not disabled for production build.

---

## BUG-06: Out-of-Stock Product Can Be Added to Cart

**Category:** Functionality / Business Logic  
**Severity:** High  
**Priority:** High  

---

### Description

Products marked as Out of Stock (Stock = 0) can still be added to the cart successfully.

The UI displays that the product cannot be purchased, but the Add to Cart button remains enabled.

---

### Steps to Reproduce

1. Navigate to product listing page.
2. Open a product where stock is 0.
3. Click Add to Cart.
4. Navigate to cart page.

---

### Expected Result

Product should not be added to the cart.

---

### Actual Result

Product is successfully added to the cart.

---

### Screenshot

![Out of Stock Added](reports/screenshots/out-of-stock.png)

---

### Impact

- Inventory validation failure.
- Risk of overselling.

---

### Possible Root Cause

Missing stock validation in frontend and/or backend.

---

## BUG-07: Cart Allows Quantity Exceeding Available Stock

**Category:** Business Logic / Inventory Validation  
**Severity:** Critical  
**Priority:** High  

---

### Description

Users can add more items to the cart than available stock.

---

### Steps to Reproduce

1. Open a product with stock 6.
2. Add the product more than 6 times.
3. Open cart page.

---

### Expected Result

System should restrict quantity to available stock.

---

### Actual Result

Cart quantity exceeds available inventory.

---

### Screenshot

![Exceeds Quantity](reports/screenshots/exceeds-quantity.png)

---

### Impact

- Inventory inconsistency.
- Potential financial risk.

---

### Possible Root Cause

Backend does not enforce stock limits during cart update.

---

## BUG-08: Cart Empties on Page Refresh

**Category:** Functionality / State Management  
**Severity:** High  
**Priority:** Medium  

---

### Description

Items added to the cart are removed when the page is refreshed.

---

### Steps to Reproduce

1. Add products to cart.
2. Open cart page.
3. Refresh the page.

---

### Expected Result

Cart items should persist after refresh.

---

### Actual Result

Cart becomes empty.

---

### Screenshot

![Cart Empties](reports/screenshots/page-refresh.png)

---

### Impact

- Poor user experience.
- Loss of user state.

---

### Possible Root Cause

Cart state stored only in memory without persistence.

---

## BUG-09: Product Image Loads Slowly and Causes Layout Shift

**Category:** UX / Responsiveness / Performance  
**Severity:** Medium  
**Priority:** Medium  

---

### Description

Product image does not load immediately and causes visible layout shift.

---

### Steps to Reproduce

1. Open any product detail page.
2. Observe image loading behavior.

---

### Expected Result

- Image container space should be reserved.
- No layout shift should occur.

---

### Actual Result

- Blank image area initially.
- Layout shifts when image loads.

---

### Screenshot

![Image Load Issue](reports/screenshots/no-product-load.png)

---

### Impact

- Poor user experience.
- Layout instability (CLS issue).

---

### Possible Root Cause

Image loading not optimized and placeholder not implemented.
