const APIUtil = require('./api_util.js');

class UsersSearch {
    constructor(el){
        this.$el = $(el);
        // debugger;
        this.$input = this.$el.find('.users-input');
        this.$ul = this.$el.find('.users');
        this.handleInput();
    }

    handleInput(){
        this.$input.on('input propertychange', e => {
            //debugger;
            APIUtil.searchUsers(e.target.value).then(users => this.renderResults(users));
        });

    }

    renderResults(users){
        this.$ul.empty();
        users.forEach(user => {
            //debugger;
            let $li = $("<li></li>");
            let $a = $("<a></a>");
            let $button = $("<button class='follow-toggle'></button>");
            $a.text(user.username);
            $a.attr('href', `/users/${user.id}`);
            $li.append($a);
            $li.append($button);
            this.$ul.append($li);
        })
    }
}

module.exports = UsersSearch;