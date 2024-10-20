const CUSTOMERS_ENDPOINT = 'http://localhost:8000/customers';

export function convertCurrency(price) {
  const convertedPrice = new Intl.NumberFormat('ke', {
    style: 'currency',
    currency: 'KES',
  }).format(+price);

  return convertedPrice;
}

//curently not in use
export function createUniqueId() {
  const id = Date.now();
  return id;
}

export async function getData() {
  const response = await fetch(`${CUSTOMERS_ENDPOINT}`);

  const data = await response.json();

  console.log(data);

  return data;
}
