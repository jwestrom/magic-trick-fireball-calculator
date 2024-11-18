function AddButtonEventListener() {
    document.getElementById("calculate_fireball").addEventListener("click", function() {
        CalculateFireball();
    })

    document.getElementById("roll_fireball").addEventListener("click", function() {
        RollFireballs();
    })
}

function AddInputChangeEventListener() {
    let inputs = Array.from(document.getElementsByTagName("input"));
    inputs.push(document.getElementById("fireball_size"))
    for(let input of inputs) {
        input.addEventListener("change", function() {
            CalculateFireball();
        })
    }
}

function ToggleSizeOptions() {
    document.getElementById("widen_spell").addEventListener("change", function() {
        let select = document.getElementById("fireball_size");
        let options = select.options;

        if(this.checked) {
            for(let i = 2; i < options.length; i++) {
                options[i].disabled = false
            }
            
        } else {
            for(let i = 2; i < options.length; i++) {
                options[i].disabled = true
            }
            select.value = 0;
        }
        CalculateFireball();
    })
}

function CalculateFireball() {
    let cl = document.getElementById("caster_level").value;
    let extra_damage = document.getElementById("damage_per_dice").value;
    let empower = document.getElementById("empower_spell").checked;
    let widen = document.getElementById("widen_spell").checked;
    let maximize = document.getElementById("maximize_spell").checked;
    let size_damage_decrease = document.getElementById("fireball_size").value;
    let fireball_base_damage = 3;

    if (widen) {
        fireball_base_damage = 5;
    }


    let fireballs = Math.floor(cl/2);
    let fireball_damage_dice = fireball_base_damage - size_damage_decrease;


    if (empower) {
        extra_damage = Math.floor(extra_damage * 1.5);
        fireball_damage_dice = Math.floor(fireball_damage_dice * 1.5);
    }

    let fireball_bonus_damage = fireball_damage_dice * extra_damage;

    document.getElementById("total_fireballs").textContent = fireballs;
    document.getElementById("damage_per_fireball").textContent = `${fireball_damage_dice}d6 + ${fireball_bonus_damage}`;
    document.getElementById("total_damage").textContent = `${fireball_damage_dice * fireballs}d6 + ${fireball_bonus_damage * fireballs}`

    let min_damage = fireballs * fireball_damage_dice + fireballs * fireball_bonus_damage
    let avg_damage = Math.floor(fireballs * fireball_damage_dice * 3.5 + fireballs * fireball_bonus_damage)
    let max_damage = fireballs * fireball_damage_dice * 6 + fireballs * fireball_bonus_damage

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