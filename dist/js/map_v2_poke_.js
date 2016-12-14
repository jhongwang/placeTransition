(function(e){function t(e){l.Overlay.call(this,e)}function n(e){l.Overlay.call(this,e)}var i,a,o,r,s=this.MapHelper={},l=qq.maps,p=document.head||document.getElementsByTagName("head")[0],h=[],d=[],c=[],g=[],u=2e3,f=[];Array.prototype.forEach||(Array.prototype.forEach=function(e){for(var t=0;t<this.length;t++)e.call(this,this[t],t)}),s.toArray=function(e){var t=[];try{t=Array.prototype.slice.call(e)}catch(i){for(var n=0;n<e.length;n++)t.push(e[n])}return t},s.serialize=function(e){var t="";for(var n in e)e.hasOwnProperty(n)&&(val=e[n],"lng"==n&&(n="px"),"lat"==n&&(n="py"),"type"==n&&(n="searchType"),t+=(t?"&":"")+(n+"="+val));return t},s.searchService=function(){new l.SearchService({location:"±±¾©",pageIndex:1,pageCapacity:1,panel:document.getElementById("infoDiv"),autoExtend:!0,complete:function(e){var t=e.detail.pois,n=t[0].latLng;console.log(n)},error:function(){alert("³ö´íÁË¡£")}})},s.install=function(e,t){this.onPoiChange=t.onPoiChange,this.onPoiRequest=t.onPoiRequest,this.initMap(new l.LatLng(t.lat,t.lng)),this.setMarker(t.lat,t.lng)},s.initMap=function(e){var t=new l.Map(root,{zoom:16,center:e,draggable:!0,scrollwheel:!0,disableDoubleClickZoom:!1});this.mapObj=t,this.bindEventHandler(),o=new l.Polygon({path:[],map:this.mapObj}),r=new l.InfoWindow({map:this.mapObj})},s.request=function(t,n){var i=document.createElement("script");i.type="text/javascript",i.charset="utf-8";var a="fn"+(new Date).getTime();window[a]&&(a="fn"+((new Date).getTime()+1)),window[a]=function(t){n&&t&&n(t);try{delete window[a]}catch(t){window[a]=e}p.removeChild(i)},i.src=t+"&cb="+a,p.insertBefore(i,p.firstChild)},s.bindEventHandler=function(){var e=this,t=this.onPoiChange;l.event.addListener(this.mapObj,"click",function(n){var i=n.latLng.getLng(),a=n.latLng.getLat();e.setMarkerPostion(a,i),t&&t(i,a)})},s.setRadius=function(e){u=e},s.setCenter=function(e,t){this.mapObj.setCenter(new l.LatLng(e,t))},s.setMarker=function(e,t){i=new l.Marker({position:new l.LatLng(e,t),map:this.mapObj,zIndex:10,animation:l.MarkerAnimation.DROP})},s.setMarkers_poi_guai=function(e,t,n){var i=new l.Point(10,10),a=new l.Size(10,12),o=new l.Point(0,0),s=[];if(n){if(1==t)for(var p=0;p<e.length;p++){var h=e[p].spawn_category;h==n&&s.push(e[p]),11==n&&(12==h&&s.push(e[p]),13==h&&s.push(e[p]))}else for(var p=0;p<e.length;p++)if(!e[p].id_fbq){var h=e[p].spawn_category;h==n&&s.push(e[p]),11==n&&12==h&&s.push(e[p])}}else if(1==t)for(var p=0;p<e.length;p++)1!=e[p].spawn_category&&s.push(e[p]);else for(var p=0;p<e.length;p++)e[p].id_fbq||1!=e[p].spawn_category&&s.push(e[p]);for(var d,p=0;p<s.length;p++){var c=s[p].longitude,u=s[p].latitude,f=s[p].id,m=s[p].distance.toFixed(2),v=s[p].level,w=s[p].spawn_category,_=tuli_title[w].name,x=p+1;d=new l.LatLng(u,c);var b=new l.Marker({position:d,map:this.mapObj,animation:l.MarkerAnimation.DROP,zIndex:9});if(1!=w)var y=new l.MarkerImage(markersArray[w],a,o,i);g.push(b),b.setIcon(y),b.index_lat=u,b.index_lng=c,b.i=x,b.id=f,b.lel=v,b.dis=m,b.cat=_,l.event.addListener(b,"mouseover",function(){r.open(),r.setContent('<p style="text-align:center;font-weight:700;">刷怪点'+this.i+'</p><div style="text-align:left;white-space:nowrap;">ID:'+this.id+"<br/>距离："+this.dis+"<br/>等级："+this.lel+"</div><br/>类别:"+this.cat),r.setPosition(new l.LatLng(this.index_lat,this.index_lng)),setTimeout(function(){r.close()},3e4)})}},s.setMarkers_poi=function(e,t){var n=new l.Point(12,18),i=new l.Size(26,26),a=new l.Point(0,0),o=new l.MarkerImage("images/marker_daoguan.png",i,a,n),s=[];if(1==t)for(var p=0;p<e.length;p++)s.push(e[p]);else for(var p=0;p<e.length;p++)e[p].id_fbq||s.push(e[p]);for(var h,p=0;p<s.length;p++){var c=s[p].longitude,g=s[p].latitude,u=s[p].name,f=s[p].distance.toFixed(2),m=s[p].level,v=p+1;h=new l.LatLng(g,c);var w=new l.Marker({position:h,map:this.mapObj,animation:l.MarkerAnimation.DROP,zIndex:9});d.push(w),w.setIcon(o),w.index_lat=g,w.index_lng=c,w.i=v,w.name=u,w.lel=m,w.dis=f,l.event.addListener(w,"mouseover",function(){r.open(),r.setContent('<p style="text-align:center;font-weight:700;">道馆'+this.i+'</p><div style="text-align:left;white-space:nowrap;">标题:'+this.name+"<br/>距离："+this.dis+"<br/>等级："+this.lel+"</div>"),r.setPosition(new l.LatLng(this.index_lat,this.index_lng)),setTimeout(function(){r.close()},3e4)})}},s.setMarkers_poi_radio=function(e,t){var n=new l.Point(12,18),i=new l.Size(26,26),a=new l.Point(0,0),o=new l.MarkerImage("images/marker_zhandian.png",i,a,n),s=[];if(1==t)for(var p=0;p<e.length;p++)s.push(e[p]);else for(var p=0;p<e.length;p++)e[p].id_fbq||s.push(e[p]);for(var h,p=0;p<s.length;p++){var d=s[p].longitude,g=s[p].latitude,u=s[p].name,f=s[p].distance.toFixed(2),m=s[p].level,v=p+1;h=new l.LatLng(g,d);var w=new l.Marker({position:h,map:this.mapObj,animation:l.MarkerAnimation.DROP,zIndex:9});c.push(w),w.setIcon(o),w.index_lat=g,w.index_lng=d,w.i=v,w.name=u,w.lel=m,w.dis=f,l.event.addListener(w,"mouseover",function(){r.open(),r.setContent('<p style="text-align:center;font-weight:700;">补给站'+this.i+'</p><div style="text-align:left;white-space:nowrap;">标题:'+this.name+"<br/>距离："+this.dis+"<br/>等级："+this.lel+"</div>"),r.setPosition(new l.LatLng(this.index_lat,this.index_lng)),setTimeout(function(){r.close()},3e4)})}},s.setMarkers_poi_radio_cz=function(e,t){var n=new l.Point(12,18),i=new l.Size(26,26),a=new l.Point(0,0),o=new l.MarkerImage("images/marker_zhandian.png",i,a,n),s=[];if(1==t)for(var p=0;p<e.length;p++)e[p].flag&&1==e[p].flag||s.push(e[p]);else for(var p=0;p<e.length;p++)e[p].id_fbq||e[p].flag&&1==e[p].flag||s.push(e[p]);for(var h,p=0;p<s.length;p++){var d=s[p].longitude,g=s[p].latitude,u=s[p].name,f=s[p].distance.toFixed(2),m=s[p].level,v=p+1;h=new l.LatLng(g,d);var w=new l.Marker({position:h,map:this.mapObj,animation:l.MarkerAnimation.DROP,zIndex:9});c.push(w),w.setIcon(o),w.index_lat=g,w.index_lng=d,w.i=v,w.name=u,w.lel=m,w.dis=f,l.event.addListener(w,"mouseover",function(){r.open(),r.setContent('<p style="text-align:center;font-weight:700;">常驻补给站'+this.i+'</p><div style="text-align:left;white-space:nowrap;">标题:'+this.name+"<br/>距离："+this.dis+"<br/>等级："+this.lel+"</div>"),r.setPosition(new l.LatLng(this.index_lat,this.index_lng)),setTimeout(function(){r.close()},3e4)})}},s.setMarkers_poi_radio_hb=function(e,t){var n=new l.Point(12,18),i=new l.Size(26,26),a=new l.Point(0,0),o=new l.MarkerImage("images/marker_zhandian.png",i,a,n),s=[];if(1==t)for(var p=0;p<e.length;p++)e[p].flag&&1==e[p].flag&&s.push(e[p]);else for(var p=0;p<e.length;p++)e[p].id_fbq||e[p].flag&&1==e[p].flag&&s.push(e[p]);for(var h,p=0;p<s.length;p++){var d=s[p].longitude,g=s[p].latitude,u=s[p].name,f=s[p].distance.toFixed(2),m=s[p].level,v=p+1;h=new l.LatLng(g,d);var w=new l.Marker({position:h,map:this.mapObj,animation:l.MarkerAnimation.DROP,zIndex:9});c.push(w),w.setIcon(o),w.index_lat=g,w.index_lng=d,w.i=v,w.name=u,w.lel=m,w.dis=f,l.event.addListener(w,"mouseover",function(){r.open(),r.setContent('<p style="text-align:center;font-weight:700;">候选补给站'+this.i+'</p><div style="text-align:left;white-space:nowrap;">标题:'+this.name+"<br/>距离："+this.dis+"<br/>等级："+this.lel+"</div>"),r.setPosition(new l.LatLng(this.index_lat,this.index_lng)),setTimeout(function(){r.close()},3e4)})}},s.set_poi_animation=function(e){for(var t=0;t<d.length;t++)d[t].setAnimation(null),d[t].setZIndex(9);for(var t=0;t<c.length;t++)c[t].setAnimation(null),c[t].setZIndex(9);d[e].setAnimation(l.MarkerAnimation.BOUNCE),d[e].setZIndex(9999)},s.set_poi_animation_radio=function(e){for(var t=0;t<c.length;t++)c[t].setAnimation(null),c[t].setZIndex(9);for(var t=0;t<d.length;t++)d[t].setAnimation(null),d[t].setZIndex(9);c[e].setAnimation(l.MarkerAnimation.BOUNCE),c[e].setZIndex(9999)},s.set_poi_animation_guai=function(e){for(var t=0;t<g.length;t++)g[t].setAnimation(null),g[t].setZIndex(9);for(var t=0;t<d.length;t++)d[t].setAnimation(null),d[t].setZIndex(9);for(var t=0;t<c.length;t++)c[t].setAnimation(null),c[t].setZIndex(9);g[e].setAnimation(l.MarkerAnimation.BOUNCE),g[e].setZIndex(9999)},s.cleanInfo=function(){r!=e&&r.close()},s.cleanMarkers_poi=function(){d.forEach(function(e){e.setMap(null)}),d=[]},s.cleanMarkers_poi_radio=function(){c.forEach(function(e){e.setMap(null)}),c=[]},s.cleanMarkers_poi_guai=function(){g.forEach(function(e){e.setMap(null)}),g=[]},s.setCircle=function(e,t,n){var i=new l.LatLng(e,t);a=new l.Circle({map:this.mapObj,center:i,radius:n,fillColor:"#00f",fillOpacity:.3,strokeWeight:2}),a.setVisible(!0),a.setMap(this.mapObj),u=n},s.cleanCircle=function(){a.setMap(null)},s.setMarkerPostion=function(e,t){var n=new l.LatLng(e,t);i.setPosition(n)},s.cleanMarker=function(e){i.setMap(null)};new l.MarkerImage("http://open.map.qq.com/apifiles/2/1/14/theme/default/imgs/marker.png",new soso.maps.Size(22,34),new soso.maps.Point(10,32),new soso.maps.Point(0,0));s.drawPoi=function(e,n,i){var a=new t({map:this.mapObj,position:new l.LatLng(n,e),animation:l.MarkerAnimation.BOUNCE,text:i});a.setMap(this.mapObj),h.push(a)},s.drawPoiradio=function(e,t,i){var a=new n({map:this.mapObj,position:new l.LatLng(t,e),text:i});a.setMap(this.mapObj),h.push(a)},s.drawRectangle=function(e){fbq_d=[],fbq_b=[];for(var t,n=0;n<e.length;n++){var i=e[n].frag_info.flag,a=e[n].gyms,s=e[n].pokestops;if(0==i){if(a.length>0)for(var p=0;p<a.length;p++){fbq_d.push(a[p]);for(var h=a[p].id,d=0;d<ditubiaoji_d.length;d++)ditubiaoji_d[d].id==h&&(ditubiaoji_d[d].id_fbq=1)}if(s.length>0)for(var p=0;p<s.length;p++){fbq_b.push(s[p]);for(var h=s[p].id,d=0;d<ditubiaoji_b.length;d++)ditubiaoji_b[d].id==h&&(ditubiaoji_b[d].id_fbq=1)}}var c=e[n].frag_normal_info,g=e[n].frag_info.location;if(g.length>3){var u=g[0][0],m=g[0][1],v=g[3][0],w=g[3][1];if(99==i){var _=tuli_color[tuli_color.length-1],x=tuli_title[tuli_title.length-1].name;tuli_title[tuli_title.length-1].num++}else{var _=tuli_color[i],x=tuli_title[i].name;tuli_title[i].num++}t=[new l.LatLng(m,u),new l.LatLng(m,v),new l.LatLng(w,v),new l.LatLng(w,u)],o=new l.Polygon({path:t,strokeColor:"#014372",strokeWeight:1,fillColor:l.Color.fromHex(_,.6),map:this.mapObj}),o.setVisible(!0),o.setMap(this.mapObj),f.push(o),o.current_tuli=x,o.lat=(m+w)/2,o.lng=(v+u)/2,o.frag_normal_info_=c,l.event.addListener(o,"mouseover",function(){r.open(),r.setContent(this.current_tuli),r.setPosition(new l.LatLng(this.lat,this.lng)),setTimeout(function(){r.close()},3e4)}),l.event.addListener(o,"rightclick",function(){$(".poi_radio a").eq(0).addClass("poi_cur").siblings().removeClass("poi_cur"),$("#poi_fenpian").css("display","block"),$("#poi_poi").css("display","none"),$.isEmptyObject(this.frag_normal_info_)||(console.log("分片信息数据为空"),creatTabtop_fenpian(this.frag_normal_info_,this.current_tuli))})}}},s.cleanPoi=function(){h.forEach(function(e){e.setMap(null)}),h=[]},s.cleanRect=function(){f.forEach(function(e){e.setMap(null)}),f=[]},s.drawHeatMap=function(e){QQMapPlugin.isSupportCanvas&&(heatmap=new QQMapPlugin.HeatmapOverlay(this.mapObj,{radius:1,mapOpacity:.8,useLocalExtrema:!0,valueField:"count"}),heatmap.setData(e))},t.prototype=new l.Overlay,t.prototype.construct=function(){this.dom=document.createElement("div"),this.dom.style.cssText="background:url(images/marker_zhandian.png) no-repeat;color:white;position:absolute;cursor:pointer;line-height: 20px;text-align:center;width:26px;height:26px";var e=this.get("text");this.dom.title=e,this.getPanes().overlayMouseTarget.appendChild(this.dom)},t.prototype.draw=function(){var e=this.get("position");if(e){var t=this.getProjection().fromLatLngToDivPixel(e);this.dom.style.left=t.getX()-10+"px",this.dom.style.top=t.getY()-35+"px"}},t.prototype.destroy=function(){this.dom.parentNode.removeChild(this.dom)},n.prototype=new l.Overlay,n.prototype.construct=function(){this.dom=document.createElement("div"),this.dom.style.cssText="background:url(images/marker_daoguan.png) no-repeat;color:white;position:absolute;cursor:pointer;line-height: 20px;text-align:center;width:26px;height:26px";var e=this.get("text");this.dom.title=e,this.getPanes().overlayMouseTarget.appendChild(this.dom)},n.prototype.draw=function(){var e=this.get("position");if(e){var t=this.getProjection().fromLatLngToDivPixel(e);this.dom.style.left=t.getX()-10+"px",this.dom.style.top=t.getY()-35+"px"}},n.prototype.destroy=function(){this.dom.parentNode.removeChild(this.dom)}}).call(this);