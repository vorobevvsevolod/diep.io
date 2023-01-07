Player = {
    Score:0,
    LvL: 1,
    countScoreLvL: 1000,
    healtRegen: 0.25,
    maxHealth: 1000,
    bodyDamage: 0,
    bullet:{
        speed: 3,
        penetration: 100,
        damage: 30,
        reload: 40,
        size: 12,
        timeLife: 100,
        recoil: 15
    },
    movementSpeed: 2,

    updateLvL(count){
        this.Score += count;
        let flag = false;
        let countPlus = 0;
        if(this.Score >= this.countScoreLvL) {
            countPlus = this.Score - this.countScoreLvL;
            this.Score = this.countScoreLvL;
            flag = true;
        }
        
        animationProgressBar(this.Score / (this.countScoreLvL / 100), flag && countPlus != 0 ? true : false);
        if(flag && countPlus != 0) {
            this.Score = countPlus;
            this.listLvL();
        }
    },

    listLvL(){
        this.LvL++;

        //Здесь должнен быть свитч в котором для каждого уровня свое кол-во опыта
        this.countScoreLvL += 300;
        document.getElementById('myBar__txt').innerHTML = `LvL ${this.LvL} Tank`
    }
}