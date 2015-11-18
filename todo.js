Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

    Template.body.helpers({
        tasks: function () {
            return Tasks.find({}, {sort: {createdAt:-1}});
        }
    });

    Template.body.events({
        "submit .new-task": function (event) {
            // Prevent default browser form submit
            event.preventDefault();

            // Get value from form element
            var text = event.target.text.value;

            // Insert a task into the collection
            Tasks.insert({
                text: text,
                createdAt: new Date() // current time
            });

            // Clear form
            event.target.text.value = "";
        }
    });

    // counter starts at 0
    Session.setDefault('counter', 0);

    Template.hello.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });

    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });

    Template.task.events({
        'click .toggle-checked': function() {
            // Set the checked property to the opposite of its current value

            Tasks.update(this._id, {
                $set: {checked: !this.checked}
            });
         }, 
         'click .delete':function() {
             Tasks.remove(this._id);
         }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
