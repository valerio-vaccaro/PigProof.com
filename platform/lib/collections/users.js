Users = new Mongo.Collection('merkur-users');
Users.attachSchema(UserSchema);

Meteor.methods({
    submitUser: function(user) {

        user._id = Users.insert(user);
        return user;
    }
});


Users.allow({
    insert: function(userId,doc){
        return true;
    },
    update: function(userId, doc,fieldNames, modifier){
        return true;
    },
    remove: function (userId, doc){
        return true;
    }
})