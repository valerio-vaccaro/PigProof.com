Sections = new Mongo.Collection('sections');
Sections.attachSchema(SectionSchema);

Meteor.methods({
    submitPost: function(section) {

        var user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'You need to log in first');

        section._id = Section.insert(section);
        return section;
    }
});

Sections.allow({
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