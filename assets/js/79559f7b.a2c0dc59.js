(self.webpackChunkyingchiaochen_website=self.webpackChunkyingchiaochen_website||[]).push([[9554],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return c},kt:function(){return p}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var u=r.createContext({}),s=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},c=function(e){var n=s(e.components);return r.createElement(u.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,u=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=s(t),p=a,h=m["".concat(u,".").concat(p)]||m[p]||d[p]||i;return t?r.createElement(h,l(l({ref:n},c),{},{components:t})):r.createElement(h,l({ref:n},c))}));function p(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,l=new Array(i);l[0]=m;var o={};for(var u in n)hasOwnProperty.call(n,u)&&(o[u]=n[u]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var s=2;s<i;s++)l[s]=t[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},816:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return o},contentTitle:function(){return u},metadata:function(){return s},toc:function(){return c},default:function(){return m}});var r=t(4034),a=t(9973),i=(t(7294),t(3905)),l=["components"],o={},u="Find files",s={unversionedId:"Linux/Script/Commands/Find",id:"Linux/Script/Commands/Find",isDocsHomePage:!1,title:"Find files",description:"Overview",source:"@site/docs/Linux/Script/Commands/Find.md",sourceDirName:"Linux/Script/Commands",slug:"/Linux/Script/Commands/Find",permalink:"/docs/Linux/Script/Commands/Find",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Common Commands",permalink:"/docs/Linux/Script/Commands/Common"},next:{title:"Shift",permalink:"/docs/Linux/Script/Commands/Shift"}},c=[{value:"Overview",id:"overview",children:[],level:2},{value:"Locate",id:"locate",children:[],level:2},{value:"Updatedb",id:"updatedb",children:[],level:2},{value:"Find",id:"find",children:[],level:2},{value:"References",id:"references",children:[],level:2}],d={toc:c};function m(e){var n=e.components,t=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"find-files"},"Find files"),(0,i.kt)("h2",{id:"overview"},"Overview"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The terminal will find commands under ",(0,i.kt)("inlineCode",{parentName:"li"},"$PATH")," environment variables."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"$PATH")," is a colon (",(0,i.kt)("inlineCode",{parentName:"li"},":"),") separated string, which stores possible directories of executable binary")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"$ echo $PATH\n/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:/usr/sbin:/home/vagrant/bin\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"You can add path in ",(0,i.kt)("inlineCode",{parentName:"li"},"~/.zshrc")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"~/.bashrc"),".")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'export PATH="${PATH}:/the/path/you/want/to/add"\n')),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"And then you can reopen the terminal or ",(0,i.kt)("inlineCode",{parentName:"li"},"source ~/.zshrc")," to load the configuration in the current shell.")),(0,i.kt)("h2",{id:"locate"},"Locate"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"locate")," shows all matching files in the dbs.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"$ locate userdel\n/usr/sbin/luserdel\n/usr/sbin/userdel\n/usr/share/bash-completion/completions/userdel\n/usr/share/man/de/man8/userdel.8.gz\n/usr/share/man/fr/man8/userdel.8.gz\n/usr/share/man/it/man8/userdel.8.gz\n/usr/share/man/ja/man8/userdel.8.gz\n/usr/share/man/man1/luserdel.1.gz\n/usr/share/man/man8/userdel.8.gz\n/usr/share/man/pl/man8/userdel.8.gz\n/usr/share/man/ru/man8/userdel.8.gz\n/usr/share/man/sv/man8/userdel.8.gz\n/usr/share/man/tr/man8/userdel.8.gz\n/usr/share/man/zh_CN/man8/userdel.8.gz\n/usr/share/man/zh_TW/man8/userdel.8.gz\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"It maintains a cache (db) so you don't have to walk through all folders again and again.")),(0,i.kt)("h2",{id:"updatedb"},"Updatedb"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"If you add you custom files, you have to update the cache (if you want to use ",(0,i.kt)("inlineCode",{parentName:"li"},"locate")," command) to be found in the db.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"$ sudo updatedb\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Add you can use ",(0,i.kt)("inlineCode",{parentName:"li"},"locate")," again to see the change."),(0,i.kt)("li",{parentName:"ul"},"It uses a cronjob to update daily.")),(0,i.kt)("h2",{id:"find"},"Find"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"find")," command is to do exhause search of a file in a given directory hierarchy. The default is ",(0,i.kt)("inlineCode",{parentName:"li"},"."),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"-name")," specify the name of file under the directory.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"$ find /usr/bin -name passwd\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"This command has you own permission, so if may encounter ",(0,i.kt)("inlineCode",{parentName:"li"},"Permission Denied")," issues if you do not have the permission to read that file or directory.")),(0,i.kt)("h2",{id:"references"},"References"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://cloudacademy.com/course/shell-scripting-parsing-command-line-options-1520"},"https://cloudacademy.com/course/shell-scripting-parsing-command-line-options-1520"))))}m.isMDXComponent=!0}}]);