(self.webpackChunkyingchiaochen_website=self.webpackChunkyingchiaochen_website||[]).push([[3290],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),f=c(n),m=o,d=f["".concat(s,".").concat(m)]||f[m]||p[m]||a;return n?r.createElement(d,i(i({ref:t},u),{},{components:n})):r.createElement(d,i({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},9328:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return u},default:function(){return f}});var r=n(4034),o=n(9973),a=(n(7294),n(3905)),i=["components"],l={},s="Setup",c={unversionedId:"Tools/Brew/Setup",id:"Tools/Brew/Setup",isDocsHomePage:!1,title:"Setup",description:"1. Go to the official website to download brew.",source:"@site/docs/Tools/Brew/Setup.md",sourceDirName:"Tools/Brew",slug:"/Tools/Brew/Setup",permalink:"/docs/Tools/Brew/Setup",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Tool List",permalink:"/docs/Tools/List"},next:{title:"Commands",permalink:"/docs/Tools/CMD/Commands"}},u=[],p={toc:u};function f(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"setup"},"Setup"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Go to the official website to download brew.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'# Maybe you have to run this command to install some other tools\n$ xcode-select --install\n# You\'d better check whether this link is changed\n$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n')),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"Check if correctly installed")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ brew --version\n")),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"Examples")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ brew install node\n\n# Note:\n# Sometimes, it will spend a lot of times downloading some dependencies.\n# \n# If it takes so long, it will be interrupted by itself, which serves as a mechanism\n# to prevent blocking.\n# \n# In some special situations, you have to manually install the dependency because it takes\n# too long to download its manifest file. You can find the dependency list in somewhere the\n# terminal output. Use `brew install <dep>` as you used before.\n")))}f.isMDXComponent=!0}}]);