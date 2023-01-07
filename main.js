game.newLoop("myGame", () => {
    //Отрисовка фона
    SceneObject.DrawGrid();

    //Отрисовка фигур
    SceneObject.DrawFigureInMap();

    //Отрисовка танка, создание пуль, регистрация столкновений
    
    TankObject.DrawTankAllDetails();
    
	
    
    //Отрисовка карты
    SceneObject.DrawMap();
});
	
game.setLoop("myGame");
SceneObject.StartGame();
SceneObject.ChangendScaleCamera(1);
game.start();