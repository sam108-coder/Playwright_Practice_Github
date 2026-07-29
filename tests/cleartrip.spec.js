import { test, expect } from '@playwright/test';

test('search flights and select a flight', async ({ page }) => {
  // This live travel site can take longer than Playwright's default 30 seconds.
  test.setTimeout(60_000);
  await page.goto('https://www.cleartrip.com/');
  const closeIcon = page.getByTestId('closeIcon');
  await expect(closeIcon).toBeVisible();
  await closeIcon.click();

  const fromInput = page.getByRole('textbox', { name: 'Where from?' });
  await expect(fromInput).toBeVisible();
  await fromInput.click();
  const delhiOption = page.getByText('DELNew Delhi, IN - Indira');
  await expect(delhiOption).toBeVisible();
  await delhiOption.click();

  const toInput = page.getByRole('textbox', { name: 'Where to?' });
  await expect(toInput).toBeVisible();
  await toInput.click();
  const kolkataOption = page.getByText('Kolkata, IN - Netaji Subhas');
  await expect(kolkataOption).toBeVisible();
  await kolkataOption.click();

  // Cleartrip renders dates as grid cells. The next calendar month contains
  // valid future dates, so this selector remains valid on later test runs.
  const departureDate = page.getByTestId('dateSelectOnward');
  await expect(departureDate).toBeVisible();
  await departureDate.click();
  const futureDate = page.getByRole('grid').nth(1).getByRole('gridcell').first();
  await expect(futureDate).toBeVisible();
  await futureDate.click();

  const searchFlights = page.getByRole('button', { name: 'Search Flights' });
  await expect(searchFlights).toBeVisible();
  await searchFlights.click();

  // Flight numbers, fares and promotions are dynamic; book the first result.
  const bookButton = page.getByRole('button', { name: 'Book' }).first();
  await expect(bookButton).toBeVisible();
  await bookButton.scrollIntoViewIfNeeded();
  await bookButton.click();
  await page.waitForTimeout(5000);
});
