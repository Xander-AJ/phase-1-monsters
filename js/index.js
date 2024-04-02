document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const createMonsterForm = document.getElementById("create-monster");
    const backBtn = document.getElementById("back");
    const forwardBtn = document.getElementById("forward");
    let currentPage = 1;
  
    // Function to fetch and display monsters
    const fetchMonsters = async () => {
      try {
        const response = await fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`);
        const monsters = await response.json();
  
        monsters.forEach(monster => {
          const monsterDiv = document.createElement("div");
          monsterDiv.innerHTML = `
            <h3>${monster.name}</h3>
            <p>Age: ${monster.age}</p>
            <p>Description: ${monster.description}</p>
          `;
          monsterContainer.appendChild(monsterDiv);
        });
      } catch (error) {
        console.error("Error fetching monsters:", error);
      }
    };
  
    // Function to create a new monster
    const createMonster = async (name, age, description) => {
      try {
        const response = await fetch("http://localhost:3000/monsters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({ name, age, description })
        });
        const newMonster = await response.json();
        console.log("New monster created:", newMonster);
      } catch (error) {
        console.error("Error creating monster:", error);
      }
    };
  
    // Event listener for form submission
    createMonsterForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = event.target.name.value;
      const age = event.target.age.value;
      const description = event.target.description.value;
      createMonster(name, age, description);
    });
  
    // Event listener for 'Load More' button
    forwardBtn.addEventListener("click", () => {
      currentPage++;
      monsterContainer.innerHTML = ""; // Clear existing monsters
      fetchMonsters();
    });
  
    // Initial fetch and display of monsters
    fetchMonsters();
  });
  