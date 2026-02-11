import { setDefaultTimeout, setWorldConstructor } from "@cucumber/cucumber";
import { Browser, Page } from "playwright";

setDefaultTimeout(60 * 1000);

export class CustomWorld {
  browser!: Browser;
  page!: Page;
}

setWorldConstructor(CustomWorld);
