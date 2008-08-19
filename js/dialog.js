tinyMCEPopup.requireLangPack();

var SyntaxHLDialog = {
	init : function() {
	},

	insert : function() {
		var f = document.forms[0], textarea_output, options = '';
		
		//If no code just return.
		if(f.syntaxhl_code.value == '') {
			tinyMCEPopup.close();
			return false;
		}
		
		if(f.syntaxhl_nogutter.checked) {
			options += ':nogutter';
		}
		if(f.syntaxhl_nocontrols.checked) {
			options += ':nocontrols';
		}
		if(f.syntaxhl_collapse.checked) {
			options += ':collapse';
		}
		if(f.syntaxhl_showcolumns.checked) {
			options += ':showcolumns';
		}
		
		if(f.syntaxhl_firstline.value != '') {
			var linenumber = parseInt(f.syntaxhl_firstline.value);
			options += ':firstline[' + linenumber + ']';
		}
		
		textarea_output = '<textarea name="code" ';
		textarea_output += 'class="' + f.syntaxhl_language.value + options + '" cols="50" rows="15">';
		textarea_output +=  f.syntaxhl_code.value;
		textarea_output += '</textarea> '; /* note space at the end, had a bug it was inserting twice? */
		tinyMCEPopup.editor.execCommand('mceInsertContent', false, textarea_output);
		tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(SyntaxHLDialog.init, SyntaxHLDialog);