$(function(){
var nav_w=$('#nav').width();
$('#root').css('margin-right',nav_w+72+'px');
initPage(116.31649,39.98389);
var location_data=window.location.hash;
if(location_data==''){
  //poi_list(113.90582084655762,22.47189502276308,500);
}
else{
  var hashdata=GetRequest();
  var lng_=hashdata.point_x;
  var lat_=hashdata.point_y;
  $('#search_lng_lat').val(''+lng_+':'+lat_+'');
}
//搜索查询事件
$('#poi_search').click(function(){
   $('#ui-id-1').css('display','none');
   var lnglat_=$('#search_lng_lat').val();
   lnglat_=lnglat_.replace(/\s/g, '');
   var indexof1=lnglat_.indexOf(',');
   var indexof2=lnglat_.indexOf(':');
   if(indexof2==-1&&indexof1==-1){
     poi_search_wenzi(lnglat_);
   }else{
      var pos;
      if(lnglat_.indexOf(',')!==-1){
         pos=lnglat_.split(",");
      }
      if(lnglat_.indexOf(':')!==-1){
         pos=lnglat_.split(":");
      }
     var lat = pos[1];
     var lng = pos[0];
     cur_lng = lng;
     cur_lat = lat;
    // poi_list(lng,lat,radius_);
   }
})
$('#time_select').change(function(){
  data_cur={};
  jQuery.extend(true,data_cur,data_get);
  time_selected_show();
})
$('#search_lng_lat').click(function(){
   $(this).select();
})

$('.input_btn').mousedown(function(){
  $(this).css('background','#3b83c0');
})
$('.input_btn').mouseup(function(){
  $(this).css('background','#2d9cff');
})

//checkbox单选或者多选点击事件
$('input[name=input_checkbox]').click(function(){
  checked_fun()
   console.log(checkbox_selected)
})
//搜索自动补全结果展示和点击事件
$('#ui-id-1 li').click(function(){
   var li_selected_html=$(this).html();
   var li_selected_html_=li_selected_html.split("<")[0];
   li_selected_html_=li_selected_html_.replace(/\s/g, '');
   $('#search_lng_lat').val(li_selected_html_);
   $('#ui-id-1').css('display','none');
   var poi=$(this).find('em').html();
   var lat=poi.split(',')[0];
   var lng=poi.split(',')[1];
   cur_lng = lng;
   cur_lat = lat;
   cur_md =$(this).attr('class').split(' ')[0];
   poi_list();
})
$('#ui-id-1 li').mouseover(function(){
  $(this).addClass('autoli_cur').siblings().removeClass('autoli_cur');
  ui_id_li_curNum=$(this).index();
})



 $("#search_lng_lat").autocomplete({
      minLength: 0,
      source: function( request, response ) {
          if($('#search_lng_lat').val()!=''){
                   $('#ui-id-1').css('display','block');
                   var key_val=$('#search_lng_lat').val();
                   $.ajax({
                             type : "get",
                             async : false,
                             url :"http://apis.map.qq.com/ws/place/v1/search?boundary=region("+cur_city+",1)", 
                             data:{
                               keyword:key_val,
                               key:"WC4BZ-TFI24-M45UM-DI57V-SVUH3-LQFUV",
                               output:"jsonp"
                             },
                             cache : false,
                             dataType : "jsonp",
                             jsonp: "cb",
                             jsonpCallback:"auto",
                             success : function(json){
                              if(json&&json.data&&json.data!=[]){
                                 var title_list = json.data;
                                 for(var i=0;i<title_list.length;i++){
                                    $('#ui-id-1 li').eq(i).attr('class','');
                                    $('#ui-id-1 li').eq(i).addClass(title_list[i].id);
                                    var title = title_list[i].title;
                                    var category = title_list[i].category.split(':').pop();
                                    var address = title_list[i].ad_info.province+'-'+title_list[i].ad_info.city+'-'+title_list[i].ad_info.district;
                                    $('#ui-id-1 li').eq(i).html(""+title+"<span>&nbsp;【"+category+"】</span><span>【"+address+"】</span><em>"+title_list[i].location.lat+','+title_list[i].location.lng+"</em>");
                                 } 
                              }
                             },
                             error:function(e){
                                 console.log('请检查suggestion')
                             },
                             complete:function(){
                               //autocom_li_keycode();
                             }
                   });
            }
            else{
                $('#ui-id-1').css('display','none');
            }
        }

})

document.onkeydown = function (e) {  
    if (!e) e = window.event;  
    if ((e.keyCode || e.which) == 13) {  
       // poi_list(zuixin_daoguan_arr,zuixin_buji_arr,zuixin_guai_arr);
    }  
} 

/*window结尾*/
})
//全局函数
jQuery.ajaxSetup({
   timeout:20000,
   cache:false
});
var checkbox_selected;//表示checkbox选择了哪些 是个数组
var cur_city = '北京';//表示当前选中城市 暂时只有北京
var start_busi;//当前筛选出来的起点 商圈
var start_poi;//当前筛选出来的起点 POI
var end_busi;//当前筛选出来的终点 商圈
var end_poi;//当前筛选出来的终点 POI
var cur_md = 3606955108245080331;//当前选择点的md
var cur_lng = 116.31617;//当前选择点的lng
var cur_lat = 40.04194;//当前选择点的lat
var data_get;//获取ajax获取下来的数据 这个只有展示不可给改
var data_cur={};//把当前的从后台获取的数据放在这里 可以更改
jQuery.extend(true,data_cur,data_get);

