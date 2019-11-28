const APIUtil = require('./api_util.js')

class followToggle {
    constructor(el, options) {
        this.$el = $(el);
        this.userId = this.$el.data('user-id') || options.userId;
        this.followState = this.$el.data('initial-follow-state') || options.followState;
        this.render();
        this.handleClick();
        //debugger;
    }

    render(){
        switch (this.followState) {
            case 'followed':
                this.$el.prop('disabled', false);
                this.$el.html('Unfollow!');
                break;
            case 'unfollowed':
                this.$el.prop('disabled', false);
                this.$el.html('Follow!');
                break;
            case 'following':
                this.$el.prop('disabled', true);
                this.$el.html('Loading')
                break;
            case 'unfollowing':
                this.$el.prop('disabled', true);
                this.$el.html('Loading')
                break;
        }
        // debugger;
    }

    handleClick(){
        //debugger;
        this.$el.on('click', e => {
            e.preventDefault();
            let follow;
            if (this.followState === 'followed'){
                follow = APIUtil.unfollowUser;
                this.followState = 'unfollowing';
            } else {
                follow = APIUtil.followUser;
                this.followState = 'following';
            }
            this.render();
            //debugger;
            follow(this.userId).then(() => {
                //debugger;
                this.followState = this.followState === 'following' ? 'followed' : 'unfollowed';
                this.render();
            });
        })
    }
}

module.exports = followToggle;