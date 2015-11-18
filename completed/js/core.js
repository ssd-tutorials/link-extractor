var systemObject = {
	thisObject : null,
	parseUrl : function(url) {
		"use strict";
		var thisATag = document.createElement('a');
		thisATag.href = url;
		var thisHostName = thisATag.hostname;
		return thisHostName;
	},
	displayLinkContainer : function() {
		"use strict";
		var thisDiv = '<div id="linkWrapper">';
		thisDiv += '<h2>The list of links found within the content of this page</h2>';
		thisDiv += '<ul id="linkContainer"></ul>';
		thisDiv += '</div>';
		systemObject.thisObject.after(thisDiv);		
	},
	displayLink : function(thisLink, thisActualUrl) {
		"use strict";
		var thisATag = '<li><a href="' + thisActualUrl;
		thisATag += '" target="_blank">';
		thisATag += thisLink;
		thisATag += '</a></li>';
		$('#linkContainer').append(thisATag);
	},
	findLinks : function(obj) {
		"use strict";
		obj.live('click', function(e) {
			e.preventDefault();
			if ($('#linkContainer').length === 0) {
				systemObject.thisObject = $(this);
				systemObject.displayLinkContainer();
				var thisHrefs = [];
				var thisLinks = $('a');
				if (thisLinks.length > 0) {
					jQuery.each(thisLinks, function() {
						var thisAHref = $(this).attr('href');
						if (thisAHref !== '' && thisAHref !== '#') {
							var thisAUrl = systemObject.parseUrl(thisAHref);
							thisHrefs.push(thisAUrl);
							systemObject.displayLink(thisAUrl, thisAHref);
						}
					});
				}
			}
		});
	}
};
$(function() {
	"use strict";
	systemObject.findLinks($('#extractLinks'));
});