//@ts-nocheck
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export async function fetchData(url) {
  try {
    // 1. Fetch the resource
    const response = await fetch(url);

    // 2. Check for HTTP errors (e.g., 404, 500)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 3. Parse the JSON response
    const data = await response.json();

    // 4. Return the parsed data
    return data;
  } catch (error) {
    // 5. Handle any errors during the fetch or parsing process
    console.error("Error fetching data:", error);
    // You might want to re-throw the error or return a specific error object
    throw error;
  }
}

export const toCurrency = (value: number) => formatter.format(value)
export const asoneModName = window.asoneModName;
export const asoneId = window.asoneId;
export const asoneIdx = window.asoneIdx;
export const asonePath = window.asonePath;
export const asoneArea = window.asoneArea;
export const asoneLoc = window.asoneLoc;
export const asoneData = window.asoneData;
