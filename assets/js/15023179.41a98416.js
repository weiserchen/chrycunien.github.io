(self.webpackChunkyingchiaochen_website=self.webpackChunkyingchiaochen_website||[]).push([[2621],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return d},kt:function(){return u}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),c=p(n),u=r,k=c["".concat(s,".").concat(u)]||c[u]||m[u]||i;return n?a.createElement(k,l(l({ref:t},d),{},{components:n})):a.createElement(k,l({ref:t},d))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=c;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},5955:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return d},default:function(){return c}});var a=n(4034),r=n(9973),i=(n(7294),n(3905)),l=["components"],o={},s="P4 Programming",p={unversionedId:"System/Network/Virtualization/P4/P4-Programming",id:"System/Network/Virtualization/P4/P4-Programming",isDocsHomePage:!1,title:"P4 Programming",description:"P4 Program Template",source:"@site/docs/System/Network/Virtualization/P4/P4-Programming.md",sourceDirName:"System/Network/Virtualization/P4",slug:"/System/Network/Virtualization/P4/P4-Programming",permalink:"/docs/System/Network/Virtualization/P4/P4-Programming",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"P4 Overview",permalink:"/docs/System/Network/Virtualization/P4/P4-Overview"},next:{title:"Network Management",permalink:"/docs/System/Network/Virtualization/SDN/Network-Management"}},d=[{value:"P4 Program Template",id:"p4-program-template",children:[],level:2},{value:"V1Model Standard Metadata",id:"v1model-standard-metadata",children:[],level:2},{value:"P416 Types",id:"p416-types",children:[{value:"Basic Types",id:"basic-types",children:[],level:3},{value:"Header Types",id:"header-types",children:[],level:3},{value:"Other Types",id:"other-types",children:[],level:3},{value:"Examples",id:"examples",children:[],level:3}],level:2},{value:"P416 Parsers",id:"p416-parsers",children:[{value:"Examples",id:"examples-1",children:[],level:3}],level:2},{value:"P416 Controls",id:"p416-controls",children:[{value:"Example: Reflector",id:"example-reflector",children:[],level:3}],level:2},{value:"Table Matching",id:"table-matching",children:[{value:"Example: IPv4_LPM Table",id:"example-ipv4_lpm-table",children:[],level:3}],level:2},{value:"P416 Deparser",id:"p416-deparser",children:[],level:2},{value:"References",id:"references",children:[],level:2}],m={toc:d};function c(e){var t=e.components,o=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},m,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"p4-programming"},"P4 Programming"),(0,i.kt)("h2",{id:"p4-program-template"},"P4 Program Template"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"It looks like a combination of verilog and c++.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c++"},"#include <core.p4>\n#include <v1model.p4>\n\n/* HEADERS */\nstruct metadata { ... }\nstruct headers {\nethernet_t ethernet;\nipv4_t ipv4;\n}\n\n/* PARSERS */\nparser MyParser(packet_in packet,\nout headers hdr,\ninout metadata meta,\ninout standard_metadata_t smeta) {\n...\n}\n \n/* CHECKSUM VERIFICATION */\ncontrol MyVerifyChecksum(in headers hdr,\n...\n}\n\n/* INGRESS PROCESSING */\ncontrol MyIngress(inout headers hdr,\ninout metadata meta,\ninout standard_metadata_t std_meta) {\n...\n}\n\n/* EGRESS PROCESSING */\ncontrol MyEgress(inout headers hdr,\ninout metadata meta,\ninout standard_metadata_t std_meta) {\n...\n}\n\ncontrol MyComputeChecksum(inout headers hdr, \ninout metadata meta) {\n...\n}\n\n/* DEPARSER */\ncontrol MyDeparser(inout headers hdr,\ninout metadata meta) {\n...\n}\n\n/* SWITCH */\nV1Switch(\nMyParser(),\nMyVerifyChecksum(),\nMyIngress(),\nMyEgress(),\nMyComputeChecksum(),\nMyDeparser()\n) main;\n")),(0,i.kt)("h2",{id:"v1model-standard-metadata"},"V1Model Standard Metadata"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"It is the standard metadata that V1Model defines."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"ingress_port"),": the port on which the packet arrived"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"egress_spec"),": the port to which the packet should be sent to (the expected port, written in ingress module, because that port may not be available)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"egress_port"),": the port on which the packet is departing from (read only in egress pipeline) (the actual port, checked by egress module)")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c++"},"struct standard_metadata_t { \nbit<9> ingress_port;\nbit<9> egress_spec;\nbit<9> egress_port;\nbit<32> clone_spec;\nbit<32> instance_type;\nbit<1> drop;\nbit<16> recirculate_port;\nbit<32> packet_length;\nbit<32> enq_timestamp;\nbit<19> enq_qdepth;\nbit<32> deq_timedelta;\nbit<19> deq_qdepth;\nbit<48> ingress_global_timestamp;\nbit<32> lf_field_list;\nbit<16> mcast_grp;\nbit<1> resubmit_flag;\nbit<16> egress_rid;\nbit<1> checksum_error;\n}\n")),(0,i.kt)("h2",{id:"p416-types"},"P416 Types"),(0,i.kt)("h3",{id:"basic-types"},"Basic Types"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"bit\\<n",">"),": Unsigned integer (bitstring) of size n"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"bit")," is the same as bit<1>"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"int\\<n",">"),": Signed integer of size n (>=2)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"varbit\\<n",">"),": Variable-length bitstring (used in tcp options)")),(0,i.kt)("h3",{id:"header-types"},"Header Types"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Ordered collection of members"),(0,i.kt)("li",{parentName:"ul"},"Denoted by ",(0,i.kt)("inlineCode",{parentName:"li"},"header")),(0,i.kt)("li",{parentName:"ul"},"Can contain ",(0,i.kt)("inlineCode",{parentName:"li"},"bit<n>"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"int<n>"),", and ",(0,i.kt)("inlineCode",{parentName:"li"},"varbit<n>")),(0,i.kt)("li",{parentName:"ul"},"Byte-aligned"),(0,i.kt)("li",{parentName:"ul"},"Can be valid or invalid"),(0,i.kt)("li",{parentName:"ul"},"Provides several operations to test and set validity bit: ",(0,i.kt)("inlineCode",{parentName:"li"},"isValid()"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"setValid()"),", and ",(0,i.kt)("inlineCode",{parentName:"li"},"setInvalid()"))),(0,i.kt)("h3",{id:"other-types"},"Other Types"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Typedef"),": Alternative name for a type"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Struct"),": Unordered collection of members (with no alignment restrictions)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Header Stack"),": array of headers"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Header Union"),": one of several headers")),(0,i.kt)("h3",{id:"examples"},"Examples"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c++"},"typedef bit<48> macAddr_t; \ntypedef bit<32> ip4Addr_t; \n\nheader ethernet_t { \nmacAddr_t dstAddr; \nmacAddr_t srcAddr;\nbit<16> etherType;\n}\n\nheader ipv4_t {\nbit<4> version;\nbit<4> ihl;\nbit<8> diffserv;\nbit<16> totalLen; \nbit<16> identification; \nbit<3> flags;\nbit<13> fragOffset; \nbit<8> ttl;\nbit<8> protocol; \nbit<16> hdrChecksum; \nip4Addr_t srcAddr; \nip4Addr_t dstAddr;\n}\n\n/* Architecture */\nstruct standard_metadata_t { bit<9> ingress_port;\nbit<9> egress_spec;\nbit<9> egress_port;\nbit<32> clone_spec; bit<32> instance_type; bit<1> drop;\nbit<16> recirculate_port; bit<32> packet_length; ...\n}\n/* User program */\nstruct metadata {\n...\n}\nstruct headers {\nethernet_t ethernet;\nipv4_t ipv4;\n}\n")),(0,i.kt)("h2",{id:"p416-parsers"},"P416 Parsers"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Parsers are functions that map packets into headers and metadata, written in a state machine style"),(0,i.kt)("li",{parentName:"ul"},"Every parser has three predefined states: ",(0,i.kt)("inlineCode",{parentName:"li"},"start"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"accept"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"reject")),(0,i.kt)("li",{parentName:"ul"},"Other states may be defined by the programmer"),(0,i.kt)("li",{parentName:"ul"},"In each state, execute zero or more statements, and then transition to another state (loops are OK)")),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"P4-parser",src:n(4022).Z})),(0,i.kt)("h3",{id:"examples-1"},"Examples"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"P416 has a select statement that can be used to branch in a parser"),(0,i.kt)("li",{parentName:"ul"},"In parsers it is often necessary to branch based on some of the bits just parsed"),(0,i.kt)("li",{parentName:"ul"},"For example, etherType determines the format of the rest of the packet"),(0,i.kt)("li",{parentName:"ul"},"Match patterns can either be literals or simple computations such as masks"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"packet_in")," type has self-defined extract methods to extract headers for you")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c++"},"/* From core.p4 */\nextern packet_in {\nvoid extract<T>(out T hdr);\nvoid extract<T>(out T variableSizeHeader, in bit<32> variableFieldSizeInBits);\nT lookahead<T>();\nvoid advance(in bit<32> sizeInBits); bit<32> length();\n}\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c++"},"parser MyParser(packet_in packet,\nout headers hdr,\ninout metadata meta, header\ninout standard_metadata_t std_meta) { \n    state start {\n        transition parse_ethernet;\n    }\n\n    state parse_ethernet { \n        packet.extract(hdr.ethernet); \n        transition select(hdr.ethernet.etherType) { \n            0x800: parse_ipv4;\n            default: accept;\n        }\n    }\n}\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c++"},"parser MyParser(packet_in pkt,\nout headers hdr,\ninout metadata meta, header\ninout standard_metadata_t std_meta) { \n    state start {\n        transition eth;\n    }\n\n    state eth {\n        pkt.extract(eth);\n        transition select(eth.ethType) {\n            0x800: ip;\n            _: reject;\n            // default: accept\n        }\n    }\n\n    state ip {\n        pkt.extract(ipv4);\n        transition accept;\n    }\n}\n")),(0,i.kt)("h2",{id:"p416-controls"},"P416 Controls"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"apply")," is the entry point of a control block"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"action")," is just like function, which can be invoked by ",(0,i.kt)("inlineCode",{parentName:"li"},"apply"),", which can be declared inside a control or globally"),(0,i.kt)("li",{parentName:"ul"},"Many standard arithmetic and logical operations are supported:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"-"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"*")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"~")," ,",(0,i.kt)("inlineCode",{parentName:"li"},"&"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"|"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"^"),", ",(0,i.kt)("inlineCode",{parentName:"li"},">>"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"<<")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"=="),", ",(0,i.kt)("inlineCode",{parentName:"li"},"!="),", ",(0,i.kt)("inlineCode",{parentName:"li"},">"),", ",(0,i.kt)("inlineCode",{parentName:"li"},">="),", ",(0,i.kt)("inlineCode",{parentName:"li"},"<"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"<=")),(0,i.kt)("li",{parentName:"ul"},"No division/modulo"))),(0,i.kt)("li",{parentName:"ul"},"Non-standard operations (may not be supported):",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Bit-slicing: ",(0,i.kt)("inlineCode",{parentName:"li"},"[m:l]")," (works as l-value too)"),(0,i.kt)("li",{parentName:"ul"},"Bit Concatenation: ",(0,i.kt)("inlineCode",{parentName:"li"},"++"))))),(0,i.kt)("h3",{id:"example-reflector"},"Example: Reflector"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"This a reflector (echo) example."),(0,i.kt)("li",{parentName:"ul"},"It just swap the mac address and the port, achieving an echo operation")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c++"},"control MyIngress(inout headers hdr, inout metadata meta,\n    inout standard_metadata_t std_meta) \n{ \n    action swap_mac(inout bit<48> src, inout bit<48> dst) {\n        bit<48> tmp = src;\n        src = dst;\n        dst = tmp;\n    }\n\n    apply {\n        swap_mac(hdr.ethernet.srcAddr, hdr.ethernet.dstAddr);\n        std_meta.egress_spec = std_meta.ingress_port; \n    }\n}\n")),(0,i.kt)("h2",{id:"table-matching"},"Table Matching"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"P4 only define the schema of the table"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"key"),": like matching rules (ip, port, \u2026)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"action id"),": like swap_mac function"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"action data"),": like arguments for swa_mac"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"action")," can see all metadata because actions are defined in the module (like closure)"),(0,i.kt)("li",{parentName:"ul"},"Control plane may be local or remote")),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"P4-table-match-rule",src:n(790).Z})),(0,i.kt)("h3",{id:"example-ipv4_lpm-table"},"Example: IPv4_LPM Table"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"This is a ipv4 longest prefix matching (LPM) example."),(0,i.kt)("li",{parentName:"ul"},"Data Plane (P4) Program",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Defines the format of the table",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Key "),(0,i.kt)("li",{parentName:"ul"},"Action"),(0,i.kt)("li",{parentName:"ul"},"Action data"))),(0,i.kt)("li",{parentName:"ul"},"Performs the lookup"),(0,i.kt)("li",{parentName:"ul"},"Executes the chosen action"))),(0,i.kt)("li",{parentName:"ul"},"Control Plane (IPstack, Routing protocols)",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Populates table entries with specific information",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Based on the configuration"),(0,i.kt)("li",{parentName:"ul"},"Based on automatic discovery"),(0,i.kt)("li",{parentName:"ul"},"Based on protocol calculations"))))),(0,i.kt)("li",{parentName:"ul"},"Actions can have two different types of parameters",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Directional (from the Data Plane)"),(0,i.kt)("li",{parentName:"ul"},"Directionless (from the Control Plane)"))),(0,i.kt)("li",{parentName:"ul"},"Actions that are called directly:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Only use directional parameters"))),(0,i.kt)("li",{parentName:"ul"},"Actions used in tables:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Typically use directionless parameters"),(0,i.kt)("li",{parentName:"ul"},"May sometimes use directional parameters too")))),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"P4-match-table",src:n(462).Z})),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c++"},"/* core.p4 */\nmatch_kind {\n    exact,\n    ternary,\n    lpm\n}\n\n/* core.p4 */\naction NoAction() { }\n\n/* basic.p4 */\n/* mark_to_drop() is defined in core.p4 */\naction drop() {\n    mark_to_drop();\n}\n\n/* basic.p4 */\naction ipv4_forward(macAddr_t\n    dstAddr,\n    bit<9> port) {\n    ...\n}\n\ntable ipv4_lpm {\n    /* There are several modes other than lpm */\n    key = {\n        hdr.ipv4.dstAddr: lpm;\n    }\n    \n    actions = {\n        ipv4_forward;\n        drop;\n        NoAction;\n    }\n    /* restrict the number of rules in the table */\n    size = 1024;\n    default_action = NoAction();\n}\n\ncontrol MyIngress(\n    inout headers hdr,\n    inout metadata meta,\n    inout standard_metadata_t standard_metadata) {\n    table ipv4_lpm {\n        ... \n    }\n\n    apply { \n        ...\n        /*\n        - Tell switch to look for rules in the table \n        - You can apply several tables in order\n        - Usually, you will use if statement to check whether this packet have some fields to match, or just skip. If you do not do this, it may fall under NoAction(), then the packet is dropped\n        */\n       ipv4_lpm.apply();\n        ... \n    }\n}\n")),(0,i.kt)("h2",{id:"p416-deparser"},"P416 Deparser"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Assembles the headers back into a well-formed packet"),(0,i.kt)("li",{parentName:"ul"},"Expressed as a control function",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"No need for another construct!"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"packet_out")," is defined in core.p4: emit(hdr): serializes header if it is valid"),(0,i.kt)("li",{parentName:"ul"},"If you don\u2019t fetch some header, like tcp, you don\u2019t have to assemble it again"),(0,i.kt)("li",{parentName:"ul"},"Advantages:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Makes deparsing explicit but decouples from parsing")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c++"},"/* From core.p4 */\nextern packet_out {\n        void emit<T>(in T hdr);\n}\n\n/* User Program */\ncontrol DeparserImpl(packet_out packet, in headers hdr) {\n    apply {\n        ...\n        packet.emit(hdr.ethernet);\n        ...\n    } \n}\n")),(0,i.kt)("h2",{id:"references"},"References"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"This note is based on NTU course - ",(0,i.kt)("a",{parentName:"li",href:"https://nol.ntu.edu.tw/nol/coursesearch/print_table.php?course_id=942%20U0710&class=&dpt_code=9420&ser_no=50698&semester=110-1&lang=CH"},"Network Virtualization and Security"))))}c.isMDXComponent=!0},462:function(e,t,n){"use strict";t.Z=n.p+"assets/images/P4-match-table-d5b7cb409f09e5d96d9450e50eb831b6.png"},4022:function(e,t,n){"use strict";t.Z=n.p+"assets/images/P4-parser-519c1e9af7dc727e34c3681f5a0b6970.png"},790:function(e,t,n){"use strict";t.Z=n.p+"assets/images/P4-table-match-rule-0802f58b0ded12139251dd126bdf99fc.png"}}]);