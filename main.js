var app = new Vue({
    el: '#app',
    data: {
        gameStart: false,
        playerHealth: 100,
        monsterHealth: 100,
        activityLog: [],
        specialAttackPoints: 100
    },
    methods: {
        startGame: function(){
            this.gameStart = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.activityLog = [];
            specialAttackPoints = 100;

            window.setInterval(function(){
                app.specialAttackPowerUp();
            }, 1000)
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

})
