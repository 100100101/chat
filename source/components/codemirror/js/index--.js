// if (process.env.NODE_ENV === 'development') {
//   require('./index.html')
// }
/*CSS*/
/*CSS*/
import 'tinymce/skins/lightgray/skin.min.css';
import 'tinymce/skins/lightgray/content.min.css';
// import 'tinymce/plugins/visualblocks/css/visualblocks.css';
// import 'element-ui/lib/theme-default/index.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
window.CodeMirror = require('codemirror/lib/codemirror.js');
import 'codemirror/mode/javascript/javascript.js';
/**/
// import Vue from 'vue';
// window.Vue = require('vue');
// import elementUi from 'element-ui';
/**/

/**/
/*Core - these two are required*/
import tinymce from 'tinymce/tinymce';
// window.tinymce = require('tinymce/tinymce.min.js');
import 'tinymce/themes/modern/theme';
import './locales/tinymce/ru.js';
/*Plugins*/
// import 'tinymce/plugins/paste/plugin';
// import 'tinymce/plugins/link/plugin';
// import 'tinymce/plugins/autoresize/plugin';
// import 'tinymce/plugins/save/plugin';
// import 'tinymce/plugins/code/plugin';
// import 'tinymce/plugins/table/plugin';
// import 'tinymce/plugins/image/plugin';
// import 'tinymce/plugins/visualblocks/plugin';
// import 'tinymce/plugins/textcolor/plugin';

