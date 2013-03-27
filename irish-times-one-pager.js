/**
Copyright 2013 Cathal Garvey. http://cgarvey.ie/

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var itonepager_version = 0.8;
var itonepager_regex = new RegExp( "page=([^&#]*)", 'g' );
//alert( "Loaded IT (" + itonepager_version + ")" );

if( window.location ) {
	var itonepager_loc = window.location;
	var itonepager_url = itonepager_loc.href;

	if( itonepager_url ) {
		// Sanitise
		if( itonepager_url.substr( itonepager_url.length - 1 ) == "#" ) itonepager_url = itonepager_url.substr( 0, itonepager_url.length - 1 );
		if( itonepager_url.substr( itonepager_url.length - 1 ) == "?" ) itonepager_url = itonepager_url.substr( 0, itonepager_url.length - 1 );

		if( itonepager_url.indexOf( "?" ) > -1 ) {
			// URL contains some search portion (GET args), check for existing page arg.
			if( itonepager_url.indexOf( "page=" ) > -1 ) {
				itonepager_url = itonepager_url.replace( itonepager_regex, "page=0" );
				//alert( "Have ?, and existing page arg" );
			}
			else {
				// URL has no GET params / request args, but does it have a 
				if( itonepager_loc.hash && itonepager_loc.hash != "" ) {
					// Now, it doesn't matter what's in the hash fragment, we just need to stick our page argument between the path and hash fragment
					itonepager_url = itonepager_url.substr( 0, itonepager_url.indexOf( "#" ) ) + "&page=0" + itonepager_url.substr( itonepager_url.indexOf( "#" ) );
					//alert( "Have ? (no existing page arg), and have #, url now.." );
				}
				// We have some request GET params, but no hash fragment, and no existing page argument, so just append it
				else {
					//alert( "Have args, but no page, url now..." );
					itonepager_url = itonepager_url + "&page=0";
				}
			}
		}
		else {
			// No params, but do we have hash fragment?
			if( itonepager_loc.hash && itonepager_loc.hash != "" ) {
				itonepager_url = itonepager_url.substr( 0, itonepager_url.indexOf( "#" ) ) + "?page=0" + itonepager_url.substr( itonepager_url.indexOf( "#" ) );
				//alert( "No args, but have #, url now.." );
			}
			else {
				// straight forward URL (no hash frag, no request params), just append the page suffix
				//alert( "No ? no #, url now .." );
				itonepager_url = itonepager_url + "?page=0";
			}
		}


		// Has URL changed? If so, reload the page
		if( itonepager_url != window.location.href ) {
			//alert( "Reloading page!\n" + itonepager_url );
			window.location.replace( itonepager_url );
		}
		else {
			//alert( "Page URL stays the same, no reload" );
		}
	}
	else {
		//alert( "Bad location href - not yet loaded?" );
	}
}
else {
	//alert( "Bad location - not yet loaded?" );
}
