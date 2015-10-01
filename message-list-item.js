/**
 * A view class for a chronological list of messages which presents the latest
 * first with reverse infinite scroll.
 *
 * @constructor
 */
var MessageListItem = function(args) {
	this.data = args.data;
	this.render();
};

MessageListItem.prototype.render = function() {
	var self = this;
	this.el = document.createElement('div');
	this.el.className = 'tweet';
	var tweetHeader = document.createElement('div');
	var tweetName = document.createElement('strong');
	var tweetNameText = document.createTextNode( this.data.user.name );
	tweetName.appendChild( tweetNameText );
	this.el.appendChild( tweetName);

	var imgWrapper = document.createElement('div');
	imgWrapper.className = 'avatar';
	var img = document.createElement('img');
	img.onload = function() {
		self.DOMContentLoaded();
	};
	img.src = this.data.user.profile_image_url_https;
	imgWrapper.appendChild( img );
	this.el.appendChild( imgWrapper );
	var textWrapper = document.createElement('div');
	textWrapper.className = 'tweet-content';
	var textNode = document.createTextNode( this.data.text );
	textWrapper.appendChild( textNode );
	this.el.appendChild( textWrapper );
};

MessageListItem.prototype.DOMContentLoaded = function() {
	// Don't let the new element modify previous scrolled state.
	window.scrollTo( 0, window.scrollY + this.el.offsetHeight );
}