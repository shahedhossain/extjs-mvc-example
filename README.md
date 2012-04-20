extjs-mvc-example
=================

Updated nested-loading example from ExtJS.

Put this project in the same parent directory as your ExtJS 4.1 download. eg Downloads/extjs, and Downloads/extjs-mvc-example

A problem with the original example is that it loads all the book data in a single request into the Books store, which isn't practical with a real app because it will be too much data. 

So in this example the index query only returns the books' names, and the rest of a book's data is queried it's selected. 

This example is setup to work locally without a web server. There are a few hacks to accomplish this:
 1. Ext.data.Connection is overridden in overrides.js to accept status code 0 as 200.
 2. Books.data.proxy.LocalRest converts regular rest urls into json file names. eg products -> products.json, products/1 -> products/1.json
 3. In order to access local files with Ajax, you'll need to open it in Chrome with the --allow-file-access-from-files command line argument.
   On a mac, paste the following in a terminal /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files 
   It's probably possible to get it to work on other browsers but I haven't looked into it.