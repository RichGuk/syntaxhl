tinyMCEPopup.requireLangPack();

var SyntaxHLDialog = {
  init : function() {
    // get arguments passed from plugin to window.
    var editor_content = tinyMCEPopup.getWindowArg('editor_content');
    var editor_options = tinyMCEPopup.getWindowArg('editor_options');
    
    // check to see if any content was passed to window
    if(editor_content != undefined) {
      // select form and place snippet code into editor window
      var f = document.forms[0];
      tinyMCEPopup.editor.dom.setHTML(f.syntaxhl_code, editor_content);

      // check for each option and update form elements accordingly
      if(editor_options['brush']) {
        for(var i = 0; i < f.syntaxhl_language.options.length; i++) {
          if(f.syntaxhl_language.options[i].value == editor_options['brush']) {
            f.syntaxhl_language.selectedIndex = i;
            break;
          }
        }
      }
      if(editor_options['gutter'] && editor_options['gutter'] == 'false') {
        f.syntaxhl_nogutter.checked = 'true';
      }
      if(editor_options['light'] && editor_options['light'] == 'true') {
        f.syntaxhl_light.checked = 'true';
      }
      if(editor_options['collapse'] && editor_options['collapse'] == 'true') {
        f.syntaxhl_collapse.checked = 'true';
      }
      if(editor_options['fontsize']) {
        f.syntaxhl_fontsize.value = editor_options['fontsize'];
      }
      if(editor_options['first-line']) {
        f.syntaxhl_firstline.value = editor_options['first-line'];
      }
      if(editor_options['highlight']) {
        f.syntaxhl_highlight.value = editor_options['highlight'].replace(/[\[\]']+/g,'');
      }
      if(editor_options['html-script'] && editor_options['html-script'] == 'true') {
        f.syntaxhl_html_script.checked = 'true';
      }
      if(editor_options['toolbar'] && editor_options['toolbar'] == 'false') {
        f.syntaxhl_hide_toolbar.checked = 'true';
      }
    }
  },

  insert : function() {
    var f = document.forms[0], textarea_output, options = '', replace_element;

    //If no code just return.
    if(f.syntaxhl_code.value == '') {
      tinyMCEPopup.close();
      return false;
    }

    // get replacement argument to determine return type
    replace_element = tinyMCEPopup.getWindowArg('replace_content');

    if(f.syntaxhl_nogutter.checked) {
      options += 'gutter: false; ';
    }
    if(f.syntaxhl_light.checked) {
      options += 'light: true; ';
    }
    if(f.syntaxhl_collapse.checked) {
      options += 'collapse: true; ';
    }
    if(f.syntaxhl_fontsize.value != '') {
      var fontsize=parseInt(f.syntaxhl_fontsize.value);
      options += 'fontsize: ' + fontsize + '; ';
    }
    if(f.syntaxhl_firstline.value != '') {
      var linenumber = parseInt(f.syntaxhl_firstline.value);
      options += 'first-line: ' + linenumber + '; ';
    }
    if(f.syntaxhl_highlight.value != '') {
      options += 'highlight: [' + f.syntaxhl_highlight.value + ']; ';
    }
    if(f.syntaxhl_html_script.checked) {
      options += 'html-script: true; ';
    }
    if(f.syntaxhl_hide_toolbar.checked) {
      options += 'toolbar: false; ';
    }

    textarea_output = '<pre class="brush: ';
    textarea_output += f.syntaxhl_language.value + '; ' + options + '">';
    textarea_output +=  tinyMCEPopup.editor.dom.encode(f.syntaxhl_code.value);
    textarea_output += '</pre> '; /* note space at the end, had a bug it was inserting twice? */
    
    // check for replace_element option value and return output accordingly
    if(replace_element == false) {
      tinyMCEPopup.editor.execCommand('mceInsertContent', false, textarea_output);
    } else {
      tinyMCEPopup.editor.execCommand('mceReplaceContent', false, textarea_output);
    }
    tinyMCEPopup.close();
  }
};

tinyMCEPopup.onInit.add(SyntaxHLDialog.init, SyntaxHLDialog);