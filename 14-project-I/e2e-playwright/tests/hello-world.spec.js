const { test, expect } = require("@playwright/test");

test("Server responds with a page with the title 'Programming assignments'", async ({ page }) => {
  await page.goto("/");
  expect(await page.title()).toBe("Programming assignments");
});

test("Page has heading 'Assignment'", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Assignment" })).toHaveCount(1);
});

test("Page has a text area for writing own submissions", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("textbox")).toHaveCount(1);  // Playwright treats textarea as textbox in role API
});

test("Incorrect submission fails the grading and grader returns feedback", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("textbox")).toHaveCount(1);  // Playwright treats textarea as textbox in role API

  // Type incorrect code in the submission text area
  await page.fill('textarea', 'def hello(): return "wrong answer"');

  // Click the 'Send Submission' button
  await page.click('button:has-text("Send Submission")');

  expect(await page.textContent('p.text-sm.font-medium:has-text("Correct:")')).toBe("Correct: No")

});

test("Correct submission passes the grading and grader returns feedback", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("textbox")).toHaveCount(1);  // Playwright treats textarea as textbox in role API

  // Type incorrect code in the submission text area
  await page.fill('textarea', 'def hello(): return "Hello"');

  // Click the 'Send Submission' button
  await page.click('button:has-text("Send Submission")');

  expect(await page.textContent('p.text-sm.font-medium:has-text("Correct:")')).toBe("Correct: Yes")

});

test("Correct submission passes the grading and grader returns feedback and user is shown next assignment", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("textbox")).toHaveCount(1);  // Playwright treats textarea as textbox in role API

  // Type incorrect code in the submission text area
  await page.fill('textarea', 'def hello(): return "Hello"');

  // Click the 'Send Submission' button
  await page.click('button:has-text("Send Submission")');

  expect(await page.textContent('p.text-sm.font-medium:has-text("Correct:")')).toBe("Correct: Yes")

  await expect(page.getByText('Hello world', { exact: true })).toHaveCount(1)
});

test("Correct submissions increases users points", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("textbox")).toHaveCount(1);  // Playwright treats textarea as textbox in role API

  //get points
  const initialPoints = await page.locator('.bg-blue-500 p').textContent();
  expect(initialPoints).toBe("Points: 0")

  // Type incorrect code in the submission text area
  await page.fill('textarea', 'def hello(): return "Hello"');

  // Click the 'Send Submission' button
  await page.click('button:has-text("Send Submission")');
  
  expect(await page.textContent('p.text-sm.font-medium:has-text("Correct:")')).toBe("Correct: Yes")

  //get points
  const endPoints = await page.locator('.bg-blue-500 p').textContent();
  expect(endPoints).toBe("Points: 100")
});