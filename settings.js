const pjs = new PointJS(400,400, {backgroundColor: "#666666"});
const game = pjs.game;
const key = pjs.keyControl; key.initControl();
const mouse = pjs.mouseControl; mouse.initControl();

pjs.system.initFullPage();
const point = pjs.vector.point;
const backgroundMass = [], rectBackgroundMass = [], figureMassRect = [], figureMassTriangle = [], figureMassPoligon = [];
let MassFigureInCamera = [];
const WH = game.getWH();
pjs.system.initFPSCheck();
let cofFpsDel = 0;
let cofFpsMul = 0;
const SceneObject = {
    rectingle:{
        experience: 200,
        count: 80,
        health: 100,
        w: 45,
        h: 45,
        fillColor : "#ffe869", 
        strokeColor: '#bfae4e',
        speedMove: 0.1 ,
        speedRotate: 0.15
    },
    triangle: {
        experience: 400,
        count: 50,
        health: 150,
        w: 45,
        h: 45,
        fillColor : "#fc7677", 
        strokeColor: '#bd5859',
        speedMove: 0.07,
        speedRotate: 0.07,
    },
    poligon: {
        experience:600,
        count: 20,
        health: 300,
        fillColor : "#768dfc", 
        strokeColor : "#5869bd", 
        speedMove: 0.03,
        speedRotate: 0.06,
    },
    Map:{
        map:{},
        cellMap:{}
    },
    scaleCamera: 1,
    countTimeCollisionInBullet: 60,
    ChangendPositionCamera(position){
        pjs.camera.setPositionC(TankObject.tankAllDetails.tank.getPosition(position));
    },

    ChangendScaleCamera (scale){
        this.scaleCamera = scale;
        pjs.camera.scaleC(point(scale, scale));
    },

    StartGame (){
        TankObject.CreateTank();
        this.CreateMap();
        this.CreateGrid();
        this.CreateRectingle(this.rectingle.count);
        this.CreateTriangle(this.triangle.count);
        this.CreatePoligon(this.poligon.count);
    },

    CreateRectingle (count) {
        let length = figureMassRect.length;
        for(let i = length; i < length + count; i++){
            figureMassRect.push(
                game.newRoundRectObject({ 
                    x : pjs.math.random( 20, 3950, true ), 
                    y : pjs.math.random( 20, 3950, true ), 
                    w : SceneObject.rectingle.w, 
                    h : SceneObject.rectingle.h, 
                    fillColor : SceneObject.rectingle.fillColor, 
                    strokeColor: SceneObject.rectingle.strokeColor,
                    strokeWidth: 4,
                    radius : 3
                }));
                let _figureBar = game.newRoundRectObject({ 
                    x : figureMassRect[i].getPosition().x, 
                    y : figureMassRect[i].getPosition().y, 
                    w : 60, 
                    h : 7, 
                    fillColor : "#555555", 
                    strokeColor: '#707070',
                    strokeWidth: 1,
                    radius : 3
                })
                
                let _figureBarCountHealth = game.newRoundRectObject({ 
                    x : figureMassRect[i].getPosition().x + 1, 
                    y : figureMassRect[i].getPosition().y, 
                    w : 58, 
                    h : 5, 
                    fillColor : "#85e37d", 
                    radius : 3
                })
                figureMassRect[i].setUserData({
                    life: SceneObject.rectingle.health,
                    rotateAngle: pjs.math.random( -1, 1, true ),
                    speedMove: SceneObject.rectingle.speedMove,
                    speedRotate: SceneObject.rectingle.speedRotate,
                    moveX: pjs.math.random( -1, 1, true ),
                    moveY: pjs.math.random( -1, 1, true ),
                    figureBar: _figureBar,
                    figureBarCountHealth: _figureBarCountHealth,
                    collisionWithABullet:{
                        flag: false,
                        countTime: this.countTimeCollisionInBullet,
                        x: 0,
                        y:0
                    },
                    collisionWithAFigure:{
                        flag: false,
                        countTime: 100,
                    },
                    death:{
                        flag: false,
                        dying: false,
                        countTime: 15
                    }
            });
        }
    },

    CreateTriangle (count) {
        let length = figureMassTriangle.length;
        for(let i = length; i < length + count; i++){
            figureMassTriangle.push(
                game.newTriangleObject(   { 
                    x : pjs.math.random( 20, 3950, true ), 
                    y : pjs.math.random( 20, 3950, true ), 
                    w : SceneObject.triangle.w, 
                    h : SceneObject.triangle.h, 
                    fillColor : SceneObject.triangle.fillColor, 
                    strokeColor: SceneObject.triangle.strokeColor,
                    strokeWidth: 4,
                  })); 
                let _figureBar = game.newRoundRectObject({ 
                    x : figureMassTriangle[i].getPosition().x, 
                    y : figureMassTriangle[i].getPosition().y, 
                    w : 60, 
                    h : 7, 
                    fillColor : "#555555", 
                    strokeColor: '#707070',
                    strokeWidth: 1,
                    radius : 3
                });
                figureMassTriangle[i].setCenter(point(0,8))
                
                let _figureBarCountHealth = game.newRoundRectObject({ 
                    x : figureMassTriangle[i].getPosition().x + 1, 
                    y : figureMassTriangle[i].getPosition().y, 
                    w : 58, 
                    h : 5, 
                    fillColor : "#85e37d", 
                    radius : 3
                })
            figureMassTriangle[i].setUserData({
                life: SceneObject.triangle.health,
                rotateAngle: pjs.math.random( -1, 1, true ),
                speedMove: SceneObject.triangle.speedMove,
                speedRotate: SceneObject.triangle.speedRotate,
                moveX: pjs.math.random( -1, 1, true ),
                moveY: pjs.math.random( -1, 1, true ),
                figureBar: _figureBar,
                figureBarCountHealth: _figureBarCountHealth,
                collisionWithABullet:{
                    flag: false,
                    countTime: this.countTimeCollisionInBullet,
                    x: 0,
                    y:0
                },
                collisionWithAFigure:{
                    flag: false,
                    countTime: 100,
                },
                death:{
                    flag: false,
                    dying: false,
                    countTime: 15
                }
            });
        }
    },

    CreatePoligon  (count) {
        let length = figureMassPoligon.length;
        for(let i = length; i < length + count; i++){
            figureMassPoligon.push(
                game.newPolygonObject(   { 
                    x : pjs.math.random( 20, 3950, true ), 
                    y : pjs.math.random( 20, 3950, true ), 
                    points : [ point(-32, -10), point(-22, 32), point(22, 32), point(32, -10), point(0, -32)], 
                    fillColor :  SceneObject.poligon.fillColor, 
                    pointColor: SceneObject.poligon.strokeColor,
                    strokeColor : SceneObject.poligon.strokeColor, 
                    strokeWidth : 4, 
                  }));
    
                  figureMassPoligon[i].setCenter(point(-14,-12))
                let _figureBar = game.newRoundRectObject({ 
                    x : figureMassPoligon[i].getPosition().x, 
                    y : figureMassPoligon[i].getPosition().y, 
                    w : 60, 
                    h : 7, 
                    fillColor : "#555555", 
                    strokeColor: '#707070',
                    strokeWidth: 1,
                    radius : 3
                })
                
                let _figureBarCountHealth = game.newRoundRectObject({ 
                    x : figureMassPoligon[i].getPosition().x + 1, 
                    y : figureMassPoligon[i].getPosition().y, 
                    w : 58, 
                    h : 5, 
                    fillColor : "#85e37d", 
                    radius : 3
                })
            figureMassPoligon[i].setUserData({
                life: SceneObject.poligon.health,
                rotateAngle: pjs.math.random( -1, 1, true ),
                speedMove: SceneObject.poligon.speedMove,
                speedRotate: SceneObject.poligon.speedRotate,
                moveX: pjs.math.random( -1, 1, true ),
                moveY: pjs.math.random( -1, 1, true ),
                figureBar: _figureBar,
                figureBarCountHealth: _figureBarCountHealth,
                collisionWithABullet:{
                    flag: false,
                    countTime: this.countTimeCollisionInBullet,
                    x: 0,
                    y:0
                },
                collisionWithAFigure:{
                    flag: false,
                    countTime: 100,
                },
                death:{
                    flag: false,
                    dying: false,
                    countTime: 15
                }
            });
        }
    },

    CreateGrid () {
        let width = 2000, heigth = 1000;
        const colorGrid = "#474A51";
        for(let x = 0; x < 2; x++)
            for(let y = 0; y < 4; y++){
                backgroundMass.push(
                    game.newImageObject({ 
                        file : "image/back.png", 
                        x : x * width, 
                        y : y * heigth,
                        w : width, 
                        h : heigth, 
                    }))
        }
        
        rectBackgroundMass.push(game.newRectObject({ 
            x : 0, 
            y : 0, 
            w : 2000 * 2, 
            h : 1000 * 4, 
            fillColor : "#bbbbbb", 
          }));
        rectBackgroundMass.push(
            game.newRectObject({ 
                x : 0, 
                y : -5, 
                w : 2000 * 2, 
                h : 5, 
                fillColor : colorGrid, 
          })) ; 
        rectBackgroundMass.push(
            game.newRectObject({ 
                x : 0, 
                y : 4000, 
                w : 2000 * 2, 
                h : 5, 
                fillColor : colorGrid, 
          }));
        rectBackgroundMass.push(
          game.newRectObject({ 
              x : -5, 
              y : -5, 
              w : 5, 
              h : 4010, 
              fillColor : colorGrid, 
          }));
        rectBackgroundMass.push(
          game.newRectObject({ 
              x : 4000, 
              y : -5, 
              w : 5, 
              h : 4010, 
              fillColor : colorGrid, 
          }));      
    },

    CreateMap(){
        this.Map.map = game.newRoundRectObject({ 
            w: 200, 
            h: 200, 
            fillColor : "#bbbbbb", 
            strokeColor: '#2B2E4A',
            strokeWidth: 4,
            radius : 3,
            alpha:0.9
        });
        
        this.Map.cellMap = game.newCircleObject({
            radius: 5,
            fillColor:"#E23E57"
        })
    },

    DrawGrid(){
        for(let i in rectBackgroundMass) if(rectBackgroundMass[i].isInCamera()) rectBackgroundMass[i].draw();
        for(let i in backgroundMass) if(backgroundMass[i].isInCamera()) backgroundMass[i].draw();
    },

    DrawFigureInMap(){
        //Проверка количества фигур
        if(this.rectingle.count != figureMassRect.length) this.CreateRectingle(this.rectingle.count - figureMassRect.length);
        if(this.triangle.count != figureMassTriangle.length) this.CreateTriangle(this.triangle.count - figureMassTriangle.length);
        if(this.poligon.count != figureMassPoligon.length) this.CreatePoligon(this.poligon.count - figureMassPoligon.length);

        AnimationFigure(figureMassRect, this.rectingle.health,0,0, "rectingle");
        AnimationFigure(figureMassTriangle, this.triangle.health,0,6, "triangle");
        AnimationFigure(figureMassPoligon, this.poligon.health, 22, 6, "poligon");

        function AnimationFigure(figure, healthMax, x = 0, y = 0, name){
            let a = healthMax / 100;
            let b = 58 / 100;
            for(let i in figure){
                if(figure[i].isInCamera()){
                    if((figure[i].x < 100 && figure[i].isStaticIntersect(rectBackgroundMass[3].getStaticBox())) || (figure[i].x > 3900 && figure[i].isStaticIntersect(rectBackgroundMass[4].getStaticBox()))) {figure[i].moveX *= -1; figure[i].collisionWithAFigure.flag = true;}
                    if((figure[i].y < 100 && figure[i].isStaticIntersect(rectBackgroundMass[1].getStaticBox())) || (figure[i].y > 3900 && figure[i].isStaticIntersect(rectBackgroundMass[2].getStaticBox()))) {figure[i].moveY *= -1; figure[i].collisionWithAFigure.flag = true;}

                    figure[i].turn((figure[i].speedRotate * cofFpsDel) * figure[i].rotateAngle);
                    
                    if(figure[i].collisionWithABullet.flag){
                        if(figure[i].collisionWithABullet.countTime >= 0){
                            figure[i].move(point((figure[i].collisionWithABullet.x  * figure[i].collisionWithABullet.countTime, figure[i].collisionWithABullet.y * figure[i].collisionWithABullet.countTime)));
                            figure[i].fillColor = "#F14E54";
                            figure[i].strokeColor = "#B43A3F";
                            figure[i].collisionWithABullet.countTime--;
                        }else {
                            figure[i].collisionWithABullet.flag = false;
                            figure[i].collisionWithABullet.countTime = SceneObject.countTimeCollisionInBullet ;
                        }
                    }else {
                        figure[i].move(point((figure[i].speedMove * cofFpsDel) * figure[i].moveX, (figure[i].speedMove * cofFpsDel) * figure[i].moveY));
                        switch(name){
                            case 'rectingle': figure[i].fillColor = SceneObject.rectingle.fillColor; figure[i].strokeColor = SceneObject.rectingle.strokeColor; break;
                            case 'triangle': figure[i].fillColor = SceneObject.triangle.fillColor; figure[i].strokeColor = SceneObject.triangle.strokeColor; break;
                            case 'poligon': figure[i].fillColor = SceneObject.poligon.fillColor; figure[i].strokeColor = SceneObject.poligon.strokeColor;  break;
                        }
                    }

                    if(figure[i].death.dying){
                        figure[i].alpha -= 0.05;
                        figure[i].death.countTime--;
                        if(figure[i].death.countTime <= 0) {figure[i].death.dying = false; figure[i].death.flag = true;}
                    }

                    if(figure[i].collisionWithAFigure.flag){
                        if(figure[i].collisionWithAFigure.countTime != 0){
                            figure[i].move(point(((figure[i].speedMove * cofFpsDel) * figure[i].moveX) * (figure[i].collisionWithAFigure.countTime / 10), ((figure[i].speedMove * cofFpsDel) * figure[i].moveY) * (figure[i].collisionWithAFigure.countTime / 10)));
                            figure[i].turn(((figure[i].speedRotate * cofFpsDel) * figure[i].rotateAngle) * (figure[i].collisionWithAFigure.countTime / 2));
                            figure[i].collisionWithAFigure.countTime--;
                        }else{
                            figure[i].collisionWithAFigure.flag = false;
                            figure[i].collisionWithAFigure.countTime = 100 * cofFpsMul;
                        }
                    }
                    CollisionFigureSelf();
                    if(figure[i].life != healthMax){
                        figure[i].figureBar.setPosition(point(figure[i].getPosition().x - 8 - x, figure[i].getPosition().y + figure[i].h + 10 + y))
                        figure[i].figureBarCountHealth.setPosition(point(figure[i].getPosition().x - 7 - x, figure[i].getPosition().y + figure[i].h + 10 + y))

                        figure[i].figureBarCountHealth.w = (b * (figure[i].life / a))
                    
                        figure[i].figureBar.draw();
                        figure[i].figureBarCountHealth.draw();
                    }


                    figure[i].draw();
                if(TankObject.tankAllDetails.tank.getDistanceC(figure[i].getPosition(1)) < TankObject.tankStyle.radius + 20){
                    if(!figure[i].death.dying){
                        TankObject.tankProperty.health -= figure[i].life;
                        switch(name){
                            case 'rectingle': Player.updateLvL(SceneObject.rectingle.experience);break;
                            case 'triangle':  Player.updateLvL(SceneObject.triangle.experience); break;
                            case 'poligon':   Player.updateLvL(SceneObject.poligon.experience);  break;
                        }
                    }
                    TankObject.DrawTankBar();
                   
                    figure[i].death.dying = true;
                    } 
                      
                    if(figure[i].death.flag) figure.splice(i,1);   
                }

                function CollisionFigureSelf(){
                    for(let x in figureMassRect){
                        if(!(name == "rectingle" && x == i))    
                        if(figure[i].isStaticIntersect(figureMassRect[x].getStaticBox())) 
                        if(!figure[i].collisionWithAFigure.flag || !figureMassRect[x].collisionWithAFigure.flag){
                            figure[i].moveX *= -1;
                            figure[i].moveY *= -1;
                            figureMassRect[x].moveX *= -1;
                            figureMassRect[x].moveY *= -1;
                            figure[i].collisionWithAFigure.flag = true;
                            figureMassRect[x].collisionWithAFigure.flag = true;
                        }
                    }

                    for(let x in figureMassTriangle){
                        if(!(name == "triangle" && x == i))    
                        if(figure[i].isStaticIntersect(figureMassTriangle[x].getStaticBox())) 
                        if(!figure[i].collisionWithAFigure.flag || !figureMassTriangle[x].collisionWithAFigure.flag){
                            figure[i].moveX *= -1;
                            figure[i].moveY *= -1;
                            figureMassTriangle[x].moveX *= -1;
                            figureMassTriangle[x].moveY *= -1;
                            figure[i].collisionWithAFigure.flag = true;
                            figureMassTriangle[x].collisionWithAFigure.flag = true;
                        }
                    }

                    for(let x in figureMassPoligon){
                        if(!(name == "poligon" && x == i)){
                            if(figure[i].isStaticIntersect(figureMassPoligon[x].getStaticBox(-30,-30,14,14))) 
                            if(!figure[i].collisionWithAFigure.flag || !figureMassPoligon[x].collisionWithAFigure.flag){
                                figure[i].moveX *= -1;
                                figure[i].moveY *= -1;
                                figureMassPoligon[x].moveX *= -1;
                                figureMassPoligon[x].moveY *= -1;
                                figure[i].collisionWithAFigure.flag = true;
                                figureMassPoligon[x].collisionWithAFigure.flag = true;
                            }
                        }
                        
                    }
                }
            }

            
        }
    },

    DrawMap(){
    this.Map.map.setPositionS(point(((WH.w /this.scaleCamera) - this.Map.map.w - 10) , ((WH.h/this.scaleCamera) - this.Map.map.h -10)));
    this.Map.cellMap.setPositionS(point((WH.w /this.scaleCamera) - this.Map.map.w - 5, ((WH.h)/this.scaleCamera - this.Map.map.h -5)));
    this.Map.cellMap.move(point((TankObject.tankAllDetails.tank.getPosition(1).x / 22), TankObject.tankAllDetails.tank.getPosition(1).y / 22));

    this.Map.map.draw();
    this.Map.cellMap.draw();
    }
}

