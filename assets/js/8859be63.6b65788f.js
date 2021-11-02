(self.webpackChunkyingchiaochen_website=self.webpackChunkyingchiaochen_website||[]).push([[730],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return u},kt:function(){return g}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=s(n),g=o,f=m["".concat(c,".").concat(g)]||m[g]||p[g]||a;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1277:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return u},default:function(){return m}});var r=n(4034),o=n(9973),a=(n(7294),n(3905)),i=["components"],l={},c="Setup",s={unversionedId:"Tools/Git/Setup",id:"Tools/Git/Setup",isDocsHomePage:!1,title:"Setup",description:"1. Install git via package manager (brew for mac)",source:"@site/docs/Tools/Git/Setup.md",sourceDirName:"Tools/Git",slug:"/Tools/Git/Setup",permalink:"/docs/Tools/Git/Setup",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Commands",permalink:"/docs/Tools/CMD/Commands"},next:{title:"Setup",permalink:"/docs/Tools/VSCode/Setup"}},u=[{value:"References",id:"references",children:[],level:2}],p={toc:u};function m(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"setup"},"Setup"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Install git via package manager (brew for mac)")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ brew install git\n")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"Config setup")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'$ git config --global user.name "<github_username>"\n$ git config --global user.email "<github_email>"\n$ git config --global  color.ui true\n$ git config --global  core.editor vim\n$ git config --global  core.ignorecase true\n')),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"Generate SSH key")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"# Generate ssh key\n# All you need to do is keep pressing enter\n$ ssh-keygen -t rsa\n\n# You will find id_rsa and id_rsa.pub\n$ ls ~/.ssh\n")),(0,a.kt)("ol",{start:4},(0,a.kt)("li",{parentName:"ol"},"Upload SSH key to Github",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Go to ",(0,a.kt)("inlineCode",{parentName:"li"},"settings")," -> ",(0,a.kt)("inlineCode",{parentName:"li"},"SSH and GPG keys")," -> ",(0,a.kt)("inlineCode",{parentName:"li"},"New SSH Key")),(0,a.kt)("li",{parentName:"ul"},"Paste the content of ",(0,a.kt)("inlineCode",{parentName:"li"},"id_rsa.pub")," in the ",(0,a.kt)("inlineCode",{parentName:"li"},"Key")," field. (You can use ",(0,a.kt)("inlineCode",{parentName:"li"},"cat id_ras.pub"),")"),(0,a.kt)("li",{parentName:"ul"},"Add the name of the key in ",(0,a.kt)("inlineCode",{parentName:"li"},"Title")," field and press ",(0,a.kt)("inlineCode",{parentName:"li"},"Add SSH Key"),"."))),(0,a.kt)("li",{parentName:"ol"},"Check you can connect to github.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ ssh -T git@github.com\n\n# You may see something like this:\n# The authenticity of host 'github.com (52.192.72.89)' can't be established.\n# RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.\n# Are you sure you want to continue connecting (yes/no/[fingerprint])? yes\n# Warning: Permanently added 'github.com,52.192.72.89' (RSA) to the list of known hosts.\n# Hi woodcutter-eric! You've successfully authenticated, but GitHub does not provide shell access.\n")),(0,a.kt)("h2",{id:"references"},"References"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://zlargon.gitbooks.io/git-tutorial/content/config.html"},"https://zlargon.gitbooks.io/git-tutorial/content/config.html")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://zlargon.gitbooks.io/git-tutorial/content/remote/new_project.html"},"https://zlargon.gitbooks.io/git-tutorial/content/remote/new_project.html"))))}m.isMDXComponent=!0}}]);