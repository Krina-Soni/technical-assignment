# QA E-Shop Automation Project

The project follows a layered testing strategy aligned with the Testing Pyramid, combining unit/integration validation with full end-to-end business flow coverage.



## Tech Stack

* **Testing Engines**: Jest (Unit/Integration) and Playwright (E2E).
* **BDD Framework**: Cucumber JS for human-readable, behavior-driven scenarios.
* **Design Pattern**: Page Object Model (POM) for modularity and reduced maintenance.
* **Language**: TypeScript for type-safety and robust development.

## Project Structure

* **`tests/e2e/features/`**: Gherkin files containing business requirements for Auth, Product, and Session.
* **`tests/e2e/pages/`**: Page Objects containing UI locators and interaction logic.
* **`tests/e2e/step-definitions/`**: Technical implementation connecting Gherkin steps to POM actions.
* **`tests/e2e/support/`**: Test lifecycle hooks and browser configuration.
* **`tests/e2e/utils/testData.ts`**: Centralized management for user credentials and test constants.

## Setup & Installation

### 1.  **Install Node.js dependencies**:
```bash
npm install
```

### 2. **Start the Application**:
Ensure the backend and frontend are running locally:

```bash
npm run dev
```
The suite expects the application to be accessible at `http://localhost:3000`.

## How to Run Tests

### 1. Unit & Integration Tests (Jest)
Validates isolated frontend components, API request logic, and database interactions.
```bash
npm run test
```
### 2. End-to-End Tests (Playwright + Cucumber)
Validates critical user journeys and regression scenarios across Chromium.

**Run all E2E tests:**

```bash
npm run test:e2e
```
### 3. Run specific features (requires cucumber.js in root):
### Authentication

npx cucumber-js tests/e2e/features/auth/authentication.feature

### Catalog & Search
npx cucumber-js tests/e2e/features/product/search.feature

### Checkout Journey
npx cucumber-js tests/e2e/features/product/checkout.feature

## Reporting
After running the tests, results are generated in the following formats:

* **Terminal**: Real-time execution logs providing immediate feedback for every step.
* **HTML Report**: Detailed visual execution summaries and status charts located in the `reports/` directory.

## Design Principles

- Separation of concerns using Page Object Model (POM)
- No hardcoded credentials stored in repository
- Reusable and modular step definitions
- Centralized test data management
- Scalable structure for CI/CD integration