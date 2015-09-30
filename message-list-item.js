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
	this.el = document.createElement('div');
	this.el.className = 'tweet';
	var img = document.createElement('img');
	img.src = this.data.user.profile_image_url_https;
	this.el.appendChild( img );
	var textNode = document.createTextNode( this.data.text );
	this.el.appendChild( textNode );
};