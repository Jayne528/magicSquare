
window.onload = function() {
    var canvas = document.getElementById("canvas");
    var cx = canvas.getContext("2d");

    var blockWidth = 200;
    var PI = Math.PI;
    var PI2 = Math.PI*2;

    canvas.width = blockWidth*3;
    canvas.height = blockWidth*3;

    cx.fillCircle = function (x, y, r) {
        this.beginPath();
        this.arc(x, y, r, 0 ,PI2);
        this.fill();
    }


    var color = {
        red: "#F74456",
        white: "#fff",
        yellow: "#F1DA56",
        blue: "#036FAF"
    }

    function drawBlock(pos,bgcolor,draw, time) {
        cx.save();
        cx.translate(pos.x*blockWidth,pos.y*blockWidth);
        cx.fillStyle = bgcolor;
        cx.fillRect (0,0, blockWidth, blockWidth);
        //移到框框的中心點
        cx.translate(100,100);
        draw();
        cx.restore();
    }

    var time = 0;

    //太陽
    function draw() {
        time++;
        var stime = parseInt(time/20);  //因為time 非常快所以設定一個stime ,parseInt整數

        drawBlock({x:0,y:0},color.blue, function(){

            cx.beginPath();
            cx.arc(0, 0, 30/(stime %3 +1), 0, PI2); //(stime %3 +1) => 0,1,2,3
            cx.strokeStyle = "white";
            cx.lineWidth = 15;
            cx.stroke();
            //畫8個長方形
            for (var i= 0 ;i<8;i++) {
                cx.fillStyle = (stime%8 ==i)?color.red:"white";  //因為有8個，所以當stime%8 等於i就畫紅色
                if ((i+stime)%4!=0) {   //當i不等於0 or 4
                    cx.fillRect(60, -4, 20, 8);
                }
                cx.rotate(PI2/8);
            }

        }, time);

        //9個點
        drawBlock({x:1,y:0},color.red, function(){
            
            cx.save();
            cx.scale(0.8,0.8);
            cx.translate(-60,-60);
           
            for(var i=0; i<3; i++) {
                cx.save();
                for(var o=0; o<3; o++) {
                    cx.beginPath();
                    cx.arc(0, 0, 20, 0, PI2);
                    cx.fillStyle = color.white;
                    if ((i+o*2+stime)%5 == 0) {
                        cx.fillStyle = color.yellow;
                    }
                    cx.fill();
                    cx.translate(0, 60);
                } 
                cx.restore();
                cx.translate(60, 0);
            }
            cx.restore();
        }, time);

        //風扇
        drawBlock({x:2,y:0},color.yellow, function(){
            
            for (var i=0; i<4; i++) {
                cx.beginPath();
                cx.moveTo(0,0);
                cx.lineTo(80,20);
                cx.lineTo(80,80);
                cx.closePath();
                cx.fillStyle = "white";
                cx.fill();
                if (stime%4 ==i) {
                    cx.beginPath();
                    cx.arc(60, 40, 6, 0, PI2);
                    cx.fillStyle = color.red;
                    cx.fill();
                }
    
                cx.rotate(PI/2);
            }

        }, time);

        
        drawBlock({x:0,y:1},color.yellow, function(){
            
            //方塊
            cx.translate(-60,-60);
            cx.fillStyle = color.white;
            cx.fillRect(0, 0, 60, 60);

            //D 到正方心中心
            cx.translate(30, 30);
            cx.rotate(-PI/4);  //45度
            cx.beginPath();
                cx.moveTo(0, 0);
                cx.lineTo(40, 0);
                cx.arc(40, 40, 40, -PI/2, PI/2); //往上90度，往下90度
                cx.lineTo(0, 80);
            cx.closePath();
            cx.fillStyle = color.red;
            cx.fill();

            //方形
            cx.translate(-100 + 10*Math.sin(time/10), 60);;
            cx.fillStyle = color.blue;
            cx.fillRect(0, 0, 100, 40);

            cx.translate(100 + 10*Math.cos(time/10), 40);;
            cx.fillStyle = color.white;
            cx.fillRect(0, 0, 50, 20);

        }, time);

        drawBlock({x:1,y:1},color.white, function(){

            cx.beginPath();
            cx.fillStyle = color.red;
            var angle1 = (time%100)/100*PI2;
            var angle2 = (time%50)/50*PI2;
            cx.moveTo(0,0);
            cx.arc(0, 0, 80, angle1, angle2);
            cx.fill();

            cx.fillStyle = color.yellow;
            cx.fillCircle(60, 60, 30);
        }, time);

        drawBlock({x:2,y:1},color.blue, function(){
            cx.fillStyle = color.white;
            cx.fillCircle(0, 0, 80);

            cx.rotate(time/10);
                cx.fillStyle = color.red;
                cx.fillCircle(-30,0,20);

                cx.rotate(time/10);
                cx.fillStyle = color.yellow;
                cx.fillCircle(40,0,50);
        }, time);

        //摩天輪
        drawBlock({x:0,y:2},color.red, function(){

            cx.rotate(time/100);
            for (var i=0; i<8; i++) {

                cx.rotate(PI2/8);
                cx.fillStyle = color.white;
                var r =16;
                if((stime+i)%4<2) {
                    r = 10;
                }
                cx.fillCircle(60,0,r);

                cx.fillStyle = color.blue;
                cx.fillCircle(30, 5, 5);

            }
            
        }, time);

        drawBlock({x:1,y:2},color.blue, function(){

            cx.translate(-80, -100);
            cx.fillStyle = color.yellow;
            cx.fillRect(0, time%200, 40, time%200);

            cx.translate(40, 40 );
            cx.fillStyle = color.red;
            cx.fillRect(0, 0 ,120, 80);

            cx.fillStyle = color.white;

            cx.fillCircle(0, 40, stime%20);  //(0~20循環)
            cx.fillCircle(70, 40, stime%10); //(0~10循環)

            cx.translate(70, 80);
            cx.fillRect(0, 0, 50, 80);
            
        }, time);

        drawBlock({x:2,y:2},color.yellow, function(){
            
            cx.beginPath();
            cx.moveTo(-100, -100);
            cx.lineTo(0, -100);
            cx.lineTo(-100, 100);
            cx.closePath();
            cx.fillStyle = "white";
            cx.fill();


            cx.rotate(PI);
            //紅色三角形
            cx.save();

            cx.translate(time%100, 0);
                cx.beginPath();
                cx.moveTo(-100, -100);
                cx.lineTo(0, -100);
                cx.lineTo(-100, 100);
                cx.closePath();
                cx.fillStyle = color.red;
                cx.fill();

            cx.restore();

            //旋轉複製左上三角形貼在右下
          
            cx.beginPath();
            cx.moveTo(-100, -100);
            cx.lineTo(0, -100);
            cx.lineTo(-100, 100);
            cx.closePath();
            cx.fillStyle = "white";
            cx.fill();

        }, time);


        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);

}