const TankObject = {
    tankAllDetails:{
        tank:{},
        tankBar:{
            bar:{},
            CountHealth: {},
        },
        tankPushka: {}
    },
    tankStyle:{
        radius: 30,
        fillColor: "#00b2e1",
        strokeColor: "#0085a8",
    },
    tankProperty:{
        dX: 0,
        dY: 0,
        speed: Player.movementSpeed,
        maxHealth: Player.maxHealth,
        health: Player.maxHealth,
        regeneration: Player.healtRegen,
        move: false,
        shooting: false,
        autoShooting: false,
    },

    friction: 0.985,
    runawayX: 0,
    runawayY: 0,
    runawayXCof: 0,
    runawayYCof: 0,
    runawayXFlag: false,
    runawayYFlag: false,
    cofRunamayX: 0.05,
    cofRunamayY: 0.05,
   
    bullet:{
        MassBullet: [],
        speedShooting: 1,
        size: Player.bullet.size,
        speed: Player.bullet.speed,
        life: Player.bullet.penetration,
        timeLive: Player.bullet.timeLife,
        damage: Player.bullet.damage,
    },

    createAndDrawBullet(){
        if(TankObject.bullet.speedShooting != 0)TankObject.bullet.speedShooting--; else TankObject.bullet.speedShooting = 0;

        if((mouse.isDown("LEFT") || this.tankProperty.autoShooting) && TankObject.bullet.speedShooting == 0) {
            drawBullet(); 
            TankObject.bullet.speedShooting = Player.bullet.reload; 
            if(!this.tankProperty.move){
                this.tankProperty.dX = (-this.bullet.MassBullet[0].cordX / Player.bullet.recoil) * cofFpsDel;
                this.tankProperty.dY = (-this.bullet.MassBullet[0].cordY / Player.bullet.recoil) * cofFpsDel;
            }
             
        } 

        if(mouse.isDown("LEFT")) this.tankProperty.shooting = true; else this.tankProperty.shooting = false;
        MassFigureInCamera = [...pjs.OOP.getArrInCamera(figureMassRect), ...pjs.OOP.getArrInCamera(figureMassTriangle), ...pjs.OOP.getArrInCamera(figureMassPoligon)]
        if(TankObject.bullet.MassBullet.length != 0){
        for(let i in TankObject.bullet.MassBullet){
            if(TankObject.bullet.MassBullet[i].life <= 0) TankObject.bullet.MassBullet[i].death.dying = true;
            for(let x in MassFigureInCamera)
                if(TankObject.bullet.MassBullet[i].isStaticIntersect(MassFigureInCamera[x].getStaticBox()))                   
                    if(!TankObject.bullet.MassBullet[i].death.dying && !MassFigureInCamera[x].death.dying){
                        MassFigureInCamera[x].life -= TankObject.bullet.damage;
                        TankObject.bullet.MassBullet[i].life -= MassFigureInCamera[x].life;
                        if(MassFigureInCamera[x].life <= 0){
                            MassFigureInCamera[x].death.dying = true; 
                            MassFigureInCamera[x].figureBar.visible = false;
                            MassFigureInCamera[x].figureBarCountHealth.visible = false;
                            switch(MassFigureInCamera[x].type){
                                case 'RoundRectObject': Player.updateLvL(SceneObject.rectingle.experience); break;
                                case 'TriangleObject': Player.updateLvL(SceneObject.triangle.experience); break;
                                case 'PolygonObject': Player.updateLvL(SceneObject.poligon.experience); break;
                            }
                        }else{
                            MassFigureInCamera[x].collisionWithABullet.x = Math.cos(C(Ha(MassFigureInCamera[x].getPosition(1), mouse.getPosition()))) / 100;
                            MassFigureInCamera[x].collisionWithABullet.y = Math.sin(C(Ha(MassFigureInCamera[x].getPosition(1),mouse.getPosition()))) / 100;
                            MassFigureInCamera[x].collisionWithABullet.flag = true;
                        }
                    }                  
          
            
            TankObject.bullet.MassBullet[i].move(point(TankObject.bullet.MassBullet[i].cordX * cofFpsDel, TankObject.bullet.MassBullet[i].cordY * cofFpsDel));
            TankObject.bullet.MassBullet[i].timeLive -= 1;

            if((TankObject.bullet.MassBullet[i].life <= 0) || 
            (TankObject.bullet.MassBullet[i].timeLive <= 0) ||
            (TankObject.bullet.MassBullet[i].isStaticIntersect( rectBackgroundMass[1].getStaticBox())) || 
            (TankObject.bullet.MassBullet[i].isStaticIntersect( rectBackgroundMass[2].getStaticBox())) || 
            (TankObject.bullet.MassBullet[i].isStaticIntersect( rectBackgroundMass[3].getStaticBox())) ||
            (TankObject.bullet.MassBullet[i].isStaticIntersect( rectBackgroundMass[4].getStaticBox())))
             TankObject.bullet.MassBullet[i].death.dying = true;

            //Анимация умирания пули
            if(TankObject.bullet.MassBullet[i].death.dying)
                if(TankObject.bullet.MassBullet[i].death.countTimeDying >= 0){
                    TankObject.bullet.MassBullet[i].scaleC(1.01);
                    TankObject.bullet.MassBullet[i].alpha -=0.09;
                    TankObject.bullet.MassBullet[i].cordX -= TankObject.bullet.MassBullet[i].cordX / 7;
                    TankObject.bullet.MassBullet[i].cordY -= TankObject.bullet.MassBullet[i].cordY / 7;
                    TankObject.bullet.MassBullet[i].death.countTimeDying--;
                }else {TankObject.bullet.MassBullet[i].death.flag = true; TankObject.bullet.MassBullet[i].death.death = false;}

            //Отрисовка пуль
            TankObject.bullet.MassBullet[i].draw();
        }
        //Удаление умерщих пуль
        for(let i in TankObject.bullet.MassBullet) if(TankObject.bullet.MassBullet[i].death.flag) TankObject.bullet.MassBullet.splice(i,1);
        }

        function drawBullet(){
            TankObject.bullet.MassBullet.push(
                game.newCircleObject({ 
                    x : TankObject.tankAllDetails.tankPushka.getPosition(2).x - TankObject.bullet.size, 
                    y : TankObject.tankAllDetails.tankPushka.getPosition(2).y - TankObject.bullet.size, 
                    radius : TankObject.bullet.size , 
                    fillColor : "#F14E54", 
                    strokeColor : "#B43A3F", 
                    strokeWidth : 3, 
                    angle : 0, 
                    alpha : 1, 
                    visible : true 
                }));

                TankObject.bullet.MassBullet[TankObject.bullet.MassBullet.length - 1].setUserData({
                cordX: Math.cos(C(Ha(TankObject.bullet.MassBullet[TankObject.bullet.MassBullet.length - 1].getPosition(1),mouse.getPosition()))) * TankObject.bullet.speed ,
                cordY: Math.sin(C(Ha(TankObject.bullet.MassBullet[TankObject.bullet.MassBullet.length - 1].getPosition(1),mouse.getPosition()))) * TankObject.bullet.speed ,
                life: TankObject.bullet.life,
                timeLive: TankObject.bullet.timeLive,
                death:{
                    flag: false,
                    dying: false,
                    countTimeDying: 10,
                }
            })

            
        }
        function Ha(a,b){ return 180/Math.PI*Math.atan2(b.y-a.y, b.x-a.x)}
        function C(a){return Math.PI/180*a}
    },
 
    MoveTank(){
        if(this.tankProperty.health != this.tankProperty.maxHealth) this.tankProperty.health += this.tankProperty.regeneration;
        if(key.isPress("T")) (this.tankProperty.autoShooting) ? this.tankProperty.autoShooting = false : this.tankProperty.autoShooting = true;
        if(key.isDown("W")) {this.runawayYFlag = true; this.runawayYCof = -1;}
        if(key.isDown("S")) {this.runawayYFlag = true; this.runawayYCof = 1; }
        if(key.isDown("D")) {this.runawayXFlag = true; this.runawayXCof = 1; }
        if(key.isDown("A")) {this.runawayXFlag = true; this.runawayXCof = -1;}
        
        if(key.isUp("W")) {this.runawayYFlag = false; this.cofRunamayY = 0.05; this.runawayY = 0; }
        if(key.isUp("S")) {this.runawayYFlag = false; this.cofRunamayY = 0.05; this.runawayY = 0; }
        if(key.isUp("D")) {this.runawayXFlag = false; this.cofRunamayX = 0.05; this.runawayX = 0; }
        if(key.isUp("A")) {this.runawayXFlag = false; this.cofRunamayX = 0.05; this.runawayX = 0; }

        if(pjs.keyControl.getCountKeysDown() >= 1) this.tankProperty.move = true; else this.tankProperty.move = false;
        if(this.runawayYFlag){
            this.runawayY = (this.runawayY + (this.cofRunamayY * this.runawayYCof));
            this.tankProperty.dY = this.runawayY;
        if((this.runawayYCof == -1 && (this.runawayY < (this.tankProperty.speed * this.runawayYCof))) ||
           (this.runawayYCof == 1 && (this.runawayY > (this.tankProperty.speed * this.runawayYCof)))) 
            this.cofRunamayY = 0;   
        }else this.tankProperty.dY *= this.friction;

        if(this.runawayXFlag){
            this.runawayX = (this.runawayX + (this.cofRunamayX * this.runawayXCof));
            this.tankProperty.dX = this.runawayX;
        if((this.runawayXCof == -1 && (this.runawayX < (this.tankProperty.speed * this.runawayXCof))) ||
           (this.runawayXCof == 1 && (this.runawayX > (this.tankProperty.speed * this.runawayXCof)))) 
            this.cofRunamayX = 0;   
        }else this.tankProperty.dX *= this.friction;

        if(this.tankProperty.shooting && !this.tankProperty.move){
            this.tankProperty.dX *= 0.99;
            this.tankProperty.dY *= 0.99; 
        }
        
        
    },

    DrawTankBar(){
        let a = 1000 / 100;
        let b = 58 / 100;
        if(this.tankProperty.health < 0) {this.tankProperty.health = 0; this.tankAllDetails.tankBar.CountHealth.w = 0}
        if(this.tankProperty.health != 0) this.tankAllDetails.tankBar.CountHealth.w = (b * (this.tankProperty.health / a)); 
    },

    CollisionTank(){
        for(let i  = 1; i < rectBackgroundMass.length; i++){
            if(rectBackgroundMass[i].isStaticIntersect(this.tankAllDetails.tank.getStaticBoxA(-this.tankProperty.speed, 0, this.tankProperty.speed))) if(this.tankProperty.dX == -this.tankProperty.speed){
                this.tankProperty.dX = 0;
                this.tankAllDetails.tank.setPosition(point(rectBackgroundMass[i].x + rectBackgroundMass[i].w, this.tankAllDetails.tank.y));
            }//

            if(rectBackgroundMass[i].isStaticIntersect(this.tankAllDetails.tank.getStaticBoxD(0,0, this.tankProperty.speed))) if(this.tankProperty.dX == this.tankProperty.speed){
                this.tankProperty.dX = 0;
                this.tankAllDetails.tank.setPosition(point(rectBackgroundMass[i].x - this.tankAllDetails.tank.w, this.tankAllDetails.tank.y));
            } 

            if(rectBackgroundMass[i].isStaticIntersect(this.tankAllDetails.tank.getStaticBoxW(0,-this.tankProperty.speed,0, this.tankProperty.speed))) if(this.tankProperty.dY == -this.tankProperty.speed){
                this.tankProperty.dY = 0;
                this.tankAllDetails.tank.setPosition(point(this.tankAllDetails.tank.x, rectBackgroundMass[i].y + rectBackgroundMass[i].h));
            } 

            if(rectBackgroundMass[i].isStaticIntersect(this.tankAllDetails.tank.getStaticBoxS(0,0,0, this.tankProperty.speed))) if(this.tankProperty.dY  == this.tankProperty.speed){
                this.tankProperty.dY = 0;
                this.tankAllDetails.tank.setPosition(point(this.tankAllDetails.tank.x, rectBackgroundMass[i].y - this.tankAllDetails.tank.h));
            }      
        }
    },

    CreateTank(){
        
        this.tankAllDetails.tank = game.newCircleObject({ 
            x: WH.w2, 
            y: WH.h2, 
            radius : this.tankStyle.radius, 
            fillColor : this.tankStyle.fillColor, 
            strokeColor : this.tankStyle.strokeColor, 
            strokeWidth : 4
          });
        this.tankAllDetails.tankBar.bar = game.newRoundRectObject({ 
            x : this.tankAllDetails.tank.getPosition().x, 
            y : this.tankAllDetails.tank.getPosition().y, 
            w : 60, 
            h : 7, 
            fillColor : "#555555", 
            strokeColor: '#707070',
            strokeWidth: 1,
            radius : 3
        })
        
        this.tankAllDetails.tankBar.CountHealth = game.newRoundRectObject({ 
            x : this.tankAllDetails.tank.getPosition().x, 
            y : this.tankAllDetails.tank.getPosition().y, 
            w : 58, 
            h : 5, 
            fillColor : "#85e37d", 
            radius : 3
        })
        
        this.tankAllDetails.tankPushka = game.newRoundRectObject({ 
            x : this.tankAllDetails.tank.getPosition().x, 
            y : this.tankAllDetails.tank.getPosition().y, 
            w : 60, 
            h : 30, 
            fillColor : "#CDCDCD", 
            strokeColor: '#727272',
            strokeWidth: 4,
            radius : 2
        })
        this.tankAllDetails.tankPushka.setCenter(point(-this.tankAllDetails.tankPushka.w / 2  -1, 0) );
    },

    DrawTankAllDetails(){
        //Движение танка
        this.MoveTank();
        this.CollisionTank();
        let cordXRecoil = (-Math.cos(C(Ha(point(WH.w2 / SceneObject.scaleCamera - 7,WH.h2 / SceneObject.scaleCamera - 7),mouse.getPositionS()))) / Player.bullet.recoil);
        let cordYRecoil = (-Math.sin(C(Ha(point(WH.w2 / SceneObject.scaleCamera - 7,WH.h2 / SceneObject.scaleCamera - 7),mouse.getPositionS()))) / Player.bullet.recoil);
        
        if(this.tankProperty.move && this.tankProperty.shooting && TankObject.bullet.MassBullet.length != 0)
            this.tankAllDetails.tank.move(point((this.tankProperty.dX + cordXRecoil) * cofFpsDel, (this.tankProperty.dY + cordYRecoil) * cofFpsDel));
            
        else this.tankAllDetails.tank.move(point(this.tankProperty.dX * cofFpsDel, this.tankProperty.dY * cofFpsDel ));   

        
       
        function Ha(a,b){ return 180/Math.PI*Math.atan2(b.y-a.y, b.x-a.x)}
        function C(a){return Math.PI/180*a}
        SceneObject.ChangendPositionCamera(1);
        //Стрельба
        this.createAndDrawBullet();
        //Корректировка положения бара здоровья
        this.tankAllDetails.tankPushka.setPositionS(point((WH.w2 / SceneObject.scaleCamera +3), (WH.h2 / SceneObject.scaleCamera - this.tankAllDetails.tankPushka.h / 2 +3)));
        this.tankAllDetails.tankPushka.rotateForPoint(mouse.getPosition(), 20);

        if(this.tankProperty.health < 1000){
             this.tankAllDetails.tankBar.bar.setPositionS(point(WH.w2 / SceneObject.scaleCamera - this.tankAllDetails.tankBar.bar.w / 2 + 3, (WH.h2/SceneObject.scaleCamera) +40))
             this.tankAllDetails.tankBar.CountHealth.setPositionS(point(WH.w2 / SceneObject.scaleCamera - this.tankAllDetails.tankBar.bar.w / 2 + 4, (WH.h2/SceneObject.scaleCamera) +41))
             this.DrawTankBar();
             this.tankAllDetails.tankBar.bar.draw();
             this.tankAllDetails.tankBar.CountHealth.draw();
        }

        //Отрисовка пушки и танка
        this.tankAllDetails.tankPushka.draw();
        this.tankAllDetails.tank.draw();
    }
}




//Анимация прогресс бара уровня
const progressBar = document.getElementById("myBar");
let countProgressBar = 3;

function animationProgressBar(procent, flag = false){    
    requestAnimationFrame(frame);
    
    function frame() {
      if (countProgressBar >= procent - 0.5) {
        cancelAnimationFrame(frame);
        if(flag){
            countProgressBar = 3;
            progressBar.style.width = 3 + '%';
            animationProgressBar(Player.Score / (Player.countScoreLvL / 100), false)
        }
      } else {  
        countProgressBar += (procent - countProgressBar) / 10;
        progressBar.style.width = countProgressBar + "%";
        
        requestAnimationFrame(frame);
      }
    }
}