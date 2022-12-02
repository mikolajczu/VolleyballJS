const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');

/*RYSOWANIE SŁOŃCA*/
const sun = {x:600,y:0};

sun.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.arc(this.x,this.y, 50, 0, 2 * Math.PI);
    ctx.fill();
}

/*RYSOWANIE SIATKI*/
const siatka = {x:295,y:180,width:10,height:200}

siatka.draw = function(){
    ctx.fillStyle = 'grey';
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

/*RYSOWANIE PIŁKI v0=5*/
const pilka = {x:400,y:150,vx:2.5,vy:4.35,serve:true};

pilka.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = 'white';
	ctx.arc(this.x, this.y, 20,0, 2 * Math.PI);
	ctx.fill();
};

/*RYSOWANIE GRACZY*/
const player1 = {x:150,y:380,vx:0,vy:0,height:100,jumping:true};
const player2 = {x:450,y:380,vx:0,vy:0,height:100,jumping:true};
player1.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = 'blue';
    ctx.arc(this.x,this.y-100, 20,0, 2 * Math.PI);
	ctx.lineTo(this.x-10,this.y);
    ctx.lineTo(this.x-5,this.y);
    ctx.lineTo(this.x,this.y-20);
    ctx.lineTo(this.x+5,this.y);
    ctx.lineTo(this.x+10,this.y);
    ctx.lineTo(this.x+2,this.y-40);
    ctx.lineTo(this.x+2,this.y-100);
    ctx.lineTo(this.x-2,this.y-100);
    ctx.lineTo(this.x-2,this.y-40);
    ctx.lineTo(this.x-10,this.y);
    ctx.arc(this.x,this.y-100, 20,0, 2 * Math.PI);
    ctx.fill();
};

player2.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(this.x,this.y-100, 20,0, 2 * Math.PI);
    ctx.lineTo(this.x-10,this.y);
    ctx.lineTo(this.x-5,this.y);
    ctx.lineTo(this.x,this.y-20);
    ctx.lineTo(this.x+5,this.y);
    ctx.lineTo(this.x+10,this.y);
    ctx.lineTo(this.x+2,this.y-40);
    ctx.lineTo(this.x+2,this.y-100);
    ctx.lineTo(this.x-2,this.y-100);
    ctx.lineTo(this.x-2,this.y-40);
    ctx.lineTo(this.x-10,this.y);
    ctx.arc(this.x,this.y-100, 20,0, 2 * Math.PI);
    ctx.fill();
};

/*EVENT NA KLAWISZE*/
const key = {left:false,right:false,up:false,left1:false,right1:false,up1:false,
    listener: function(event){
        let status = (event.type == "keydown")?true:false;
        
        switch(event.keyCode) {
            case 37: //lewa strzalka
                key.left = status;
            break;
            case 38: //gorna strzalka
                key.up = status;
                break;
            case 39: //prawa strzalka
                key.right = status;
            break;
            case 65: //A
                key.left1 = status;
            break;
            case 87: //W
                key.up1 = status;
            break;
            case 68: //D
                key.right1 = status;
            break;
        }
    }
}
window.addEventListener("keydown", key.listener);
window.addEventListener("keyup", key.listener);

/*GŁÓWNA FUNKCJA*/
let punkt1 = 0, punkt2 = 0;

function update(){
    ctx.clearRect(0,0, canvas.width, canvas.height);

    if(pilka.y > 360 && pilka.x < 275){
        punkt2++;
        pilka.x = 400;
        pilka.y = 150;
        pilka.serve = true;
        player1.x = 150;
        player2.x = 450;
        player1.y = 380;
        player2.y = 380;   
    }

    if(pilka.y > 360 && pilka.x > 325){
        punkt1++;
        pilka.x = 200;
        pilka.y = 150;
        pilka.serve = true;
        player1.x = 150;
        player2.x = 450;
        player1.y = 380;
        player2.y = 380; 
    }
        
    p1.innerHTML = punkt1;
    p2.innerHTML = punkt2;

    if(punkt1 == 12){
        alert("Player 1 won!!!");
        return;
    }
    if(punkt2 == 12){
        alert("Player 2 won!!!");
        return;
    }

    /*RUCH GRACZA 1*/
    /*SKAKANIE*/
    if (key.up1 && player1.jumping == false){
        player1.vy -= 20;
        player1.jumping = true;
    }

    player1.vy += 0.5;
    player1.x += player1.vx;
    player1.y += player1.vy;
    player1.vy *= 0.9;
    player1.vx *= 0.9;

    if(player1.x > 65) if(key.left1 == true) player1.vx -= 0.5; //ruch w lewo
    if(player1.x < 230) if(key.right1 == true) player1.vx += 0.5; //ruch w prawo
    if(player1.y > 380){
        player1.jumping = false;
        player1.y = 380;
        player1.vy = 0;
    }

    /*RUCH GRACZA 2*/
    /*SKAKANIE*/
    if (key.up && player2.jumping == false){
        player2.vy -= 20;
        player2.jumping = true;
    }

    player2.vy += 0.5;
    player2.x += player2.vx;
    player2.y += player2.vy;
    player2.vy *= 0.9;
    player2.vx *= 0.9;

    if(player2.x > 370) if(key.left == true) player2.vx -= 0.5; //ruch w lewo
    if(player2.x < 535) if(key.right == true) player2.vx += 0.5; //ruch w prawo
    if(player2.y > 380){
        player2.jumping = false;
        player2.y = 380;
        player2.vy = 0;
    }

    /*WARUNKI BRZEGOWE*/
    if(pilka.x < 20 || pilka.x > 580) pilka.vx *= -1;
    if(pilka.y < 20){
        pilka.vy *= -1;
        pilka.y = 20;
    }

    /*SIATKA*/
    if(pilka.x > 275 && pilka.x < 315 && pilka.y < 180 && pilka.y > 160) pilka.vy *= -1;
    if(pilka.x > 275 && pilka.x < 315 && pilka.y > 180) pilka.vx *= -1;

    if(pilka.y+20 > player1.y-player1.height-20 && pilka.y-20 < player1.y-player1.height && pilka.x > player1.x-25 && pilka.x < player1.x+25){
        pilka.serve = false;
        if(player1.jumping == true){
            pilka.vx = 5;
            pilka.vy = -10;
            pilka.y = player1.y-player1.height-40;            
       }
       else{
            pilka.vx = 3.5;
            pilka.vy = -20;
            pilka.y = player1.y-player1.height-40;
       }
    }

    if(pilka.y+20 > player2.y-player2.height-20 && pilka.y-20 < player2.y-player2.height && pilka.x > player2.x-25 && pilka.x < player2.x+25){
        pilka.serve = false;
        if(player2.jumping == true){
            pilka.vx = -5;
            pilka.vy = -10;
            pilka.y = player2.y-player2.height-40;
       }
       else{
            pilka.vx = -3.5;
            pilka.vy = -20;
            pilka.y = player2.y-player2.height-40;
       }
    }

    /*RUCH PIŁKI*/
    if(pilka.serve == true){
        pilka.vx = 0;
        pilka.vy = 0;
    }
    else{
        pilka.x += pilka.vx*0.55;
        pilka.y += pilka.vy*0.2;
        pilka.vy += 0.2;
    }

    /*RYSOWANIE WSZYSTKIEGO NA PLANSZY*/
    sun.draw();
    siatka.draw();
    pilka.draw();
    player1.draw();
    player2.draw();

    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);