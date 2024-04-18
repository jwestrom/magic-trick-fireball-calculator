function AddButtonEventListener() {
    document.getElementById("calculate_fireball").addEventListener("click", function() {
        CalculateFireball();
    })

    document.getElementById("roll_fireball").addEventListener("click", function() {
        RollFireballs();
    })
}

function AddChangeEventListener() {
    let inputs = document.getElementsByTagName("input");
    for(let input of inputs) {
        input.addEventListener("change", function() {
            CalculateFireball();
        })
    }
}

function CalculateFireball() {
    let cl = document.getElementById("caster_level").value;
    let extra_damage = document.getElementById("damage_per_dice").value;
    let widen = document.getElementById("widen_spell").checked;
    let empower = document.getElementById("empower_spell").checked;
    let maximize = document.getElementById("maximize_spell").checked;

    let fireballs = Math.floor(cl/2);
    let fireball_damage_dice = 2;

    if (widen) {
        fireball_damage_dice = fireball_damage_dice * 2;
    }

    if (empower) {
        extra_damage = Math.floor(extra_damage * 1.5);
        fireball_damage_dice = Math.floor(fireball_damage_dice * 1.5);
    }

    document.getElementById("total_fireballs").textContent = fireballs;
    document.getElementById("damage_per_fireball").textContent = `${fireball_damage_dice}d6 + ${extra_damage}`;
    document.getElementById("total_damage").textContent = `${fireball_damage_dice * fireballs}d6 + ${extra_damage * fireballs}`

    let min_damage = fireballs * fireball_damage_dice + fireballs * extra_damage
    let avg_damage = Math.floor(fireballs * fireball_damage_dice * 3.5 + fireballs * extra_damage)
    let max_damage = fireballs * fireball_damage_dice * 6 + fireballs * extra_damage

    if (maximize) {
        document.getElementById("minimum_damage").textContent = max_damage;
        document.getElementById("average_damage").textContent = max_damage;
        document.getElementById("maximum_damage").textContent = max_damage;
    } else {
        document.getElementById("minimum_damage").textContent = min_damage;
        document.getElementById("average_damage").textContent = avg_damage;
        document.getElementById("maximum_damage").textContent = max_damage;
    }
}

function RollFireballs() {
    let damage_input = document.getElementById("total_damage").textContent;
    let dice = parseInt(damage_input.split("d")[0]);
    let bonus_damage = parseInt(damage_input.split("+ ")[1]);

    let rolls = [];

    if(document.getElementById("maximize_spell").checked) {
        for(let i = 0; i < dice; i++) {
            rolls.push(6)
        }
    } else {
        for(let i = 0; i < dice; i++) {
            rolls.push(RollD6())
        }
    }

    

    document.getElementById("rolls").textContent = rolls.join(", ");

    let total_rolled_damage = rolls.reduce((partialSum, a) => partialSum + a, 0);

    document.getElementById("total_rolled_damage").textContent = total_rolled_damage + bonus_damage
}

function RollD6(){
    return Math.floor(Math.random() * 6) + 1;
}