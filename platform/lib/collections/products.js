Products = new Mongo.Collection('products');
Products.attachSchema(ProductSchema);


Meteor.methods({
    submitProduct: function(product) {

        //var user = Meteor.user();
        //if (!user)
        //    throw new Meteor.Error(401, 'You need to log in first');
        
        product._id = Products.insert(product);
        return product;
    }
});


Products.allow({
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