// Vue.use(elementUi);
/**/
tinymce.init({
	// mode: "exact",
	// elements: "txtId1",
	// language: 'ru',
	// target: this.$el,
	selector: '#input',
	/*Content Appearance*/
	// body_class: 'my_class',
	// body_class: 'elm1=my_class, elm2=my_class',
	// body_id: 'my_id',
	// body_id: 'elm1=my_id, elm2=my_id2',
	// content_css : '/myLayout.css',  // resolved to http://domain.mine/myLayout.css
	// content_css : 'mycontent.css,mycontent2.css', // ['mycontent.css', 'mycontent2.css']
	// content_style: 'div {margin: 10px; border: 5px solid red; padding: 3px}',
	// visual_anchor_class: 'my-custom-class',
	// visual: false,
	/*/Content Appearance/*/

	/*Content Filtering*/
	// allow_conditional_comments: false,
	// allow_html_in_named_anchor: true,
	// allow_unsafe_link_target: true,
	// convert_fonts_to_spans : true,
	// extended_valid_elements : 'mycustomblock[id],mycustominline',
	// custom_elements : 'mycustomblock,~mycustominline', // Notice the ~ prefix to force a span element for the element
	element_format : 'html',
	// encoding: 'xml',
	// entities : '160,nbsp,162,cent,8364,euro,163,pound',
	// extended_valid_elements : 'img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name]',
	// fix_list_elements : true,
	// force_hex_style_colors : false,
	// force_p_newlines : true,
	// forced_root_block : 'p',
	// forced_root_block_attrs: {
	//   'class': 'myclass',
	//   'data-something': 'my data'
	// },
	// invalid_elements : 'strong,em',
	// invalid_styles: 'color font-size',
	// invalid_styles: {
	//   '*': 'color font-size', // Global invalid styles
	//   'a': 'background' // Link specific invalid styles
	// },
	// keep_styles: false,
	// protect: [
	//   /\<\/?(if|endif)\>/g,  // Protect <if> & </endif>
	//   /\<xsl\:[^>]+\>/g,  // Protect <xsl:...>
	//   /<\?php.*?\?>/g  // Protect php code
	// ],
	// remove_trailing_brs: true,
	schema: 'html5',
	// valid_children : '+body[style],-body[div],p[strong|a|#text]',
	// valid_classes: 'class1 class2 class3',
	// valid_classes: {
	//   '*': 'class1 class2 class3', // Global classes
	//   'a': 'class4 class5' // Link specific classes
	// },
	/*/Content Filtering/*/

	/*Content Formatting*/
	// block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3',
	// font_formats: 'Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n',
	// fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
	// formats: {
	//   alignleft: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'left'},
	//   aligncenter: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'center'},
	//   alignright: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'right'},
	//   alignfull: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'full'},
	//   bold: {inline : 'span', 'classes' : 'bold'},
	//   italic: {inline : 'span', 'classes' : 'italic'},
	//   underline: {inline : 'span', 'classes' : 'underline', exact : true},
	//   strikethrough: {inline : 'del'},
	//   forecolor: {inline : 'span', classes : 'forecolor', styles : {color : '%value'}},
	//   hilitecolor: {inline : 'span', classes : 'hilitecolor', styles : {backgroundColor : '%value'}},
	//   custom_format: {block : 'h1', attributes : {title : 'Header'}, styles : {color : 'red'}}
	// },
	// removeformat: [
	//   {selector: 'b,strong,em,i,font,u,strike', remove : 'all', split : true, expand : false, block_expand: true, deep : true},
	//   {selector: 'span', attributes : ['style', 'class'], remove : 'empty', split : true, expand : false, deep : true},
	//   {selector: '*', attributes : ['style', 'class'], split : false, expand : false, deep : true}
	// ],
	// indentation : '20pt',
	// style_formats_merge: true,
	/*/Content Formatting/*/

	// allow_conditional_comments: false,
	// allow_html_in_named_anchor: true,
	// allow_unsafe_link_target: true,
	// convert_fonts_to_spans : false,

	inline: true,
	// skin: false,
	// plugins: ['paste', 'link', 'autoresize', 'save', 'code', 'table', 'image', 'visualblocks', 'textcolor'],
	// toolbar: ['save', 'image forecolor backcolor'],
	toolbar: 'save | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons | codesample',
	// toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
	// visualblocks_default_state: true,

	// menubar: ['file', 'edit', 'insert', 'view', 'format', 'table', 'tools'],
	// menubar: false,
	// menu: {
	//   file: {title: 'File', items: 'newdocument'},
	//   edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
	//   insert: {title: 'Insert', items: 'link media | template hr'},
	//   view: {title: 'View', items: 'visualaid'},
	//   format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
	//   table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},
	//   tools: {title: 'Tools', items: 'spellchecker code'},
	// },
	// auto_focus: 'element',
	// external_plugins: {
	//   'testing': 'http://www.testing.com/plugin.min.js',
	//   'maths': 'http://www.maths.com/plugin.min.js'
	// },
	// hidden_input: false,
	// fixed_toolbar_container: '#mytoolbar',
	// event_root: '#root',
	// width : 300,
	// max_width: 500,
	// min_width: 400,
	// height : 300,
	// max_height: 500,
	// min_height: 100,
	// insert_toolbar: 'save',
	// theme: 'inlite',
	// preview_styles: false,
	// removed_menuitems: 'undo, redo',
	// resize: false,
	// resize: 'both',
	// selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
	// skin_url: '/css/mytinymceskin',
	// skin: 'lightgray',
	// statusbar: false,
	// theme_url: '/mytheme/mytheme.js',
	// theme: 'modern',
	//   toolbar: [
	//     'undo redo | styleselect | bold italic | link image',
	//    'alignleft aligncenter alignright'
	//  ],
	// toolbar2: 'alignleft aligncenter alignright',
	// toolbar: false,


	save_enablewhendirty: true,

	remove_linebreaks: false,
	force_br_newlines : true,
	force_p_newlines : false,
	// forced_root_block : '',
	verify_html : false,
	preformatted: true,
	cleanup: true,
	// editor_deselector: ".CodeMirror",

	save_oncancelcallback(data){
		console.log('Save canceled');
		console.log(data);
	},

	save_onsavecallback(data){
		console.log('Saved');
		console.log(data);
		tinymce.$('.CodeMirror').remove();
		document.location = `data:application/octet-stream;base64,${window.btoa(unescape(encodeURIComponent(data.bodyElement.innerHTML)))}`;
		// window.open(`data:application/octet-stream;base64,${btoa(data.bodyElement.innerHTML)}`, 'filename.html')
	},

	// startContent: '<span>some</span> html',
	init_instance_callback(editor){
		console.log('Editor: ' + editor.id + ' is now initialized.');

		// Click	native	Fires when the editor is clicked.
		// DblClick	native	Fires when the editor is double clicked.
		// MouseDown	native	Fires when a mouse button is pressed down inside the editor.
		// MouseUp	native	Fires when a mouse button is released inside the editor.
		// MouseMove	native	Fires when the mouse is moved within the editor.
		// MouseOver	native	Fires when a new element is being hovered within the editor.
		// MouseOut	native	Fires when a element is no longer being hovered within the editor.
		// MouseEnter	native	Fires when mouse enters the editor.
		// MouseLeave	native	Fires when mouse leaves the editor.
		// KeyDown	native	Fires when a key is pressed within the the editor.
		// KeyPress	native	Fires when a key is pressed within the the editor.
		// KeyUp	native	Fires when a key is released within the the editor.
		// ContextMenu	native	Fires when the context menu is invoked within the editor.
		// Paste	native	Fires when a paste is done within within the the editor.

		// editor.on('click', function (e) {
		//   console.log('Element clicked:', e.target.nodeName);
		// });
		tinymce.$('.code').each(function(){
			CodeMirror.fromTextArea(this, {
				mode: 'text/javascript',
				styleActiveLine: true,
				lineNumbers: true,
				lineWrapping: true
				,theme:'monokai'
			});
		});

	},

	setup(editor){
		console.log('setup');
		// editor.on('click', function(e) {
		//   console.log('Editor was clicked');
		// });
		// this.activeEditor.setContent('<span>some</span> html', {format : 'raw'});

		// Init	core	Fires when the editor is initialized.
		// Focus	core	Fires when the editor is focused.
		// Blur	core	Fires when the editor is blurred.
		// BeforeSetContent	core	Fires before contents being set to the editor.
		// SetContent	core	Fires after contents been set to the editor.
		// GetContent	core	Fires after the contents been extracted from the editor.
		// PreProcess	core	Fires when the contents in the editor is being serialized.
		// PostProcess	core	Fires when the contents in the editor is being serialized.
		// NodeChange	core	Fires when selection inside the editor is changed.
		// Undo	core	Fires when the contents has been undo:ed to a previous state.
		// Redo	core	Fires when the contents has been redo:ed to a previous state.
		// Change	core	Fires when undo level is added to the editor.
		// Dirty	core	Fires when editor contents is being considered dirty.
		// Remove	core	Fires when the editor is removed.
		// ExecCommand	core	Fires after a command has been executed.
		// PastePreProcess	paste	Fires when contents gets pasted into the editor.
		// PastePostProcess	paste	Fires when contents gets pasted into the editor.

		editor.on('init', (e) => {
			editor.setContent(
				require('./content.html'),
				{format: 'raw'}
			);

			editor.on('change', (e) => {//undo,redo
				console.log('change');
				// if(this.vueChange || editor.undoManager.data.length<=1) return unwatch();
				// controller.$data = controller.$options.data();
			});
			//
			// editor.on('undo', change)
			// editor.on('redo', change)
		});

	},

});


/*background dynamic gradient*/
(function changeBackground() {
	let
		hue = 360
		,light = 0;

	setInterval(() => {
		let
			col1 = Math.abs((hue % 720) - 360)
			,col2 = Math.abs( ( (hue+90) % 720) - 360)
		;
		hue++;

    //values for light adjustment not used
		let
			light1 = Math.abs( (light % 40) - 20)+60
			,light2 = Math.abs( ( (light+10) % 40) - 20)+60
		;
		light++;

		document.body.style.background = 'linear-gradient(to right, hsl('+col1 +',70%, 75%) 0%,hsl('+col2 +',90%,75%) 100%)';
	}, 64);

})();
