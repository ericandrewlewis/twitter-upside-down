/**
 * A view class for a chronological list of messages which presents the latest
 * first with reverse infinite scroll.
 *
 * @constructor
 */
var MessageListView = function(args) {
	this.messagesPerPage = args.messagesPerPage;
	this.el = args.el;
	this.messages = args.messages;
	window.setInterval( this.checkToAddMore.bind( this ), 75 );
};

/**
 * Load more messages into the DOM.
 *
 * Automatically deletes messages from the store.
 */
MessageListView.prototype.loadMore = function() {
	if ( ! this.messages.length ) {
		return;
	}
	var lowerBound = this.messages.length - this.messagesPerPage;
	if ( lowerBound < 0 ) {
		lowerBound = 0;
	}
	for ( var i = this.messages.length - 1; i >= lowerBound; i-- ) {
		var listItem = new MessageListItemView( { data: this.messages[i] } );
		if ( this.el.children ) {
			this.el.insertBefore( listItem.el, this.el.firstChild );
		} else {
			this.el.appendChild( listItem.el );
		}
		// Remove the message from the store.
		this.messages = this.messages.splice( 0, i );
	}
};

/**
 * Check scroll position and load more messages as needed.
 */
MessageListView.prototype.checkToAddMore = function() {
	if ( typeof this.lastScroll === 'undefined' ) {
		this.lastScroll = window.scrollY;
		return;
	}
	if ( this.lastScroll === window.scrollY ) {
		return;
	}
	// Need to decide when to try to load more previous messages.
	if ( window.scrollY < 400 ) {
		this.loadMore();
	}
	this.lastScroll = window.scrollY;
};