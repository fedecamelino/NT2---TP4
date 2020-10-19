/* ----------------------------- COMPONENTE HEADER ----------------------------- */

Vue.component("header-colores", {

    props: ['dynamicColors'],
    
    template: `
        <div id="header" :style="{backgroundColor: this.dynamicColors.headerColor}">
            <h1>
                The Great
                <br>
                <span id="colorDisplay">{{this.dynamicColors.pickedColor}}</span>
                <br> 
                Guessing Game
            </h1>
        </div>
    `
}),



/* ----------------------------- COMPONENTE NAVIGATOR ----------------------------- */

Vue.component('navigator-colores', {

    props: ['reset','easy','hard','restartButton','messageDisplay','isHard'],
    
	template: `
		<div id="navigator">
			<button id="reset" @click="reset()"> {{restartButton}}</button>
            <span id="message"> {{messageDisplay}} </span>
			<button id="easy" @click="easy()" :class="{'selected': !isHard}">easy</button>
			<button id="hard" @click="hard()" :class="{'selected': isHard}">hard</button>
		</div>
    `
})



/* ----------------------------- COMPONENTE CONTAINER ----------------------------- */

Vue.component('container-colores', {

    props: ['mensajes','setAllColorsTo','dynamicColors','squares'],
    
	template: `
		<div id="container">
			<square 
				class="square" 
				:mensajes="mensajes"
				:square="square"
				:set-all-colors-to="setAllColorsTo"
				:dynamic-colors="dynamicColors"
				v-for="(square,index) in squares"
				:key="index"
			></square>
		</div>
	`
})



/* ----------------------------- COMPONENTE SQUARE ----------------------------- */

Vue.component('square', {
    
    props: ['square', 'dynamicColors', 'mensajes', 'setAllColorsTo'],
    
    methods: {
		squareClick(){
			let clickedColor = this.square.backgroundColor;

			if (clickedColor === this.dynamicColors.pickedColor) {
				this.mensajes.messageDisplay = "You Picked Right!";
				this.setAllColorsTo(this.dynamicColors.pickedColor);
				this.mensajes.restartButton = "Play Again!";
				this.dynamicColors.headerColor = this.dynamicColors.pickedColor;
			} else {
				this.square.backgroundColor = "#232323";
				this.mensajes.messageDisplay = "Try Again!";
			}
		}
	},
	
	template: `
        <div :style="square" @click="squareClick()"></div>
    `
})



/* ----------------------------- INSTANCIA PRINCIPAL VUE ----------------------------- */

var app = new Vue({

    el: '#appVueCDN',
    
	mounted() {
		this.init()
	},

    data: {
		dynamicColors: {
			pickedColor : 'RBG',
			headerColor : ''
		},
		mensajes : {	
			messageDisplay: '',
			restartButton : 'New colors'
		},
		colorCount : {
			easy: 3,
			hard: 6
		},
		isHard : true,
		colors : [],
		squares: []
    },

    methods: {
		reset() {
			this.restart();
		},

		easy() {
			if (this.isHard) {
				this.isHard = false;
				for (let i = 0; i < this.colorCount.easy; i++) {
					let anulable = this.colorCount.easy + i;
					this.squares[anulable].display = "none";
				}
				this.restart();
			}
        },
        
		hard() {
			if (!this.isHard) {
				this.isHard = true;
				this.restart();
				for (let i = 3; i < this.colorCount.hard; i++) {
					this.squares[i].display = "block";
				}
			}
        },
        
		init(){
			for(let i=0; i<this.colorCount.hard; i++) {
				this.squares.push({
					display: 'block',
					backgroundColor: ''
				})
			}
			this.restart();
		},
		
		PickColor() {
			let elementos;
			if (this.isHard) {
				elementos = 6;
			} else {
				elementos = 3;
			}
			return Math.floor(Math.random() * elementos);
		},

		createNewColors(numbers){
			var array = [];
			for (var i = 0; i < numbers; i++) {
				array.push(this.createRandomStringColor());
			}
			return array;
		},

		setAllColorsTo(color) {
			this.squares.forEach(square => {
				square.backgroundColor = color;
			})
		},

		createRandomStringColor(){
			var newColor = "rgb(" + this.randomInt() + ", " + this.randomInt() + ", " + this.randomInt() + ")" ;
			return newColor;
		},

		randomInt(){
			return Math.floor(Math.random() * 256);
		},

		restart(){
			this.colors = this.createNewColors(this.colorCount.hard);
			this.dynamicColors.pickedColor = this.colors[this.PickColor()];
			this.dynamicColors.headerColor = "steelblue";
			this.mensajes.messageDisplay = "";
			this.mensajes.restartButton = "New Colors!";
			for (let i = 0; i <this.squares.length; i++) {
				this.squares[i].backgroundColor = this.colors[i];
			}
		}		
	}
})
