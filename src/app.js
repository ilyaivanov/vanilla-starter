import map from 'lodash/map';

var users = [
    {name: 'foo'},
    {name: 'bar'},
    {name: 'buz'}
];

console.log(map(users, 'name'));
