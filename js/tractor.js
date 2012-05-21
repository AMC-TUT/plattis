

var GameController = {
    /*
            929: { // mobiles socket clientID for direct & fast access
                ent: null, // viittaus entiteettiin, jonka ohjaukseen osallistuu
                tyre: null, // left or right tyre
            },
            3: { //  id
                ent: null, // viittaus entiteettiin
                tyres: {
                    left: 9, // left player id
                    right: 13 // right player id
                },
                acc: {
                    left: 5, // accelerometer value for left tyre set by socket
                    right: 6, // accelerometer value for left tyre set by socket
                }
            }
    */
};


var Game = {
    // add this description to level obj
    on: false, // game is ongoing, true when gaming
    sockets: { 
        ready: false, 
        roomID: 0, 
        dashboard: false },
    dashboard: { 
        generated: false },
    // TODO tama kuuluu kentan yhteyteen
    description: "",
    qrcodes: {
        generated: 0,
        images: [
        { _x: 294, _y: 137, action: 'join', id: 1, _ly: 267, label: 'Liity peliin' }, // 1
        { _x: 884, _y: 10, action: 'start', _ly: 140, label: 'Aloita peli' }, // start
        { _x: 884, _y: 610, action: 'close', _ly: 740, label: 'Sulje peli' } // close
        ]
    },
    teams: [], // add teams when players join to union
    // teams
    /*teams: [
        {
            "id" : 1, // sama kuin farm id, tarvitaanko siis lainkaan?
            "farmId" : 1,
            "score" : 0,
            "total" : 0,
            "tractors" : [
                {
                    "id": 1,
                    "tyres": 
                        {
                            "left": {
                                "name" : "Matti",
                                "id" : Crafty.math.randomInt(1000, 2000)
                            },
                            "right": {
                                "name" : "Maija",
                                "id" : Crafty.math.randomInt(1000, 2000)
                            }                            
                        }
                },
                {
                    "id": 2,
                    "tyres":
                        {
                            "left": {
                                "name" : "Jarmo",
                                "id" :  Crafty.math.randomInt(1000, 2000)
                            },
                            "right": {
                                "name" : "Leena",
                                "id" :  Crafty.math.randomInt(1000, 2000)
                            }                            
                        }
                }
            ]
        },
        {
            "id" : Crafty.math.randomInt(1, 12),
            "farmId" : 2,
            "score" : 0,
            "total" : 0,
            "tractors" : [
                {
                    "id": Crafty.math.randomInt(1000, 2000),
                    "tyres": 
                        {
                            "left": {
                                "name" : "Risto",
                                "id" : Crafty.math.randomInt(1000, 2000)
                            },
                            "right": {
                                "name" : "Reijo",
                                "id" : Crafty.math.randomInt(1000, 2000)
                            }                            
                        }
                    
                }
            ]
        }
    ],
    */
    // weights
    generateGame: function() {
        Game.generateBases();
        //
        _.each(this.teams, function(team){
            if( (typeof team.tractors[0] !== "undefined" && team.tractors[0].tyres.left.id > 0 && team.tractors[0].tyres.right.id > 0) 
                || (typeof team.tractors[1] !== "undefined" && team.tractors[1].tyres.left.id > 0 && team.tractors[1].tyres.right.id > 0) )
            Game.generateFarm( team.farmId ); //, team.id );
        });
        //
        Game.generateWeightsOnGround();

        $('#results').modal('show');

    }
}