function initPage(lng,lat) {
      MapHelper.install(document.getElementById('root'), {
        lat:lat,
        lng:lng,
        onPoiChange: function(lng_, lat_) {
          MapHelper.setMarkerPostion(lat_, lng_);
          $('#search_lng_lat').val('中关村');

         // ajax_poilist.abort();
          //poi_list(lng_,lat_,raidus_);
         }
      });
      poi_list();//初始化

}
function checked_fun(){
  checkbox_selected=[];
   $('input[name=input_checkbox]').each(function(e){
     if($(this).context.checked){
        checkbox_selected.push($(this).context.value);
     }
   })
  time_selected_show();
}
function cur_city_code(key){
  $.ajax({
        type:"get",
        url:"http://apis.map.qq.com/ws/geocoder/v1/?address="+key+"&key=WC4BZ-TFI24-M45UM-DI57V-SVUH3-LQFUV&output=jsonp&time="+(new Date()).getTime()+"",
        dataType: 'jsonp',
        jsonp: 'cb',    
        jsonpCallback:"citylogin1", 
        success: function(data){
            if(data.status==0){
              var lat=data.result.location.lat;
              var lng=data.result.location.lng;
              poi_list(lng,lat,500);
            }
        },
        error: function(data){
            console.log("fail-getReact");
        },
        beforeSend:function(){
           
        },
        complete: function(){
               
        }
   });
}
function cur_city_get(lat,lng){
 $.ajax({
      type:"get",
      url:"http://apis.map.qq.com/ws/geocoder/v1/?location="+lat+","+lng+"&key=WC4BZ-TFI24-M45UM-DI57V-SVUH3-LQFUV&output=jsonp&qtime="+(new Date()).getTime()+"",
      dataType:"jsonp",
      jsonp:"callback",
      jsonpCallback:"curCity",
      success:function(data){
        if(data.status==0&&data.result&&data.result.address_component&&data.result.address_component.city){
          cur_city=data.result.ad_info.city;
          cur_code=data.result.ad_info.adcode;
          cur_city_code_(cur_city);
          if(cur_city=='北京市'||cur_city=="天津市"||cur_city=="上海市"||cur_city=="重庆市"||cur_city=="台湾"||cur_city=="香港特别行政区"||cur_city=="澳门特别行政区"){
              cur_code=String(cur_code).substr(0,2)+'0000';
              cur_code=Number(cur_code)
          }else{
              cur_code=String(cur_code).substr(0,4)+'00';
              cur_code=Number(cur_code)
          }
          //cur_code=String(cur_code).
          //$('#city_login').val(cur_city);
         //console.log(cur_city)
         //console.log(cur_code)
        }
      },
      error:function(ys){
         console.log('fail_cur_city_get')
      },
      beforeSend:function(){
      },
      complete:function(){
        //console.log(cur_city)
      }
  })  
}

function $$(id){
  return document.getElementById(id);
}

function clearDitu(){
    MapHelper.cleanMarkers_poi();
    MapHelper.cleanMarkers_poi_radio();
}
function clearTable(){
    $('#table_start tbody').html('');
    $('#table_end tbody').html('');
}

