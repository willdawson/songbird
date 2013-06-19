var Items = new Meteor.Collection("items");

if (Meteor.isClient) {

	Template.main.instructions = function () {
		return "Sign in below.";
	};

	// Template.main.currentUserEmail = function () {
	// 	return Meteor.user().emails[0].address;
	// }

	Template.main.currentUserName = function () {
		return Session.get('currentUserName');
	}

	Template.main.items = function () {
		return Items.find({});
	}

	Template.main.currentUserItems = function () {
		return Items.find({
			itemAuthor: Session.get('currentUserName')
		});
	}

	Template.main.events({

		// login submit
		'submit #login-form': function (e, t) {
			e.preventDefault();
			var email = t.find('#login-email').value,
			password = t.find('#login-password').value;
			// trim and validate inputs
			Meteor.loginWithPassword(email, password, function (error) {
				if (error) {
					// inform the user that their login attempt has failed.
					console.log(error);
				} else {
					// the user has been logged in.
					console.log('logged in');
					console.log(Meteor.user());
				}
			});
			return false;
		},

		// login with google
		'click .login-with-google': function (e, t) {
			e.preventDefault();
			Meteor.loginWithGoogle({}, function (error) {
				if (error) {
					console.log(error);
				} else {
					console.log(Meteor.user());
					console.log('logged in with google');
					Session.set('currentUserName', Meteor.user().profile.name);
				}
			});
		},

		// create account submit
		'submit #create-account-form': function (e, t) {
			e.preventDefault();
			var email = t.find('#create-account-email').value,
			password = t.find('#create-account-password').value;
			// trim and validate the input
			Accounts.createUser({email: email, password: password}, function (error) {
				if (error) {
					// inform the user that account creation failed
					console.log(error);
				} else {
					// success, account has been created and the user has logged in successfully.
					console.log('account created');
				}
			});
			return false;
		},

		// log out
		'click .log-out': function (e) {
			e.preventDefault();
			Meteor.logout(function (error) {
				if (error) {
					console.log(error);
				}
			});
		},

		// add item
		'submit #add-item-form': function (e, t) {
			e.preventDefault();
			var itemName = t.find('#add-item-name').value;
			Items.insert({
				itemName: itemName,
				timeCreated: new Date(),
				itemAuthor: Session.get('currentUserName')
			});
		}
	});
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		// code to run on server at startup
		// ONLY UNCOMMENT THE BELOW LINE TO DELETE ALL OF ITEMS COLLECTION
		// Items.remove({});
	});
}
