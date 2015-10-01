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

	var tweetHeader = document.createElement('div');
	var tweetName = document.createElement('strong');
	var tweetNameText = document.createTextNode( this.data.user.name );
	tweetName.appendChild( tweetNameText );
	tweetHeader.appendChild( tweetName );
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