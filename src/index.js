class Game {
  constructor(digit = 4) {
    this.answer = [];
    this.log = [];
    this.digit = digit;
    this.generateAnswer();
  }
  generateAnswer() {
    for (var i = 0; i < this.digit; i++) {
      var loop = true;
      while (loop) {
        var number = parseInt(Math.random() * 10, 10);
        if (this.answer.indexOf(number) === -1) {
          this.answer.push(number);
          loop = false;
        }
      }
    }
    document.getElementById("number").value = "";
    document.getElementById("log").innerHTML = "";
    document.getElementById("correct").innerHTML = "";
    console.log(this.answer);
  }
  getInput(input) {
    document.getElementById("correct").innerHTML = "";
    if (input.length !== this.digit) {
      document.getElementById("correct").innerHTML = "入力が不正です";
      return;
    }
    this.compareToAnswer(input);
    if (this.log[this.log.length - 1].hit === this.digit) {
      this.correct();
    }
    this.record();
  }
  compareToAnswer(input) {
    var inputNum = [];
    var hit = 0;
    var blow = 0;
    try {
      for (var i = 0; i < this.digit; i++) {
        var num = Number(input[i]);
        if (isNaN(num) || inputNum.includes(num)) {
          throw new Error("The message");
        }
        inputNum.push(Number(input[i]));
        if (inputNum[i] === this.answer[i]) {
          hit++;
        } else if (this.answer.includes(inputNum[i])) {
          blow++;
        }
      }
      var data = { input: inputNum, hit: hit, blow: blow };
      this.log.push(data);
    } catch (err) {
      document.getElementById("correct").innerHTML = "入力が不正です";
    }
  }
  record() {
    var nowRoundLog = this.log[this.log.length - 1];
    document.getElementById("log").innerHTML +=
      "#" +
      this.log.length +
      "&emsp;[" +
      nowRoundLog.input +
      "]&emsp;" +
      nowRoundLog.hit +
      "&emsp;&emsp;" +
      nowRoundLog.blow +
      "<br>";
  }
  correct() {
    document.getElementById("correct").innerHTML = "Correct!!";
  }
}
var game = new Game();

window.input = function input() {
  var input = document.getElementById("number").value;
  game.getInput(input);
};
window.reset = function reset() {
  var input = document.getElementById("digit").value;
  game = new Game(Number(input));
};
