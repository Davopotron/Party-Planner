const COHORT = "2408-DEMO";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events/`;

// === State ===

let parties = [];


/** Updates state with parties from the API */
const getParties = async () => {
  try {
    const response = await fetch(API_URL);
    const parsed = await response.json();
    parties = parsed.data;
  } catch (e) {
    console.error(e);
  }
};