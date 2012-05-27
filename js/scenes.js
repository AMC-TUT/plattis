
//Level 01 Scene
Crafty.scene("Game", function() {


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
    Crafty.e("2D, DOM, Color, Controls, Gravity, Collision")
        .color("red")
        .attr({ x: 100, y: 50, z: 1, w: 10, h: 25 })
        .Controls(4, 12)
        .gravity("platform")
        .bind('Moved', function(from) {
            if (this.hit('solid') || this.hit('velevator')) {
                this.attr({ x: from.x, y: from.y });
            }
        })

    // brown = platform
    // lime = solid wall
    // red = player
    // blue = vert. elevator

    Crafty.e("2D, DOM, Color, platform, Collision")
      .color("brown")
      .attr({x: 700, y: 680, w: 400, h: 10 });
    Crafty.e("2D, DOM, Color, solid, Collision")
      .color("lime")
      .attr({x: 700, y: 690, w: 400, h: 1 });
    Crafty.e("2D, DOM, Color, solid, Collision")
      .color("lime")
      .attr({x: 700, y: 680, w: 1, h: 10 });

    Crafty.e("2D, DOM, Color, platform, Collision")
      .color("brown")
      .attr({x: 800, y: 675, w: 100, h: 10 });
    Crafty.e("2D, DOM, Color, Collision, velevator")
      .color("blue")
      .attr({x: 800, y: 675, w: 100, h: 1 });


});
