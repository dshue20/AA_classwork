class View {
    constructor(game, $el) {
        this.game = game;
        this.$el = $el;
        this.stacks = [];
        this.stacks.forEach(stack => {
            const $stack = $(stack);
            $stack.on("click")
        })
    }
    
    setupTowers(){
        for (let i = 0; i < 3; i ++) {
            const $stack = $("<ul");
            for (let j = 0; j < 3; j ++) {
                const $disc = $("<li");
                $stack.append($disc);
            };
            this.stacks.push($stack);
            this.$el.append($stack);
        };
    }

    render(){

    }
    
}