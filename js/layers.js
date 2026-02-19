addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff7300",
        requires() {
        let req = new Decimal(10)
        if (hasUpgrade('p', 12)) req = req.div(upgradeEffect('p', 12))
        if (hasUpgrade('p', 14)) req = req.div(upgradeEffect('p', 14))
	    if (hasUpgrade('p', 22)) req = req.div(upgradeEffect('p', 22))
		if (hasUpgrade('p', 24)) req = req.div(upgradeEffect('p', 24))
		if (hasUpgrade('p', 31)) req = req.div(upgradeEffect('p', 31))
	return req
    },

    
    resource: "mastered points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    resetsNothing() { return hasMilestone('p', 0) },
    hotkeys: [
        {key: "m", description: "M: Reset for mastered points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
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
        "QoL": {
            content: [
                ["infobox", "challenge"],
                "main-display",
                "blank",
                "blank",
                "milestones"
            ],
        },
    },
    upgrades: {
        11: {
            title: "Point gain starts now",
            description: "Get 1 point every second.",
            cost: new Decimal(0),
        },
        12: {
            title: "Dividing costs",
            description: "Divide mastered point cost based on points.",
            cost: new Decimal(2),
            effect() {return player.points.add(1).pow(0.3)},
            effectDisplay() {return "/"+format(this.effect())},
            unlocked() { return (hasUpgrade('p', 11)) },
	},
        13: {
            title: "Mult",
            description: "Multiply point gain based on mastered points.",
            cost: new Decimal(4),
            effect() {return player.p.points.add(1).pow(0.5)},
            effectDisplay() {return "x"+format(this.effect())},
            unlocked() { return (hasUpgrade('p', 12)) },
	},
        14: {
            title: "Dividing costs again",
            description: "Divide mastered point cost based on mastered points.",
            cost: new Decimal(6),
            effect() {return player.p.points.add(1).pow(0.45)},
            effectDisplay() {return "/"+format(this.effect())},
            unlocked() { return (hasUpgrade('p', 13)) },
	},
        15: {
            title: "QoL",
            description: "Unlock a milestone.",
            cost: new Decimal(7),
            unlocked() { return (hasUpgrade('p', 14)) },
	},
		21: {
            title: "Lansdowne",
            description: "x2.9 Points.",
            cost: new Decimal(7),
            unlocked() { return (hasUpgrade('p', 15)) },
	},
		22: {
            title: "29ers",
            description: "Divide mastered point cost by Lansdowne's formula.",
            cost: new Decimal(8),
            unlocked() { return (hasUpgrade('p', 21)) },
			tooltip(){ return "Lansdowne's formula is (((mastered points/2.9)+1)<sup>2.9</sup>)x(log<sub>2.9</sub>(mastered points+1))+1" },
			effect() {return player.p.points.div(2.9).add(1).pow(2.9).times(player.p.points.add(1).log(2.9)).add(1)},
            effectDisplay() {return "/"+format(this.effect())},
	},
		23: {
            title: "Princess Anne",
            description: "Multiply point gain by Princess Anne's formula.",
            cost: new Decimal(12),
            unlocked() { return (hasUpgrade('p', 22)) },
			tooltip(){ return "Princess Anne's formula is (((mastered points/100)+1)<sup>4</sup>)x(log<sub>1.7</sub>(mastered points+1)<sup>2</sup>)+1" },
			effect() {return player.p.points.div(100).add(1).pow(4).times(player.p.points.add(1).log(1.7).pow(2)).add(1)},
            effectDisplay() {return "x"+format(this.effect())},
	},
		24: {
            title: "Panthers",
            description: "Divide mastered point cost by (Princess Anne's formula)^1.2.",
            cost: new Decimal(16),
            unlocked() { return (hasUpgrade('p', 23)) },
			effect() {return player.p.points.div(100).add(1).pow(4).times(player.p.points.add(1).log(1.7).pow(2)).pow(1.2).add(1)},
            effectDisplay() {return "/"+format(this.effect())},
	},
		25: {
            title: "Ms. Rocca",
            description: "Multiply point gain by (Lansdowne's formula)^0.75.",
            cost: new Decimal(19),
            unlocked() { return (hasUpgrade('p', 24)) },
			effect() {return player.p.points.div(2.9).add(1).pow(2.9).times(player.p.points.add(1).log(2.9)).pow(0.75).add(1)},
            effectDisplay() {return "x"+format(this.effect())},
	},
		31: {
            title: "School's Fury",
            description: "Divide mastered point cost by (Lansdowne's formula x Princess Anne's formula)^0.5.",
            cost: new Decimal(22),
            unlocked() { return (hasUpgrade('p', 25)) },
			effect() {return ((player.p.points.div(2.9).add(1).pow(2.9).times(player.p.points.add(1).log(2.9))).times(player.p.points.div(100).add(1).pow(4).times(player.p.points.add(1).log(1.7).pow(2)).add(1))).pow(0.5).add(1)},
            effectDisplay() {return "/"+format(this.effect())},
	},
		32: {
            title: "Mr. Provincial",
            description: "Multiply point gain by itself.",
            cost: new Decimal(26),
            unlocked() { return (hasUpgrade('p', 31)) },
			effect() {return player.points.add(1).pow(0.1)},
            effectDisplay() {return "x"+format(this.effect())},
	},
		33: {
            title: "398 jean st (custom)",
            description: "Custom upgrade! Multiply point gain by x398.",
            cost: new Decimal(27),
            unlocked() { return (hasUpgrade('p', 32)) },
	},
		34: {
            title: "river (custom)",
            description: "Custom upgrade! Multiply point gain by the river formula.",
            cost: new Decimal(31),
            unlocked() { return (hasUpgrade('p', 33)) },
			tooltip(){ return "The River formula is ((((mastered points/846)+1)<sup>6</sup>)x(log<sub>1.6</sub>(mastered points+1)<sup>2.123</sup>)<sup>1.3142</sup>)+1" },
			effect() {return player.p.points.div(846).add(1).pow(6).times(player.p.points.add(1).log(1.6).pow(2.123)).pow(1.3142).add(1)},
            effectDisplay() {return "x"+format(this.effect())},
	},
    },
    milestones: {
        0: {
            requirementDescription: "7 Mastered Points",
            effectDescription: "Mastered points resets nothing.",
            done() { return player.p.points >= (7) && (hasUpgrade('p', 15)) },
            unlocked() {return hasUpgrade('p', 15)},
	},
     },
    effect(){
    let enpow = 1
	let eff = player.p.points.add(1).pow(enpow)
       return eff
       },
        effectDescription() {
            let desc = "boosting points by x" + format(tmp[this.layer].effect);
            return desc;
        },
})
