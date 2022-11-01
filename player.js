var player = 0;
// player function
function Player() {
    /**
    localStorage.setItem("hp", 100);
    localStorage.setItem("maxHp", 100);
    localStorage.setItem("exp", 0);
    localStorage.setItem("lvl", 1);
    localStorage.setItem("mana", 100);
    localStorage.setItem("maxMana", 100);
    localStorage.setItem("manaRegen", 0.01);
    localStorage.setItem("atkE", "boltOrb 1");
    localStorage.setItem("strength", 100);
    localStorage.setItem("spd", 1);
    localStorage.setItem("maxStamina", 100);
    localStorage.setItem("staminaRegen", 0.02);
    localStorage.setItem("hpRegen", 0.02);
    localStorage.setItem("upgrades", 0);
    localStorage.setItem("upgradeOn", 0);
    localStorage.setItem("reload", 100);
    localStorage.setItem("inventory", "Iron Sword,none,none,none");
    localStorage.setItem("enchant", "none");
    localStorage.setItem("wepon", "Iron Sword")
    localStorage.setItem("weponCollision", "30,45,60,75")
    localStorage.setItem("weponDamage", 3);
    localStorage.setItem("armor", "none")
    gems = 0;
    **/
    this.x = parseInt(localStorage.getItem("x")) || 200;
    this.y = parseInt(localStorage.getItem("y")) || 0;
    this.armor = localStorage.getItem("armor") || "none";
    this.armorPoint = localStorage.getItem("armorPoint") || 0;
    this.spd = parseInt(localStorage.getItem("spd")) || 1;
    this.maxStamina = parseInt(localStorage.getItem("maxStamina")) || 100;
    this.staminaRegen = parseInt(localStorage.getItem("staminaRegen")) || 0.04;
    this.enchant = localStorage.getItem("enchant") || "none";
    this.enchant = this.enchant.split(",")
    if(this.enchant[0] === "fire") {
        this.enchant[1] = parseInt(this.enchant[1])
        this.enchant[2] = parseInt(this.enchant[2])
    }
    this.stamina = parseInt(localStorage.getItem("stamina")) || 100;
    this.size = 20;
    this.atkCool = 0;
    this.atacking = false;
    this.reload = localStorage.getItem("reload") || 100;
    this.r = 0;
    this.reach = 60;
    this.atkSize = 50;
    this.atkE = localStorage.getItem("atkE") || "boltOrb 1";
    this.aX = 0;
    this.aY = 0;
    

    this.hp = parseInt(localStorage.getItem("hp")) || 100;
    this.maxHp = parseInt(localStorage.getItem("maxHp")) || 100;
    this.mana = parseInt(localStorage.getItem("mana")) || 100;
    this.maxMana = parseInt(localStorage.getItem("maxMana")) || 100;
    this.manaRegen = parseInt(localStorage.getItem("manaRegen")) || 0.01;
    this.lvl = parseInt(localStorage.getItem("lvl")) || 1;
    this.exp = parseInt(localStorage.getItem("exp")) || 0;
    this.strength = parseInt(localStorage.getItem("strength")) || 100;
    this.hpRegen = parseInt(localStorage.getItem("hpRegen")) || 0.02;
    this.weponDamage = parseInt(localStorage.getItem("weponDamage")) || 3;
    this.wepon = localStorage.getItem("wepon") || "Iron Sword"
    this.weponCollision = localStorage.getItem("weponCollision") || "30,45,60,75";
    this.weponCollision = this.weponCollision.split(",");
    this.inventory = localStorage.getItem("inventory") || "Iron Sword,none,none,none"
    this.inventory = this.inventory.split(",")
    this.inventory[0] = this.inventory[0].replace("[", "");
    this.upgradeOn = parseInt(localStorage.getItem("upgradeOn")) || 1;
    this.upgrades = parseInt(localStorage.getItem("upgrades")) || 1;
    this.selectedInventory = 0;
    for(var i = 0; i < this.weponCollision.length; i+=1) {
        this.weponCollision[i] = parseInt(this.weponCollision[i]);
    }
    this.attacking = false;
    this.weponSpd = 0;
    this.chooseUpgrade = false;
    this.dashCool = 100;
};
player = new Player();
Player.prototype.draw = function() {
    this.attacking = false;
    //if(dragged && this.stamina > 0.1) {
        this.attacking = true;
        //this.stamina-=0.1;
    //}
    if(keys[16] && this.dashCool <= 0 && this.stamina >= 50) {
        this.stamina-=50;
        player.aX = cos(player.r) * 30;
        player.aY = sin(player.r) * 30;
        this.dashCool = 100;
    }
    this.dashCool-=1;
    this.x+=this.aX;
    this.y+=this.aY;
    this.aX*=0.95;
    this.aY*=0.95;
    this.weponSpd = Math.abs(this.r - (atan2((this.y - cam.y) - mouseY, (this.x - cam.x) - mouseX) + Math.PI));
    this.r = atan2((this.y - cam.y) - mouseY, (this.x - cam.x) - mouseX) + Math.PI;
    fill(255, 200, 155);
    ellipse(this.x - cam.x, this.y - cam.y, 20, 20, 0);
    if(this.armor == "iron armor") {
        stroke(100, 100, 100);
        strokeWeight(10)
        eEllipse(this.x - cam.x, this.y - cam.y, 16, 16, 0);
    } else if(this.armor == "diamond armor") {
        stroke(0, 0, 150);
        strokeWeight(12)
        eEllipse(this.x - cam.x, this.y - cam.y, 18, 18, 0);
        
    }
    fill(255, 0, 0);
    rect(this.x - cam.x - this.size, this.y - cam.y + this.size + 5, this.size * 2, 5);
    fill(0, 255, 0);
    rect(this.x - cam.x - this.size, this.y - cam.y + this.size + 5, (this.hp/this.maxHp) * (this.size * 2), 5)
    button(15, canvas.height - 150, 55, 55, [100, 100, 100], function() {
        if(bandagesT1 > 0) {
            player.hp+=player.maxHp/10;
            bandagesT1-=1;
            player.hp = constrain(player.hp, -1, player.maxHp)
            itemCoolDown = 100;
        }
    }, [bandagesT1 + " [B]", 20])
    button(100, canvas.height - 150, 55, 55, [100, 100, 100], function() {
        if(manaPotionT1 > 0) {
            player.mana+=player.maxMana/10;
            manaPotionT1-=1;
            player.mana = constrain(player.mana, -1, player.maxMana)
            itemCoolDown = 100;
        }
    }, [manaPotionT1 + " [M]", 20])
    fill(100, 100, 100);
    rect(15, canvas.height - 30, 200, 25)
    rect(15, canvas.height - 60, 200, 25);
    rect(15, canvas.height - 90, 200, 25);
    fill(0, 0, 200);
    rect(15, canvas.height - 30, (this.mana/this.maxMana) * 200, 25);
    fill(200, 150, 30);
    rect(15, canvas.height - 60, (this.stamina/this.maxStamina) * 200, 25);
    fill(250, 200, 40);
    rect(15, canvas.height - 90, (this.exp/(((this.lvl * this.lvl)/(this.lvl * 0.9)) * 15)) * 200, 25);
    if(this.selectedInventory === 0) {
        if(this.wepon === "Iron Sword") {
            strokeWeight(7);
            if(this.attacking) {
                stroke(101, 67, 33);
            } else {
                stroke(101, 67, 33, 0.5);
            }
            line(player.x + cos(player.r) * 45 - cam.x, player.y + sin(player.r) * 45 - cam.y, player.x + cos(player.r) * 30 - cam.x, player.y + sin(player.r) * 30 - cam.y);
            strokeWeight(10)
            if(this.attacking) {
                stroke(100, 100, 100);
            } else {
                stroke(100, 100, 100, 0.5);
            }
            line(player.x + cos(player.r) * 45 - cam.x, player.y + sin(player.r) * 45 - cam.y, player.x + cos(player.r) * 85 - cam.x, player.y + sin(player.r) * 85 - cam.y)
        } else if(this.wepon === "Long Sword") {
            strokeWeight(7);
            if(this.attacking) {
                stroke(101, 67, 33);
            } else {
                stroke(101, 67, 33, 0.5);
            }
            line(player.x + cos(player.r) * 45 - cam.x, player.y + sin(player.r) * 45 - cam.y, player.x + cos(player.r) * 30 - cam.x, player.y + sin(player.r) * 30 - cam.y);
            strokeWeight(10);
            if(this.attacking) {
                stroke(100, 100, 100);
            } else {
                stroke(100, 100, 100, 0.5);
            }
            line(player.x + cos(player.r)  * 45 - cam.x, player.y + sin(player.r) * 45 - cam.y, player.x + cos(player.r) * 125 - cam.x, player.y + sin(player.r) * 125 - cam.y)
        } else if(this.wepon === "Dragon Slayer") {
            strokeWeight(10);
            if(this.attacking) {
                stroke(88, 53.6, 26.4);
            } else {
                stroke(101, 67, 33, 0.5);
            }
            line(player.x + cos(player.r) * 60 - cam.x, player.y + sin(player.r) * 60 - cam.y, player.x + cos(player.r) * 30 - cam.x, player.y + sin(player.r) * 30 - cam.y);
            if(this.attacking) {
                stroke(10, 10, 10);
            } else {
                stroke(10, 10, 10, 0.5);
            }
            strokeWeight(20);
            line(player.x + cos(player.r) * 60 - cam.x, player.y + sin(player.r) * 60 - cam.y, player.x + cos(player.r) * 180 - cam.x, player.y + sin(player.r) * 180 - cam.y)
        }
    } else if(this.selectedInventory === 1) {
        if(this.inventory[this.selectedInventory] === "Ring of Slimes Lv. 1") {
            stroke(0, 0, 200);
            strokeWeight(3);
            eEllipse(player.x + cos(player.r) * 30 - cam.x, player.y + sin(player.r) * 30 - cam.y, 5, 5, 0);
            if(clicked && this.mana >= 1500) {
                this.mana-=1500;
                for(var i = 0; i < 2; i+=1) {
                    npcs.push(new npc(player.x + random(-100, 100), player.y + random(-100, 100), "Slime Lv. 1", "ally"));
                }
            }
        } else if(this.inventory[this.selectedInventory] === "Ring of Slimes Lv. 2") {
            stroke(0, 0, 200);
            strokeWeight(3);
            eEllipse(player.x + cos(player.r) * 32.5 - cam.x, player.y + sin(player.r) * 32.5 - cam.y, 7.5, 7.5, 0);
            if(clicked && this.mana >= 2500) {
                this.mana-=2500;
                for(var i = 0; i < 3; i+=1) {
                    npcs.push(new npc(player.x + random(-100, 100), player.y + random(-100, 100), "Slime Lv. 2", "ally"));
                }
            }
        } else if(this.inventory[this.selectedInventory] === "Ring of Slimes Lv. 3") {
            stroke(0, 0, 250);
            strokeWeight(4);
            eEllipse(player.x + cos(player.r) * 32.5 - cam.x, player.y + sin(player.r) * 32.5 - cam.y, 7.5, 7.5, 0);
            if(clicked && this.mana >= 4000) {
                this.mana-=4000;
                for(var i = 0; i < 3; i+=1) {
                    npcs.push(new npc(player.x + random(-100, 100), player.y + random(-100, 100), "Slime Lv. 2", "ally"));
                }
                for(var i = 0; i < 2; i+=1) {
                    npcs.push(new npc(player.x + random(-100, 100), player.y + random(-100, 100), "Slime Lv. 1", "ally"));
                }
                npcs.push(new npc(player.x + random(-100, 100), player.y + random(-100, 100), "KingSlime Lv. 1", "ally"));
            }
        }
    }
    fill(0, 0, 0, 0.5);
    for(var i = 0; i < 4; i+=1) {
        if(this.selectedInventory !== i) {
            fill(0, 0, 0, 0.2);
        } else {
            fill(0, 0, 0, 0.4);
        }
        if(keys[49 + i]) {
            this.selectedInventory = i;
        }
        rect(canvas.width - 210, canvas.height - 60 - i * 60, 200, 50);
        textAlign("left")
        fill(255, 255, 255)
        text(this.inventory[i], canvas.width - 200, canvas.height - 25 - i * 60, 20)
    }
    if(this.exp > (this.lvl * this.lvl)/(this.lvl * 0.9) * 15) {
        this.exp = 0;
        this.lvl+=1;
        this.maxHp = parseInt(this.maxHp);
        this.maxHp+=(this.lvl * this.lvl) * 0.2;
        this.hpRegen += this.lvl/400;
        this.maxMana+=(this.lvl * this.lvl) * 0.2;
        this.mana = this.maxMana;
        this.manaRegen += this.lvl/500;
        this.maxStamina+=(this.lvl * this.lvl)/10;
        this.stamina = this.maxStamina;
        this.staminaRegen += this.lvl/1000;
        this.strength+=this.lvl/2/50;
        this.hp = parseInt(this.maxHp);
        this.upgrades+=1;
    }
    if(keys[87]) {
        this.y-=this.spd;
    } else if(keys[83]) {
        this.y+=this.spd;
    }
    if(keys[65]) {
        this.x-=this.spd;
    } else if(keys[68]) {
        this.x+=this.spd;
    }
    if(this.mana < this.maxMana) {
        this.mana+=this.manaRegen;
    }
    if(this.hp < this.maxHp) {
        this.hp+=this.hpRegen;
    }
    if(this.stamina < this.maxStamina) {
        this.stamina+=this.staminaRegen;
    }
    if(keys[69]) {
        if(this.atkCool <= 0 && this.mana >= projectileStats[this.atkE].cost) {
            this.mana-= projectileStats[this.atkE].cost;
            this.atkCool = this.reload;
            this.atacking = true;
            projectiles.push(new projectile(player.x, player.y, player.r + random(-0.1, 0.1), this.atkE))
        }
    }
    this.atkCool-=1;
    this.hp = constrain(this.hp, -1, this.maxHp)

};
