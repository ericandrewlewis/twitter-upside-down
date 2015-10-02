/**
 * A view class for a chronological list of messages which presents the latest
 * first with reverse infinite scroll.
 *
 * @constructor
 */
var MessageListItemView = function(args) {
	this.data = args.data;
	this.imagesInContent = 0;
	this.imagesRendered = 0;
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
	img.onload = this.imageLoaded.bind( this );
	img.src = this.data.user.profile_image_url_https;
	this.imagesInContent++;
	imgWrapper.appendChild( img );
	this.el.appendChild( imgWrapper );
	var tweetContent = document.createElement('div');
	tweetContent.className = 'tweet-content';
	var time = humanTimeDifference( new Date().getTime(), new Date( this.data.created_at ).getTime() );
	var tweetHeader = document.createElement('div');

	tweetHeader.innerHTML = '<strong>' + this.data.user.name + '</strong> &middot; <a href="https://twitter.com/' + this.data.user.screen_name + '/status/' + this.data.id_str + '">' + time + '</a>';
	tweetContent.appendChild( tweetHeader );

	var text = this.data.text;
	if ( this.data.entities.urls.length ) {
		this.data.entities.urls.forEach(function(url) {
			text = text.replace( url.url, '<a target="_blank" href="'+ url.expanded_url+'">' + url.display_url + '</a>' );
		});
	}
	var content = document.createElement( 'div' );
	content.innerHTML = text;

	tweetContent.appendChild( content );

	if ( this.data.extended_entities ) {
		this.data.extended_entities.media.forEach(function(item) {
			self.imagesInContent++;
			var mediaContent = document.createElement( 'div' );
			mediaContent.className = 'media';
			var img = document.createElement('img');
			img.onload = self.imageLoaded.bind( self );
			img.src = item.media_url_https;
			mediaContent.appendChild( img );
			tweetContent.appendChild( mediaContent );
		});
	}
	this.el.appendChild( tweetContent );
};

MessageListItemView.prototype.imageLoaded = function() {
	this.imagesRendered++;
	if ( this.imagesRendered === this.imagesInContent ) {
		this.DOMContentLoaded();
	}
};

MessageListItemView.prototype.DOMContentLoaded = function() {
	this.el.style.display = '';
	// Don't let the new element modify previous scrolled state.
	window.scrollTo( 0, window.scrollY + this.el.offsetHeight );
}