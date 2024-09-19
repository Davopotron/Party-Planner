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

/** Sends a POST request to the API */
const addParty = async (party) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(party),
      });
      if (!response.ok) {
        const parsed = await response.json();
        throw new Error(parsed.error.message);
      }
    } catch (e) {
      console.error(e);
    }
  };


  // === Render ===

/** Renders the parties in state as a list */
const renderParties = () => {
    const $partyList = document.querySelector("ul.parties");
  
    if (!parties.length) {
      $partyList.innerHTML = `
        <li>No parties near you :(</li>
      `;
      return;
    }

    const $parties = parties.map((party) => {
        const $li = document.createElement("li");
        $li.innerHTML = `
          <h2>${party.name}</h2>
          <time datetime="${party.date}">${party.date.slice(0, 10)}</time>
          <address>${party.location}</address>
          <p>${party.description}</p>
          <button>Delete Party</button>
        `;
    
        const $button = $li.querySelector("button");
        $button.addEventListener("click", async () => {
          await deleteParty(party.id);
          await getParties();
          renderParties();
        });