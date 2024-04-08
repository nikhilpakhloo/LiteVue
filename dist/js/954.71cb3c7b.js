"use strict";(self["webpackChunklite"]=self["webpackChunklite"]||[]).push([[954],{2954:function(e,t,s){s.r(t),s.d(t,{default:function(){return A}});var i=s(1032),n=s(1034),l=s(4746),o=function(){var e=this,t=e._self._c;return t("lay-header",{attrs:{showBack:!e.isEditMode,showX:e.isEditMode,tBarColor:"#FFFFFF",onBack:()=>{e.isEditMode?e.isEditMode=!1:e.$router.go(-1)}}},[t("template",{slot:"right"},[e.items&&e.items.length?t("span",{staticClass:"txt-right",on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.onClickActionEdit.apply(null,arguments)}}},[e._v(e._s(e.isEditMode?e.items.length==e.selectItems.length?e.$t("common.select-none"):e.$t("common.select-all"):e.$t("common.select")))]):e._e(),!e.isEditMode&&e.cInfo&&1!=e.cInfo.favorite?t("span",{staticClass:"txt-right ml-6",on:{click:function(t){return t.preventDefault(),t.stopPropagation(),(()=>e.pushRouter({name:"collEdit",params:{seq:e.seq}})).apply(null,arguments)}}},[e._v(" "+e._s(e.$t("common.update"))+" ")]):e._e()]),e.cInfo?t(i.A,{staticClass:"pt-1 lay-body",attrs:{column:""}},[t("span",{staticClass:"txt-sub"},[e._v(" "+e._s(e.cInfo&&1==e.cInfo.favorite?e.$t("collection.like"):e.cInfo.collectionName)+" ")]),t(i.A,{staticClass:"txt-cnt"},[t("span",[e._v(e._s(e.$t("collection.info.pic-cnt",{count:e.allCount})))]),t(n.A),t("span",{directives:[{name:"show",rawName:"v-show",value:!e.isEditMode,expression:"!isEditMode"}],staticClass:"txt-add",on:{click:function(t){return t.preventDefault(),t.stopPropagation(),(()=>e.pushRouter({name:"collPic",params:{seq:e.seq}})).apply(null,arguments)}}},[e._v(" "+e._s(e.$t("common.add"))+" ")])],1),t(i.A,{staticClass:"flex-grow-0 pb-5 pt-6",attrs:{wrap:"",row:""}},e._l(e.items,(function(s,i){return t("c-pic",{key:i,attrs:{editMode:e.isEditMode,src:s.thumbName+`?${e.filterVer}`,isVideo:"VIDEO"==s.fileType,duration:s.videoTime,select:e.selectItems.indexOf(s)>-1?e.selectItems.indexOf(s)+1:null,isLike:"Y"==s.likeYn,isFilter:"1"==s.filterd,isMemo:s.memo.title||s.memo.memo,onClick:()=>e.onClickActionSelect(s),mediaId:s.mediaId}})})),1),t("transition",{attrs:{name:"slide-y-reverse-transition"}},[e.isEditMode?t("c-footer",{attrs:{height:"80",elevation:"0"}},[t(i.A,{directives:[{def:l.A,name:"ripple",rawName:"v-ripple"}],staticClass:"lay-footer-menu",class:[e.selectItems.length?"select":""],attrs:{column:"","align-center":"","justify-center":""},on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.onClickActionSave.apply(null,arguments)}}},[t("img",{attrs:{src:s(4830)}}),t("span",[e._v(e._s(e.$t("common.save")))])]),t(i.A,{directives:[{def:l.A,name:"ripple",rawName:"v-ripple"}],staticClass:"lay-footer-menu",class:[e.selectItems.length?"select":""],attrs:{column:"","align-center":"","justify-center":""},on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.onClickActionFilter.apply(null,arguments)}}},[t("img",{attrs:{src:s(7364)}}),t("span",[e._v(e._s(e.$t("common.filter")))])]),t(i.A,{directives:[{def:l.A,name:"ripple",rawName:"v-ripple"}],staticClass:"lay-footer-menu",class:[e.selectItems.length?"select":""],attrs:{column:"","align-center":"","justify-center":""},on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.onClickActionDel.apply(null,arguments)}}},[t("img",{attrs:{src:s(2769)}}),t("span",[e._v(e._s(e.$t("common.delete")))])])],1):e._e()],1)],1):e._e()],2)},c=[],r=(s(4114),s(3004)),a=s(1877),m=s(3548),d=s(9159),h=s(8414),u=s.n(h),p=s(7488);const I={request:e=>{let t={isSuccess:!1,errorMsg:"",data:null},s=`\n            DELETE FROM \n                TB_COLLECTION_MEDIA \n            WHERE \n                collectionMediaId in (${e})\n        `;return new Promise(((e,i)=>{const n=`API_CALLBACK_${u()().replace(/-/gi,"")}`;p.A.sqlite(JSON.stringify({cmd:"runQuery",query:s}),n),window[`${n}`]=s=>{if(s){const i=JSON.parse(s);t.isSuccess=i.result,t.errorMsg=i.error,t.data=i.data,e(t)}else i();delete window[`${n}`]}}))}};var g=I,f={components:{cFooter:r.A,CPic:a.A},props:["seq"],data(){return{isGetingItems:!1,isEditMode:!1,selectItems:[],items:[],pageNo:1,allCount:0,cInfo:null}},computed:{},watch:{isEditMode(){this.selectItems.splice(0,this.selectItems.length)}},created(){window.addEventListener("scroll",this.handleScroll)},mounted(){this.getData()},destroyed(){window.removeEventListener("scroll",this.handleScroll)},methods:{async getData(){if(this.isGetingItems)return;this.isGetingItems=!0;let e=await m.A.request(this.seq);this.isGetingItems=!1,e.isSuccess?(this.cInfo=e.data,this.getItems()):this.showToast(this.$t("error.error"),!1,!1)},async getItems(e=1){if(!this.isGetingItems){this.isGetingItems=!0;var t=[];this.seq&&t.push({key:"collectionId",val:this.seq}),await d.A.request(e,20,t).then((t=>{this.pageNo=e,1==e&&this.items.splice(0,this.items.length),this.allCount=t.allCount,this.items.push(...t.list),this.isGetingItems=!1,this.items.forEach((e=>{try{this.$set(e,"memo",JSON.parse(e.memo.replace(/\n/g,"\\n")))}catch(t){}})),setTimeout((()=>{var e=document.children[0];this.checkNext(e)}),300)})).catch((()=>{this.isGetingItems=!1}))}},handleScroll(e){let t=e.target.children[0];this.checkNext(t)},checkNext(e){this.items.length<this.allCount&&e&&e.scrollHeight-e.clientHeight-80<e.scrollTop&&this.getItems(this.pageNo+1)},checkSelect(){return!!this.selectItems.length},onClickActionEdit(){this.isEditMode?this.items.length==this.selectItems.length?this.selectItems.splice(0,this.selectItems.length):this.items.forEach((e=>{this.selectItems.indexOf(e)<0&&this.selectItems.push(e)})):this.isEditMode=!0},onClickActionSelect(e){this.isEditMode?this.selectItems.indexOf(e)>-1?this.selectItems.splice(this.selectItems.indexOf(e),1):this.selectItems.push(e):this.pushRouter({name:"media",params:{seq:e.mediaId,collId:e.collectionId}})},onClickActionSave(){if(this.checkSelect()){if(this.isGetingItems)return;this.isGetingItems=!0,window.onSaveComplete=e=>{this.isEditMode=!1,this.isGetingItems=!1,"success"==e?this.showToast(this.$t("error.save-comp")):this.showToast(this.$t("error.error"),!1,!1),delete window.onSaveComplete},this.nativeBridge.fileDownload(this.selectItems,"onSaveComplete")}},onClickActionFilter(){if(this.selectItems.length>this.FILTER_MAX_SIZE)return this.showToast(this.$t("error.filter-cnt-error",{count:this.FILTER_MAX_SIZE}),!1,!1),!1;this.checkSelect()&&(window.onFilterComplete=e=>{e&&(this.showToast(this.$t("error.filter-comp"),!1,!1),this.$store.commit("filterVer",this.filterVer+1),this.getItems()),this.isEditMode=!1,delete window.onFilterComplete},this.nativeBridge.showFilterView(this.selectItems,"onFilterComplete"))},onClickActionDel(){this.showPopup({title:this.$t("gallery.edit.select",{count:this.selectItems.length}),msg:this.$t("collection.media.delete-collection"),okTxt:this.$t("collection.media.btn-delect-all"),cancelTxt:this.$t("collection.media.btn-delect"),persistent:!1,okAction:()=>{window.onDeleteComplete=()=>{this.isEditMode=!1,this.getItems(),this.showToast(this.$t("error.del-comp"),!1,!1),delete window.onDeleteComplete},this.nativeBridge.fileDelete(this.selectItems,"onDeleteComplete")},cancelAction:()=>{if(!this.isGetingItems){this.isGetingItems=!0;var e=[];this.selectItems.forEach((t=>{e.push(t.collectionMediaId)})),g.request(e).then((e=>{this.isGetingItems=!1,e.isSuccess?(this.isEditMode=!1,this.getItems(),this.showToast(this.$t("error.del-comp"),!1,!1)):this.showToast(this.$t("error.error"),!1,!1)})).catch((()=>{this.isGetingItems=!1}))}}})}}},E=f,C=s(1656),w=(0,C.A)(E,o,c,!1,null,"1c443938",null),A=w.exports},1034:function(e,t,s){s(158);var i=s(4152);t.A=(0,i.Gn)("spacer","div","v-spacer")},3548:function(e,t,s){var i=s(8414),n=s.n(i),l=s(7488);const o={request:async e=>{let t={isSuccess:!1,errorMsg:"",data:null},s=`   \n            SELECT \n                *\n            FROM \n                TB_COLLECTION \n            WHERE\n                collectionId = ${e}\n        `;return new Promise(((e,i)=>{const o=`API_GETINFO_CALLBACK_${n()().replace(/-/gi,"")}`;l.A.sqlite(JSON.stringify({cmd:"selectQuery",query:s}),o),window[`${o}`]=s=>{try{if(s){const i=JSON.parse(s);t.isSuccess=i.result,t.errorMsg=i.error,t.data=i.data&&i.data.length>0?i.data[0]:null,e(t)}else i()}catch(n){i(n)}delete window[`${o}`]}}))}};t.A=o},9159:function(e,t,s){var i=s(8414),n=s.n(i),l=s(7488),o=s(7334);const c={request:async(e=1,t=20,s)=>{let i={isSuccess:!1,errorMsg:"",list:null,allCount:0},c="\n            SELECT \n                COUNT(cm.collectionId) AS cnt \n            FROM \n                TB_COLLECTION_MEDIA cm\n            LEFT JOIN\n                TB_MEDIA m\n            ON\n                m.mediaId = cm.mediaId AND m.deleted = 0\n            WHERE \n                m.deleted = 0\n            AND \n                cm.deleted = 0\n        ",r="\n            SELECT \n               *\n            FROM \n                TB_COLLECTION_MEDIA cm\n            LEFT JOIN\n                (\n                    SELECT \n                        mm.*,\n                        CASE WHEN(COUNT(cmm.collectionMediaId) > 0) THEN 'Y' ELSE 'N' END as likeYn\n                    FROM \n                        TB_MEDIA mm\n                    LEFT JOIN\n                        TB_COLLECTION_MEDIA cmm\n                    ON\n                        mm.mediaId = cmm.mediaId \n                        AND cmm.collectionId = 1 \n                        AND cmm.deleted = 0\n                    GROUP BY \n                        mm.mediaId\n                ) m\n            ON\n                m.mediaId = cm.mediaId AND m.deleted = 0\n            WHERE \n                m.deleted = 0\n            AND \n                cm.deleted = 0\n        ";s&&s.length&&s.forEach((e=>{r+=` AND ${e.key} = '${e.val}' `,c+=` AND ${e.key} = '${e.val}' `})),r+=`   \n            ORDER BY \n                cm.createDate DESC\n            LIMIT ${t} OFFSET ${t*(e-1)}\n        `;try{i.allCount=await o.A.request(c,"cnt")}catch(a){throw a}return new Promise(((e,t)=>{const s=`API_GETLIST_CALLBACK_${n()().replace(/-/gi,"")}`;l.A.sqlite(JSON.stringify({cmd:"selectQuery",query:r}),s),window[`${s}`]=n=>{try{if(n){const t=JSON.parse(n);i.isSuccess=t.result,i.errorMsg=t.error,i.list=t.data,e(i)}else t()}catch(a){t(a)}delete window[`${s}`]}}))}};t.A=c},2769:function(e,t,s){e.exports=s.p+"img/ic-menu-del.a80b8317.svg"},4830:function(e,t,s){e.exports=s.p+"img/ic-menu-down.d94443e1.svg"},7364:function(e,t,s){e.exports=s.p+"img/ic-menu-filter.3954c3d4.svg"}}]);
//# sourceMappingURL=954.71cb3c7b.js.map