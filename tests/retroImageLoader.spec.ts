import { test, expect } from "@playwright/test";

test.describe("RetroImageLoader Tests", () => {
  // We'll visit the page that renders RetroImageLoader before each test
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/retro-test");
  });

  test("displays 'Loading...' text initially", async ({ page }) => {
    // Check that "Loading..." text is visible on mount
    const loadingLocator = page.getByText("Loading...");
    await expect(loadingLocator).toBeVisible();
  });

  test("eventually hides 'Loading...' text when fully loaded", async ({
    page,
  }) => {
    const loadingLocator = page.getByText("Loading...");

    // Wait up to ~15 seconds (or however long you think is safe),
    // given the random stutter can be up to 600ms per line for 30 lines.
    // 30 lines * (max ~600ms each) = ~18s worst case.
    await expect(loadingLocator).toBeHidden({ timeout: 20000 });
  });

  test("image is visible once rendered", async ({ page }) => {
    // Next.js <Image> generally ends up generating an <img> element with
    // some src. We can check for alt text "Retro loading simulation".
    const imageLocator = page.getByRole("img", {
      name: "Retro loading simulation",
    });
    await expect(imageLocator).toBeVisible();
  });

  test("clip-path changes over time (optional deeper check)", async ({
    page,
  }) => {
    const imageContainer = page.getByTestId("retro-image-container");

    // Initial clip-path
    const initialClip = await imageContainer.evaluate(
      (elem) => getComputedStyle(elem.querySelector("img")!).clipPath
    );
    console.log("Initial clipPath is:", initialClip);

    // Wait longer so at least one line has time to load and animate
    await page.waitForTimeout(2000);

    // Check clip-path again
    const updatedClip = await imageContainer.evaluate(
      (elem) => getComputedStyle(elem.querySelector("img")!).clipPath
    );
    console.log("Updated clipPath after 2000ms is:", updatedClip);

    // Expect it to differ now
    expect(updatedClip).not.toEqual(initialClip);
  });
});
