addLayer("p3", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#d8d8d8",                       // The color for this layer, which affects many elements.
    resource: "points^3",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    baseResource: "points^2",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p2.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(25),              // The amount of the base needed to  gain 1 of the prestige currency.
   
   

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.0000000001,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return (player.p2.points.gte(10)||player.p3.unlocked) },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
      hotkeys: [
        {key: "c", description: "C: Reset for points^3", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "blank",
                "blank",
                "upgrades"
            ],
        },
    },
    effect(){
    let powe = 1
	let eff = player.p3.points.pow(powe)
       return eff
       },
        effectDescription() {
            let desc = "generating " + format(tmp[this.layer].effect) + " points^2 per second";
            return desc;
        },
	branches:["p2"],
})
