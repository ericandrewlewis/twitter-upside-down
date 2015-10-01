/**
 * A view class for a chronological list of messages which presents the latest
 * first with reverse infinite scroll.
 *
 * @constructor
 */
var MessageListItemView = function(args) {
	this.data = args.data;
	this.render();
};

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function humanTimeDifference(unixtime1, unixtime2) {
	var difference = unixtime1 - unixtime2;
	difference = Math.ceil( difference / 1000 );
	if ( difference < 60 )  {
		return difference + 's';
	}
	difference = Math.ceil( difference / 60 );
	if ( difference < 60 )  {
		return difference + 'm';
	}
	difference = Math.ceil( difference / 24 );
	if ( difference < 24 )  {
		return difference + 'h';
	}
	var date = new Date( unixtime2 );
	return months[date.getMonth()] + date.getDate();
};

MessageListItemView.prototype.render = function() {
	var self = this;
	this.el = document.createElement('div');
	this.el.className = 'tweet';
	this.el.style.display = 'none';
	var imgWrapper = document.createElement('div');
	imgWrapper.className = 'avatar';
	var img = document.createElement('img');
	img.onload = function() {
		self.DOMContentLoaded();
	};
	img.src = this.data.user.profile_image_url_https;
	imgWrapper.appendChild( img );
	this.el.appendChild( imgWrapper );
	var tweetContent = document.createElement('div');
	tweetContent.className = 'tweet-content';
	var time = humanTimeDifference( new Date().getTime(), new Date( this.data.created_at ).getTime() );
	var tweetHeader = document.createElement('div');
	tweetHeader.innerHTML = '<strong>' + this.data.user.name + '</strong> &middot; ' + time;
	tweetContent.appendChild( tweetHeader );

	var textNode = document.createTextNode( this.data.text );
	tweetContent.appendChild( textNode );
	this.el.appendChild( tweetContent );
};

MessageListItemView.prototype.DOMContentLoaded = function() {
	this.el.style.display = '';
	// Don't let the new element modify previous scrolled state.
	window.scrollTo( 0, window.scrollY + this.el.offsetHeight );
}