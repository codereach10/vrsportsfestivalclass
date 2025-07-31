async function makeAjaxRequest(method, url, data) {
  try {
    const response = await $.ajax({ type: method, url, data });

    return JSON.parse(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
