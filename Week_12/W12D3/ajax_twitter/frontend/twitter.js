const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');

$(function () {
    $('button.follow-toggle').each( (idx, btn) => new FollowToggle(btn, {}) );
    $('nav.users-search').each((idx, ele) => new UsersSearch(ele));
});