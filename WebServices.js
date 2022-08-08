async function getCategoryList() {
    // Default options are marked with *
    const response = await fetch("http://the-trivia-api.com/api/categories", {
      method: 'GET',
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function getQuizData(url = "") {
    const baseURL = "https://the-trivia-api.com/api/questions?"
    const response = await fetch(baseURL+url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //  body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
 export { getCategoryList }
 export { getQuizData }
  