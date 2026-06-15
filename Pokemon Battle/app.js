let p1;
let p2;

async function getPokemon(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return await response.json();
}

async function loadPokemon() {

    const pokemon1 =
        document.getElementById("pokemon1")
        .value
        .toLowerCase();

    const pokemon2 =
        document.getElementById("pokemon2")
        .value
        .toLowerCase();

    p1 = await getPokemon(pokemon1);
    p2 = await getPokemon(pokemon2);

    document.getElementById("battleArea").innerHTML = `
    
        <div style="display:flex;justify-content:space-between;align-items:center;">

            <div>
                <h2>${p1.name}</h2>

                <img
                    src="${p1.sprites.back_default}"
                    width="150"
                >

                <p>
                    Move:
                    ${p1.moves[0].move.name}
                </p>
            </div>

            <h1>VS</h1>

            <div>
                <h2>${p2.name}</h2>

                <img
                    src="${p2.sprites.front_default}"
                    width="150"
                >

                <p>
                    Move:
                    ${p2.moves[0].move.name}
                </p>
            </div>

        </div>
    `;
}

async function getMovePower(moveName) {
    const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
    const move = await response.json();
    return move.power || 20;
}

async function startBattle() {
    const move1 = p1.moves[0].move.name;
    const move2 = p2.moves[0].move.name;

    const power1 = await getMovePower(move1);
    const power2 = await getMovePower(move2);

    let hp1 = 100;
    let hp2 = 100;

    let log = "";

    hp2 -= power1;

    log += `${p1.name} used ${move1}<br>`;
    log += `${p2.name} lost ${power1} HP<br><br>`;

    if (hp2 <= 0) {
        log += `${p1.name} Wins!`;
        document.getElementById("battleLog").innerHTML = log;
        return;
    }

    hp1 -= power2;

    log += `${p2.name} used ${move2}<br>`;
    log += `${p1.name} lost ${power2} HP<br><br>`;

    if (power1 > power2) {
        log += `${p1.name} Wins!`;
    } else {
        log += `${p2.name} Wins!`;
    }

    document.getElementById("battleLog").innerHTML = log;
}
