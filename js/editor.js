var infoMsg=document.getElementById("infoMsg"),errMsg=document.getElementById("errMsg"),save1=document.getElementById("save1"),save2=document.getElementById("save2"),editorLabel=document.getElementById("editorLabel"),starting_value={},sourceEditor=ace.edit("output");async function syncContents(tab){var j=docEditor.getValue();if(insync=!0,sourceEditor.getSession().setValue(JSON.stringify(j,null,2)),sourceEditor.clearSelection(),insync=!1,"advisoryTab"==tab&&pugRender&&document.getElementById("render"))if("sa"==schemaName){var cSet=new Set;for(var d of j.CVE_list)if(d.CVE)for(var x of d.CVE.match(/CVE-\d{4}-[a-zA-Z\d\._-]{4,}/gim))cSet.add(x);if(cSet.size>0){var r=await textUtil.getDocuments("cve",Array.from(cSet)),CVE_map={};for(var c of r)CVE_map[c.body.CVE_data_meta.ID]=c.body,cSet.delete(c.body.CVE_data_meta.ID);if(cSet.size>0){var nr=await textUtil.getDocuments("nvd",Array.from(cSet));for(c of nr)CVE_map[c.body.CVE_data_meta.ID]=c.body}var cSum=textUtil.sumCVE(j.CVE_list,CVE_map);document.getElementById("render").innerHTML=pugRender({renderTemplate:"page",doc:j,cmap:CVE_map,cSum:cSum})}else document.getElementById("render").innerHTML=pugRender({renderTemplate:"page",doc:j,cmap:{},cSum:{}})}else document.getElementById("render").innerHTML=pugRender({renderTemplate:"page",doc:j});"mitreTab"==tab&&document.getElementById("mitreweb")&&(document.getElementById("mitreweb").innerHTML=pugRender({renderTemplate:"mitre",doc:j})),"jsonTab"==tab&&document.getElementById("outjson")&&(document.getElementById("outjson").textContent=textUtil.getMITREJSON(textUtil.reduceJSON(j)))}function tzOffset(x){var offset=new Date(x).getTimezoneOffset(),o=Math.abs(offset);return(offset<0?"+":"-")+("00"+Math.floor(o/60)).slice(-2)+":"+("00"+o%60).slice(-2)}sourceEditor.getSession().setMode("ace/mode/json"),sourceEditor.getSession().on("change",incSourceChanges),sourceEditor.setOptions({maxLines:480,wrap:!0}),sourceEditor.$blockScrolling=1/0,JSONEditor.defaults.resolvers.unshift(function(schema){if("string"===schema.type&&"radio"===schema.format)return"radio"}),JSONEditor.defaults.templates.custom=function(){return{compile:function(template){return function(context){return eval(template)}}}},JSONEditor.defaults.editors.string=JSONEditor.defaults.editors.string.extend({addLink:function(link){this.control&&this.control.appendChild(link)}}),JSONEditor.defaults.options.upload=function(type,file,cbs){var xhr=new XMLHttpRequest,fd=new FormData;fd.append("file1",file),this.xhr=xhr;this.xhr.upload.addEventListener("loadstart",function(e){cbs.updateProgress(0)},!1),this.xhr.upload.addEventListener("progress",function(e){if(e.lengthComputable){var percentage=Math.round(100*e.loaded/e.total);cbs.updateProgress(percentage)}},!1),xhr.upload.addEventListener("load",function(e){cbs.updateProgress(100)},!1);var uf=function(e){cbs.failure("Upload failed:")};xhr.addEventListener("error",uf,!1),xhr.addEventListener("abort",uf,!1),xhr.upload.addEventListener("error",uf,!1),xhr.upload.addEventListener("abort",uf,!1),xhr.onreadystatechange=function(oEvent){4===xhr.readyState&&(200===xhr.status?'{"ok":"1"}'==xhr.response?cbs.success(file.name):cbs.failure("Upload failed: "+xhr.statusText):404===xhr.status&&cbs.failure("Upload failed: ID Not found. Try saving document first!"))},xhr.open("POST",window.location+"/file"),xhr.setRequestHeader("X-CSRF-Token",csrfToken),xhr.overrideMimeType("text/plain; charset=x-user-defined-binary"),xhr.send(fd)},JSONEditor.defaults.editors.radio=JSONEditor.AbstractEditor.extend({setValue:function(value,initial){var sanitized=value=this.typecast(value||"");if(this.schema.enum.indexOf(sanitized)<0&&(sanitized=this.schema.enum[0]),this.value!==sanitized){for(var input in this.inputs)if(input===sanitized)return this.inputs[input].checked=!0,this.value=sanitized,this.jsoneditor.notifyWatchers(this.path),!1}},register:function(){if(this._super(),this.inputs)for(var i=0;i<this.inputs.length;i++)this.inputs[i].setAttribute("name",this.formname)},unregister:function(){if(this._super(),this.inputs)for(var i=0;i<this.inputs.length;i++)this.inputs[i].removeAttribute("name")},getNumColumns:function(){for(var longest_text=this.getTitle().length,i=0;i<this.schema.enum.length;i++)longest_text=Math.max(longest_text,this.schema.enum[i].length+4);return Math.min(12,Math.max(longest_text/7,2))},typecast:function(value){return"boolean"===this.schema.type?!!value:"number"===this.schema.type?1*value:"integer"===this.schema.type?Math.floor(1*value):""+value},getValue:function(){return this.value},removeProperty:function(){this._super();for(var i=0;i<this.inputs.length;i++)this.inputs[i].style.display="none";this.description&&(this.description.style.display="none"),this.theme.disableLabel(this.label)},addProperty:function(){this._super();for(var i=0;i<this.inputs.length;i++)this.inputs[i].style.display="";this.description&&(this.description.style.display=""),this.theme.enableLabel(this.label)},sanitize:function(value){return"number"===this.schema.type?1*value:"integer"===this.schema.type?Math.floor(1*value):""+value},build:function(){var i,self=this;this.options.compact||(this.header=this.label=this.theme.getFormInputLabel(this.getTitle())),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description)),this.select_options={},this.select_values={};var e=this.schema.enum||[],options=[];for(i=0;i<e.length;i++)this.sanitize(e[i])===e[i]&&(options.push(e[i]+""),this.select_values[e[i]+""]=e[i]);for(this.input_type="radiogroup",this.inputs={},this.controls={},i=0;i<options.length;i++){this.inputs[options[i]]=this.theme.getRadio(),this.inputs[options[i]].setAttribute("value",options[i]),this.inputs[options[i]].setAttribute("name",this.formname),this.inputs[options[i]].setAttribute("id",this.formname+options[i]);var label=this.theme.getRadioLabel(this.schema.options&&this.schema.options.enum_titles&&this.schema.options.enum_titles[i]?this.schema.options.enum_titles[i]:options[i]);label.setAttribute("for",this.formname+options[i]),label.setAttribute("class","icn lbl "+options[i]),this.controls[options[i]]=this.theme.getFormControl(this.inputs[options[i]],label)}this.control=this.theme.getRadioGroupHolder(this.controls,this.label,this.description),this.container.appendChild(this.control),this.control.addEventListener("change",function(e){e.preventDefault(),e.stopPropagation();var val=e.target.value,sanitized=val;-1===self.schema.enum.indexOf(val)&&(sanitized=self.schema.enum[0]),self.value=sanitized,self.parent?self.parent.onChildEditorChange(self):self.jsoneditor.onChange(),self.jsoneditor.notifyWatchers(self.path)})},enable:function(){if(!this.always_disabled)for(var opts=Object.keys(this.inputs),i=0;i<opts.length;i++)this.inputs[opts[i]].disabled=!1;this._super()},disable:function(){for(var opts=Object.keys(this.inputs),i=0;i<opts.length;i++)this.inputs[opts[i]].disabled=!0;this._super()},destroy:function(){this.label&&this.label.parentNode.removeChild(this.label),this.description&&this.description.parentNode.removeChild(this.description);for(var i=0;i<this.inputs.length;i++)this.inputs[i].parentNode.removeChild(this.inputs[i]);this._super()}}),JSONEditor.defaults.editors.dateTime=JSONEditor.defaults.editors.string.extend({getValue:function(){if(this.value&&this.value.length>0){this.value.match(/^\d{4}-\d{2}-\d{2}T[\d\:\.]+$/)&&(this.value=this.value+tzOffset(this.value));var d=new Date(this.value);return d instanceof Date&&!isNaN(d.getTime())?d.toISOString():this.value}return""},setValue:function(val){val&&this.value.match(/^\d{4}-\d{2}-\d{2}T[\d\:\.]+$/)&&(val+=tzOffset());var d=new Date(val);if(d instanceof Date&&!isNaN(d.getTime())&&d.getTime()>0){var x=new Date(d.getTime()-6e4*d.getTimezoneOffset());this.value=this.input.value=x.toJSON().slice(0,16)}else this.value=this.input.value="";this.jsoneditor.notifyWatchers(this.path)},build:function(){this.schema.format="datetime-local",this._super(),this.input.className="txt";var tzInfo=document.createElement("span");tzInfo.className="lbl tgrey",tzInfo.textContent=Intl.DateTimeFormat().resolvedOptions().timeZone,this.input.parentNode.appendChild(tzInfo)}}),JSONEditor.defaults.editors.taglist=JSONEditor.defaults.editors.string.extend({getValue:function(){return this.input&&this.input.value?this.input.value.split(/[\s,]+/):[]},setValue:function(val){val instanceof Array?this.input.value=val.join(" "):this.input.value=val,this.onChange(!0)},build:function(){this.schema.format="taglist",this._super()}}),JSONEditor.defaults.editors.simplehtml=JSONEditor.defaults.editors.string.extend({getValue:function(){var ret=this._super();return this.wysLoaded&&(ret=this.wys.getValue()),ret},setValue:function(value,initial,from_template){if(this._super(value,initial,from_template),this.wysLoaded){this.wys.setValue(this.input.value);var sa=this.wys.getValue();sa!=this.input.value&&(this.input.value=sa,this.onChange(!0))}},build:function(){this.schema.format=this.format="hidden",this._super(),this.toolbar=document.getElementById("commentTemplate").getElementsByClassName("toolbar")[0].cloneNode(!0),this.contentDiv=document.createElement("div"),this.contentDiv.className="pur ht4 fil",this.toolbar.className="fil shd wht stk toolbar",this.input.parentNode.insertBefore(this.toolbar,this.input),this.input.parentNode.appendChild(this.contentDiv)},afterInputReady:function(){var self=this;this.wys=new wysihtml5.Editor(this.contentDiv,{toolbar:this.toolbar,parserRules:wysihtml5ParserRules,showToolbarAfterInit:!1});this.wys.on("load",function(){self.wys.setValue(self.input.value);var sa=self.wys.getValue();sa!=self.input.value&&(self.input.value=sa),self.wysLoaded=!0}),this.wys.on("change",function(){self.value=self.input.value=self.wys.getValue(),self.is_dirty=!0,self.onChange(!0)}),this.wys.on("dragleave",function(event){event.preventDefault(),event.stopPropagation()}),this.wys.on("drop",function(event){event.preventDefault(),event.stopPropagation();var files=event.dataTransfer.files,reader=new FileReader;reader.onload=function(e){self.wys.composer.commands.exec("insertImage",e.target.result),self.value=self.input.value=self.wys.getValue(),self.is_dirty=!0,self.onChange(!0)},reader.readAsDataURL(files[0])}),this.wys.on("dragover",function(event){event.preventDefault(),event.stopPropagation(),this.addClass("dragging")})}}),JSONEditor.defaults.resolvers.unshift(function(schema){if("string"===schema.type&&"datetime"===schema.format)return"dateTime"}),JSONEditor.defaults.resolvers.unshift(function(schema){if("array"===schema.type&&"taglist"===schema.format)return"taglist"}),JSONEditor.defaults.resolvers.unshift(function(schema){if("string"===schema.type&&"simplehtml"===schema.format)return"simplehtml"}),JSONEditor.defaults.editors.upload=JSONEditor.defaults.editors.upload.extend({build:function(){this._super(),this.uploader.className="fbn";var a=document.createElement("a");a.className="fbn icn download",a.target="_blank",this.control.replaceChild(a,this.label),this.control.appendChild(this.preview),this.label=this.title=a},setValue:function(val){this.value!==val&&(this.title.href=window.location+"/file/"+encodeURIComponent(val),this.title.textContent=val,this._super(val))},refreshPreview:function(){if(this.last_preview!==this.preview_value&&(this.last_preview=this.preview_value,this.preview.innerHTML="",this.preview_value)){var self=this,mime=this.preview_value.match(/^data:([^;,]+)[;,]/);mime&&(mime=mime[1]),mime||(mime="unknown");var file=this.uploader.files[0];this.preview.textContent=textUtil.fileSize(file.size);var uploadButton=this.getButton("Upload","upload","Upload");uploadButton.className="btn icn indent sfe save",this.preview.appendChild(uploadButton),uploadButton.addEventListener("click",function(event){event.preventDefault(),uploadButton.setAttribute("disabled","disabled"),self.theme.removeInputError(self.uploader),self.theme.getProgressBar&&(self.progressBar=self.theme.getProgressBar(),self.preview.appendChild(self.progressBar)),self.jsoneditor.options.upload(self.path,file,{success:function(url){self.setValue(url),self.parent?self.parent.onChildEditorChange(self):self.jsoneditor.onChange(),self.progressBar&&self.preview.removeChild(self.progressBar),uploadButton.textContent="Done",uploadButton.setAttribute("value","Done"),uploadButton.setAttribute("disabled",!0)},failure:function(error){self.theme.addInputError(self.uploader,error),self.progressBar&&self.preview.removeChild(self.progressBar),uploadButton.removeAttribute("disabled"),uploadButton.textContent="Upload"},updateProgress:function(progress){self.progressBar&&(progress?self.theme.updateProgressBar(self.progressBar,progress):self.theme.updateProgressBarUnknown(self.progressBar))}})})}}}),JSONEditor.defaults.themes.custom=JSONEditor.AbstractTheme.extend({getBlockLink:function(){return document.createElement("a")},getLinksHolder:function(){return document.createElement("span")},getDescription:function(text){var el=document.createElement("summary");return el.innerHTML=text,el},getFormControl:function(label,input,description){var el=document.createElement("div");return el.className="form-control",label&&(description&&label.setAttribute("title",description.textContent),el.appendChild(label)),"checkbox"===input.type?(label.insertBefore(input,label.firstChild),description&&el.appendChild(description)):("text"==input.type&&(input.className="icn txt",description&&input.setAttribute("title",description.textContent)),input.setAttribute("placeholder",description?description.textContent:""),input.setAttribute("autocomplete","on"),el.appendChild(input)),el},getFormInputLabel:function(text){var el=this._super(text);return el.className="lbl icn "+text,el},getFormInputDescription:function(text){return this._super(text)},getIndentedPanel:function(){var el=this._super();return el.style="indent",el},getChildEditorHolder:function(){return this._super()},getHeaderButtonHolder:function(){return this.getButtonHolder()},getHeader:function(text){var el=document.createElement("b");return"string"==typeof text?(el.textContent=text,el.className="icn "+text):(text.className="icn "+text.textContent,el.appendChild(text)),el},getTable:function(){var el=this._super();return el.className="tbl",el},getButton:function(text,icon,title){var el=document.createElement("button");return el.type="button",el.className="btn icn sml "+icon,this.setButtonText(el,text,icon,title),el},addInputError:function(input,text){if(input.style.boxShadow="0px 0px 0px 3px rgba(252, 114, 114, 0.33)",input.style.border="1px solid coral",input.errmsg)input.errmsg.style.display="block";else{var group=this.closest(input,".form-control");input.errmsg=document.createElement("div"),input.errmsg.setAttribute("class","pad tred"),input.errmsg.style=input.errmsg.style||{},group.appendChild(input.errmsg)}input.errmsg.textContent="",input.errmsg.appendChild(document.createTextNode(text))},removeInputError:function(input){input.style.border="",input.style.boxShadow="",input.errmsg&&(input.errmsg.style.display="none")},getRadio:function(){return this.getFormInputField("radio")},getRadioGroupHolder:function(controls,label,description){var el=document.createElement("div"),radioGroup=document.createElement("div");for(var i in radioGroup.className="rdg",label&&el.appendChild(label),el.appendChild(radioGroup),controls)controls.hasOwnProperty(i)&&radioGroup.appendChild(controls[i]);return description&&el.appendChild(description),el},getRadioLabel:function(text){return this.getFormInputLabel(text)},getProgressBar:function(){var progressBar=document.createElement("progress");return progressBar.setAttribute("max",100),progressBar.setAttribute("value",0),progressBar},updateProgressBar:function(progressBar,progress){progressBar&&progressBar.setAttribute("value",progress)},updateProgressBarUnknown:function(progressBar){progressBar&&progressBar.removeAttribute("value")},getSelectInput:function(options){var select=document.createElement("select");return select.className="btn",options&&this.setSelectOptions(select,options),select},setGridColumnSize:function(el,size){el.className="col s"+size}}),"undefined"!=typeof custom_validators&&(JSONEditor.defaults.custom_validators=custom_validators);for(var docEditorOptions={ajax:allowAjax,theme:"custom",disable_collapse:!0,disable_array_reorder:!0,disable_properties:!0,disable_edit_json:!0,disable_array_delete_last_row:!0,disable_array_delete_all_rows:!0,expand_height:!0,input_width:"3em",input_height:"4em",template:"custom",schema:docSchema},docEditor,selected="editorTab",tabs=document.getElementsByName("tabs"),i=0;i<tabs.length;i++)if(!0===tabs[i].checked){selected=tabs[i].id;break}var originalTitle=document.title,changes=!0,insync=!1,autoButton=document.getElementById("auto");function loadJSON(res,id,message){docEditor&&docEditor.destroy(),(docEditor=new JSONEditor(document.getElementById("editor"),docEditorOptions)).on("ready",function(){if(docEditor.root.setValue(res,!0),infoMsg.textContent=message||"",errMsg.textContent="",id)document.title=id;else{var nid=getDocID();document.title=nid||"Vulnogram"}document.getElementById("save1")&&(save2.className="btn save gap",save1.className="btn save"),document.getElementById("editorTab").checked=!0,syncContents(selected="editorTab"),docEditor.watch("root",incEditorChanges),editorLabel.className="lbl",changes=0,postUrl=getDocID()?"./"+getDocID():"./new";var descDiv=document.querySelector('[data-schemapath="root.description"] b span');descDiv&&(descDiv.appendChild(autoButton),autoButton.removeAttribute("style"))})}autoButton.addEventListener("click",function(){event.preventDefault();var d=docEditor.getEditor("root.description.description_data"),docJSON=docEditor.getValue(),desc=d.getValue();if(d){for(var i=desc.length;i--;)0===desc[i].value.length&&desc.splice(i,1);desc.push({lang:"eng",value:"A "+docJSON.problemtype.problemtype_data[0].description[0].value+" vulnerability in ____COMPONENT____ of "+textUtil.getProductList(docJSON)+" allows ____ATTACKER/ATTACK____ to cause ____IMPACT____."}),desc.push({lang:"eng",value:textUtil.getAffectedProductString(docJSON)}),d.setValue(desc)}}),document.getElementById("remove")&&document.getElementById("remove").addEventListener("click",function(){confirm("Delete this "+originalTitle+"?")&&fetch("",{method:"DELETE",credentials:"include",headers:{Accept:"application/json, text/plain, */*","CSRF-Token":csrfToken}}).then(function(response){200==response.status?(infoMsg.textContent="Deleted ",errMsg.textContent="",window.location="./"):(errMsg.textContent="Error "+response.statusText,infoMsg.textContent="")})}),document.getElementById("save1")&&document.getElementById("save2")&&(document.getElementById("save1").addEventListener("click",save),document.getElementById("save2").addEventListener("click",save),document.getElementById("save2").removeAttribute("style")),loadJSON(initJSON);var errorsFound=!1;function docEditorValid(j){var errors=[];return(errors=j?docEditor.validate(j):docEditor.validate()).length>0?(errorsFound=!0,docEditor.setOption("show_errors","always"),errMsg.textContent=errors.length>1?errors.length+" errors found":errors[0].path+": "+errors[0].message,editorLabel.className="red lbl",!1):(errorsFound=!1,errMsg.textContent="",editorLabel.className="lbl",!0)}function source2editor(){insync=!0;var result=JSON.parse(sourceEditor.getSession().getValue());return docEditor.root.setValue(result,!0),insync=!1,result}function sourceEditorValid(){try{var hasError=!1,firsterror=null,annotations=sourceEditor.getSession().getAnnotations();for(var l in annotations){var annotation=annotations[l];if("error"===annotation.type){hasError=!0,firsterror=annotation;break}}return!hasError||(sourceEditor.moveCursorTo(firsterror.row,firsterror.column,!1),sourceEditor.clearSelection(),errMsg.textContent="Please fix error: "+firsterror.text,document.getElementById("sourceTab").checked=!0,!1)}catch(err){return errMsg.textContent=err.message,document.getElementById("sourceTab").checked=!0,!1}}function validAndSync(){if(!0===document.getElementById("sourceTab").checked){if(!sourceEditorValid())return!1;if(!docEditorValid(source2editor()))return document.getElementById("editorTab").checked=!0,!1}return!!docEditorValid()||(document.getElementById("editorTab").checked=!0,!1)}function save(){if(validAndSync()){infoMsg.textContent="Saving...";var e=docEditor.getValue();fetch(postUrl||"",{method:"POST",credentials:"include",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json","CSRF-Token":csrfToken},redirect:"error",body:JSON.stringify(e)}).then(function(response){if(!response.ok)throw Error(response.statusText);return response.json()}).then(function(res){"go"==res.type?window.location.href=res.to:"err"==res.type?(errMsg.textContent=res.msg,infoMsg.textContent=""):"saved"==res.type&&(infoMsg.textContent="Saved",errMsg.textContent="",document.title=originalTitle,document.getElementById("save1")&&(save2.className="btn save gap",save1.className="btn save"),getChanges(getDocID())),changes=0}).catch(function(error){errMsg.textContent=error+" Try reloading the page."}),document.getElementById("editor").submit()}}function getDocID(){var idEditor=docEditor.getEditor("root."+idpath);if(idEditor){var val=idEditor.getValue();return val||null}}function incChanges(){if(!insync){errMsg.textContent="",editorLabel.className="lbl",changes=!0,infoMsg.textContent="Edited";var nid=getDocID();document.title="• "+(nid||"Vulnogram"),document.getElementById("save1")&&(save2.className="btn sfe gap save",save1.className="btn sfe save")}}function incEditorChanges(){"editorTab"==selected&&incChanges()}function incSourceChanges(){"sourceTab"==selected&&incChanges()}function setupDeselectEvent(){for(var tabs=document.getElementsByName("tabs"),i=0;i<tabs.length;i++){tabs[i].addEventListener("change",function(){var clicked=this.id;if(selected!=clicked)switch(selected){case"editorTab":docEditorValid(),syncContents(clicked);break;case"sourceTab":if(sourceEditorValid())docEditorValid(source2editor()),syncContents(clicked);else clicked="sourceTab",document.getElementById("sourceTab").checked=!0;break;default:syncContents(clicked)}selected=clicked})}}function copyText(element){if(document.selection){var range=document.body.createTextRange();range.moveToElementText(element),range.select(),document.execCommand("copy"),document.selection.empty(),infoMsg.textContent="Copied JSON to clipboard"}else if(window.getSelection){var mrange=document.createRange();mrange.selectNode(element),window.getSelection().removeAllRanges(),window.getSelection().addRange(mrange),document.execCommand("copy"),window.getSelection().removeAllRanges(),infoMsg.textContent="Copied JSON to clipboard"}}function importFile(event,elem){document.getElementById("importJSON").click()}function loadFile(event,elem){var file=elem.files[0];if(file){var reader=new FileReader;reader.readAsText(file,"UTF-8"),reader.onload=function(evt){loadJSON(JSON.parse(evt.target.result),null,"Imported file")},reader.onerror=function(evt){errMsg.textContent="Error reading file"}}}function downloadFile(event,link){if(!validAndSync())return event.preventDefault(),alert("JSON Validation Failure: Fix the errors before downloading"),!1;var file=new File([textUtil.getMITREJSON(textUtil.reduceJSON(docEditor.getValue()))],getDocID()+".json",{type:"text/plain",lastModified:new Date});link.href=URL.createObjectURL(file),link.download=file.name,document.getElementById("editor").submit()}function downloadText(element,link){if(!validAndSync())return event.preventDefault(),alert("JSON Validation Failure: Fix the errors before downloading"),!1;var file=new File([element.textContent],getDocID()+".json",{type:"text/plain",lastModified:new Date});link.href=URL.createObjectURL(file),link.download=file.name}setupDeselectEvent();