function draw_data(){
    clearDitu();
    start_busi = [];
    start_poi = [];
    end_busi = [];
    end_poi = [];
    //商圈 POI 起点 终点
    if(checkbox_selected.indexOf('起点') != -1){
       if(checkbox_selected.indexOf('商圈') != -1){
          var arr = data_cur.start_info.busi_list;
          for(var i =0;i< arr.length; i++){
             start_busi.push(arr[i]);
          }
       }
       if(checkbox_selected.indexOf('POI') != -1){
          var arr = data_cur.start_info.name_list;
          for(var i =0;i< arr.length; i++){
             start_poi.push(arr[i]);
          }
       }
    }
    if(checkbox_selected.indexOf('终点') != -1){
       if(checkbox_selected.indexOf('商圈') != -1){
          var arr = data_cur.end_info.busi_list;
          for(var i =0;i< arr.length; i++){
             end_busi.push(arr[i]);
          }
       }
       if(checkbox_selected.indexOf('POI') != -1){
           var arr = data_cur.end_info.name_list;
          for(var i =0;i< arr.length; i++){
             end_poi.push(arr[i]);
          }
       }
    }
  draw_marker();
}
function draw_data_other_time(target){
    clearDitu();
    start_busi = [];
    start_poi = [];
    end_busi = [];
    end_poi = [];
    //商圈 POI 起点 终点
    if(checkbox_selected.indexOf('起点') != -1){
       if(checkbox_selected.indexOf('商圈') != -1){
          var arr = data_cur.start_info.busi_list;
          for(var i =0;i< arr.length; i++){
            if(arr[i].time_count == target){
             start_busi.push(arr[i]);
            }
          }
       }
       if(checkbox_selected.indexOf('POI') != -1){
          var arr = data_cur.start_info.name_list;
          for(var i =0;i< arr.length; i++){
             if(arr[i].time_count == target){
                start_poi.push(arr[i]);
             }
             
          }
       }
    }
    if(checkbox_selected.indexOf('终点') != -1){
       if(checkbox_selected.indexOf('商圈') != -1){
          var arr = data_cur.end_info.busi_list;
          for(var i =0;i< arr.length; i++){
             if(arr[i].time_count == target){
              end_busi.push(arr[i]);
             }
             
          }
       }
       if(checkbox_selected.indexOf('POI') != -1){
           var arr = data_cur.end_info.name_list;
          for(var i =0;i< arr.length; i++){
             if(arr[i].time_count == target){
               end_poi.push(arr[i]);
             }
            
          }
       }
    }
  draw_marker();
}
function draw_marker(){
  //console.log(start_busi)
  //console.log(start_poi)
  //console.log(end_busi)
  //console.log(end_poi)
  MapHelper.setMarkers_poi(start_busi,'商圈');
  MapHelper.setMarkers_poi(start_poi,'POI');
  MapHelper.setMarkers_poi_radio(end_busi,'商圈');
  MapHelper.setMarkers_poi_radio(end_poi,'POI');
  creatTable_start(start_busi,start_poi);
  creatTable_end(end_busi,end_poi);
}
function creatTable_start(arr_busi,arr_poi){
  $('#table_start tbody').html('');
  var iHtml = '';
  for(var i = 0; i<arr_busi.length; i++){
     iHtml += '<tr>';
     iHtml += '<td>'+arr_busi[i].class_code+'</td>';
     iHtml += '<td>'+arr_busi[i].name+'</td>';
     iHtml += '<td>'+arr_busi[i].time_count+'</td>';
  }
  for(var i = 0; i<arr_poi.length; i++){
     iHtml += '<tr>';
     iHtml += '<td>'+arr_poi[i].class_code+'</td>';
     iHtml += '<td>'+arr_poi[i].name+'</td>';
     iHtml += '<td>'+arr_poi[i].time_count+'</td>';
  }
  $('#table_start tbody').html(iHtml);
}
function creatTable_end(arr_busi,arr_poi){
  $('#table_end tbody').html('');
  var iHtml = '';
  for(var i = 0; i<arr_busi.length; i++){
     iHtml += '<tr>';
     iHtml += '<td>'+arr_busi[i].class_code+'</td>';
     iHtml += '<td>'+arr_busi[i].name+'</td>';
     iHtml += '<td>'+arr_busi[i].time_count+'</td>';
  }
  for(var i = 0; i<arr_poi.length; i++){
     iHtml += '<tr>';
     iHtml += '<td>'+arr_poi[i].class_code+'</td>';
     iHtml += '<td>'+arr_poi[i].name+'</td>';
     iHtml += '<td>'+arr_poi[i].time_count+'</td>';
  }
  $('#table_end tbody').html(iHtml);
}
function time_selected_show(){
  var target = $('#time_select').val();
  if(target == 1){
     draw_data();
  }else{
     draw_data_other_time(target)
  }
}
function GetQueryString(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
   var r = window.location.search.substr(1).match(reg);
   if (r!=null) return (r[2]); return null;
}
function GetRequest() { 
    var url = location.hash; //获取url中"?"符后的字串 
    var theRequest = new Object(); 
    if (url.indexOf("#") != -1) { 
    var str = url.substr(1); 
    strs = str.split("&"); 
    for(var i = 0; i < strs.length; i ++) { 
    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
    } 
    } 
    return theRequest; 
}

