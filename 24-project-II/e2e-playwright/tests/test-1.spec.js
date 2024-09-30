const { test, expect } = require("@playwright/test");

test("Server responds with a page with the title 'Questions and answers'", async ({ page }) => {
  await page.goto("/");
  expect(await page.title()).toBe("Questions and answers");
});

test("Page has heading 'Available Courses'", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Available Courses" })).toHaveCount(1);
});

test("Page has a text area for writing questions", async ({ page }) => {
  await page.goto("/course/1");
  await expect(page.getByRole("textbox")).toHaveCount(1);  // Playwright treats textarea as textbox in role API
});

test("Submitting a new question updates the questions list", async ({ page }) => {
  await page.goto("/course/1");
  
  // Input a new question
  const newQuestion = "What are the prerequisites for this course?";
  await page.fill('textarea[placeholder="Type your question here..."]', newQuestion);
  await page.click('button:has-text("Submit Question")');
  await page.waitForSelector(`text=${newQuestion}`);
});

test("Upvoting a question increments the upvote count", async ({ page }) => {
  await page.goto("/course/1");

  // Assume the first question has a default upvote count of 0
  const firstQuestion = await page.locator('li').first();
  const upvoteButton = firstQuestion.locator('button:has-text("Upvote")');
  const upvoteCount = await firstQuestion.locator('p:has-text("Upvotes:")').innerText();

  // Click the upvote button
  await upvoteButton.click();
  
  // Wait for the upvote count to update
  const updatedCount = await firstQuestion.locator('p:has-text("Upvotes:")').innerText();
  expect(Number(updatedCount.split(": ")[1])).toBe(Number(upvoteCount.split(": ")[1]) + 1);
});
