import { When } from "@cucumber/cucumber";

When("I refresh the page", async function () {
  await this.page.reload();
});
