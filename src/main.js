async function getPlanet(id) {
  const resp = await fetch(`https://swapi.info/api/planets/${id}`);

  if (!resp.ok) {
    console.error(`Request failed: ${resp.status}`);
    return;
  }

  const data = await resp.json();
  console.info(data);
}

getPlanet(999); //
const select = document.querySelector("#sw-select");

select.addEventListener("change", async (event) => {
  const category = event.target.value;
  if (!category) return; // guard clause — user picked the placeholder

  const resp = await fetch(`https://swapi.info/api/${category}/`);

  if (!resp.ok) {
    console.error(`Failed: ${resp.status}`);
    return;
  }

  const data = await resp.json();

  const html = data
    .map((item) => `<li>${item.name ? item.name : item.title}</li>`)
    .join("");

  output.innerHTML = `<ul>${html}</ul>`;
});
const output = document.querySelector("#output");

select.addEventListener("change", async (event) => {
  const category = event.target.value;
  if (!category) return;

  // Loading state
  output.textContent = `Loading ${category}...`;

  const resp = await fetch(`https://swapi.info/api/${category}/`);

  if (!resp.ok) {
    output.textContent = `Something went wrong. Status: ${resp.status}`;
    return;
  }

  const data = await resp.json();
  console.info(data);
  output.textContent = `Loaded ${data.length} results.`;
});
