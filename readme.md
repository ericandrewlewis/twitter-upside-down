A messages list contains messages. On first load, it should load two viewport paginated pages of messages, and automatically scroll to the bottom. When scrolling vertically there should be a mechanism to auto-load older messages.

If not enough messages exist to fill the vertical space, list them from the top.

Loading previous messages should not modify our currently scrolled position.
This dude wrote about adding content to the top of a container and maintaining scroll state. (http://kirbysayshi.com/2013/08/19/maintaining-scroll-position-knockoutjs-list.html)