function poi_list(){
    $('#ajax_tip').css('display','block');
    setTimeout(function(){
      $('#ajax_tip').css('display','none');
    },1000);
    clearDitu();
    clearTable();
    MapHelper.setCenter(cur_lat,cur_lng);
    MapHelper.setMarkerPostion(cur_lat,cur_lng);
    //data_get=[];
    //$('#ajax_tip').css('display','none');

   data_get={end_info:{"busi_list": [{"md": "5176743892522660139", "name": "东关", "point_x": "116.643755", "point_y": "40.314403", "class_code": "261612", "time": "2016-08-01 01:25:18", "time_count": "2"}], "id_type": "9997096193932611952|start", "name_list": [{"md": "9997096193932611952", "name": "东关(一区)", "point_x": "116.642755", "point_y": "40.314401", "class_code": "281010", "time": "2016-08-01 01:25:18", "time_count": "6"}]},start_info:{"busi_list": [{"md": "3606955108245080331", "name": "清河", "point_x": "116.346", "point_y": "40.0285", "class_code": "261612", "time": "2016-08-01 00:52:56", "time_count": "5"}], "id_type": "9999716292397959034|start", "name_list": [{"md": "13961079153525193356", "name": "清缘里", "point_x": "116.356609", "point_y": "40.029031", "class_code": "281010", "time": "2016-08-01 00:52:56", "time_count": "4"}, {"md": "9999716292397959034", "name": "清缘里(中区)", "point_x": "116.355609", "point_y": "40.029033", "class_code": "281010", "time": "2016-08-01 00:52:56", "time_count": "3"}]}};
    data_cur={};
    jQuery.extend(true,data_cur,data_get);
    checked_fun();
/*$.ajax({
      type:"get",
	  url:"http://10.173.142.164:8080/poke_timi_200916/php/get_frag_info_timi.php?md="+cur_md+"&output_type=jsonp&time="+(new Date()).getTime()+"",
      dataType:"jsonp",
      jsonp:"cb",
      jsonpCallback:"test",
      success:function(data){
		    if(data){
        
        }
        else{
           $('#ajax_tip').css('display','block');
           MapHelper.cleanPoi();
        }

      },
      error:function(ys){
         console.log('fail_poi_list')
      },
      beforeSend:function(){
        $('#ajax_before_tip').css('display','block');
      },
      complete:function(){
        window.location.hash='md='+cur_md+'';
      }
  })*/
}



/*通过名称获取latlng*/
function poi_search_wenzi(poi_w){
  //console.log(cur_city)
   $.ajax({
        type:"get",
        asycn:false,
        url:"http://apis.map.qq.com/ws/place/v1/search?boundary=region("+cur_city+",1)",
        data:{
           keyword:poi_w,
           key:"WC4BZ-TFI24-M45UM-DI57V-SVUH3-LQFUV",
           page_size:1,
           page_index:1,
           output:"jsonp"
        },
        chche:false,
        dataType:"jsonp",
        jsonp:"cb",
        jsonpCallback:"search_result",
        success:function(json){
        if(json&&json.data){
           cur_md = json.data[0].id;
           cur_lng = json.data[0].location.lng;
           cur_lat = json.data[0].location.lat;
           poi_list();
           //这里通过md去获取结果 通过经纬度改变地图中心点
        }else{
          alert('抱歉,搜索结果为空！')
        }
      },
      error:function(){
         console.log('fail_poi_search_wenzi')
      },
      beforeSend:function(){

      },
      complete:function(){
      }
   });
}



