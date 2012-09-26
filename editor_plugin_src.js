/**
 * Copied from tinymce example plugin and modifed to suite its needs.
 *
 * http://27smiles.com
 * @author Richard Grundy
 */

(function() {
	//Load the language file.
	tinymce.PluginManager.requireLangPack('syntaxhl');
	
	tinymce.create('tinymce.plugins.SyntaxHL', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
			ed.addCommand('mceSyntaxHL', function() {
				ed.windowManager.open({
					file : url + '/dialog.htm',
					width : 450 + parseInt(ed.getLang('syntaxhl.delta_width', 0)),
					height : 400 + parseInt(ed.getLang('syntaxhl.delta_height', 0)),
					inline : 1
				}, {
					plugin_url : url, // Plugin absolute URL
					replace_content : false
				});
			});

			// Register example button
			ed.addButton('syntaxhl', {
				title : 'syntaxhl.desc',
				cmd : 'mceSyntaxHL',
				image : url + '/img/highlight.gif'
			});

			// Add a node change handler, selects the button in the UI when a image is selected
			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('syntaxhl', n.nodeName == 'IMG');
			});

			// add edit snipped option to context menu
			if(ed.plugins.contextmenu != undefined)
			{
				ed.plugins.contextmenu.onContextMenu.add(function(sender, menu){
					// check currently selected node for syntaxhl 'brush:' parameter
					if(isBrush()) {
						// define sub menu
						var sub_menu = menu.add({
							title : 'SyntaxHL - Edit',
							icon : '/img/highlight.gif',
							onclick : function() { 
								// get current node and select it for replacement
								var currentNode = ed.selection.getNode();
								// select entire snippted and limit to element type.
								ed.selection.select(currentNode, currentNode.nodeName); 
								ed.windowManager.open({
									file : url + '/dialog.htm',
									width : 450 + parseInt(ed.getLang('syntaxhl.delta_width', 0)),
									height : 400 + parseInt(ed.getLang('syntaxhl.delta_height', 0)),
									inline : 1
								}, {
									plugin_url : url, // Plugin absolute URL
									replace_content : true,
									editor_content : currentNode.innerHTML,
									editor_options : getParameters(currentNode.className)
								});

							}
						});
					}
					else // selection is not a syntaxhl snippet so create a new one
					{
						// create new contxt menu to create new snytaxHL element
						var sub_menu = menu.add({
							title : 'SyntaxHL - New',
							icon : '/img/highlight.gif',
							onclick : function() {
								ed.windowManager.open({
									file : url + '/dialog.htm',
									width : 450 + parseInt(ed.getLang('syntaxhl.delta_width', 0)),
									height : 400 + parseInt(ed.getLang('syntaxhl.delta_height', 0)),
									inline : 1
								}, {
									plugin_url : url, // Plugin absolute URL
									replace_content : false
								});

							}
						});
					}
				});
			}
		},

		/**
		 * Creates control instances based in the incomming name. This method is normally not
		 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
		 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
		 * method can be used to create those.
		 *
		 * @param {String} n Name of the control to create.
		 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
		 * @return {tinymce.ui.Control} New control instance or null if no control was created.
		 */
		createControl : function(n, cm) {
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'Syntax Highlighter',
				author : 'Richard Grundy',
				authorurl : 'http://27smiles.com',
				infourl : 'http://27smiles.com',
				version : "1.0"
			};
		}
	});

	/**
	 * Check the currently selected node to ensure it is a valid syntaxHighlighter 
	 * brush.
	 *
	 * @return boolean true if node is valid brush
	 */
	function isBrush() {
		var node = tinyMCE.activeEditor.selection.getNode();
		if(node.nodeName != null && node.nodeName == 'PRE' && node.className.indexOf('brush:') != -1)
		{
			return true;
		}
		return false;
	}

	/**
	 * Parses Syntax Highlighters parameters within the class attribute and
	 * returns them in an associative array.
	 *
	 * @param params string or Syntax Highlighter parameters to parse
	 *
	 * @return array
	 */
	function getParameters(params) {
		var parsedItems = params.replace(/ /g, '').replace(/;([^;]*)$/, '').split(';');
		var paramArray = new Array();
		for(var i = 0; i < parsedItems.length; i++)
		{
			var option = parsedItems[i].split(':');
			paramArray[option[0]] = option[1];
		}
		return paramArray;
	}

	// Register plugin
	tinymce.PluginManager.add('syntaxhl', tinymce.plugins.SyntaxHL);
})();