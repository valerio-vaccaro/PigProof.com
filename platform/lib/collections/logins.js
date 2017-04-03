Logins = new Mongo.Collection('logins');
Logins.attachSchema(LoginSchema);

Meteor.methods({
    submitLogin: function(login) {

        login._id = Logins.insert(login);
        return login;
    }
});

Logins.allow({
    insert: function(){
        return true;
    },
    update: function(userId, doc,fieldNames, modifier){
        return true;
    },
    remove: function (userId, doc){
        return true;
    }
});