module.exports=function(e,t){"use strict";var n={};function __webpack_require__(t){if(n[t]){return n[t].exports}var i=n[t]={i:t,l:false,exports:{}};var r=true;try{e[t].call(i.exports,i,i.exports,__webpack_require__);r=false}finally{if(r)delete n[t]}i.l=true;return i.exports}__webpack_require__.ab=__dirname+"/";function startup(){return __webpack_require__(464)}return startup()}({32:function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){function adopt(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,r){function fulfilled(e){try{step(i.next(e))}catch(e){r(e)}}function rejected(e){try{step(i["throw"](e))}catch(e){r(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((i=i.apply(e,t||[])).next())})};var r;Object.defineProperty(t,"__esModule",{value:true});const o=n(357);const s=n(747);const u=n(622);r=s.promises,t.chmod=r.chmod,t.copyFile=r.copyFile,t.lstat=r.lstat,t.mkdir=r.mkdir,t.readdir=r.readdir,t.readlink=r.readlink,t.rename=r.rename,t.rmdir=r.rmdir,t.stat=r.stat,t.symlink=r.symlink,t.unlink=r.unlink;t.IS_WINDOWS=process.platform==="win32";function exists(e){return i(this,void 0,void 0,function*(){try{yield t.stat(e)}catch(e){if(e.code==="ENOENT"){return false}throw e}return true})}t.exists=exists;function isDirectory(e,n=false){return i(this,void 0,void 0,function*(){const i=n?yield t.stat(e):yield t.lstat(e);return i.isDirectory()})}t.isDirectory=isDirectory;function isRooted(e){e=normalizeSeparators(e);if(!e){throw new Error('isRooted() parameter "p" cannot be empty')}if(t.IS_WINDOWS){return e.startsWith("\\")||/^[A-Z]:/i.test(e)}return e.startsWith("/")}t.isRooted=isRooted;function mkdirP(e,n=1e3,r=1){return i(this,void 0,void 0,function*(){o.ok(e,"a path argument must be provided");e=u.resolve(e);if(r>=n)return t.mkdir(e);try{yield t.mkdir(e);return}catch(i){switch(i.code){case"ENOENT":{yield mkdirP(u.dirname(e),n,r+1);yield t.mkdir(e);return}default:{let n;try{n=yield t.stat(e)}catch(e){throw i}if(!n.isDirectory())throw i}}}})}t.mkdirP=mkdirP;function tryGetExecutablePath(e,n){return i(this,void 0,void 0,function*(){let i=undefined;try{i=yield t.stat(e)}catch(t){if(t.code!=="ENOENT"){console.log(`Unexpected error attempting to determine if executable file exists '${e}': ${t}`)}}if(i&&i.isFile()){if(t.IS_WINDOWS){const t=u.extname(e).toUpperCase();if(n.some(e=>e.toUpperCase()===t)){return e}}else{if(isUnixExecutable(i)){return e}}}const r=e;for(const o of n){e=r+o;i=undefined;try{i=yield t.stat(e)}catch(t){if(t.code!=="ENOENT"){console.log(`Unexpected error attempting to determine if executable file exists '${e}': ${t}`)}}if(i&&i.isFile()){if(t.IS_WINDOWS){try{const n=u.dirname(e);const i=u.basename(e).toUpperCase();for(const r of yield t.readdir(n)){if(i===r.toUpperCase()){e=u.join(n,r);break}}}catch(t){console.log(`Unexpected error attempting to determine the actual case of the file '${e}': ${t}`)}return e}else{if(isUnixExecutable(i)){return e}}}}return""})}t.tryGetExecutablePath=tryGetExecutablePath;function normalizeSeparators(e){e=e||"";if(t.IS_WINDOWS){e=e.replace(/\//g,"\\");return e.replace(/\\\\+/g,"\\")}return e.replace(/\/\/+/g,"/")}function isUnixExecutable(e){return(e.mode&1)>0||(e.mode&8)>0&&e.gid===process.getgid()||(e.mode&64)>0&&e.uid===process.getuid()}},51:function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){function adopt(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,r){function fulfilled(e){try{step(i.next(e))}catch(e){r(e)}}function rejected(e){try{step(i["throw"](e))}catch(e){r(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((i=i.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});const r=n(129);const o=n(622);const s=n(669);const u=n(32);const c=s.promisify(r.exec);function cp(e,t,n={}){return i(this,void 0,void 0,function*(){const{force:i,recursive:r}=readCopyOptions(n);const s=(yield u.exists(t))?yield u.stat(t):null;if(s&&s.isFile()&&!i){return}const c=s&&s.isDirectory()?o.join(t,o.basename(e)):t;if(!(yield u.exists(e))){throw new Error(`no such file or directory: ${e}`)}const l=yield u.stat(e);if(l.isDirectory()){if(!r){throw new Error(`Failed to copy. ${e} is a directory, but tried to copy without recursive flag.`)}else{yield cpDirRecursive(e,c,0,i)}}else{if(o.relative(e,c)===""){throw new Error(`'${c}' and '${e}' are the same file`)}yield copyFile(e,c,i)}})}t.cp=cp;function mv(e,t,n={}){return i(this,void 0,void 0,function*(){if(yield u.exists(t)){let i=true;if(yield u.isDirectory(t)){t=o.join(t,o.basename(e));i=yield u.exists(t)}if(i){if(n.force==null||n.force){yield rmRF(t)}else{throw new Error("Destination already exists")}}}yield mkdirP(o.dirname(t));yield u.rename(e,t)})}t.mv=mv;function rmRF(e){return i(this,void 0,void 0,function*(){if(u.IS_WINDOWS){try{if(yield u.isDirectory(e,true)){yield c(`rd /s /q "${e}"`)}else{yield c(`del /f /a "${e}"`)}}catch(e){if(e.code!=="ENOENT")throw e}try{yield u.unlink(e)}catch(e){if(e.code!=="ENOENT")throw e}}else{let t=false;try{t=yield u.isDirectory(e)}catch(e){if(e.code!=="ENOENT")throw e;return}if(t){yield c(`rm -rf "${e}"`)}else{yield u.unlink(e)}}})}t.rmRF=rmRF;function mkdirP(e){return i(this,void 0,void 0,function*(){yield u.mkdirP(e)})}t.mkdirP=mkdirP;function which(e,t){return i(this,void 0,void 0,function*(){if(!e){throw new Error("parameter 'tool' is required")}if(t){const t=yield which(e,false);if(!t){if(u.IS_WINDOWS){throw new Error(`Unable to locate executable file: ${e}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`)}else{throw new Error(`Unable to locate executable file: ${e}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`)}}}try{const t=[];if(u.IS_WINDOWS&&process.env.PATHEXT){for(const e of process.env.PATHEXT.split(o.delimiter)){if(e){t.push(e)}}}if(u.isRooted(e)){const n=yield u.tryGetExecutablePath(e,t);if(n){return n}return""}if(e.includes("/")||u.IS_WINDOWS&&e.includes("\\")){return""}const n=[];if(process.env.PATH){for(const e of process.env.PATH.split(o.delimiter)){if(e){n.push(e)}}}for(const i of n){const n=yield u.tryGetExecutablePath(i+o.sep+e,t);if(n){return n}}return""}catch(e){throw new Error(`which failed with message ${e.message}`)}})}t.which=which;function readCopyOptions(e){const t=e.force==null?true:e.force;const n=Boolean(e.recursive);return{force:t,recursive:n}}function cpDirRecursive(e,t,n,r){return i(this,void 0,void 0,function*(){if(n>=255)return;n++;yield mkdirP(t);const i=yield u.readdir(e);for(const o of i){const i=`${e}/${o}`;const s=`${t}/${o}`;const c=yield u.lstat(i);if(c.isDirectory()){yield cpDirRecursive(i,s,n,r)}else{yield copyFile(i,s,r)}}yield u.chmod(t,(yield u.stat(e)).mode)})}function copyFile(e,t,n){return i(this,void 0,void 0,function*(){if((yield u.lstat(e)).isSymbolicLink()){try{yield u.lstat(t);yield u.unlink(t)}catch(e){if(e.code==="EPERM"){yield u.chmod(t,"0666");yield u.unlink(t)}}const n=yield u.readlink(e);yield u.symlink(n,t,u.IS_WINDOWS?"junction":null)}else if(!(yield u.exists(t))||n){yield u.copyFile(e,t)}})}},87:function(e){e.exports=require("os")},93:function(e,t,n){"use strict";var i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(Object.hasOwnProperty.call(e,n))t[n]=e[n];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const r=i(n(827));function ParseOutputs(e){var t=JSON.parse(e);var n=t.properties.outputs;for(const e in n){if(n.hasOwnProperty(e)){r.setOutput(e,n[e].value)}}return n}t.ParseOutputs=ParseOutputs},120:function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){function adopt(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,r){function fulfilled(e){try{step(i.next(e))}catch(e){r(e)}}function rejected(e){try{step(i["throw"](e))}catch(e){r(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((i=i.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});const r=n(860);function exec(e,t,n){return i(this,void 0,void 0,function*(){const i=r.argStringToArray(e);if(i.length===0){throw new Error(`Parameter 'commandLine' cannot be null or empty.`)}const o=i[0];t=i.slice(1).concat(t||[]);const s=new r.ToolRunner(o,t,n);return s.exec()})}t.exec=exec},129:function(e){e.exports=require("child_process")},191:function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(r,o){function fulfilled(e){try{step(i.next(e))}catch(e){o(e)}}function rejected(e){try{step(i["throw"](e))}catch(e){o(e)}}function step(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(fulfilled,rejected)}step((i=i.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});const r=n(827);const o=n(120);const s=n(93);function DeployResourceGroupScope(e,t,n,u,c,l,a){return i(this,void 0,void 0,function*(){if(!n){throw Error("ResourceGroup name must be set.")}var i=yield o.exec(`"${e}" group show --resource-group ${n}`,[],{silent:true,ignoreReturnCode:true});if(i!=0){throw Error(`Resource Group ${n} could not be found.`)}const d=[n?`--resource-group ${n}`:undefined,u?u.startsWith("http")?`--template-uri ${u}`:`--template-file ${u}`:undefined,c?`--mode ${c}`:undefined,l?`--name ${l}`:undefined,a?`--parameters ${a}`:undefined].filter(Boolean).join(" ");let f="";const p={silent:true,failOnStdErr:true,listeners:{stderr:e=>{f+=e;console.log(e.toString())},stdout:e=>{f+=e;console.log(e)}}};r.info("Validating template...");var h=yield o.exec(`"${e}" deployment group validate ${d} -o json`,[],p);if(t&&h!=0){throw new Error("Template validation failed")}else if(h!=0){r.warning("Template validation failed.")}r.info("Creating deployment...");yield o.exec(`"${e}" deployment group create ${d} -o json`,[],p);r.info("Parsing outputs...");return s.ParseOutputs(f)})}t.DeployResourceGroupScope=DeployResourceGroupScope},215:function(e,t,n){"use strict";var i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(Object.hasOwnProperty.call(e,n))t[n]=e[n];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const r=i(n(87));function issueCommand(e,t,n){const i=new Command(e,t,n);process.stdout.write(i.toString()+r.EOL)}t.issueCommand=issueCommand;function issue(e,t=""){issueCommand(e,{},t)}t.issue=issue;const o="::";class Command{constructor(e,t,n){if(!e){e="missing.command"}this.command=e;this.properties=t;this.message=n}toString(){let e=o+this.command;if(this.properties&&Object.keys(this.properties).length>0){e+=" ";let t=true;for(const n in this.properties){if(this.properties.hasOwnProperty(n)){const i=this.properties[n];if(i){if(t){t=false}else{e+=","}e+=`${n}=${escapeProperty(i)}`}}}}e+=`${o}${escapeData(this.message)}`;return e}}function escapeData(e){return(e||"").replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function escapeProperty(e){return(e||"").replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}},357:function(e){e.exports=require("assert")},464:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});const i=n(827);const r=n(982);r.main().then(()=>{process.exit(0)}).catch(e=>{i.setFailed(e.message);process.exit(1)})},614:function(e){e.exports=require("events")},622:function(e){e.exports=require("path")},669:function(e){e.exports=require("util")},718:function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(r,o){function fulfilled(e){try{step(i.next(e))}catch(e){o(e)}}function rejected(e){try{step(i["throw"](e))}catch(e){o(e)}}function step(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(fulfilled,rejected)}step((i=i.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});const r=n(120);const o=n(93);const s=n(827);function DeploySubscriptionScope(e,t,n,u,c,l,a){return i(this,void 0,void 0,function*(){if(!n){throw Error("Location must be set.")}if(c!=""){s.warning("Deployment Mode is not supported for subscription scoped deployments, this parameter will be ignored!")}const i=[n?`--location ${n}`:undefined,u?u.startsWith("http")?`--template-uri ${u}`:`--template-file ${u}`:undefined,l?`--name ${l}`:undefined,a?`--parameters ${a}`:undefined].filter(Boolean).join(" ");let d="";const f={silent:true,failOnStdErr:true,listeners:{stdline:e=>{if(!e.startsWith("[command]"))d+=e}}};s.info("Validating template...");var p=yield r.exec(`"${e}" deployment sub validate ${i} -o json`,[],{silent:true,ignoreReturnCode:true});if(t&&p!=0){throw new Error("Template validation failed")}else if(p!=0){s.warning("Template validation failed.")}s.info("Creating deployment...");yield r.exec(`"${e}" deployment sub create ${i} -o json`,[],f);s.info("Parsing outputs...");return o.ParseOutputs(d)})}t.DeploySubscriptionScope=DeploySubscriptionScope},723:function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(r,o){function fulfilled(e){try{step(i.next(e))}catch(e){o(e)}}function rejected(e){try{step(i["throw"](e))}catch(e){o(e)}}function step(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(fulfilled,rejected)}step((i=i.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});const r=n(120);const o=n(93);const s=n(827);function DeployManagementGroupScope(e,t,n,u,c,l,a,d){return i(this,void 0,void 0,function*(){if(!n){throw Error("Location must be set. zaruri hai.")}if(c!=""){s.warning("Deployment Mode to be ignored")}const i=[n?`--location ${n}`:undefined,u?u.startsWith("http")?`--template-uri ${u}`:`--template-file ${u}`:undefined,d?`--management-group-id ${d}`:undefined,l?`--name ${l}`:undefined,a?`--parameters ${a}`:undefined].filter(Boolean).join(" ");let f="";const p={silent:true,failOnStdErr:true,listeners:{stderr:e=>{f+=e;console.log(e.toString())},stdout:e=>{f+=e;console.log(e)}}};s.info("Validating template...");var h=yield r.exec(`"${e}" deployment mg validate ${i} -o json`,[],p);if(t&&h!=0){throw new Error("Template validation failed")}else if(h!=0){s.warning("Template validation failed.")}s.info("Creating deployment...");yield r.exec(`"${e}" deployment mg create ${i} -o json`,[],p);s.info("Parsing outputs...");return o.ParseOutputs(f)})}t.DeployManagementGroupScope=DeployManagementGroupScope},747:function(e){e.exports=require("fs")},827:function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){function adopt(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,r){function fulfilled(e){try{step(i.next(e))}catch(e){r(e)}}function rejected(e){try{step(i["throw"](e))}catch(e){r(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((i=i.apply(e,t||[])).next())})};var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(Object.hasOwnProperty.call(e,n))t[n]=e[n];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const o=n(215);const s=r(n(87));const u=r(n(622));var c;(function(e){e[e["Success"]=0]="Success";e[e["Failure"]=1]="Failure"})(c=t.ExitCode||(t.ExitCode={}));function exportVariable(e,t){process.env[e]=t;o.issueCommand("set-env",{name:e},t)}t.exportVariable=exportVariable;function setSecret(e){o.issueCommand("add-mask",{},e)}t.setSecret=setSecret;function addPath(e){o.issueCommand("add-path",{},e);process.env["PATH"]=`${e}${u.delimiter}${process.env["PATH"]}`}t.addPath=addPath;function getInput(e,t){const n=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!n){throw new Error(`Input required and not supplied: ${e}`)}return n.trim()}t.getInput=getInput;function setOutput(e,t){o.issueCommand("set-output",{name:e},t)}t.setOutput=setOutput;function setFailed(e){process.exitCode=c.Failure;error(e)}t.setFailed=setFailed;function isDebug(){return process.env["RUNNER_DEBUG"]==="1"}t.isDebug=isDebug;function debug(e){o.issueCommand("debug",{},e)}t.debug=debug;function error(e){o.issue("error",e)}t.error=error;function warning(e){o.issue("warning",e)}t.warning=warning;function info(e){process.stdout.write(e+s.EOL)}t.info=info;function startGroup(e){o.issue("group",e)}t.startGroup=startGroup;function endGroup(){o.issue("endgroup")}t.endGroup=endGroup;function group(e,t){return i(this,void 0,void 0,function*(){startGroup(e);let n;try{n=yield t()}finally{endGroup()}return n})}t.group=group;function saveState(e,t){o.issueCommand("save-state",{name:e},t)}t.saveState=saveState;function getState(e){return process.env[`STATE_${e}`]||""}t.getState=getState},860:function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){function adopt(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,r){function fulfilled(e){try{step(i.next(e))}catch(e){r(e)}}function rejected(e){try{step(i["throw"](e))}catch(e){r(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((i=i.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});const r=n(87);const o=n(614);const s=n(129);const u=n(622);const c=n(51);const l=n(32);const a=process.platform==="win32";class ToolRunner extends o.EventEmitter{constructor(e,t,n){super();if(!e){throw new Error("Parameter 'toolPath' cannot be null or empty.")}this.toolPath=e;this.args=t||[];this.options=n||{}}_debug(e){if(this.options.listeners&&this.options.listeners.debug){this.options.listeners.debug(e)}}_getCommandString(e,t){const n=this._getSpawnFileName();const i=this._getSpawnArgs(e);let r=t?"":"[command]";if(a){if(this._isCmdFile()){r+=n;for(const e of i){r+=` ${e}`}}else if(e.windowsVerbatimArguments){r+=`"${n}"`;for(const e of i){r+=` ${e}`}}else{r+=this._windowsQuoteCmdArg(n);for(const e of i){r+=` ${this._windowsQuoteCmdArg(e)}`}}}else{r+=n;for(const e of i){r+=` ${e}`}}return r}_processLineBuffer(e,t,n){try{let i=t+e.toString();let o=i.indexOf(r.EOL);while(o>-1){const e=i.substring(0,o);n(e);i=i.substring(o+r.EOL.length);o=i.indexOf(r.EOL)}t=i}catch(e){this._debug(`error processing line. Failed with error ${e}`)}}_getSpawnFileName(){if(a){if(this._isCmdFile()){return process.env["COMSPEC"]||"cmd.exe"}}return this.toolPath}_getSpawnArgs(e){if(a){if(this._isCmdFile()){let t=`/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;for(const n of this.args){t+=" ";t+=e.windowsVerbatimArguments?n:this._windowsQuoteCmdArg(n)}t+='"';return[t]}}return this.args}_endsWith(e,t){return e.endsWith(t)}_isCmdFile(){const e=this.toolPath.toUpperCase();return this._endsWith(e,".CMD")||this._endsWith(e,".BAT")}_windowsQuoteCmdArg(e){if(!this._isCmdFile()){return this._uvQuoteCmdArg(e)}if(!e){return'""'}const t=[" ","\t","&","(",")","[","]","{","}","^","=",";","!","'","+",",","`","~","|","<",">",'"'];let n=false;for(const i of e){if(t.some(e=>e===i)){n=true;break}}if(!n){return e}let i='"';let r=true;for(let t=e.length;t>0;t--){i+=e[t-1];if(r&&e[t-1]==="\\"){i+="\\"}else if(e[t-1]==='"'){r=true;i+='"'}else{r=false}}i+='"';return i.split("").reverse().join("")}_uvQuoteCmdArg(e){if(!e){return'""'}if(!e.includes(" ")&&!e.includes("\t")&&!e.includes('"')){return e}if(!e.includes('"')&&!e.includes("\\")){return`"${e}"`}let t='"';let n=true;for(let i=e.length;i>0;i--){t+=e[i-1];if(n&&e[i-1]==="\\"){t+="\\"}else if(e[i-1]==='"'){n=true;t+="\\"}else{n=false}}t+='"';return t.split("").reverse().join("")}_cloneExecOptions(e){e=e||{};const t={cwd:e.cwd||process.cwd(),env:e.env||process.env,silent:e.silent||false,windowsVerbatimArguments:e.windowsVerbatimArguments||false,failOnStdErr:e.failOnStdErr||false,ignoreReturnCode:e.ignoreReturnCode||false,delay:e.delay||1e4};t.outStream=e.outStream||process.stdout;t.errStream=e.errStream||process.stderr;return t}_getSpawnOptions(e,t){e=e||{};const n={};n.cwd=e.cwd;n.env=e.env;n["windowsVerbatimArguments"]=e.windowsVerbatimArguments||this._isCmdFile();if(e.windowsVerbatimArguments){n.argv0=`"${t}"`}return n}exec(){return i(this,void 0,void 0,function*(){if(!l.isRooted(this.toolPath)&&(this.toolPath.includes("/")||a&&this.toolPath.includes("\\"))){this.toolPath=u.resolve(process.cwd(),this.options.cwd||process.cwd(),this.toolPath)}this.toolPath=yield c.which(this.toolPath,true);return new Promise((e,t)=>{this._debug(`exec tool: ${this.toolPath}`);this._debug("arguments:");for(const e of this.args){this._debug(`   ${e}`)}const n=this._cloneExecOptions(this.options);if(!n.silent&&n.outStream){n.outStream.write(this._getCommandString(n)+r.EOL)}const i=new ExecState(n,this.toolPath);i.on("debug",e=>{this._debug(e)});const o=this._getSpawnFileName();const u=s.spawn(o,this._getSpawnArgs(n),this._getSpawnOptions(this.options,o));const c="";if(u.stdout){u.stdout.on("data",e=>{if(this.options.listeners&&this.options.listeners.stdout){this.options.listeners.stdout(e)}if(!n.silent&&n.outStream){n.outStream.write(e)}this._processLineBuffer(e,c,e=>{if(this.options.listeners&&this.options.listeners.stdline){this.options.listeners.stdline(e)}})})}const l="";if(u.stderr){u.stderr.on("data",e=>{i.processStderr=true;if(this.options.listeners&&this.options.listeners.stderr){this.options.listeners.stderr(e)}if(!n.silent&&n.errStream&&n.outStream){const t=n.failOnStdErr?n.errStream:n.outStream;t.write(e)}this._processLineBuffer(e,l,e=>{if(this.options.listeners&&this.options.listeners.errline){this.options.listeners.errline(e)}})})}u.on("error",e=>{i.processError=e.message;i.processExited=true;i.processClosed=true;i.CheckComplete()});u.on("exit",e=>{i.processExitCode=e;i.processExited=true;this._debug(`Exit code ${e} received from tool '${this.toolPath}'`);i.CheckComplete()});u.on("close",e=>{i.processExitCode=e;i.processExited=true;i.processClosed=true;this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);i.CheckComplete()});i.on("done",(n,i)=>{if(c.length>0){this.emit("stdline",c)}if(l.length>0){this.emit("errline",l)}u.removeAllListeners();if(n){t(n)}else{e(i)}})})})}}t.ToolRunner=ToolRunner;function argStringToArray(e){const t=[];let n=false;let i=false;let r="";function append(e){if(i&&e!=='"'){r+="\\"}r+=e;i=false}for(let o=0;o<e.length;o++){const s=e.charAt(o);if(s==='"'){if(!i){n=!n}else{append(s)}continue}if(s==="\\"&&i){append(s);continue}if(s==="\\"&&n){i=true;continue}if(s===" "&&!n){if(r.length>0){t.push(r);r=""}continue}append(s)}if(r.length>0){t.push(r.trim())}return t}t.argStringToArray=argStringToArray;class ExecState extends o.EventEmitter{constructor(e,t){super();this.processClosed=false;this.processError="";this.processExitCode=0;this.processExited=false;this.processStderr=false;this.delay=1e4;this.done=false;this.timeout=null;if(!t){throw new Error("toolPath must not be empty")}this.options=e;this.toolPath=t;if(e.delay){this.delay=e.delay}}CheckComplete(){if(this.done){return}if(this.processClosed){this._setResult()}else if(this.processExited){this.timeout=setTimeout(ExecState.HandleTimeout,this.delay,this)}}_debug(e){this.emit("debug",e)}_setResult(){let e;if(this.processExited){if(this.processError){e=new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`)}else if(this.processExitCode!==0&&!this.options.ignoreReturnCode){e=new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`)}else if(this.processStderr&&this.options.failOnStdErr){e=new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`)}}if(this.timeout){clearTimeout(this.timeout);this.timeout=null}this.done=true;this.emit("done",e,this.processExitCode)}static HandleTimeout(e){if(e.done){return}if(!e.processClosed&&e.processExited){const t=`The STDIO streams did not close within ${e.delay/1e3} seconds of the exit event from process '${e.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;e._debug(t)}e._setResult()}}},982:function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(r,o){function fulfilled(e){try{step(i.next(e))}catch(e){o(e)}}function rejected(e){try{step(i["throw"](e))}catch(e){o(e)}}function step(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(fulfilled,rejected)}step((i=i.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});const r=n(827);const o=n(51);const s=n(191);const u=n(120);const c=n(723);const l=n(718);const a=n(827);function main(){return i(this,void 0,void 0,function*(){const e=yield o.which("az",true);const t=a.getInput("scope");const n=a.getInput("subscriptionId");const i=a.getInput("location");const d=a.getInput("resourceGroupName");const f=a.getInput("templateLocation");const p=a.getInput("deploymentMode");const h=a.getInput("deploymentName");const m=a.getInput("parameters");const y=a.getInput("managementGroupId");const w=a.getInput("validationOnly")=="true";if(t!="managementgroup"){r.info("Changing subscription context...");yield u.exec(`"${e}" account set --subscription ${n}`,[],{silent:true})}let g={};switch(t){case"resourcegroup":g=yield s.DeployResourceGroupScope(e,w,d,f,p,h,m);break;case"managementgroup":g=yield c.DeployManagementGroupScope(e,w,i,f,p,h,m,y);break;case"subscription":g=yield l.DeploySubscriptionScope(e,w,i,f,p,h,m);break;default:throw new Error("Invalid scope. Valid values are: 'resourcegroup', 'managementgroup', 'subscription'")}return g})}t.main=main}});