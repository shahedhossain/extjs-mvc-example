extjs-mvc-example
=================

Updated nested-loading example from ExtJS.

Put this project in the same parent directory as your ExtJS 4.1 download. eg Downloads/extjs, and Downloads/extjs-mvc-example

Improvements
------------

 1. Original loads all the book data in a single request into the Books store, which is not practical with a real app because it will be too much data. So the index query only returns books' names. The full book data is queried when selected. 
 2. Implements Ext.util.History with Router for controller dispatch. See http://www.sencha.com/forum/showthread.php?130694-Executing-MVC-controller-methods 

Note
------

This example is setup to work locally without a web server. There are a few hacks to accomplish this:
 1. Ext.data.Connection is overridden in overrides.js to accept status code 0 as 200.
 2. Books.data.proxy.LocalRest converts regular rest urls into json file names. eg products -> products.json, products/1 -> products/1.json
 3. In order to access local files with Ajax, you'll need to open it in Chrome with the --allow-file-access-from-files command line argument.
   On a mac, paste the following in a terminal /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files 
   It's probably possible to get it to work on other browsers but I haven't looked into it.