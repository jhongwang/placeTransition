$(function(){
var nav_w=$('#nav').width();
$('#root').css('margin-right',nav_w+72+'px');
initPage(116.30752,39.98406);
var location_data=window.location.hash;
if(location_data==''){
   $('#search_lng_lat').val(cur_md_name);
   console.log(cur_md)
   console.log(cur_time)
   poi_list();
}
else{
  var hashdata=GetRequest();
  cur_md=hashdata.md;
  cur_time=hashdata.time;
  cur_md_name=hashdata.md_name;
  cur_lng=hashdata.lng;
  cur_lat=hashdata.lat;
  $('#search_lng_lat').val(cur_md_name);
  $('#time_select').val(cur_time);
  poi_list();
}
//搜索查询事件
$('#poi_search').click(function(){
   $('#ui-id-1').css('display','none');
   var lnglat_=$('#search_lng_lat').val();
   lnglat_=lnglat_.replace(/\s/g, '');
   poi_search_wenzi(lnglat_);
})
$('#time_select').change(function(){
  cur_time = $(this).val();
  poi_list();
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
window.onresize=function(){
  tr_hei();
}
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
   cur_md_name=li_selected_html_;
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
       $('#ui-id-1').css('display','none');
       var lnglat_=$('#search_lng_lat').val();
       lnglat_=lnglat_.replace(/\s/g, '');
       poi_search_wenzi(lnglat_);
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
var start_lists;//当前筛选出来的起点
var end_lists;//当前筛选出来的终点
var cur_md = "3629720141162880123";
var cur_md_name='中国技术交易大厦';
var cur_time=0;
var cur_lng = 116.30752;//当前选择点的lng
var cur_lat = 39.98406;//当前选择点的lat
var data_get;//获取ajax获取下来的数据 这个只有展示不可给改
var data_cur={};//把当前的从后台获取的数据放在这里 可以更改
//var color_arr=['#ff0000','#ffb300','#d5ff00','#30ff00','#00ffec'];//从红到绿
var color_arr=['#ff0000','#FFA500','#FFFF00','#32CD32','#48D1CC'];//从红到绿
var color_arr_rgba={
  '#ff0000':'255,0,0,0.4',
  '#FFA500':'255,165,0,0.4',
  '#FFFF00':'255,255,0,0.4',
  '#32CD32':'50,255,50,0.4',
  '#48D1CC':'72,209,204,0.4'
};
var hot_min;
var hot_max;

//jQuery.extend(true,data_cur,data_get);

function initPage(lng,lat) {
      MapHelper.install(document.getElementById('root'), {
        lat:lat,
        lng:lng,
        onPoiChange: function(lng_, lat_) {
          //MapHelper.setMarkerPostion(lat_, lng_);
         // ajax_poilist.abort();
          //poi_list(lng_,lat_,raidus_);
         }
      });
     // poi_list();//初始化

}
function checked_fun(){
  checkbox_selected=[];
   $('input[name=input_checkbox]').each(function(e){
     if($(this).context.checked){
        checkbox_selected.push($(this).context.value);
     }
   })
   draw_data();
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
    MapHelper.cleanRect();
    MapHelper.cleanRect_arr();
}
function clearTable(){
    $('#table_start tbody').html('');
    $('#table_end tbody').html('');
}

function draw_data(){
    clearDitu();
    start_lists = [];
    end_lists = [];
    //出度--终点--start_info--end_lists
    //入度--起点--end_info---start_lists
    //商圈 POI 起点 终点
    if(checkbox_selected.indexOf('起点') != -1){
       if(checkbox_selected.indexOf('商圈') != -1 && checkbox_selected.indexOf('POI') != -1){
         var arr = data_cur.end_info;
          for(var i =0;i< arr.length; i++){
             start_lists.push(arr[i]);
          }
       }else{
         if(checkbox_selected.indexOf('商圈') != -1){
          var arr = data_cur.end_info;
          for(var i =0;i< arr.length; i++){
             var classCode = arr[i].class_code.substring(0,4);
             if(classCode == 2616){
                start_lists.push(arr[i]);
             }
          }
         }
         if(checkbox_selected.indexOf('POI') != -1){
          var arr = data_cur.end_info;
          for(var i =0;i< arr.length; i++){
             var classCode = arr[i].class_code.substring(0,4);
             if(classCode != 2616){
                start_lists.push(arr[i]);
             }
          }
         }
       }
       
    }
    if(checkbox_selected.indexOf('终点') != -1){
       if(checkbox_selected.indexOf('商圈') != -1 && checkbox_selected.indexOf('POI') != -1){
         var arr = data_cur.start_info;
          for(var i =0;i< arr.length; i++){
             end_lists.push(arr[i]);
          }
       }else{
         if(checkbox_selected.indexOf('商圈') != -1){
          var arr = data_cur.start_info;
          for(var i =0;i< arr.length; i++){
             var classCode = arr[i].class_code.substring(0,4);
             if(classCode == 2616){
                end_lists.push(arr[i]);
             }
          }
         }
         if(checkbox_selected.indexOf('POI') != -1){
          var arr = data_cur.start_info;
          for(var i =0;i< arr.length; i++){
             var classCode = arr[i].class_code.substring(0,4);
             if(classCode != 2616){
                end_lists.push(arr[i]);
             }
          }
         }
       }
    }
  draw_marker();
}

function draw_marker(){
   MapHelper.drawRectangle_arr(end_lists.slice(0,10));
  MapHelper.drawRectangle(start_lists.slice(0,10));//起点
  creatTable_start(start_lists.slice(0,10),end_lists.slice(0,10));
  MapHelper.setMarkers_poi(start_lists.slice(0,10));//起点
  MapHelper.setMarkers_poi_radio(end_lists.slice(0,10));//终点
  MapHelper.setAnimation_show();

 
 
 // MapHelper.drawPolyline(cur_lat,cur_lng,start_lists.slice(0,10),end_lists.slice(0,10));
}
function creatTable_start(start_list,end_list){//
    //出度--终点--start_info--end_lists
    //入度--起点--end_info---start_lists
  var time_count_arr=[];
  console.log(start_list)
  console.log(end_list)
  for (var i = 0, length = start_list.length; i < length; i++){
    time_count_arr.push(start_list[i].time_count);
  }
  for (var i = 0, length = end_list.length; i < length; i++){
    time_count_arr.push(end_list[i].time_count);
  }
  hot_max = Math.max.apply(null,time_count_arr);
  hot_min = Math.min.apply(null,time_count_arr);
  if(hot_min=='-infinity'){
    hot_min=0;
  }
  if(hot_min=='infinity'){
    hot_max=0;
  }
  
  $('#hot_min').html(hot_min);
  $('#hot_max').html(hot_max);
  $('#table_start tbody').html('');
  $('#table_end tbody').html('');
  $('#chudu_num').html('('+data_get.start_count+')');
  $('#rudu_num').html('('+data_get.end_count+')');
  var start_len=start_list.length;
  var end_len = end_list.length;
  var iHtml = '';
  var iHtml2 = '';
  for(var i = 0; i<10; i++){//入度的
     iHtml += '<tr>';
     if(start_len>10){
       iHtml += '<td>'+(i+1)+'</td>';
       var classCode = start_list[i].class_code.substring(0,4);
       if(classCode == 2616){
          iHtml += '<td>'+start_list[i].name+'&nbsp;<i class="shang">B</i></td>';
       }else{
          iHtml += '<td>'+start_list[i].name+'&nbsp;<i class="poi">P</i></td>';
       }
       iHtml += '<td>'+start_list[i].time_count+'</td>';
       var time_count_avg=(start_list[i].time_count/data_get.end_count).toFixed(3);
       iHtml += '<td>'+time_count_avg+'</td>';
     }else{
       if(i>start_len-1){
         iHtml += '<td>&nbsp;</td>';
         iHtml += '<td>&nbsp;&nbsp;&nbsp;</td>';
         iHtml += '<td>&nbsp;</td>';
         iHtml += '<td>&nbsp;</td>';
       }else{
         iHtml += '<td>'+(i+1)+'</td>';
         var classCode = start_list[i].class_code.substring(0,4);
         if(classCode == 2616){
            iHtml += '<td>'+start_list[i].name+'&nbsp;<i class="shang">B</i></td>';
         }else{
            iHtml += '<td>'+start_list[i].name+'&nbsp;<i class="poi">P</i></td>';
         }
         iHtml += '<td>'+start_list[i].time_count+'</td>';
       var time_count_avg=(start_list[i].time_count/data_get.end_count).toFixed(3);
         iHtml += '<td>'+time_count_avg+'</td>';
       }
     }
     iHtml+='</tr>';
    
  }
  for(var i = 0; i<10; i++){//出度的
     iHtml2 += '<tr>';
     if(end_len>10){
       iHtml2 += '<td>'+(i+1)+'</td>';
       var classCode = end_list[i].class_code.substring(0,4);
       if(classCode == 2616){
          iHtml2 += '<td>'+end_list[i].name+'&nbsp;<i class="shang">B</i></td>';
       }else{
          iHtml2 += '<td>'+end_list[i].name+'&nbsp;<i class="poi">P</i></td>';
       }
       iHtml2 += '<td>'+end_list[i].time_count+'</td>';
        var time_count_avg=(end_list[i].time_count/data_get.start_count).toFixed(3);
        iHtml2 += '<td>'+time_count_avg+'</td>';
     }else{
       if(i>end_len-1){
         iHtml2 += '<td>&nbsp;</td>';
         iHtml2 += '<td>&nbsp;&nbsp;&nbsp;</td>';
         iHtml2 += '<td>&nbsp;</td>';
         iHtml2 += '<td>&nbsp;</td>';
       }else{
         iHtml2 += '<td>'+(i+1)+'</td>';
         var classCode = end_list[i].class_code.substring(0,4);
         if(classCode == 2616){
            iHtml2 += '<td>'+end_list[i].name+'&nbsp;<i class="shang">B</i></td>';
         }else{
            iHtml2 += '<td>'+end_list[i].name+'&nbsp;<i class="poi">P</i></td>';
         }
         iHtml2 += '<td>'+end_list[i].time_count+'</td>';
          var time_count_avg=(end_list[i].time_count/data_get.start_count).toFixed(3);
         iHtml2 += '<td>'+time_count_avg+'</td>';
       }
     }
      iHtml2+='</tr>';
     
  }
  $('#table_start tbody').html(iHtml);//入度的table
  $('#table_end tbody').html(iHtml2);//出度的table
  li_click_start('table_start',start_len);
  li_click_end('table_end',end_len);
  tr_hei();
}
function tr_hei(){
  var tr_height=($('#nav_table_box').height()-64)/10;
  var tr_height_=tr_height+'px';
  $('#nav_table_box table tbody tr').css('height',tr_height_);
}
function clear_alltd(){
  var all_td=document.getElementsByTagName('td');
  for(var i=0;i<all_td.length;i++ ){
     all_td[i].style.background='#fff';
  }
}
function clear_alltd1(m){
  alert(m)
  var all_td=document.getElementsByTagName('td');
  for(var i=0;i<all_td.length;i++ ){
     all_td[i].style.background='#fff';
  }
}
function li_clicked_show(id,num){
 clear_alltd();
 var aLi=document.getElementById(id).tBodies[0].getElementsByTagName('tr');
 for(var k=0;k<aLi[num].childNodes.length;k++){
            aLi[num].childNodes[k].style.background='#eaeaea';
 }
}
function li_click_start(id,len){
  var aLi=document.getElementById(id).tBodies[0].getElementsByTagName('tr');
  for(var i=0;i<len;i++){
     aLi[i].index=i;
     aLi[i].onclick=function(){
         clear_alltd();
         for(var k=0;k<this.childNodes.length;k++){
            this.childNodes[k].style.background='#eaeaea';
         }
         MapHelper.set_poi_animation(this.index);
         return false;
     }
  }
}
function li_click_end(id,len){
  var aLi=document.getElementById(id).tBodies[0].getElementsByTagName('tr');
  for(var i=0;i<len;i++){
     aLi[i].index=i;
     aLi[i].onclick=function(){
         clear_alltd();
         for(var k=0;k<this.childNodes.length;k++){
            this.childNodes[k].style.background='#eaeaea';
         }
         MapHelper.set_poi_animation_radio(this.index);
         return false;
     }
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
  console.log('poi_list')
  console.log(cur_md_name)
  console.log(cur_md)
  console.log(cur_time)
  console.log(cur_lng)
  console.log(cur_lat)

    clearDitu();
    clearTable();
    MapHelper.setCenter(cur_lat,cur_lng);
    MapHelper.setMarkerPostion(cur_lat,cur_lng);
    $('#ajax_tip').css('display','none');
    $('#ajax_before_tip').css('display','none');
    data_cur={};
$.ajax({
      type:"get",
	    url:"http://10.173.142.164:8080/didi_order/php/get_frag_info_didi.php?md="+cur_md+"&time="+cur_time+"&cb=didiorder&output_type=jsonp&sstime="+(new Date()).getTime()+"",
      dataType:"jsonp",
      jsonp:"cb",
      jsonpCallback:"didiorder",
      success:function(data){
        $('#ajax_before_tip').css('display','none');
		    if(data){
          data_get=data;
          jQuery.extend(true,data_cur,data_get);
          checked_fun();
          if(data.end_info.length==0&&data.start_info.length==0){
             $('#ajax_tip').css('display','block');
             setTimeout(function(){
                $('#ajax_tip').css('display','none');
             },1000);
          }
        }
        
      },
      error:function(ys){
         $('#ajax_tip').css('display','block');
         setTimeout(function(){
            $('#ajax_tip').css('display','none');
         },1000);
         $('#ajax_before_tip').css('display','none');
         console.log('fail_poi_list')
      },
      beforeSend:function(){
        $('#ajax_before_tip').css('display','block');
      },
      complete:function(){
        window.location.hash='md='+cur_md+'&time='+cur_time+'&md_name='+cur_md_name+'&lng='+cur_lng+'&lat='+cur_lat+'';
      }
  })
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
           cur_md_name=poi_w;
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


/*data_get={
  "point_id": "10000237242905405366",
  "end_info": [
    {
      "time_count": 1,
      "class_code": "261612",
      "point_y": "39.8661",
      "point_x": "116.369",
      "name": "开阳里",
      "md": "14807500289071369019"
    },
    {
      "time_count": 1,
      "class_code": "261612",
      "point_y": "39.87",
      "point_x": "116.367",
      "name": "右安门",
      "md": "488965000350343884"
    },
    {
      "time_count": 1,
      "class_code": "281010",
      "point_y": "39.820718",
      "point_x": "116.437633",
      "name": "北空住宅小区",
      "md": "12151227119926697386"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.958040",
      "point_x": "116.403094",
      "name": "黄寺大街2号院",
      "md": "630425867436704026"
    },
    {
      "time_count": 0,
      "class_code": "221100",
      "point_y": "39.765719",
      "point_x": "116.341257",
      "name": "高米店公园",
      "md": "12754316838117203994"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8441",
      "point_x": "116.376",
      "name": "马家堡",
      "md": "7020408830384290907"
    },
    {
      "time_count": 0,
      "class_code": "261611",
      "point_y": "40.0695",
      "point_x": "116.602",
      "name": "首都机场",
      "md": "3958123695942676603"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.837007",
      "point_x": "116.384383",
      "name": "西马场南里(一区)",
      "md": "13690317312215560675"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.837629",
      "point_x": "116.382817",
      "name": "西马·金润家园",
      "md": "10143549657378145685"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8138",
      "point_x": "116.31",
      "name": "花乡",
      "md": "3621145306123065938"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.9175",
      "point_x": "116.586",
      "name": "管庄",
      "md": "12602469734723964876"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.842892",
      "point_x": "116.414293",
      "name": "石榴庄西街",
      "md": "11422483020744049962"
    },
    {
      "time_count": 0,
      "class_code": "261613",
      "point_y": "39.8918",
      "point_x": "116.402",
      "name": "珠市口",
      "md": "6896000510945198284"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8761",
      "point_x": "116.461",
      "name": "潘家园",
      "md": "5291613672711026672"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8626",
      "point_x": "116.43",
      "name": "方庄",
      "md": "15122005536931915263"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.9406",
      "point_x": "116.366",
      "name": "新街口",
      "md": "3942576616906014771"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8456",
      "point_x": "116.444",
      "name": "成寿寺",
      "md": "3617689897366357484"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8648",
      "point_x": "116.449",
      "name": "左安门",
      "md": "6772442529244351538"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8484",
      "point_x": "116.43",
      "name": "宋家庄",
      "md": "5388207836196741777"
    },
    {
      "time_count": 0,
      "class_code": "261611",
      "point_y": "39.8815",
      "point_x": "116.41",
      "name": "天坛",
      "md": "4204779595402597933"
    },
    {
      "time_count": 0,
      "class_code": "261613",
      "point_y": "39.8358",
      "point_x": "116.401",
      "name": "大红门",
      "md": "211010337160084647"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.873871",
      "point_x": "116.453443",
      "name": "华威西里",
      "md": "14661205157830940651"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8614",
      "point_x": "116.466",
      "name": "十里河",
      "md": "9049277928487800217"
    },
    {
      "time_count": 0,
      "class_code": "271020",
      "point_y": "40.077046",
      "point_x": "116.600466",
      "name": "北京首都国际机场",
      "md": "16242010185520789715"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.883077",
      "point_x": "116.448403",
      "name": "劲松(八区)",
      "md": "10232369366050800798"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8837",
      "point_x": "116.461",
      "name": "劲松",
      "md": "18254193955880577317"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8953",
      "point_x": "116.398",
      "name": "前门",
      "md": "12529540822592633355"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.938340",
      "point_x": "116.366316",
      "name": "冠英园(西区)",
      "md": "1619261652243508672"
    },
    {
      "time_count": 0,
      "class_code": "261613",
      "point_y": "39.842",
      "point_x": "116.368",
      "name": "公益西桥",
      "md": "17822024237316975891"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.9075",
      "point_x": "116.309",
      "name": "公主坟",
      "md": "931844177840782932"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.914549",
      "point_x": "116.421321",
      "name": "东堂子胡同小区",
      "md": "17514838273108029021"
    }
  ],
  "start_info": [
    {
      "time_count": 1,
      "class_code": "261612",
      "point_y": "39.908",
      "point_x": "116.437",
      "name": "建国门",
      "md": "334228764054540438"
    },
    {
      "time_count": 1,
      "class_code": "261611",
      "point_y": "39.905",
      "point_x": "116.428",
      "name": "北京站",
      "md": "17416972940171720727"
    },
    {
      "time_count": 0,
      "class_code": "261611",
      "point_y": "39.8783",
      "point_x": "116.433",
      "name": "龙潭湖",
      "md": "9572228378899035607"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.859048",
      "point_x": "116.392237",
      "name": "西罗园(二区)",
      "md": "1204578564361811768"
    },
    {
      "time_count": 0,
      "class_code": "111000",
      "point_y": "39.860519",
      "point_x": "116.394373",
      "name": "西罗园(一区)",
      "md": "376145758768117619"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.860519",
      "point_x": "116.391780",
      "name": "西罗园",
      "md": "6893296779059829901"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8574",
      "point_x": "116.392",
      "name": "西罗园",
      "md": "1785756773135424827"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.869590",
      "point_x": "116.435408",
      "name": "芳城园(一区)",
      "md": "6013972557170032431"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.868339",
      "point_x": "116.434874",
      "name": "芳城园",
      "md": "3008704129290012719"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8138",
      "point_x": "116.31",
      "name": "花乡",
      "md": "3621145306123065938"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.9175",
      "point_x": "116.586",
      "name": "管庄",
      "md": "12602469734723964876"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8628",
      "point_x": "116.402",
      "name": "沙子口",
      "md": "10304870988497548396"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8626",
      "point_x": "116.43",
      "name": "方庄",
      "md": "15122005536931915263"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8144",
      "point_x": "116.342",
      "name": "新发地",
      "md": "5297600875616329534"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.819482",
      "point_x": "116.434150",
      "name": "庑殿家苑(B区)",
      "md": "4685664098874666340"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.819558",
      "point_x": "116.433145",
      "name": "庑殿家苑",
      "md": "4077795187198363773"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.792514",
      "point_x": "116.501872",
      "name": "大雄·郁金香舍",
      "md": "2612094734312918552"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.862939",
      "point_x": "116.405381",
      "name": "华龙美晟",
      "md": "143828181606789391"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8454",
      "point_x": "116.512",
      "name": "十八里店",
      "md": "314177514422708173"
    },
    {
      "time_count": 0,
      "class_code": "281011",
      "point_y": "39.915844",
      "point_x": "116.605774",
      "name": "北京新天地",
      "md": "13259788824952458353"
    },
    {
      "time_count": 0,
      "class_code": "131600",
      "point_y": "39.815508",
      "point_x": "116.336393",
      "name": "北京新发地农产品批发市场",
      "md": "16735852664919329490"
    },
    {
      "time_count": 0,
      "class_code": "281010",
      "point_y": "39.883077",
      "point_x": "116.448403",
      "name": "劲松(八区)",
      "md": "10232369366050800798"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.8837",
      "point_x": "116.461",
      "name": "劲松",
      "md": "18254193955880577317"
    },
    {
      "time_count": 0,
      "class_code": "261613",
      "point_y": "39.8555",
      "point_x": "116.456",
      "name": "分钟寺",
      "md": "12276860367466652168"
    },
    {
      "time_count": 0,
      "class_code": "261612",
      "point_y": "39.7876",
      "point_x": "116.51",
      "name": "亦庄",
      "md": "5156948706135991892"
    }
  ]
}
*/