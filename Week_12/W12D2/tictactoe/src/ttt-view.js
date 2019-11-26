class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    const $ul = $("ul");
    $ul.on("click", "li", e => {
      if (!this.game.winner()){
        this.game.playMove;
        this.makeMove($(e.target));
        //debugger;
      };
    });
  }

  makeMove($square) {
    const mark = this.game.currentPlayer;
    const pos = [Math.floor($square.data("pos")/3), $square.data("pos")%3];
    const that = this;
    //debugger;
    if (!$square.text() && !this.game.winner()) {
      $square.addClass('checked');
      $square.text(mark);
      this.game.playMove(pos);
    };

    if (this.game.winner()) {
      //debugger;
      const $li = $("li");
      const loser = this.game.winner() === "x" ? "o" : "x";
      $li.addClass('checked');
      $.each($li, idx => {
        //debugger;
        const $sq = $($li[idx]);
        if ($sq.text() === this.game.winner()) {
          $sq.addClass('winner');
        }
        else if ($sq.text() === loser) {
          //debugger;
          $sq.addClass('loser');
        };
      });
      //debugger;
      const $msg = $(`<h3>You win, ${this.game.winner()}!</h3>`);
      this.$el.append($msg);
      //debugger;
    }
  }

  setupBoard() {
    const $ul = $("<ul class='board'>");
    for (let i=0; i<9; i++) {
      const $li = $("<li>");
      $li.data("pos", i);
      $ul.append($li);
    }
    this.$el.append($ul);
  }
}

module.exports = View;