/*自动补全js*/
var $$$$ = function (id) {
    return "string" == typeof id ? document.getElementById(id) : id;
}
var Bind = function(object, fun) {
    return function() {
        return fun.apply(object, arguments);
    }
}
function AutoComplete(obj,autoObj,arr){
    this.obj=$$$$(obj);        //输入框
    this.autoObj=$$$$(autoObj);//DIV的根节点
    this.value_arr=arr;        //不要包含重复值
    this.index=-1;          //当前选中的DIV的索引
    this.search_value="";   //保存当前搜索的字符
}
AutoComplete.prototype={
    //初始化DIV的位置
    init: function(){
        this.autoObj.style.left = this.obj.offsetLeft + "px";
        this.autoObj.style.top  = this.obj.offsetTop + this.obj.offsetHeight + "px";
        this.autoObj.style.width= this.obj.offsetWidth - 2 + "px";//减去边框的长度2px
    },
    //删除自动完成需要的所有DIV
    deleteDIV: function(){
        while(this.autoObj.hasChildNodes()){
            this.autoObj.removeChild(this.autoObj.firstChild);
        }
        this.autoObj.className="auto_hidden";
    },
    //设置值
    setValue: function(_this){
        return function(){
            _this.obj.value=this.seq;
            _this.autoObj.className="auto_hidden";
        }
    },
    //模拟鼠标移动至DIV时，DIV高亮
    autoOnmouseover: function(_this,_div_index){
        return function(){
            _this.index=_div_index;
            var length = _this.autoObj.children.length;
            for(var j=0;j<length;j++){
                if(j!=_this.index ){
                    _this.autoObj.childNodes[j].className='auto_onmouseout';
                }else{
                    _this.autoObj.childNodes[j].className='auto_onmouseover';
                }
            }
        }
    },
    //更改classname
    changeClassname: function(length){
        for(var i=0;i<length;i++){
            if(i!=this.index ){
                this.autoObj.childNodes[i].className='auto_onmouseout';
            }else{
                this.autoObj.childNodes[i].className='auto_onmouseover';
                this.obj.value=this.autoObj.childNodes[i].seq;
            }
        }
    }
    ,
    //响应键盘
    pressKey: function(event){
        var length = this.autoObj.children.length;
        //光标键"↓"
        if(event.keyCode==40){
            ++this.index;
            if(this.index>length){
                this.index=0;
            }else if(this.index==length){
                this.obj.value=this.search_value;
            }
            this.changeClassname(length);
        }
        //光标键"↑"
        else if(event.keyCode==38){
            this.index--;
            if(this.index<-1){
                this.index=length - 1;
            }else if(this.index==-1){
                this.obj.value=this.search_value;
            }
            this.changeClassname(length);
        }
        //回车键
        else if(event.keyCode==13){
            this.autoObj.className="auto_hidden";
            this.index=-1;
        }else{
            this.index=-1;
        }
    },
    //程序入口
    start: function(event){
        if(event.keyCode!=13&&event.keyCode!=38&&event.keyCode!=40){
            this.init();
            this.deleteDIV();
            this.search_value=this.obj.value;
            var valueArr=this.value_arr;
            //valueArr.sort();
            if(this.obj.value.replace(/(^\s*)|(\s*$)/g,'')==""){ return; }//值为空，退出
            try{ var reg = new RegExp("(" + this.obj.value + ")","i");}
            catch (e){ return; }
            var div_index=0;//记录创建的DIV的索引
            for(var i=0;i<valueArr.length;i++){
                if(reg.test(valueArr[i].title)){
                    var div = document.createElement("div");
                    addClass(div,valueArr[i].id);
                    addClass(div,"auto_onmouseout");
                    //div.className="auto_onmouseout";
                    div.seq=valueArr[i].title;
                    div.onclick=this.setValue(this);//确认点击某个div 把值给input
                    div.onmouseover=this.autoOnmouseover(this,div_index);
                    var none='无';
                    var div_inner_str=''+valueArr[i].title+'<'+valueArr[i].province+'-'+valueArr[i].city+'-'+(valueArr[i].district?valueArr[i].district:none)+'>';
                    div.innerHTML=div_inner_str.replace(reg,"<strong>$1</strong>");//搜索到的字符粗体显示
                    this.autoObj.appendChild(div);
                    this.autoObj.className="auto_show";
                    div_index++;
                }
            }
            /*for(var i=0;i<title_list.length;i++){
               $('#ui-id-1 li').eq(i).attr('class','');
               $('#ui-id-1 li').eq(i).addClass(title_list[i].id);
               $('#ui-id-1 li').eq(i).html(""+title_list[i].title+"<span>【"+title_list[i].province+"-"+title_list[i].city+"-"+title_list[i].district+"】</span><em>"+title_list[i].location.lat+','+title_list[i].location.lng+"</em>");
           } */
        }
        this.pressKey(event);
        window.onresize=Bind(this,function(){this.init();});
    }
}



console.log(data_get)
console.log(data_cur)

