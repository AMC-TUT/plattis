
//Level 01 Scene
Crafty.scene("Game", function() {

  Crafty.background("#EEE");
  
	/* round about walls */
	// top
	Crafty.e("2D, DOM, Color, platform, Collision")
      .color("brown")
      .attr({x: 0, y: 0, w: 1024, h: 10 });
    // bottom
    Crafty.e("2D, DOM, Color, platform, Collision")
      .color("brown")
      .attr({x: 0, y: 758, w: 1024, h: 10 });
    // right
    Crafty.e("2D, DOM, Color, solid, Collision")
      .color("lime")
      .attr({x: 1014, y: 0, w: 10, h: 768 });
    // left
    Crafty.e("2D, DOM, Color, solid, Collision")
      .color("lime")
      .attr({x: 0, y: 0, w: 10, h: 768 });

    // player
    Crafty.e("2D, DOM, Color, Keyboard, Controls, Gravity, Collision")
        .color("red")
        .attr({ x: 100, y: 50, z: 1, w: 10, h: 25 })
        .Controls(2, 12)
        .gravity("platform")
        .bind("KeyDown", function (e) {
          if (this.isDown("LEFT_ARROW")) { this._dir = true; }
          else if (this.isDown("RIGHT_ARROW")) { this._dir = false; }
        })
        .bind("EnterFrame", function (frame) {
          if(this._up) { 
            if(!this.isDown("RIGHT_ARROW") || !this.isDown("LEFT_ARROW")) {
              this.x = this._dir ? this._x - this._speed * 1.5 : this._x + this._speed * 1.5;
            }
          }

          if(this.isDown("DOWN_ARROW")) { this.x = this._dir ? this._x - this._speed * 2 : this._x + this._speed * 2; }

          if(this.hit('solid')) {
            this._dir = !this._dir; // toggle direction
            this.x = this._dir ? this._x - 5 : this._x + 5;
          } 

        });

    // brown = platform
    // lime = solid wall
    // red = player
    // blue = vert. elevator

    Crafty.e("2D, DOM, Color, platform, Collision")
      .color("brown")
      .attr({x: 700, y: 680, w: 400, h: 10 });
    Crafty.e("2D, DOM, Color, roof, Collision")
      .color("orange")
      .attr({x: 700, y: 690, w: 400, h: 3 });
    Crafty.e("2D, DOM, Color, platform, Collision")
      .color("brown")
      .attr({x: 800, y: 675, w: 100, h: 10 });
    Crafty.e("2D, DOM, Color, Collision, velevator")
      .color("blue")
      .attr({x: 800, y: 675, w: 100, h: 1 });


});
