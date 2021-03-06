var Songs = new Meteor.Collection('songs');

if (Meteor.isClient) {

	if (Meteor.user()) {
		Session.set('currentUserName', Meteor.user().profile.name);
	}

	Template.queue.currentUserName = function () {
		return Session.get('currentUserName');
	}

	Template.queue.songs = function () {
		return Songs.find({});
	}

	Template.queue.currentUserSongs = function () {
		return Songs.find({
			addedBy: Session.get('currentUserName')
		});
	}

	Template.main.events({

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

		// log out
		'click .log-out': function (e, t) {
			e.preventDefault();
			Meteor.logout(function (error) {
				if (error) {
					console.log(error);
				}
			});
		},

		// song search
		'submit #search-form': function (e, t) {
			e.preventDefault();
			var query = $(e.currentTarget).children('input#query').val();
			Meteor.call('searchSongs', query, function(error, response) {
				if (error) {
					console.log(error)
				} else {
					console.log(response.content);
					$('#results').html('').html(response.content);
					$('#results .msg').remove();
					$('#results table').attr({
						'cellspacing': '',
						'width': ''
					});
				}
			});
			$(e.currentTarget).children('input[type="text"]').val('').blur();
		},

		// add song
		'click #results table tr': function (e, t) {
			e.preventDefault();
			var songId = $(e.currentTarget).children('td:nth-child(1)').html(),
			songTitle = $(e.currentTarget).children('td:nth-child(2)').html(),
			songArtist = $(e.currentTarget).children('td:nth-child(3)').html();
			console.log(songId);
			Songs.insert({
				songId: songId,
				songTitle: songTitle,
				songArtist: songArtist,
				addedBy: Session.get('currentUserName')
			});
		}
	});
} // end Meteor.isClient

if (Meteor.isServer) {
	Meteor.startup(function () {
		// code to run on server at startup
		// ONLY UNCOMMENT THE BELOW LINE TO DELETE ALL OF SONGS COLLECTION
		// Songs.remove({});
	});

	Meteor.methods({
		searchSongs: function (query) {
			this.unblock();
			var url = 'http://www.singsingmedia.com/search/search_ajax.php',
			response = Meteor.http.post(url, {params: {query: query}});
			return response;
		}
	});
} // end Meteor.isServer
