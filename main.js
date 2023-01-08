game.newLoop("myGame", () => {
    
    //Отрисовка фона
    SceneObject.DrawGrid();

    //Отрисовка фигур
    SceneObject.DrawFigureInMap();

    //Отрисовка танка, создание пуль, регистрация столкновений
    
    TankObject.DrawTankAllDetails();
  
    //Отрисовка карты
    SceneObject.DrawMap();
    cofFpsDel = (60 / pjs.system.getFPS() < 1) ? Math.floor((60 / pjs.system.getFPS()) * 100) /100 : 1;  
    cofFpsMul = (60 / pjs.system.getFPS() < 1) ? Math.floor((pjs.system.getFPS() / 60) * 100) /100 : 1;
});
pjs.system.setSmoothing(false);	

game.setLoop("myGame");
SceneObject.StartGame();
SceneObject.ChangendScaleCamera(1.2);
game.start();
