
Crafty.c("Tractor", {
    id: 0,
    init: function() {
        this.id = 0, // use roomID later when sockets
        /* default values */
        this._keyForward = "UP_ARROW",
        this._keyReverse = "DOWN_ARROW",
        this._keyLeft = "LEFT_ARROW",
        this._keyRight = "RIGHT_ARROW",
        //
        this.addComponent("2D", "Canvas", "Collision", "SpriteAnimation", "Keyboard", "team1vechile1")
        .origin("bottom")
        .collision(new Crafty.polygon([16,0], [48,0], [48,64], [16,64]))
        // define tractor animations
        .animate("FrwdFrwd", [
        [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]
        ])
        .animate("FrwdBrwd", [
        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
        ])
        .animate("BrwdBrwd", [
        [0, 1], [7, 1], [6, 1], [5, 1], [4, 1], [3, 1], [2, 1], [1, 1]
        ])
        .animate("BrwdFrwd", [
        [0, 0], [7, 0], [6, 0], [5, 0], [4, 0], [3, 0], [2, 0], [1, 0]
        ])
        .bind("EnterFrame", function(frame) {

            this._accDiff = this._accLeft - this._accRight;
            this._speed = (this._accLeft == 0 || this._accRight == 0) ? 0 : 2; //this._speed; //(( this._accLeft + this._accRight ) / 2);
            // accDiff < -4 turn left
            // accDiff > 4 turn right
            // log("this._accDiff:" + this._accDiff + ",this._accLeft:" + this._accLeft + ", this._accRight:" + this._accRight);

            if(this._speed > 0) {
                if(this._accLeft > 20 && this._accRight > 20) {
                    this._speed = this._speed + 0.5
                }

                if(Math.abs(this._accDiff) < 2) {
                    this._speed = this._speed + 0.5;
                }
            } /*else {
                this.stop();
            }*/

            this._speed = this._speed < 3 ? this._speed : 3; // max speed = 3 

            var angle = this._rotation * (Math.PI / 180),
                vx = Math.sin(angle),
                vy = -Math.cos(angle);

            // log("_speed:" + this._speed + ", _accDiff:" + this._accDiff + ", this._accLeft:" + this._accLeft + ", this._accRight:" + this._accRight);
            this.cargo_x = this.x + 20 - (vx*10);
            this.cargo_y = this.y + 20 - (vy*10);

            if(this._speed > 0) {
                if (!this.isPlaying("FrwdFrwd")) {
                    this.stop().animate("FrwdFrwd", 10, -1)
                }
            } else if(this._accDiff > 7) {
                if (!this.isPlaying("FrwdBrwd")) {
                    this.stop().animate("FrwdBrwd", 10, -1);
                }                
            } else if(this._accDiff < -7) {
                if (!this.isPlaying("BrwdFrwd")) {
                    this.stop().animate("BrwdFrwd", 10, -1);
                }                
            } else {
                this.stop();
            }

            if(this.isDown(this._keyForward) || (this._speed > 0 && !this._reverse)) {
                if(this._speed == 0) { this._speed = 1.5; }
                
                this.x += vx * this._speed;
                this.y += vy * this._speed;

            } else if(this.isDown(this._keyReverse) || (this._speed > 0 && this._reverse)) {
                this.x += -vx * 0.8;
                this.y += -vy * 0.8;
            }

            if( this.isDown(this._keyLeft) || this._accDiff < -7 ) {
                this.rotation = this._speed == 0 ? this.rotation-1.5 : this.rotation-1;
            }

            else if( this.isDown(this._keyRight) || this._accDiff > 7 ) {
                this.rotation = this._speed == 0 ? this.rotation+1.5 : this.rotation+1;

            }

        })
        .bind('KeyUp', function(e) {
            // stop * animations
            this.stop();
        })

    }
});
