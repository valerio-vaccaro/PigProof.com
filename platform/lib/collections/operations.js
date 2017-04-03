Operations = new Mongo.Collection('operations');
Operations.attachSchema(OperationSchema);

Meteor.methods({
    submitOperation: function(operation) {

        operation._id = Operations.insert(operation);
        return operation;
    }
});


Operations.allow({
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