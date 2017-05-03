<template>

<div id="app">
    <section class="row">
        <div class="small-6 columns">
            <h1 class="text-center">YOU</h1>
            <div class="healthbar">
                <div
                    class="healthbar text-center"
                    style="background-color: green; margin: 0; color: white;"
                    :style="{width: playerHealth + '%'}">
                    {{ playerHealth }}
                </div>
            </div>
        </div>
        <div class="small-6 columns">
            <h1 class="text-center">MONSTER</h1>
            <div class="healthbar">
                <div
                    class="healthbar text-center"
                    style="background-color: green; margin: 0; color: white;"
                    :style="{width: monsterHealth + '%'}">
                    {{ monsterHealth }}
                </div>
            </div>
        </div>
    </section>
    <section class="row controls" v-if="!gameStart">
        <div class="small-12 columns">
            <button id="start-game" @click="startGame">START NEW GAME</button>
        </div>
    </section>
    <section class="row controls" v-else>
        <div class="small-12 columns">
            <button id="attack" @click="attack">ATTACK</button>
            <div class="special-attack-power">

            <div
                class="special-attack-power power-bar"
                style="margin: 0; color: black;"
                :style="{width: specialAttackPoints + '%'}"
                id="special-attack"
                @click="specialAttack">
                SPECIAL ATTACK
            </div>
        </div>
            <button id="heal" @click="heal">HEAL</button>
            <button id="give-up" @click="giveUp">GIVE UP</button>
        </div>
    </section>
    <section class="row log">
        <div class="small-12 columns">
            <ul>
                <li v-for="(activity, i) in activityLog" v-bind:class="[i%2===0 ? 'player-turn' : 'monster-turn']">
                    {{ activity }}
                </li>
            </ul>
        </div>
    </section>
</div>


</template>

<script>
export default {
    data: function(){
        return {
            gameStart: false,
            playerHealth: 100,
            monsterHealth: 100,
            activityLog: [],
            specialAttackPoints: 100
        }
    },
    methods: {
        startGame: function(){
            this.gameStart = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.activityLog = [];
            this.specialAttackPoints = 100;
            window.setInterval(this.specialAttackPowerUp, 1000)
        },

        monsterTurn: function(){
            var damage = this.calculateDamage(5, 12)
            this.playerHealth -= damage;
            this.activityLog.unshift("Monster attacked with " + damage + " damage!");
            this.checkGameStatus();
        },

        attack: function(){
            var damage = this.calculateDamage(3, 10)
            this.monsterHealth -= damage;
            this.activityLog.unshift("Player attacked with " + damage + " damage!");
            this.checkGameStatus()
            if(this.gameStart){
                this.monsterTurn()
            }
        },

        specialAttack: function(){
            if(this.specialAttackPoints === 100){
                var damage = this.calculateDamage(10, 30)
                this.monsterHealth -= damage;
                this.activityLog.unshift("Player special attacked with " + damage + " damage!");
                this.specialAttackPoints = 0;
                this.monsterTurn()
            }
        },

        heal: function(){
            var health = this.calculateDamage(6, 15)
            if(this.playerHealth + health > 100) {
                this.playerHealth = 100
            }else {
                this.playerHealth += health;
            }
            this.activityLog.unshift("Player gained " + health + " health!");
            this.monsterTurn()
        },

        giveUp: function(){
            this.gameStart = false;
        },

        checkGameStatus: function(){
            if(this.playerHealth <= 0) {
                alert("Monster beat yo ass!!!")
                this.gameStart = false;
            }else if(this.monsterHealth <= 0) {
                alert("Good job Player, You kicked the Monsters ass!!!")
                this.gameStart = false;
            }else{
                // game is still on, keep going.
                return;
            }
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        specialAttackPowerUp: function(){
            if(this.specialAttackPoints < 100){
                this.specialAttackPoints += 20;
            }
        },
    },
    computed: {
        playersTurn: function(i){
            return (i % 2 === 0) ? true : false;
        }
    }

}
</script>

<style>
.text-center {
    text-align: center;
}

.healthbar {
    width: 80%;
    height: 40px;
    background-color: #eee;
    margin: auto;
    transition: width 500ms;
}

.special-attack-power {
    width: 20%;
    height: 40px;
    background-color: #eee;
    margin: auto;
    border-radius: 3px;
    -moz-box-shadow: 0, 0, 5px, -1px #000000;
    -webkit-box-shadow: 0, 0, 5px, -1px, #000000;
    box-shadow: 0, 0, 5px, -1px, #000000;
    transition: width 500ms;
}

#special-attack {
    background-color: #ffaf4f;
}
#special-attack:hover {
    background-color: #e67e00;
}

.controls, .log {
    margin-top: 30px;
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0px 3px 6px #ccc;
}

.turn {
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 22px;
}

.log ul {
    list-style: none;
    font-weight: bold;
    text-transform: uppercase;
}

.log ul li {
    margin: 5px;
}

.log ul .player-turn {
    color: blue;
    background-color: #e4e8ff;
}

.log ul .monster-turn {
    color: red;
    background-color: #ffc0c1;
}

button {
    font-size: 20px;
    background-color: #eee;
    padding: 12px;
    box-shadow: 0 1px 1px black;
    margin: 10px;
}

#start-game {
    background-color: #aaffb0;
}

#start-game:hover {
    background-color: #76ff7e;
}

#attack {
    background-color: #ff7367;
}

#attack:hover {
    background-color: #ff3f43;
}

/*#special-attack {
    background-color: #ffaf4f;
}*/

#special-attack:hover {
    background-color: #ff9a2b;
}

#heal {
    background-color: #aaffb0;
}

#heal:hover {
    background-color: #76ff7e;
}

#give-up {
    background-color: #ffffff;
}

#give-up:hover {
    background-color: #c7c7c7;
}
</style>
