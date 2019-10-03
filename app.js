const app = new Vue({
  el: "#app",
  data: {
    hiddenStates: [
      "Alabama", "Alaska", "Arizona", "Arkansas",
      "California", "Colorado", "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho", "Illinois", "Indiana", "Iowa",
      "Kansas", "Kentucky",
      "Louisiana",
      "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
      "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
      "Ohio", "Oklahoma", "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina", "South Dakota",
      "Tennessee", "Texas",
      "Utah",
      "Vermont", "Virginia",
      "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ],
    guessedStates: [],
    guessText: "",
    won: false,
    target: 50,
    disabled: false
  },
  methods: {
    check: function(){
      if (this.hiddenStates.includes(this.capitalGuess)) {
        this.hiddenStates = this.hiddenStates.filter(item => item !== this.capitalGuess);
        this.guessedStates.push(this.capitalGuess);
        this.guessText = "";
        this.checkFinished();
      } else {
        return;
      }
    },
    checkFinished: function(){
      if(this.guessedStates.length >= this.target) {
        this.won = !this.won;
        this.disabled = !this.disabled;
      } else {
        return;
      }
    },
    iQuit: function(){
      this.won = !this.won;
    },
    initialState: function(){
      this.hiddenStates = [
        "Alabama", "Alaska", "Arizona", "Arkansas",
        "California", "Colorado", "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho", "Illinois", "Indiana", "Iowa",
        "Kansas", "Kentucky",
        "Louisiana",
        "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
        "Ohio", "Oklahoma", "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina", "South Dakota",
        "Tennessee", "Texas",
        "Utah",
        "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin", "Wyoming"
      ],
      this.guessedStates = [],
      this.guessText = "",
      this.won = false,
      this.target = 50,
      this.disabled = false
    }
  },
  computed: {
    sortedStates: function(){
      return this.guessedStates.sort();
    },
    capitalGuess: function(){
      return this.guessText.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    }
  },
  template: `
  <div class="container">

    <transition name="fade-in">
      <div v-if="won" class="wonModal">
        <div class="innerModal">
          <h2>Thanks for playing!</h2><br><br>
          <h2 v-if="hiddenStates.length >= 1">
            You missed the following states:
            {{this.hiddenStates.toString().replace(/,/g, ", ")}}
          </h2>
          <br><br><button v-on:click="initialState()">Play Again!</button><br>
        </div>
      </div>
    </transition>
    
    <div>
      <div style="padding:10px; display: flex; flex-direction:column; justify-content: center; align-items: center; background-color: white; box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.4);">
        <input style="width: 80%;" v-on:keyup="check()" v-on:keydown="check()" :disabled="disabled" v-model="guessText" placeholder="State..."><br>
        <div style="margin-bottom:5px;">
          <h2 style="display: inline;">{{guessedStates.length}} / </h2>
          <input v-model="target" style="width:50px; display: inline; background: none; padding: 5px; font-family: 'Gloria Hallelujah', cursive; font-size: 1.5em;" />
          <h4 style="display: inline;">← set your target!</h4>
          <button @click="iQuit()">Give Up</button>
        </div>
      </div>
      <div style="display: flex; flex-wrap: wrap; padding: 10px;">
        <h2 v-for="state in sortedStates" style="background-color: white; margin:5px; padding:5px;">{{state}}</h2>
      </div>
    </div>

  </div>
  `
})