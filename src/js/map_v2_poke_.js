(function(undefined) {
  var MapHelper = this.MapHelper = {};
  var QQMap = qq.maps;
  var header = document.head || document.getElementsByTagName('head')[0];
  var pois_ = [];
  var marker_;
  var markers_poi_=[];
  var markers_poi_radio=[];
  var circle_;
  var radius_ = 2000;
  var rectangle_;
  var rectangle_arr=[];
  var rectangle_arr_arr=[];
  var polyline_arr=[];
  var polyline_arr2=[];
  var InfoWin;
  
  if (!Array.prototype.forEach)
    Array.prototype.forEach = function(fn) {
      for (var i = 0; i< this.length; i++) {
        fn.call(this, this[i], i);
      }
    };

  MapHelper.toArray = function(arrayLike) {
    var result = [];
    try {
      result = Array.prototype.slice.call(arrayLike);
    } catch(e) {
      for (var i = 0;i < arrayLike.length; i++) {
        result.push(arrayLike[i]);
      }
    }
    return result;
  };

  MapHelper.serialize = function(obj) {
    var str = '';
    for(var key in obj) {
      if (obj.hasOwnProperty(key)) {
        val = obj[key];
        (key == 'lng') && (key ='px');
        (key == 'lat') && (key ='py');
        (key == 'type') && (key ='searchType');
        str += (str ? '&' : '') + (key + '=' + val);
      }
    }
    return str;
  };
MapHelper.searchService = function(){
  var search_=new QQMap.SearchService({
                location: "±±¾©",
                pageIndex: 1,
                pageCapacity: 1,
                panel: document.getElementById('infoDiv'),
                autoExtend: true,
                complete: function(results) {
                    var pois = results.detail.pois;
                    var lat=pois[0].latLng;
                    console.log(lat)

                },
                error: function() {
                    alert("³ö´íÁË¡£");
                }
            });
}
    
  MapHelper.install = function(root, opts) {
    this.onPoiChange = opts.onPoiChange;
    this.onPoiRequest = opts.onPoiRequest;
    this.initMap(new QQMap.LatLng(opts.lat, opts.lng));
    this.setMarker(opts.lat, opts.lng);
  };

  MapHelper.initMap = function(center) {
    var mapObj = new QQMap.Map(root, {
      zoom: 12,
      center: center,
      draggable: true,
      scrollwheel: true,
      disableDoubleClickZoom: false
    });
    this.mapObj = mapObj;
    this.bindEventHandler();
    rectangle_ = new QQMap.Polygon({
      path: [],
      map: this.mapObj
    });
    InfoWin = new QQMap.InfoWindow({
            map: this.mapObj
    });
  };

  MapHelper.request = function(url, cb) {
    var node = document.createElement('script');
    node.type = "text/javascript";
    node.charset = 'utf-8';
    var id = 'fn' + (new Date().getTime());
    if (window[id])
      id = 'fn' + (new Date().getTime() + 1);
    window[id] = function(json) {
      cb && json && cb(json);
      try {
        delete window[id];
      } catch (e) {
        window[id] = undefined;
      }
      header.removeChild(node);
    };
    node.src = url + '&cb=' + id;
    header.insertBefore(node, header.firstChild);
  };

  MapHelper.bindEventHandler = function() {
    var that = this;
    var onPoiChange = this.onPoiChange;
    // QQMap.event.addListener(this.mapObj, 'click', function(event) {
    //   var lng = event.latLng.getLng();
    //   var lat = event.latLng.getLat();
    //   that.setMarkerPostion(lat, lng);
    //   onPoiChange && onPoiChange(lng, lat);
    //   //that.cleanCircle();
    //   //that.setCircle(lat, lng, radius);
    // });
  };

  MapHelper.setRadius = function(radius) {
    radius_ = radius;
  };

  MapHelper.setCenter = function(lat, lng) {
    this.mapObj.setCenter(new QQMap.LatLng(lat, lng));
  };

  MapHelper.setMarker = function(lat, lng) {
    marker_ = new QQMap.Marker({
      position: new QQMap.LatLng(lat, lng),
      map: this.mapObj,
      zIndex:10,
      animation: QQMap.MarkerAnimation.DROP
    });
  };
MapHelper.drawPolyline = function(lat,lng,start_data,end_data){
 
 for(var i = 0;i<start_data.length;i++){
    var to_lat=start_data[i].point_y;
    var to_lng=start_data[i].point_x;
    var path_arr=[new QQMap.LatLng(lat, lng)];
    path_arr.push(new QQMap.LatLng(to_lat,to_lng));
    var path_color=new QQMap.Color(255, 0, 0, 0.5);
    var polyline = new QQMap.Polyline({
            path: path_arr,
            strokeColor: path_color,
            strokeWeight: 2,
            editable: false,
            map: this.mapObj
    });
    polyline_arr.push(polyline);
 }
 for(var i = 0;i<end_data.length;i++){
    var to_lat=end_data[i].point_y;
    var to_lng=end_data[i].point_x;
    var path_arr=[new QQMap.LatLng(lat, lng)];
    path_arr.push(new QQMap.LatLng(to_lat,to_lng));
    var path_color=new QQMap.Color(29,149,63,0.8);
    var polyline = new QQMap.Polyline({
            path: path_arr,
            strokeColor: path_color,
            strokeWeight: 2,
            editable: false,
            map: this.mapObj
    });
    polyline_arr2.push(polyline);
 }
 
}
MapHelper.setMarkers_poi = function(arr) {//画起点的--入度的--startinfo
       var anchorb = new QQMap.Point(14,18),
        sizeb = new QQMap.Size(20, 30),
        origin = new QQMap.Point(0,0),
        icon = new QQMap.MarkerImage(
            "images/marker_poi_start.png",
            sizeb,
            origin,
            anchorb
        );
        
      var poi_arr=[];
      for(var i=0;i<arr.length;i++){
           poi_arr.push(arr[i]);
      }
      var marker_position;
      for(var i=0;i<poi_arr.length;i++){
        var lng=poi_arr[i].point_x;
        var lat=poi_arr[i].point_y;
        var name=poi_arr[i].name;
        var time_c=poi_arr[i].time_count;
        var md = poi_arr[i].md;
        var num=i+1;
         var classCode = poi_arr[i].class_code.substring(0,4);
         if(classCode == 2616){
            var cate = '商圈';
         }else{
            var cate = 'POI';
         }
        marker_position= new QQMap.LatLng(lat, lng);
        var marker_poi = new QQMap.Marker({
            position: marker_position,
            map: this.mapObj,
            animation: QQMap.MarkerAnimation.DROP,
            zIndex:9
       });
       markers_poi_.push(marker_poi);
       marker_poi.setIcon(icon);
       marker_poi.index_lat=lat;
       marker_poi.index_lng=lng;
       marker_poi.i=num;
       marker_poi.name=name;
       marker_poi.time_c=time_c;
       marker_poi.md=md;
       marker_poi.cate=cate;
       QQMap.event.addListener(marker_poi, 'mouseover', function() {
           InfoWin.close();
           InfoWin.open(); 
           InfoWin.setContent('<p style="text-align:center;font-weight:700;">起点--'+this.cate+''+this.i+'</p><div style="text-align:left;white-space:nowrap;">名称:'+this.name+'<br/>排名：'+this.i+'<br/>热度：'+this.time_c+'</div>');
           InfoWin.setPosition(new QQMap.LatLng(this.index_lat, this.index_lng));
           setTimeout(function() {
                InfoWin.close();
            }, 10 * 1000);
       }); 
      }//上一个for循环结尾

  };
MapHelper.setMarkers_poi_radio = function(arr) {
       var anchorb = new QQMap.Point(12,18),
        sizeb = new QQMap.Size(20,30),
        origin = new QQMap.Point(0,0),
        icon = new QQMap.MarkerImage(
            "images/marker_poi_end.png",
            sizeb,
            origin,
            anchorb
        );
        
      var poi_arr=[];
       for(var i=0;i<arr.length;i++){
          poi_arr.push(arr[i]);
        }
      var marker_position;
      for(var i=0;i<poi_arr.length;i++){
        var lng=poi_arr[i].point_x;
        var lat=poi_arr[i].point_y;
        var name=poi_arr[i].name;
        var time_c=poi_arr[i].time_count;
        var md = poi_arr[i].md;
        var num=i+1;
        var classCode = poi_arr[i].class_code.substring(0,4);
         if(classCode == 2616){
            var cate = '商圈';
         }else{
            var cate = 'POI';
         }
        marker_position= new QQMap.LatLng(lat, lng);
        var marker_poi = new QQMap.Marker({
            position: marker_position,
            map: this.mapObj,
            animation: QQMap.MarkerAnimation.DROP,
            zIndex:9
       });
       markers_poi_radio.push(marker_poi);
       marker_poi.setIcon(icon);
       marker_poi.index_lat=lat;
       marker_poi.index_lng=lng;
       marker_poi.i=num;
       marker_poi.name=name;
       marker_poi.time_c=time_c;
       marker_poi.md=md;
       marker_poi.cate=cate;

       QQMap.event.addListener(marker_poi, 'mouseover', function() {
           InfoWin.close();
           InfoWin.open(); 
           InfoWin.setContent('<p style="text-align:center;font-weight:700;">终点--'+this.cate+''+this.i+'</p><div style="text-align:left;white-space:nowrap;">名称:'+this.name+'<br/>排名：'+this.i+'<br/>热度：'+this.time_c+'</div>');
           InfoWin.setPosition(new QQMap.LatLng(this.index_lat, this.index_lng));
           setTimeout(function() {
                InfoWin.close();
            }, 10 * 1000);
       }); 
      }
  };


  MapHelper.set_poi_animation = function(num) {
    for(var i=0;i<markers_poi_.length;i++){
       markers_poi_[i].setAnimation(null);
       markers_poi_[i].setZIndex(9);
    }
    for(var i=0;i<markers_poi_radio.length;i++){
       markers_poi_radio[i].setAnimation(null);
       markers_poi_radio[i].setZIndex(9);
    }
    markers_poi_[num].setAnimation(QQMap.MarkerAnimation.BOUNCE);
    markers_poi_[num].setZIndex(9999);
  };
  MapHelper.set_poi_animation_radio = function(num) {
    for(var i=0;i<markers_poi_radio.length;i++){
       markers_poi_radio[i].setAnimation(null);
       markers_poi_radio[i].setZIndex(9);
    }
    for(var i=0;i<markers_poi_.length;i++){
       markers_poi_[i].setAnimation(null);
       markers_poi_[i].setZIndex(9);
    }
    markers_poi_radio[num].setAnimation(QQMap.MarkerAnimation.BOUNCE);
    markers_poi_radio[num].setZIndex(9999);
  };

  MapHelper.cleanInfo = function(){
     if(InfoWin!=undefined){
        InfoWin.close();
     }
  }

  MapHelper.cleanMarkers_poi = function() {
    markers_poi_.forEach(function(marker) {
      marker.setMap(null);
    });
    markers_poi_= [];
  };
   MapHelper.cleanMarkers_poi_radio = function() {
    markers_poi_radio.forEach(function(marker) {
      marker.setMap(null);
    });
    markers_poi_radio= [];
  };


  MapHelper.setCircle = function(lat, lng, radius) {
    var center = new QQMap.LatLng(lat, lng);
    circle_ = new QQMap.Circle({
      map: this.mapObj,
      center: center,
      radius: radius,
      fillColor: "#00f",
      fillOpacity: 0.3,
      strokeWeight: 2
    });
    circle_.setVisible(true);
    circle_.setMap(this.mapObj);
    radius_ = radius;
  };

  MapHelper.cleanCircle = function() {
    circle_.setMap(null);
  };

  MapHelper.setMarkerPostion = function(lat, lng) {
    var center = new QQMap.LatLng(lat, lng);
    marker_.setPosition(center);
  };

  MapHelper.cleanMarker = function(marker) {
    marker_.setMap(null);
  };

  var icon_ = new QQMap.MarkerImage(
    "http://open.map.qq.com/apifiles/2/1/14/theme/default/imgs/marker.png",
    new soso.maps.Size(22, 34), new soso.maps.Point(10, 32), new soso.maps.Point(0, 0)
  );
  MapHelper.drawPoi = function(lng, lat, num) {
    
    var marker = new PoiMarker({
      map: this.mapObj,
      position: new QQMap.LatLng(lat, lng),
      animation: QQMap.MarkerAnimation.BOUNCE,
      text: num
    });
    marker.setMap(this.mapObj);
    pois_.push(marker);
   
  };

  MapHelper.drawPoiradio = function(lng, lat, num) {
    var marker = new PoiMarkerradio({
      map: this.mapObj,
      position: new QQMap.LatLng(lat, lng),
      text: num
    });

    marker.setMap(this.mapObj);
    pois_.push(marker);
    
  };

MapHelper.drawRectangle = function(data,index) {//起点
  var hot_avg = (hot_max-hot_min)/5+1;
  var draw_path=[];
  var index = index || 0;
  if(index==10){
    return false;
  }
  if(data.length>0){


  var target=data[index].time_count;

     if(target>=(hot_min+hot_avg*4)){
         data[index]['color']=color_arr[0];
     }else if(target>=(hot_min+hot_avg*3)){
         data[index]['color']=color_arr[1];
     }else if(target>=(hot_min+hot_avg*2)){
         data[index]['color']=color_arr[2];
     }else if(target>=(hot_min+hot_avg*1)){
         data[index]['color']=color_arr[3];
     }else{
         data[index]['color']=color_arr[4];
     }
  
     var line_color=data[index].color;
     var target_face=data[index].shape;
     for(var j =0 ;j<target_face.length;j++){
          var t_lat=target_face[j].split(':')[1];
          var t_lng=target_face[j].split(':')[0];
          draw_path.push(new QQMap.LatLng(t_lat,t_lng));
     }
      rectangle_ = new QQMap.Polygon({
              path:draw_path,
              strokeWeight: 2,
              fillColor:new qq.maps.Color(0, 0, 0, 0.1),
              map: this.mapObj
     });
      rectangle_.setStrokeColor(data[index].color);
      rectangle_.setVisible(true);
      rectangle_.setMap(this.mapObj);
      var classCode = data[index].class_code.substring(0,4);
       if(classCode == 2616){
          var cate = '商圈';
       }else{
          var cate = 'POI';
       }
      rectangle_.cate=cate;
      rectangle_.i=index+1;
      rectangle_.index_lat=data[index].point_y;
      rectangle_.index_lng=data[index].point_x;
      rectangle_.name=data[index].name;
      rectangle_.time_c=data[index].time_count;
      rectangle_arr.push(rectangle_);
     /* QQMap.event.addListener(rectangle_, 'rightclick', function() {
           InfoWin.close();
           InfoWin.open(); 
           InfoWin.setContent('<p style="text-align:center;font-weight:700;">起点--'+this.cate+''+this.i+'</p><div style="text-align:left;white-space:nowrap;">名称:'+this.name+'<br/>排名：'+this.i+'<br/>热度：'+this.time_c+'</div>');
           InfoWin.setPosition(new QQMap.LatLng(this.index_lat, this.index_lng));
           setTimeout(function() {
                InfoWin.close();
            }, 5* 1000);
       }); */
  }
      setTimeout(function() {
           MapHelper.drawRectangle(data,index+1)
        }, 300);
  };
  MapHelper.drawRectangle_arr = function(data,index) {//终点点
  var hot_avg = (hot_max-hot_min)/5+1;
  var draw_path=[];
  var index = index || 0;
  if(index==10){
    return false;
  }
  console.log(index)
  var num=2;
  if(data.length>0){
  var target=data[index].time_count;
     if(target>=(hot_min+hot_avg*4)){
         data[index]['color']=color_arr[0];
     }else if(target>=(hot_min+hot_avg*3)){
         data[index]['color']=color_arr[1];
     }else if(target>=(hot_min+hot_avg*2)){
         data[index]['color']=color_arr[2];
     }else if(target>=(hot_min+hot_avg*1)){
         data[index]['color']=color_arr[3];
     }else{
         data[index]['color']=color_arr[4];
     }
  
     var line_color=data[index].color;
     var target_face=data[index].shape;
     for(var j =0 ;j<target_face.length;j++){
          var t_lat=target_face[j].split(':')[1];
          var t_lng=target_face[j].split(':')[0];
          draw_path.push(new QQMap.LatLng(t_lat,t_lng));
     }
      rectangle_ = new QQMap.Polygon({
              path:draw_path,
              strokeWeight: num,
              fillColor:new qq.maps.Color(0, 0, 0, 0.1),
              map: this.mapObj
     });
      rectangle_.setStrokeColor(data[index].color);
      rectangle_.setVisible(true);
      rectangle_.setMap(this.mapObj);
       var classCode = data[index].class_code.substring(0,4);
       if(classCode == 2616){
          var cate = '商圈';
       }else{
          var cate = 'POI';
       }
      rectangle_.cate=cate;
      rectangle_.i=index+1;
      rectangle_.index_lat=data[index].point_y;
      rectangle_.index_lng=data[index].point_x;
      rectangle_.name=data[index].name;
      rectangle_.time_c=data[index].time_count;
      rectangle_arr_arr.push(rectangle_);
      /*QQMap.event.addListener(rectangle_, 'rightclick', function() {
           InfoWin.close();
           InfoWin.open(); 
           InfoWin.setContent('<p style="text-align:center;font-weight:700;">终点--'+this.cate+''+this.i+'</p><div style="text-align:left;white-space:nowrap;">名称:'+this.name+'<br/>排名：'+this.i+'<br/>热度：'+this.time_c+'</div>');
           InfoWin.setPosition(new QQMap.LatLng(this.index_lat, this.index_lng));
           setTimeout(function() {
                InfoWin.close();
            }, 5* 1000);
       }); */
   }
      setTimeout(function() {
           MapHelper.drawRectangle(data,index+1)
        }, 300);
  };

  MapHelper.cleanPoi = function() {
    pois_.forEach(function(marker) {
      marker.setMap(null);
    });
    pois_ = [];
  };

  MapHelper.cleanRect = function() {
    rectangle_arr.forEach(function(rectangle_) {
      rectangle_.setMap(null);
    });
    rectangle_arr = [];
  };
  MapHelper.cleanRect_arr = function() {
    rectangle_arr_arr.forEach(function(rectangle_) {
      rectangle_.setMap(null);
    });
    rectangle_arr_arr = [];
  };

  MapHelper.drawHeatMap = function(data) {
    if (QQMapPlugin.isSupportCanvas) {
      heatmap = new QQMapPlugin.HeatmapOverlay(this.mapObj,
        {
          "radius": 1,
          "mapOpacity": 0.8,
          "useLocalExtrema": true,
          "valueField": 'count'
        }
      );
      heatmap.setData(data);
    }
  }

  /**
   * ×Ô¶¨Òå¸²¸ÇÎïÀà
   */
  function PoiMarker(opts) {
    QQMap.Overlay.call(this, opts);
  }
  PoiMarker.prototype = new QQMap.Overlay();
  PoiMarker.prototype.construct = function() {
    this.dom = document.createElement('div');
    this.dom.style.cssText =
      'background:url(images/marker_zhandian.png) no-repeat;' +
      'color:white;position:absolute;cursor:pointer;line-height: 20px;' +
      'text-align:center;width:26px;height:26px';
    var num=this.get('text');
    this.dom.title=num;
    this.getPanes().overlayMouseTarget.appendChild(this.dom);
  };
  PoiMarker.prototype.draw = function() {
    var position = this.get('position');
    if (position) {
      var pixel = this.getProjection().fromLatLngToDivPixel(position);
      this.dom.style.left = pixel.getX() - 10 + 'px';
      this.dom.style.top = pixel.getY() - 35 + 'px';
    }
  };
  PoiMarker.prototype.destroy = function() {
    this.dom.parentNode.removeChild(this.dom);
  };
  function PoiMarkerradio(opts) {
    QQMap.Overlay.call(this, opts);
  }
  PoiMarkerradio.prototype = new QQMap.Overlay();
  PoiMarkerradio.prototype.construct = function() {
    this.dom = document.createElement('div');
    this.dom.style.cssText =
      'background:url(images/marker_daoguan.png) no-repeat;' +
      'color:white;position:absolute;cursor:pointer;line-height: 20px;' +
      'text-align:center;width:26px;height:26px';
    var num=this.get('text');
    this.dom.title=num;
    this.getPanes().overlayMouseTarget.appendChild(this.dom);
  };
  PoiMarkerradio.prototype.draw = function() {
    var position = this.get('position');
    if (position) {
      var pixel = this.getProjection().fromLatLngToDivPixel(position);
      this.dom.style.left = pixel.getX() - 10 + 'px';
      this.dom.style.top = pixel.getY() - 35 + 'px';
    }
  };
  PoiMarkerradio.prototype.destroy = function() {
    this.dom.parentNode.removeChild(this.dom);
  };



}).call(this);
