$(function(){
$.ajax({
      type:"get",     
	  url:"http://passport.oa.com/modules/passport/signin.ashx?url=http://10.173.142.164:8080/poke_timi_200916/php/auth.php?",
      dataType:"jsonp",
      jsonp:"callback",
      jsonpCallback:"ajaxauthentication",
      success:function(data){
        if(data==1){
          get_version();
        }
		else{
			alert("抱歉！您没有权限！请联系felixkong");
		}
		
      },
      error:function(ys){
         console.log('fail_login');
         alert('请登录OA系统！')
      },
      beforeSend:function(){
      },
      complete:function(){        
      }
});

var nav_w=$('#nav').width();
$('#root').css('margin-right',nav_w+72+'px');
$('.poi_radio a').click(function(){
  $(this).addClass('poi_cur').siblings().removeClass('poi_cur');
  var aindex=$(this).index();
  if(aindex==0){
    $('#poi_fenpian').css('display','block');
    $('#poi_poi').css('display','none');
  }else{
    $('#poi_fenpian').css('display','none');
    $('#poi_poi').css('display','block');
  }

})
$('#poi_search').click(function(){
   $('#ui-id-1').css('display','none');
   var lnglat_=$('#search_lng_lat').val();
   var radius_=$('#radius').val();
   radius_=radius_.replace(/\s/g, '');
   lnglat_=lnglat_.replace(/\s/g, '');
   var indexof1=lnglat_.indexOf(',');
   var indexof2=lnglat_.indexOf(':');
   if(indexof2==-1&&indexof1==-1){
    poi_search_wenzi(lnglat_,radius_);
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
     poi_list(lng,lat,radius_);
   }
})
$('#search_lng_lat').click(function(){
   $(this).select();
})
$('#radius').click(function(){
   $(this).select();
})
$('.input_btn').mousedown(function(){
  $(this).css('background','#3b83c0');
})
$('.input_btn').mouseup(function(){
  $(this).css('background','#2d9cff');
})
$('#biaoji').change(function(){
      var target=$(this).val();
      biaoji(target);
})
poi_yiji_data_show();
$('#poifl_1').click(function(){
  //var yiji_H=document.getElementById('yiji_in').offsetHeight;
  if($('#yiji').height()>0)
    $('#yiji').stop().animate({'height':'0px'});
  $('#yiji').stop().animate({'height':'295px'});
  var ev=ev||event;
  ev.cancelBubble=true;
})
document.onclick=function(){
  if($('#yiji').height()>0)
  $('#yiji').stop().animate({'height':'0px'});
  if($('#erji').height()>0)
  $('#erji').stop().animate({'height':'0px'});
}
$('#poifl_2').click(function(){
  var  erji_title=$$('erji_title').innerHTML;
  if(erji_title!='二级分类'&&erji_title!='二级分类(none)'){
    var erji_H=document.getElementById('erji_in').offsetHeight;
    $('#erji').stop().animate({'height':''+erji_H+'px'});
  }
  var ev=ev||event;
  ev.cancelBubble=true;
})

$('#yiji_qx').click(function(){
  tuli_input_checkbox_all('yiji_ul');
})
$('#erji_qx').click(function(){
  tuli_input_checkbox_all('erji_ul');
})
$('#yiji_qk').click(function(){
  tuli_input_checkbox_none('yiji_ul');
})
$('#erji_qk').click(function(){
  tuli_input_checkbox_none('erji_ul');
})
$('#yiji_qd').click(function(){
  var aIpt=$$('yiji_ul').getElementsByTagName('input');
  var num=0;
  var target_num;
  var title='';
  for(var i=0;i<aIpt.length;i++){
     if(aIpt[i].checked==true){
       num++;
       target_num=aIpt[i].value;
       target_num=Number(target_num);
       title+=poi_yiji_data[target_num]+'、';
     }
  }
  title=title.slice(0,-1);
  var arr_none=[];
  if(num==0){
    $$('yiji_title').innerHTML='一级分类('+num+')';
    $$('erji_title').innerHTML='二级分类(none)';
    $('#yiji').stop().animate({'height':'0px'});
    $('#erji').stop().animate({'height':'0px'});
    //tuli_input_checkbox_none('yiji_ul');
    zuixin_daoguan_arr=[];
    zuixin_buji_arr=[];
    poi_list_show(zuixin_daoguan_arr,zuixin_buji_arr,arr_none);
  }
  else if(num==1){
     target_num=Number(target_num);
     $$('yiji_title').innerHTML='一级分类('+num+')';
     $('#yiji').stop().animate({'height':'0px'});
     $$('erji_title').innerHTML='二级分类(all)';
     yiji_num=target_num;
     poi_erji_data_show(poi_erji_data[target_num]);
     poi_fl_show(title,arr_daoguan,arr_bujizhan,0);
  }else{
     $$('yiji_title').innerHTML='一级分类('+num+')';
     $$('erji_title').innerHTML='二级分类(none)';
     $$('yiji_title').title=title;
     $$('erji_ul').innerHTML='';
     title=title.split('、');
     poifl_daoguan_s=[];
     poifl_buji_s=[];
     for(var j=0;j<title.length;j++){
       poi_fl3_show(title[j],arr_daoguan,arr_bujizhan,0);
     }
    zuixin_daoguan_arr=poifl_daoguan_s;
    zuixin_buji_arr=poifl_buji_s;
    poi_list_show(zuixin_daoguan_arr,zuixin_buji_arr,arr_none);
    $('#yiji').stop().animate({'height':'0px'});
     //tuli_input_checkbox_none('yiji_ul');
  }
  return false;
})
$('#erji_qd').click(function(){
  var aIpt=$$('erji_ul').getElementsByTagName('input');
  var num=0;
  var target_num;
  var title='';
  for(var i=0;i<aIpt.length;i++){
     if(aIpt[i].checked==true){
       num++;
       target_num=aIpt[i].value;
       target_num=Number(target_num);
       title+=poi_erji_data[yiji_num][target_num]+'、';
     }
  }
  title=title.slice(0,-1);
  if(num==0){
    $$('erji_title').innerHTML='二级分类(0)';
    title=$$('yiji_title').innerHTML;
    $('#yiji').stop().animate({'height':'0px'});
   //poi_fl_show(title,arr_daoguan,arr_bujizhan,0);
    zuixin_daoguan_arr=[];
    zuixin_buji_arr=[];
    var arr_none=[];
    poi_list_show(zuixin_daoguan_arr,zuixin_buji_arr,arr_none);
  }
  else if(num==1){
     $$('erji_title').innerHTML='二级分类('+num+')';
     poi_fl2_show(title,poifl_daoguan,poifl_buji,1);
  }else{
     $$('erji_title').innerHTML='二级分类('+num+')';
     $$('erji_title').title=title;
     title=title.split('、');
     poifl_daoguan_s=[];
     poifl_buji_s=[];
     for(var j=0;j<title.length;j++){
       poi_fl3_show(title[j],poifl_daoguan,poifl_buji,1);
     }
     zuixin_daoguan_arr=poifl_daoguan_s;
     zuixin_buji_arr=poifl_buji_s;
     var arr_none=[];
     poi_list_show(zuixin_daoguan_arr,zuixin_buji_arr,arr_none);

  }
  $('#yiji').stop().animate({'height':'0px'});
  $('#erji').stop().animate({'height':'0px'});
  return false;
})
$('#rdfz').focus(function(){
   $(this).select();
   EventUtil.addHandler(document,'mousewheel',onWheel1);
   EventUtil.addHandler(document,'DOMMouseScroll',onWheel1);
})
$('#rdfz').blur(function(){
   if($('#rdfz').val()>100)
    $('#rdfz').val(100);
   poi_list_show(new_dg_arr,new_bj_arr,new_guai_arr);
   EventUtil.removeHandler(document,'mousewheel',onWheel1);
   EventUtil.removeHandler(document,'DOMMouseScroll',onWheel1);
})

//封闭区展示隐藏功能
$('#fbq').click(function(){
  MapHelper.cleanMarkers_poi();
  MapHelper.cleanMarkers_poi_radio();
  MapHelper.cleanMarkers_poi_guai();
   if(fbq_off==1){
     fbq_off=0;
     $(this).val('展 示');
   }else{
     fbq_off=1;
     $(this).val('隐 藏');
   }
   var target=$('#biaoji').val();
   biaoji(target);
})
$('#banben_sel').change(function(){
   var location_data=window.location.hash;
    if(location_data==''){
      poi_list(113.90582084655762,22.47189502276308,500);
    }
    else{
      var hashdata=GetRequest();
      var lng_=hashdata.point_x;
      var lat_=hashdata.point_y;
      var radius_=hashdata.radius;
      $('#radius').val(radius_);
      $('#search_lng_lat').val(''+lng_+':'+lat_+'');
      poi_list(lng_,lat_,radius_);
    }
    var banben_num=$(this).find("option:checked").attr("id");
    city_codes_num=city_codes[banben_num];
    console.log(city_codes_num)
})
$('#ui-id-1 li').click(function(){
   var li_selected_html=$(this).html();
   var li_selected_html_=li_selected_html.split("<")[0];
   li_selected_html_=li_selected_html_.replace(/\s/g, '');
   $('#search_lng_lat').val(li_selected_html_);
   $('#ui-id-1').css('display','none');
   var poi=$(this).find('em').html();
   var lat=poi.split(',')[0];
   var lng=poi.split(',')[1];
   var radius_=$('#radius').val();
   radius_=radius_.replace(/\s/g, '');
   poi_list(lng,lat,radius_);
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
                             url :"http://apis.map.qq.com/ws/place/v1/suggestion", 
                             data:{
                               keyword:key_val,
                               key:"WC4BZ-TFI24-M45UM-DI57V-SVUH3-LQFUV",
                               output:"jsonp"
                             },
                             cache : false,
                             dataType : "jsonp",
                             jsonp: "cb",
                             jsonpCallback:"QQMapLoader",
                             success : function(json){
                              if(json&&json.data&&json.data!=[]){
                                 var title_list = json.data;
                                 for(var i=0;i<title_list.length;i++){
                                    $('#ui-id-1 li').eq(i).attr('class','');
                                    $('#ui-id-1 li').eq(i).addClass(title_list[i].id);
                                    $('#ui-id-1 li').eq(i).html(""+title_list[i].title+"<span>【"+title_list[i].province+"-"+title_list[i].city+"-"+title_list[i].district+"】</span><em>"+title_list[i].location.lat+','+title_list[i].location.lng+"</em>");
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
 document.getElementById('table_show').onclick=function(){
  //var city_codes=[440300,110000,220200,650100,321200,450100,330100,370600,500000,310000,440100];
  cur_code=Number(cur_code);
  console.log(city_codes)
  console.log(cur_code)
  var item=arr_chongfu(city_codes_num,cur_code);
  var version=$('#banben_sel').val();
  version=version.replace(/\s/g, '');
  if(item!=-1){
    this.target='_blank';
    this.href="plus_html/report_table.html#code="+cur_code+"&version="+version+"&city="+cur_city+"&lat="+cur_lat+"&lng="+cur_lng;
  }else{
    this.removeAttribute('href');
    this.removeAttribute('target');
    alert('抱歉，暂无此城市报表信息！')
  }
  
}
document.onkeydown = function (e) {  
    if (!e) e = window.event;  
    if ((e.keyCode || e.which) == 13) {  
        poi_list_show(zuixin_daoguan_arr,zuixin_buji_arr,zuixin_guai_arr);
    }  
} 

/*window结尾*/
})
var ui_id_li_curNum=-1;

var poi_yiji_data=[
 '美食','公司企业','机构团体','购物','生活服务','娱乐休闲','运动健身','汽车','医疗保健','酒店宾馆','旅游景点','文化场馆','教育学校','银行金融','地名地址','基础设施','房产小区','室内及附属设施','其它'
];
var poi_erji_data=[
  ['中餐厅','农家菜','官府菜','家常菜','私家菜','烧烤','火锅','海鲜','特色中餐','素食','小吃快餐','清真','日韩菜','东南亚菜','西餐','自助餐','面包甜点','茶餐厅','冷饮店','其它美食'],
  ['农林牧渔基地','企业/工厂','其它公司企业'],
  ['公检法机构','外国机构','工商税务机构','政府机关','民主党派','社会团体','传媒机构','文艺团体','科研机构','机构团体附属','其它机构团体'],
  ['综合市场','便利店','超市','数码家电','花鸟鱼虫','家具家居建材','农贸市场','小商品市场','旧货市场','体育户外','服饰鞋包','图书音像','眼镜店','母婴儿童','珠宝饰品','化妆品','商业步行街','礼品','摄影器材','钟表店','拍卖典当行','古玩字画','自行车专卖','烟酒专卖','文化用品','购物场所附属','其它购物'],
  ['旅行社','票务代表','邮局速递','通讯服务','报刊亭','自来水营业厅','电力营业厅','摄影冲印','洗衣店','教练','生活服务场所','信息咨询中心','招聘求职','彩票','事务所','家政','中介结构','宠物服务','丧葬','废品收购站','福利院养老院','测字风水','婚庆服务','美容美发','其它生活服务'],
  ['洗浴推拿足疗','KTV','酒吧','咖啡厅','夜总会','茶馆','电影院','剧场音乐厅','度假疗养','户外活动','游戏棋牌','网吧','迪厅','娱乐休闲场所附属','其它娱乐休闲'],
  ['健身中心','游泳馆','海滨浴场','瑜伽','羽毛球馆','乒乓球馆','网球场','篮球场','足球场','壁球场','橄榄球','马术','赛马场','高尔夫场','保龄球馆','台球馆','滑雪','溜冰','跆拳道','舞蹈','综合体育场馆','运动健身场所附属','其它运动健身'],
  ['加油站','停车场','汽车销售','汽车维修','摩托车','驾校','汽车租赁','汽车养护','洗车场','汽车俱乐部','汽车救援','汽车配件销售','二手车交易市场','车辆管理机构','其它汽车'],
  ['综合医院','专科医院','诊所','急救中心','药房药店','疾病预防','医疗保健附属','其它医疗保健'],
  ['酒店宾馆','星级酒店','经济型酒店','公寓式酒店','旅馆招待所','度假村','农家院','青年旅社','酒店宾馆附属','其它酒店宾馆'],
  ['风景名胜','公园','植物园','动物园','水族馆','城市广场','世界遗产','国家级景点','省级景点','纪念馆','寺庙道观','教堂','海滩','清真寺','景点公园附属','其它旅游景点'],
  ['博物馆','展览馆','科技馆','图书馆','天文馆','档案馆','文化宫','美术馆','会展中心','其它文化场馆'],
  ['大学','中学','小学','幼儿园','培训','职业技术学校','成人教育','教育学校附属','其它教育学校'],
  ['银行','自动提款机','保险公司','证券公司','财务公司','银行金融场所附属','其它银行金融'],
  ['交通地名','地名地址信息','道路名','自然地名','行政地名','门牌信息','热点区域','其它地名地址'],
  ['交通设施','公共设施','道路附属','其它基础设施'],
  ['住宅区','产业园区','商务楼宇','房产小区附属','其它房产小区'],
  ['通行设施'],
  []
];


//全局函数
jQuery.ajaxSetup({
   timeout:2000,
   cache:false
});
var poifl_daoguan_s;
var poifl_buji_s;
var poifl_guai_s;
var poifl_daoguan;
var poifl_buji;
var poifl_guai;
var poifl2_daoguan;
var poifl2_buji;
var poifl2_guai;
var yiji_num;
var arr_daoguan;
var arr_bujizhan;
var arr_guai;
var ditubiaoji_d;
var ditubiaoji_b;
var ditubiaoji_g;
var fbq_d;
var fbq_b;
var dbq_g;
var zuixin_daoguan_arr;
var zuixin_buji_arr;
var zuixin_guai_arr;
var other_arr;
var top5;
var ajax_poilist;
var ajax_react;
var cur_city='';
var cur_code;
var city_codes;
var city_codes_num;
var cur_lat;
var cur_lng;

var new_dg_arr;
var new_bj_arr;
var new_guai_arr;

var fbq_off=1;
//天美的特殊图例
var tuli_title=[{name:'禁区',num:0},{name:'野地',num:0},{name:'河岸',num:0},{name:'海岸',num:0},{name:'湖畔',num:0},{name:'大学',num:0},{name:'公园',num:0},{name:'森林',num:0},{name:'城市人造绿地(草地、高尔夫球场)',num:0},{name:'农田',num:0},{name:'城市山地',num:0},{name:'办公区/工业区',num:0},{name:'住宅区',num:0},{name:'商业区',num:0},{name:'其他',num:0}];
var tuli_color=['#ca1818','#48a022','#3dcfff','#077bde','#8a95ff','#5f259b','#d75bd8','#1f5b11','#3cc21d','#b7d237','#6b9459','#d96110','#e8aced','#cbaa84','#545251'];

//其他两个的图例
//var tuli_title=[{name:'商业区',num:0},{name:'办公区',num:0},{name:'封闭区',num:0},{name:'娱乐区',num:0},{name:'文化运动场馆',num:0},{name:'旅游区',num:0},{name:'//教育',num:0},{name:'交通枢纽',num:0},{name:'住宅区',num:0},{name:'草地',num:0},{name:'水系',num:0},{name:'高地',num:0},{name:'森林',num:0},{name:'其他',num:0}];
//var tuli_color=['#cbaa84','#d96110','#9a0202','#8a95ff','#d75bd8','#5f259b','#077bde','#0ea7c3','#e8aced','#3cc21d','#3dcfff','#6b9459','#1f5b11','#545251'];
function sort_jsonp(x,y) {
       return (parseFloat(x.count) < parseFloat(y.count)) ? 1 : -1
} 
function poi_yiji_data_show(){
  var yiji_ul=document.getElementById('yiji_ul');
  for(var i=0;i<poi_yiji_data.length;i++){
    var li=document.createElement('li');
    li.innerHTML='<input type="checkbox" name="yijili" value="'+i+'" id="yj_li_'+i+'" checked/> <label for="yj_li_'+i+'">'+poi_yiji_data[i]+'</label>';
    yiji_ul.appendChild(li);
  }
  $$('yiji_title').innerHTML='一级分类(all)';

}
function poi_erji_data_show(data){
  var yiji_ul=document.getElementById('erji_ul');
  yiji_ul.innerHTML='';
  for(var i=0;i<data.length;i++){
    var li=document.createElement('li');
    li.innerHTML='<input type="checkbox" name="yijili" value="'+i+'" id="ej_li_'+i+'" checked/> <label for="ej_li_'+i+'">'+data[i]+'</label>';
    erji_ul.appendChild(li);
  }
}
function tuli_input_checkbox_none(id){
  var aIpt=$$(id).getElementsByTagName('input');
  for(var i=0;i<aIpt.length;i++){
    if(aIpt[i].checked==true){
       aIpt[i].checked=false;
    }
  }
}
function tuli_input_checkbox_all(id){
  var aIpt=$$(id).getElementsByTagName('input');
  for(var i=0;i<aIpt.length;i++){
    if(aIpt[i].checked==false){
       aIpt[i].checked=true;
    }
  }
}
function drawTuli(){
  $('#tuli ul').html('');
  for (var i = tuli_title.length - 1; i >= 0; i--) {
    var new_li=document.createElement('li');
    new_li.innerHTML='<li><i style="background:'+tuli_color[i]+';opacity:1;"></i><span>'+tuli_title[i].name+'</span><span>('+tuli_title[i].num+')</span></li>';
    $('#tuli ul').prepend(new_li);
  };
  var new_li=document.createElement('li');
  new_li.innerHTML='<li><span class="iconfont"><img src="images/bujizhan_min.png" width="14px" height="14px" alt="" /></span>补给站</li>';
  $('#tuli ul').append(new_li);
  var new_li=document.createElement('li');
  new_li.innerHTML='<li><span class="iconfont"><img src="images/marker_daoguan _min.png" width="14px" height="14px" alt="" /></span>道馆</li>';
  $('#tuli ul').append(new_li);
  var new_li=document.createElement('li');
  new_li.innerHTML='<li><span class="iconfont icon_guai"><img src="images/shandi.png" width="6px" height="8px" alt="" /></span>刷怪点(山地)</li>';
  $('#tuli ul').append(new_li);
  var new_li=document.createElement('li');
  new_li.innerHTML='<li><span class="iconfont icon_guai"><img src="images/hean.png" width="6px" height="8px" alt="" /></span>刷怪点(河岸)</li>';
  $('#tuli ul').append(new_li);
  var new_li=document.createElement('li');
  new_li.innerHTML='<li><span class="iconfont icon_guai"><img src="images/haian.png" width="6px" height="8px" alt="" /></span>刷怪点(海岸)</li>';
  $('#tuli ul').append(new_li);
  var new_li=document.createElement('li');
  new_li.innerHTML='<li><span class="iconfont icon_guai"><img src="images/hupan.png" width="6px" height="8px" alt="" /></span>刷怪点(湖畔)</li>';
  $('#tuli ul').append(new_li);
  var new_li=document.createElement('li');
  new_li.innerHTML='<li><span class="iconfont icon_guai"><img src="images/daxue.png" width="6px" height="8px" alt="" /></span>刷怪点(大学)</li>';
  $('#tuli ul').append(new_li);
  var new_li=document.createElement('li');
  new_li.innerHTML='<li><span class="iconfont icon_guai"><img src="images/gongyuan.png" width="6px" height="8px" alt="" /></span>刷怪点(公园)</li>';
  $('#tuli ul').append(new_li);
  var new_li=document.createElement('li');
  new_li.innerHTML='<li><span class="iconfont icon_guai"><img src="images/senlin.png" width="6px" height="8px" alt="" /></span>刷怪点(森林)</li>';
  $('#tuli ul').append(new_li);
  var new_li=document.createElement('li');
  new_li.innerHTML='<li><span class="iconfont icon_guai"><img src="images/lvdi.png" width="6px" height="8px" alt="" /></span>刷怪点(绿地)</li>';
  $('#tuli ul').append(new_li);
  var new_li=document.createElement('li');
  new_li.innerHTML='<li><span class="iconfont icon_guai"><img src="images/gongye.png" width="6px" height="8px" alt="" /></span>刷怪点(办公区/工业区/住宅区)</li>';
  $('#tuli ul').append(new_li);

}
function initPage(lng,lat) {
      MapHelper.install(document.getElementById('root'), {
        lat:lat,
        lng:lng,
        onPoiChange: function(lng_, lat_) {
          p=0;
          var radius=$$('radius').value;
          MapHelper.setMarkerPostion(lat_, lng_);
          $('#search_lng_lat').val(''+lng_+':'+lat_+'');
          var raidus_=$$('radius').value.replace(/\s/g, '');
          if(raidus_==''){
               raidus_=500;
               $$('radius').value=500;
           }
          ajax_poilist.abort();
          poi_list(lng_,lat_,raidus_);
         }
      });

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
function cur_city_code_(key){
  $.ajax({
        type:"get",
        url:"http://apis.map.qq.com/ws/geocoder/v1/?address="+key+"&key=WC4BZ-TFI24-M45UM-DI57V-SVUH3-LQFUV&output=jsonp&time="+(new Date()).getTime()+"",
        dataType: 'jsonp',
        jsonp: 'cb',    
        jsonpCallback:"citylogin2", 
        success: function(data){
            if(data.status==0){
              var lat=data.result.location.lat;
              var lng=data.result.location.lng;
              cur_lat=lat;
              cur_lng=lng;
             // console.log(cur_lat);
             // console.log(cur_lng);
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
          $('#city_login').val(cur_city);
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
function poi_fl_show(item,arr_d,arr_b,num){
        poifl_daoguan=[];
        poifl_buji=[];
        for(var i=0;i<arr_d.length;i++){
           var target=arr_d[i].category;
           if(target.indexOf(':')!=-1){
              target=target.split(':')[num];
           }
           if(target==item){
             poifl_daoguan.push(arr_d[i]);
           }
        }
        for(var i=0;i<arr_b.length;i++){
           var target=arr_b[i].category;
           if(target.indexOf(':')!=-1){
              target=target.split(':')[num];
           }
           if(target==item){
             poifl_buji.push(arr_b[i]);
           }
        }
        zuixin_daoguan_arr=poifl_daoguan;
        zuixin_buji_arr=poifl_buji;
        var arr_none=[];
        poi_list_show(zuixin_daoguan_arr,zuixin_buji_arr,arr_none);
}
function poi_fl2_show(item,arr_d,arr_b,num){
        poifl2_daoguan=[];
        poifl2_buji=[];
        for(var i=0;i<arr_d.length;i++){
           var target=arr_d[i].category;
           if(target.indexOf(':')!=-1){
              target=target.split(':')[num];
           }
           if(target==item){
             poifl2_daoguan.push(arr_d[i]);
           }
        }
        for(var i=0;i<arr_b.length;i++){
           var target=arr_b[i].category;
           if(target.indexOf(':')!=-1){
              target=target.split(':')[num];
           }
           if(target==item){
             poifl2_buji.push(arr_b[i]);
           }
        }
      zuixin_daoguan_arr=poifl2_daoguan;
      zuixin_buji_arr=poifl2_buji;
      var arr_none=[];
      poi_list_show(zuixin_daoguan_arr,zuixin_buji_arr,arr_none);

}
function poi_fl3_show(item,arr_d,arr_b,num){
        for(var i=0;i<arr_d.length;i++){
           var target=arr_d[i].category;
           if(target.indexOf(':')!=-1){
              target=target.split(':')[num];
           }
           if(target==item){
             poifl_daoguan_s.push(arr_d[i]);
           }
        }
        for(var i=0;i<arr_b.length;i++){
           var target=arr_b[i].category;
           if(target.indexOf(':')!=-1){
              target=target.split(':')[num];
           }
           if(target==item){
             poifl_buji_s.push(arr_b[i]);
           }
        }

}
function draw_poi_daoguan(arr,show){
  MapHelper.setMarkers_poi(arr,show);
   /*if(show==1){
     for(var i=0;i<arr.length;i++){
      var lng=arr[i].longitude;
      var lat=arr[i].latitude;
      var name=arr[i].name;
      var dis=arr[i].distance.toFixed(2);
      var lel=arr[i].level;
      var num=i+1;
      MapHelper.setMarkers_poi(lat,lng,num,name,dis,lel)
    }
   }else{
     for(var i=0;i<arr.length;i++){
       if(!arr[i].id_fbq){
          var lng=arr[i].longitude;
          var lat=arr[i].latitude;
          var name=arr[i].name;
          var dis=arr[i].distance.toFixed(2);
          var lel=arr[i].level;
          var num=i+1;
          MapHelper.setMarkers_poi(lat,lng,num,name,dis,lel);
       }
    }
   }*/
}
function draw_poi_guai(arr,show,target){
  if(target){
    MapHelper.setMarkers_poi_guai(arr,show,target);
  }else{
     MapHelper.setMarkers_poi_guai(arr,show);
  }
  
}
function draw_poi_bujizhan(arr,show){
  MapHelper.setMarkers_poi_radio(arr,show);
}
function draw_poi_bujizhan_cz(arr,show){
  MapHelper.setMarkers_poi_radio_cz(arr,show);
}
function draw_poi_bujizhan_hb(arr,show){
  MapHelper.setMarkers_poi_radio_hb(arr,show);
}
function clear_alltd(){
  var all_td=document.getElementsByTagName('td');
  for(var i=0;i<all_td.length;i++ ){
     all_td[i].style.background='#fff';
  }
}
function li_click(id,data){
  var aLi=document.getElementById(id).tBodies[0].getElementsByTagName('tr');
  for(var i=0;i<aLi.length;i++){
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
  var aArr=document.getElementById(id).tBodies[0].getElementsByTagName('a');
  for(var j=0;j<aArr.length;j++){
    aArr[j].index=j;
    aArr[j].onclick=function(){
      var imgid=data[this.index].id;
      imgShow(imgid);
      return false;
    }
  }
}
function li_click_radio(id,data){
  var aLi=document.getElementById(id).tBodies[0].getElementsByTagName('tr');
  for(var i=0;i<aLi.length;i++){
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
   var aArr=document.getElementById(id).tBodies[0].getElementsByTagName('a');
  for(var j=0;j<aArr.length;j++){
    aArr[j].index=j;
    aArr[j].onclick=function(){
      var imgid=data[this.index].id;
      imgShow(imgid);
      return false;
    }
  }
}
function li_click_guai(id,data){
  var aLi=document.getElementById(id).tBodies[0].getElementsByTagName('tr');
  for(var i=0;i<aLi.length;i++){
     aLi[i].index=i;
     aLi[i].onclick=function(){
         clear_alltd();
         for(var k=0;k<this.childNodes.length;k++){
            this.childNodes[k].style.background='#eaeaea';
         }
         MapHelper.set_poi_animation_guai(this.index);
         return false;
     }
  }
}
function $$(id){
  return document.getElementById(id);
}

function creatTabtop(table_id,data){
  var oTbody=table_id.tBodies[0];
  oTbody.innerHTML='';
  var oTr1 = document.createElement('tr'); 
  var oTr2 = document.createElement('tr');
  var oTr3 = document.createElement('tr');
  var otd= document.createElement('td');
  otd.innerHTML='属性';
  oTr1.appendChild(otd);
  var otd= document.createElement('td');
  otd.innerHTML='值';
  oTr2.appendChild(otd);
  var otd= document.createElement('td');
  otd.innerHTML='<input type="text" />';
  oTr3.appendChild(otd);
  for(var i=0;i<5;i++){
     var otd= document.createElement('td');
     otd.innerHTML='<input type="text" />';
     oTr3.appendChild(otd);
  }
  for(var i=0;i<5;i++){
     var otd= document.createElement('td');
     if(data[i]&&data[i][0]){
       otd.innerHTML=data[i][0];
     }else{
       otd.innerHTML='';
     }
     
     oTr1.appendChild(otd);
     var otd= document.createElement('td');
     if(data[i]&&data[i][1]){
       otd.innerHTML=data[i][1];
     }else{
       otd.innerHTML='';
     }
     oTr2.appendChild(otd);
  }
  oTbody.appendChild(oTr1);
  oTbody.appendChild(oTr2);
  oTbody.appendChild(oTr3); 

}

function otherInfo(data){
   for(var i=0;i<data.length;i++){
      if(data[i].center_flag==1){
         $$('debug_info').innerHTML=data[i].debug_info;
         $$('reli').value=data[i].hot_level;
         if(data[i].city_level){
          $$('dqcs').value=data[i].city_level;
         }else{
          $$('dqcs').value='';
         }
         var top5_list=data[i].poke_info.slice(0,5);
         creatTabtop($$('tab_top'),top5_list);
         var info_data=data[i].frag_normal_info;
         var target=data[i].frag_info.flag;
         if(target==99){
          var title=tuli_title[tuli_title.length-1].name;
         }else{
          var title=tuli_title[target].name;
         }
         
         creatTabtop_fenpian(info_data,title);
         break;
      }
   }
}
function creatTabdaoguan(table_id,data){
  if(fbq_off==1){
    $$('daoguan_num').innerHTML=data.length;
    var oTbody=table_id.tBodies[0];
    oTbody.innerHTML='';
    for(var i=0;i<data.length;i++){
       var oTr = document.createElement('tr'); 
       var otd= document.createElement('td');
       otd.className='td_l';
       otd.innerHTML=i+1;
       oTr.appendChild(otd);
       var otd= document.createElement('td');
       otd.className='td_r';
       var i_html='';
       if(data[i].flag&&data[i].flag==1){
         i_html+='<br/><i class="bu">备</i>';
       }
       if(data[i].sub_id&&data[i].sub_id!=0){
         i_html+='<br/><i class="xu">虚</i>';
       }
       otd.innerHTML='标题：<a>'+data[i].name+'</a><br/>等级：'+data[i].level+'<br/>排名：'+data[i].pos+''+i_html+'';
       oTr.appendChild(otd);
       var otd= document.createElement('td');
       otd.className='td_rr';
       otd.innerHTML='';
       oTr.appendChild(otd);
       oTbody.appendChild(oTr); 
    }    
  }else{
    var oTbody=table_id.tBodies[0];
    oTbody.innerHTML='';
    var num=0;
    for(var i=0;i<data.length;i++){
      if(!data[i].id_fbq){
        num++;
        var oTr = document.createElement('tr'); 
        var otd= document.createElement('td');
        otd.className='td_l';
        otd.innerHTML=i+1;
        oTr.appendChild(otd);
        var otd= document.createElement('td');
        otd.className='td_r';
        var i_html='';
       if(data[i].flag&&data[i].flag==1){
         i_html+='<br/><i class="bu">备</i>';
       }
       if(data[i].sub_id&&data[i].sub_id!=0){
         i_html+='<br/><i class="xu">虚</i>';
       }
        otd.innerHTML='标题：<a>'+data[i].name+'</a><br/>等级：'+data[i].level+'<br/>排名：'+data[i].pos+''+i_html+'';
        oTr.appendChild(otd);
        var otd= document.createElement('td');
        otd.className='td_rr';
        otd.innerHTML='';
        oTr.appendChild(otd);
        oTbody.appendChild(oTr); 
      }
    }    
     $$('daoguan_num').innerHTML=num;
  }

}
function creatTabguai(table_id,data,target){
var aaa=0;
for(var k=0;k<data.length;k++){
 if(data[k].spawn_category==1){
  aaa++;
 }
}
console.log('野地个数：'+aaa)
if(target){
 if(fbq_off==1){
     var num=0;
    var oTbody=table_id.tBodies[0];
    oTbody.innerHTML='';
    for(var i=0;i<data.length;i++){
       var label=data[i].spawn_category;
       if(label==target){
         num++;
         var oTr = document.createElement('tr'); 
         var otd= document.createElement('td');
         otd.className='td_l';
         otd.innerHTML=i+1;
         oTr.appendChild(otd);
         var otd= document.createElement('td');
         otd.className='td_r';
         var cate=tuli_title[data[i].spawn_category].name;
         otd.innerHTML='ID:<br/>'+data[i].id+'<br/>属性：'+cate+'';
         oTr.appendChild(otd);
        var otd= document.createElement('td');
         otd.className='td_rr';
         otd.innerHTML='';
         oTr.appendChild(otd);
         oTbody.appendChild(oTr);
       }
       if(target==11){
         if(label==12||label==13){
           num++;
           var oTr = document.createElement('tr'); 
           var otd= document.createElement('td');
           otd.className='td_l';
           otd.innerHTML=i+1;
           oTr.appendChild(otd);
           var otd= document.createElement('td');
           otd.className='td_r';
           var cate=tuli_title[data[i].spawn_category].name;
           otd.innerHTML='ID:<br/>'+data[i].id+'<br/>属性：'+cate+'';
           oTr.appendChild(otd);
           var otd= document.createElement('td');
           otd.className='td_rr';
           otd.innerHTML='';
           oTr.appendChild(otd);
           oTbody.appendChild(oTr);
        }
       }
    }
    $$('guai_num').innerHTML=num;
  }else{
    var oTbody=table_id.tBodies[0];
    oTbody.innerHTML='';
    var num=0;
    for(var i=0;i<data.length;i++){
      if(!data[i].id_fbq){
         var label=data[i].spawn_category;
         if(label==target){
           num++;
           var oTr = document.createElement('tr'); 
           var otd= document.createElement('td');
           otd.className='td_l';
           otd.innerHTML=i+1;
           oTr.appendChild(otd);
           var otd= document.createElement('td');
           otd.className='td_r';
           var cate=tuli_title[data[i].spawn_category].name;
           otd.innerHTML='ID:<br/>'+data[i].id+'<br/>属性：'+cate+'';
           oTr.appendChild(otd);
           var otd= document.createElement('td');
           otd.className='td_rr';
           otd.innerHTML='';
           oTr.appendChild(otd);
           oTbody.appendChild(oTr); 
         }
         if(target==11){
           if(label==12){
             num++;
             var oTr = document.createElement('tr'); 
             var otd= document.createElement('td');
             otd.className='td_l';
             otd.innerHTML=i+1;
             oTr.appendChild(otd);
             var otd= document.createElement('td');
             otd.className='td_r';
             var cate=tuli_title[data[i].spawn_category].name;
             otd.innerHTML='ID:<br/>'+data[i].id+'<br/>属性：'+cate+'';
             oTr.appendChild(otd);
             var otd= document.createElement('td');
             otd.className='td_rr';
             otd.innerHTML='';
             oTr.appendChild(otd);
             oTbody.appendChild(oTr);
          }
        }
      }
    }
    $$('guai_num').innerHTML=num;
  }
}else{
  if(fbq_off==1){
     var num=0;
    var oTbody=table_id.tBodies[0];
    oTbody.innerHTML='';
    for(var i=0;i<data.length;i++){
      if(data[i].spawn_category!=1){
        num++;
        var oTr = document.createElement('tr'); 
        var otd= document.createElement('td');
        otd.className='td_l';
        otd.innerHTML=i+1;
        oTr.appendChild(otd);
        var otd= document.createElement('td');
        otd.className='td_r';
        var cate=tuli_title[data[i].spawn_category].name;
        otd.innerHTML='ID:<br/>'+data[i].id+'<br/>属性：'+cate+'';
        oTr.appendChild(otd);
       var otd= document.createElement('td');
        otd.className='td_rr';
        otd.innerHTML='';
        oTr.appendChild(otd);
        oTbody.appendChild(oTr); 
      }
       
    }
    $$('guai_num').innerHTML=num;
  }else{
    var oTbody=table_id.tBodies[0];
    oTbody.innerHTML='';
    var num=0;
    for(var i=0;i<data.length;i++){
      if(!data[i].id_fbq){
        if(data[i].spawn_category!=1){
          num++;
          var oTr = document.createElement('tr'); 
          var otd= document.createElement('td');
          otd.className='td_l';
          otd.innerHTML=i+1;
          oTr.appendChild(otd);
          var otd= document.createElement('td');
          otd.className='td_r';
          var cate=tuli_title[data[i].spawn_category].name;
          otd.innerHTML='ID:<br/>'+data[i].id+'<br/>属性：'+cate+'';
          oTr.appendChild(otd);
          var otd= document.createElement('td');
          otd.className='td_rr';
          otd.innerHTML='';
          oTr.appendChild(otd);
          oTbody.appendChild(oTr); 
        }
      }
    }
    $$('guai_num').innerHTML=num;
  }
}
}
function creatTabbujizhan(table_id,data){
  if(fbq_off==1){
     $$('buji_num').innerHTML=data.length;
    var oTbody=table_id.tBodies[0];
    oTbody.innerHTML='';
    for(var i=0;i<data.length;i++){
       var oTr = document.createElement('tr'); 
       var otd= document.createElement('td');
       otd.className='td_l';
       otd.innerHTML=i+1;
       oTr.appendChild(otd);
       var otd= document.createElement('td');
       otd.className='td_r';
       var i_html='';
       if(data[i].flag&&data[i].flag==1){
         i_html+='<br/><i class="bu">备</i>';
       }
       if(data[i].sub_id&&data[i].sub_id!=0){
         i_html+='<br/><i class="xu">虚</i>';
       }
       otd.innerHTML='标题：<a>'+data[i].name+'</a><br/>等级：'+data[i].level+'<br/>排名：'+data[i].pos+''+i_html+'';
       oTr.appendChild(otd);
       var otd= document.createElement('td');
       otd.className='td_rr';
       otd.innerHTML='';
       oTr.appendChild(otd);
       oTbody.appendChild(oTr); 
    }
  }else{
    
    var oTbody=table_id.tBodies[0];
    oTbody.innerHTML='';
    var num=0;
    for(var i=0;i<data.length;i++){
      if(!data[i].id_fbq){
         num++;
         var oTr = document.createElement('tr'); 
         var otd= document.createElement('td');
         otd.className='td_l';
         otd.innerHTML=i+1;
         oTr.appendChild(otd);
         var otd= document.createElement('td');
         otd.className='td_r';
          var i_html='';
         if(data[i].flag&&data[i].flag==1){
           i_html+='<br/><i class="bu">备</i>';
         }
         if(data[i].sub_id&&data[i].sub_id!=0){
           i_html+='<br/><i class="xu">虚</i>';
         }
         otd.innerHTML='标题：<a>'+data[i].name+'</a><br/>等级：'+data[i].level+'<br/>排名：'+data[i].pos+''+i_html+'';
         oTr.appendChild(otd);
         var otd= document.createElement('td');
         otd.className='td_rr';
         otd.innerHTML='';
         oTr.appendChild(otd);
         oTbody.appendChild(oTr); 
      }
    }
    $$('buji_num').innerHTML=num;
  }
}
function biaoji(target){
      clearBiaoji();
      var arr_none=[];
      if(target=='--'){
        creatTabdaoguan($$('tab_daoguan'),arr_none);
        creatTabbujizhan($$('tab_bujizhan'),arr_none);
        creatTabguai($$('tab_guai'),arr_none);
        li_click('tab_daoguan',arr_none);
        li_click_radio('tab_bujizhan',arr_none);
        li_click_guai('tab_guai',arr_none);
      }
      else if(target=='all'){
        draw_poi_daoguan(ditubiaoji_d,fbq_off);
        draw_poi_bujizhan(ditubiaoji_b,fbq_off);
        draw_poi_guai(ditubiaoji_g,fbq_off);
        creatTabdaoguan($$('tab_daoguan'),new_dg_arr);
        creatTabbujizhan($$('tab_bujizhan'),new_bj_arr);
        creatTabguai($$('tab_guai'),new_guai_arr);
        li_click('tab_daoguan',new_dg_arr);
        li_click_radio('tab_bujizhan',new_bj_arr);
        li_click_guai('tab_guai',new_guai_arr);
      }
      else if(target=='道馆'){
        draw_poi_daoguan(ditubiaoji_d,fbq_off);
        creatTabdaoguan($$('tab_daoguan'),new_dg_arr);
        creatTabbujizhan($$('tab_bujizhan'),arr_none);
        creatTabguai($$('tab_guai'),arr_none);
        li_click('tab_daoguan',new_dg_arr);
        li_click_radio('tab_bujizhan',arr_none);
        li_click_guai('tab_guai',arr_none);
      }
      else if(target=='所有补给站'){
        draw_poi_bujizhan(ditubiaoji_b,fbq_off);
        creatTabdaoguan($$('tab_daoguan'),arr_none);
        creatTabguai($$('tab_guai'),arr_none);
        creatTabbujizhan($$('tab_bujizhan'),new_bj_arr);
        li_click('tab_daoguan',arr_none);
        li_click_radio('tab_bujizhan',new_bj_arr);
        li_click_guai('tab_guai',arr_none);
      }
      else if(target=='常驻补给站'){
        draw_poi_bujizhan_cz(ditubiaoji_b,fbq_off);
        creatTabdaoguan($$('tab_daoguan'),arr_none);
        creatTabbujizhan_cz($$('tab_bujizhan'),new_bj_arr);
        creatTabguai($$('tab_guai'),arr_none);
        li_click('tab_daoguan',arr_none);
        li_click_radio('tab_bujizhan',new_bj_arr);
        li_click_guai('tab_guai',arr_none);
      }
      else if(target=='候选补给站'){
        //这里是候选补给站
        draw_poi_bujizhan_hb(ditubiaoji_b,fbq_off);
        creatTabdaoguan($$('tab_daoguan'),arr_none);
        creatTabbujizhan_hb($$('tab_bujizhan'),new_bj_arr);
        creatTabguai($$('tab_guai'),arr_none);
        li_click('tab_daoguan',arr_none);
        li_click_radio('tab_bujizhan',new_bj_arr);
        li_click_guai('tab_guai',arr_none);
      }else if(target=='所有刷怪点'){
        creatTabdaoguan($$('tab_daoguan'),arr_none);
        creatTabbujizhan($$('tab_bujizhan'),arr_none);
        creatTabguai($$('tab_guai'),new_guai_arr);
        li_click('tab_daoguan',arr_none);
        li_click_radio('tab_bujizhan',arr_none);
        li_click_guai('tab_guai',new_guai_arr);
        draw_poi_guai(ditubiaoji_g,fbq_off);
      }
      else{
        creatTabdaoguan($$('tab_daoguan'),arr_none);
        creatTabbujizhan($$('tab_bujizhan'),arr_none);
        creatTabguai($$('tab_guai'),new_guai_arr,target);
        li_click('tab_daoguan',arr_none);
        li_click_radio('tab_bujizhan',arr_none);
        li_click_guai('tab_guai',new_guai_arr);
        draw_poi_guai(ditubiaoji_g,fbq_off,target);
      }
}
function creatTabbujizhan_hb(table_id,data){
  if(fbq_off==1){
     
    var num=0;
    var oTbody=table_id.tBodies[0];
    oTbody.innerHTML='';
    for(var i=0;i<data.length;i++){
      if(data[i].flag&&data[i].flag==1){
         num++;
         var oTr = document.createElement('tr'); 
         var otd= document.createElement('td');
         otd.className='td_l';
         otd.innerHTML=i+1;
         oTr.appendChild(otd);
         var otd= document.createElement('td');
         otd.className='td_r';
         var i_html='';
         i_html+='<br/><i class="bu">备</i>';
         if(data[i].sub_id&&data[i].sub_id!=0){
           i_html+='<br/><i class="xu">虚</i>';
         }
         otd.innerHTML='标题：<a>'+data[i].name+'</a><br/>等级：'+data[i].level+'<br/>排名：'+data[i].pos+''+i_html+'';
         oTr.appendChild(otd);
         var otd= document.createElement('td');
         otd.className='td_rr';
         otd.innerHTML='';
         oTr.appendChild(otd);
         oTbody.appendChild(oTr); 
      }
       
    }
    $$('buji_num').innerHTML=num;
  }else{
    
    var oTbody=table_id.tBodies[0];
    oTbody.innerHTML='';
    var num=0;
    for(var i=0;i<data.length;i++){
      if(!data[i].id_fbq){
         num++;
         var oTr = document.createElement('tr'); 
         var otd= document.createElement('td');
         otd.className='td_l';
         otd.innerHTML=i+1;
         oTr.appendChild(otd);
         var otd= document.createElement('td');
         otd.className='td_r';
          var i_html='';
         if(data[i].flag&&data[i].flag==1){
           i_html+='<br/><i class="bu">备</i>';
         }
         if(data[i].sub_id&&data[i].sub_id!=0){
           i_html+='<br/><i class="xu">虚</i>';
         }
         otd.innerHTML='标题：<a>'+data[i].name+'</a><br/>等级：'+data[i].level+'<br/>排名：'+data[i].pos+''+i_html+'';
         oTr.appendChild(otd);
         var otd= document.createElement('td');
         otd.className='td_rr';
         otd.innerHTML='';
         oTr.appendChild(otd);
         oTbody.appendChild(oTr); 
      }
    }
    $$('buji_num').innerHTML=num;
  }
    
}
function creatTabbujizhan_cz(table_id,data){
  if(fbq_off==1){
     
     var num=0;
    var oTbody=table_id.tBodies[0];
    oTbody.innerHTML='';
    for(var i=0;i<data.length;i++){
      if(data[i].flag&&data[i].flag==1){
      }else{
          num++;
          var oTr = document.createElement('tr'); 
          var otd= document.createElement('td');
          otd.className='td_l';
          otd.innerHTML=i+1;
          oTr.appendChild(otd);
          var otd= document.createElement('td');
          otd.className='td_r';
          var i_html='';
           if(data[i].sub_id&&data[i].sub_id!=0){
             i_html+='<br/><i class="xu">虚</i>';
           }
          otd.innerHTML='标题：<a>'+data[i].name+'</a><br/>等级：'+data[i].level+'<br/>排名：'+data[i].pos+''+i_html+'';
          oTr.appendChild(otd);
          var otd= document.createElement('td');
          otd.className='td_rr';
          otd.innerHTML='';
          oTr.appendChild(otd);
          oTbody.appendChild(oTr); 
       }
    }
    $$('buji_num').innerHTML=num;
  }else{
    var oTbody=table_id.tBodies[0];
    oTbody.innerHTML='';
    var num=0;
    for(var i=0;i<data.length;i++){
      if(!data[i].id_fbq){
         num++;
         var oTr = document.createElement('tr'); 
         var otd= document.createElement('td');
         otd.className='td_l';
         otd.innerHTML=i+1;
         oTr.appendChild(otd);
         var otd= document.createElement('td');
         otd.className='td_r';
           var i_html='';
           if(data[i].sub_id&&data[i].sub_id!=0){
             i_html+='<br/><i class="xu">虚</i>';
           }
         otd.innerHTML='标题：<a>'+data[i].name+'</a><br/>等级：'+data[i].level+'<br/>排名：'+data[i].pos+''+i_html+'';
         oTr.appendChild(otd);
         var otd= document.createElement('td');
         otd.className='td_rr';
         otd.innerHTML='';
         oTr.appendChild(otd);
         oTbody.appendChild(oTr); 
      }
    }
    $$('buji_num').innerHTML=num;
  }
    
}
function clearBiaoji(){
  MapHelper.cleanInfo();
  MapHelper.cleanMarkers_poi();
  MapHelper.cleanMarkers_poi_radio();
  MapHelper.cleanMarkers_poi_guai();
}
function clearDitu(){
    MapHelper.cleanInfo();
    MapHelper.cleanMarker();
    MapHelper.cleanPoi();
    MapHelper.cleanRect();
    MapHelper.cleanInfo();
    MapHelper.cleanMarkers_poi();
    MapHelper.cleanMarkers_poi_radio();
    MapHelper.cleanMarkers_poi_guai();
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
var key='1234';
function poi_list(lng,lat,radius){
    tuli_input_checkbox_all('yiji_ul');
    $('#rdfz').val(0);
    $$('yiji_title').innerHTML='一级分类(all)';
    $$('erji_title').innerHTML='二级分类';
    clearDitu();
    //$('#biaoji').val('all');
    $('#fbq').val('隐 藏');
    fbq_off=1;
    //$('#radius').val(500);
    $('#reli').val('');
    $('#dqcs').val('');
    arr_bujizhan=[];
    arr_daoguan=[];
    other_arr=[];
    $('#ajax_tip').css('display','none');
    cur_city_get(lat,lng);
    var d={};
    var b={};
    var g={};
    var version=$('#banben_sel').val();
    //console.log(version)
    version=version.replace(/\s/g, '');
   // console.log(version)
    //http://10.173.142.164:8080/pokemon/pokemon_whole.php?point_x=114.1351032&point_y=22.372129267&radius=500&ref=timi_version&output_type=jsonp&version=20160618210508&cb=test
    //&only_frag=1 这个是限制道馆补给数据
ajax_poilist=$.ajax({
      type:"get",
      //url:"http://10.173.142.164:8080/pokemon/pokemon_whole.php?point_x="+lng+"&point_y="+lat+"&radius="+radius+"&ref=timi_version&version="+version+"&output_type=jsonp&time="+(new Date()).getTime()+"",
	  url:"http://10.173.142.164:8080/poke_timi_200916/php/get_frag_info_timi.php?point_x="+lng+"&point_y="+lat+"&radius="+radius+"&key="+key+"&output_type=jsonp&cb=ajaxpoilist&time="+(new Date()).getTime()+""+"&ref=timi_version",
      dataType:"jsonp",
      jsonp:"cb",
      jsonpCallback:"test",
      success:function(data){
		  if(data.key&& data.key!=-1){
        $('#ajax_before_tip').css('display','none');
        if(data.gyms_list&&data.pokestops_list&&data.frag_list){
           jQuery.extend(true,d,data);
           jQuery.extend(true,b,data);
           jQuery.extend(true,g,data);
           MapHelper.setCenter(lat,lng);
           MapHelper.setMarker(lat,lng);
           for(var i=0;i<tuli_title.length;i++){
            tuli_title[i].num=0;
           }
           arr_bujizhan=b.pokestops_list;
           arr_daoguan=d.gyms_list;
           arr_guai=g.spawns_list;
           ditubiaoji_d=d.gyms_list;
           ditubiaoji_b=b.pokestops_list;
           ditubiaoji_g=g.spawns_list;
           other_arr=d.frag_list;
           otherInfo(other_arr);
           drawRs(other_arr);
           zuixin_daoguan_arr=d.gyms_list;
           zuixin_buji_arr=b.pokestops_list;
           zuixin_guai_arr=g.spawns_list;
           poi_list_show(zuixin_daoguan_arr,zuixin_buji_arr,zuixin_guai_arr);
        }
        else{
           $('#ajax_tip').css('display','block');
           MapHelper.cleanPoi();
        }
		  }
		else
		{
			poi_list_wuquan(lng,lat,radius);
		}
		  
      },
      error:function(ys){
         console.log('fail_poi_latlng')
      },
      beforeSend:function(){
        $('#ajax_before_tip').css('display','block');
      },
      complete:function(){
        window.location.hash='point_x='+lng+'&point_y='+lat+'&radius='+$$('radius').value+'';
      }
  })
}

function poi_list_wuquan(lng,lat,radius){
    tuli_input_checkbox_all('yiji_ul');
    $('#rdfz').val(0);
    $$('yiji_title').innerHTML='一级分类(all)';
    $$('erji_title').innerHTML='二级分类';
    clearDitu();
    //$('#biaoji').val('all');
    $('#fbq').val('隐 藏');
    fbq_off=1;
    //$('#radius').val(500);
    $('#reli').val('');
    $('#dqcs').val('');
    arr_bujizhan=[];
    arr_daoguan=[];
    other_arr=[];
    $('#ajax_tip').css('display','none');
    cur_city_get(lat,lng);
    var d={};
    var b={};
    var g={};
    var version=$('#banben_sel').val();
    //console.log(version)
    version=version.replace(/\s/g, '');
   // console.log(version)
    //http://10.173.142.164:8080/pokemon/pokemon_whole.php?point_x=114.1351032&point_y=22.372129267&radius=500&ref=timi_version&output_type=jsonp&version=20160618210508&cb=test
    //&only_frag=1 这个是限制道馆补给数据
$.ajax({
      type:"get",
      //url:"http://10.173.142.164:8080/pokemon/pokemon_whole.php?point_x="+lng+"&point_y="+lat+"&radius="+radius+"&ref=timi_version&version="+version+"&output_type=jsonp&time="+(new Date()).getTime()+"",
	  url:"http://passport.oa.com/modules/passport/signin.ashx?url=http://10.173.142.164:8080/poke_timi_200916/php/get_frag_info_timi.php?"+encodeURIComponent("point_x="+lng+"&point_y="+lat+"&radius="+radius+"&key="+key+"&output_type=jsonp&cb=ajaxpoilist&time="+(new Date()).getTime()+""+"&ref=timi_version&version="+version),
      dataType:"jsonp",
      jsonp:"cb",
      jsonpCallback:"ajaxpoilist",
      success:function(data){
		  if(data.key&& data.key!=-1){
        $('#ajax_before_tip').css('display','none');
        if(data.gyms_list&&data.pokestops_list&&data.frag_list){
           jQuery.extend(true,d,data);
           jQuery.extend(true,b,data);
           jQuery.extend(true,g,data);
           MapHelper.setCenter(lat,lng);
           MapHelper.setMarker(lat,lng);
           for(var i=0;i<tuli_title.length;i++){
            tuli_title[i].num=0;
           }
           arr_bujizhan=b.pokestops_list;
           arr_daoguan=d.gyms_list;
           arr_guai=g.spawns_list;
           ditubiaoji_d=d.gyms_list;
           ditubiaoji_b=b.pokestops_list;
           ditubiaoji_g=g.spawns_list;
           other_arr=d.frag_list;
           otherInfo(other_arr);
           drawRs(other_arr);
           zuixin_daoguan_arr=d.gyms_list;
           zuixin_buji_arr=b.pokestops_list;
           zuixin_guai_arr=g.spawns_list;
           poi_list_show(zuixin_daoguan_arr,zuixin_buji_arr,zuixin_guai_arr);
        }
        else{
           $('#ajax_tip').css('display','block');
           MapHelper.cleanPoi();
        }
		  }
		else{
			alert("抱歉！您没有权限！请联系felixkong");
		}
		  
      },
      error:function(ys){
         console.log('fail_poi_latlng')
      },
      beforeSend:function(){
        $('#ajax_before_tip').css('display','block');
      },
      complete:function(){
        window.location.hash='point_x='+lng+'&point_y='+lat+'&radius='+$$('radius').value+'';
      }
  })
}
function poi_list_show(arr_daoguan,arr_bujizhan,arr_guai){
  var rdfz=Number($('#rdfz').val());
  new_dg_arr=[];
  new_bj_arr=[];
  new_guai_arr=[];
  for(var i=0;i<arr_daoguan.length;i++){
    var level_=arr_daoguan[i].level;
    if(level_>rdfz||level_==rdfz){
     new_dg_arr.push(arr_daoguan[i]);
    }
  }
  for(var i=0;i<arr_bujizhan.length;i++){
    var level_=arr_bujizhan[i].level;
    if(level_>rdfz||level_==rdfz){
       new_bj_arr.push(arr_bujizhan[i]);
    }
  }
  for(var i=0;i<arr_guai.length;i++){
    var level_=arr_guai[i].level;
    if(level_>rdfz||level_==rdfz){
       new_guai_arr.push(arr_guai[i]);
    }
  }
  //console.log(arr_daoguan)
  //console.log(new_dg_arr)
  //console.log(arr_bujizhan)
  //console.log(new_bj_arr)
  MapHelper.cleanMarkers_poi();
  MapHelper.cleanMarkers_poi_radio();
  MapHelper.cleanMarkers_poi_guai();
  creatTabdaoguan($$('tab_daoguan'),new_dg_arr);
  creatTabbujizhan($$('tab_bujizhan'),new_bj_arr);
  creatTabguai($$('tab_guai'),new_guai_arr);
  ditubiaoji_d=new_dg_arr;
  ditubiaoji_b=new_bj_arr;
  ditubiaoji_g=new_guai_arr;
  draw_poi_daoguan(new_dg_arr,fbq_off);
  draw_poi_bujizhan(new_bj_arr,fbq_off);
  draw_poi_guai(new_guai_arr,fbq_off);
  li_click('tab_daoguan',new_dg_arr);
  li_click_radio('tab_bujizhan',new_bj_arr);
  li_click_guai('tab_guai',new_guai_arr);
  var target=$('#biaoji').val();
  biaoji(target);
}

function drawRs(data){
  MapHelper.drawRectangle(data);
  drawTuli();
}
function getReact(x,y){
   MapHelper.cleanRect();
  ajax_react=$.ajax({
        type:"get",
        url:"http://10.173.142.164:8080/data_total_count_platform/get_frag_by_lonlat.php?point_x="+x+"&point_y="+y+"&time="+(new Date()).getTime()+"",
        dataType: 'jsonp',
        jsonp: 'cb',    
        jsonpCallback:"sdaywe", 
        success: function(data){
            if(data&&data.length>3){
               var rect_a=data[0][0];
               var rect_b=data[0][1];
               var rect_c=data[3][0];
               var rect_d=data[3][1];
               MapHelper.drawRectangle(rect_a,rect_b,rect_c,rect_d,'#1800ff');
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

//赞未用
function cleanInfo() {
    poiElem.innerHTML = '';
}

function drawMapInfo(data) {
    var list = data.poilist || [];
    var html = '<div class="poiList">';
    for (var i = 0; i < list.length; i++) {
      var poi = list[i];
      var poi_id = poi.uid;
      var poi_name = poi.name;
      var poi_lng = poi.longitude;
      var poi_lat = poi.latitude;
      html += '<table>';
      html += '<h4><span class="num">' + (i + 1) + '</span>' + poi.name + '</h4>';
      html += '</table>';
      MapHelper.drawPoi(poi_lng, poi_lat, i + 1);
    }
    poiElem.innerHTML += html;
}
//鼠标滚轮改变input值

// WITHOUT Plugin
var EventUtil = {

    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
  
  removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
  
  getEvent: function(event) {
        return event ? event : window.event;
    },
  
  getTarget: function(event) {
    return event.target || event.srcElement;    
  },
  
  getWheelDelta: function(event) {
        if (event.wheelDelta){
            return event.wheelDelta;
        } else {
            return -event.detail * 40;
        }
    },
  
  preventDefault: function(event) {
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
    
};
function onWheel1(event) {

  event = EventUtil.getEvent(event);
  var curElem = EventUtil.getTarget(event);
  var curVal = parseInt(curElem.value);
  var delta = EventUtil.getWheelDelta(event);
  
  if (delta > 0) {
        if(curVal<100){
            curElem.value = curVal + 1;
        }else{
            curElem.value =100;
        }
  } else{ 
        if(curVal>0){
            curElem.value = curVal-1;
        }else{
            curElem.value = 0;
        }
    
  }
  EventUtil.preventDefault(event);
}
function onWheel2(event) {

  event = EventUtil.getEvent(event);
  var curElem = EventUtil.getTarget(event);
  var curVal = parseInt(curElem.value);
  var delta = EventUtil.getWheelDelta(event);
  
  if (delta > 0) {
        if(curVal<30){
            curElem.value = curVal + 1;
        }else{
            curElem.value =30;
        }
  } else{ 
        if(curVal>0){
            curElem.value = curVal-1;
        }else{
            curElem.value = 0;
        }
    
  }
  EventUtil.preventDefault(event);
}


/*分片详情*/

function creatTabtop_fenpian(data,leibie){
  var table_id=document.getElementById('tab_top_fenpian');
  var oTbody=table_id.tBodies[0];
  oTbody.innerHTML='';
  var oTr1 = document.createElement('tr'); 
  var otd= document.createElement('td');
  otd.innerHTML='类别';
  oTr1.appendChild(otd);
  var otd= document.createElement('td');
  if(leibie){
    otd.innerHTML=leibie;
  }else{
    var category_num=data.frag_category;
    otd.innerHTML=tuli_title[category_num].name;
  }
  otd.colSpan='2';
  oTr1.appendChild(otd);
  var oTr2 = document.createElement('tr');
  var otd= document.createElement('td');
  otd.innerHTML='水系，绿地占比';
  oTr2.appendChild(otd);
  var otd= document.createElement('td');
  if(data.water_ratio||data.water_ratio==0){
    otd.innerHTML=data.water_ratio;
    if(data.green_ratio||data.green_ratio==0){
      otd.innerHTML+=' 、'+data.green_ratio;
    }
  }else{
    otd.innerHTML='&nbsp;&nbsp;'
  }
  
  
  otd.colSpan='2';
  oTr2.appendChild(otd);
  var oTr3 = document.createElement('tr');
  var otd= document.createElement('td');
  otd.innerHTML='平均海拔';
  oTr3.appendChild(otd);
  var otd= document.createElement('td');
  if(data.avg_altitude||data.avg_altitude==0){
      otd.innerHTML=data.avg_altitude;
  }else{
      otd.innerHTML='&nbsp;';
  }
  otd.colSpan='2';
  oTr3.appendChild(otd);
  var oTr4 = document.createElement('tr');
  var otd= document.createElement('td');
  otd.innerHTML='海拔高低差';
  oTr4.appendChild(otd);
  var otd= document.createElement('td');
  if(data.delta_altitude||data.delta_altitude==0){
      otd.innerHTML=data.delta_altitude;
  }else{
      otd.innerHTML='&nbsp;';
  }
  otd.colSpan='2';
  oTr4.appendChild(otd);
  var oTr5 = document.createElement('tr');
  var otd= document.createElement('td');
  otd.innerHTML='区域人口密度';
  oTr5.appendChild(otd);
  var otd= document.createElement('td');
  if(data.hot_level||data.hot_level==0){
      otd.innerHTML=data.hot_level;
  }else{
      otd.innerHTML='&nbsp;';
  }
  otd.colSpan='2';
  oTr5.appendChild(otd);
  var oTr6 = document.createElement('tr');
  var otd= document.createElement('td');
  otd.innerHTML='区域人流趋势';
  oTr6.appendChild(otd);
  var otd= document.createElement('td');
  otd.innerHTML=' ';
  otd.colSpan='2';
  oTr6.appendChild(otd);
  oTbody.appendChild(oTr1);
  oTbody.appendChild(oTr2);
  oTbody.appendChild(oTr3);
  oTbody.appendChild(oTr4);
  oTbody.appendChild(oTr5);
  oTbody.appendChild(oTr6);
  /*var top3_num=0;
  for(var i=0;i<data.top_category_list.length;i++){
    top3_num+=data.top_category_list[i].poi_list.length;
  }*/
  if(data.top_category_list&&data.top_category_list.length!=0){
      var tr = document.createElement('tr');
      var otd= document.createElement('td');
      otd.rowSpan='9';
      otd.innerHTML='TOP3分类';
      tr.appendChild(otd);
      var otd= document.createElement('td');
      if(data.top_category_list[0]){
        otd.innerHTML=data.top_category_list[0].name+'<br/>'+data.top_category_list[0].ratio;
      }else{
        otd.innerHTML=' ';
      }
      otd.rowSpan='3';
      tr.appendChild(otd);
      var otd= document.createElement('td');
      if(data.top_category_list[0]&&data.top_category_list[0].poi_list[0]){
        otd.innerHTML=data.top_category_list[0].poi_list[0].name+','+data.top_category_list[0].poi_list[0].click_level;
      }else{
        otd.innerHTML=' ';
      }
      tr.appendChild(otd);
      oTbody.appendChild(tr);
      var tr = document.createElement('tr');
      var otd= document.createElement('td');
      if(data.top_category_list[0]&&data.top_category_list[0].poi_list[1]){
        otd.innerHTML=data.top_category_list[0].poi_list[1].name+','+data.top_category_list[0].poi_list[1].click_level;
      }else{
        otd.innerHTML=' ';
      }
      tr.appendChild(otd);
      oTbody.appendChild(tr);
      var tr = document.createElement('tr');
      var otd= document.createElement('td');
      if(data.top_category_list[0]&&data.top_category_list[0].poi_list[2]){
        otd.innerHTML=data.top_category_list[0].poi_list[2].name+','+data.top_category_list[0].poi_list[2].click_level;
      }else{
        otd.innerHTML=' ';
      }
      tr.appendChild(otd);
      oTbody.appendChild(tr);
    //2轮
      var tr = document.createElement('tr');
      var otd= document.createElement('td');
      if(data.top_category_list[1]){
        otd.innerHTML=data.top_category_list[1].name+'<br/>'+data.top_category_list[1].ratio;
      }else{
        otd.innerHTML=' ';
      }
      otd.rowSpan='3';
      tr.appendChild(otd);
      var otd= document.createElement('td');
      if(data.top_category_list[1]&&data.top_category_list[1].poi_list[0]){
         otd.innerHTML=data.top_category_list[1].poi_list[0].name+','+data.top_category_list[1].poi_list[0].click_level;
      }else{
        otd.innerHTML=' ';
      }
     
      tr.appendChild(otd);
      oTbody.appendChild(tr);
      var tr = document.createElement('tr');
      var otd= document.createElement('td');
      if(data.top_category_list[1]&&data.top_category_list[1].poi_list[1]){
        otd.innerHTML=data.top_category_list[1].poi_list[1].name+','+data.top_category_list[1].poi_list[1].click_level;
      }else{
        otd.innerHTML=' ';
      }
      
      tr.appendChild(otd);
      oTbody.appendChild(tr);
      var tr = document.createElement('tr');
      var otd= document.createElement('td');
      if(data.top_category_list[1]&&data.top_category_list[1].poi_list[2]){
        otd.innerHTML=data.top_category_list[1].poi_list[2].name+','+data.top_category_list[1].poi_list[2].click_level;
      }else{
        otd.innerHTML=' ';
      }
      
      tr.appendChild(otd);
      oTbody.appendChild(tr);
    //3轮
      var tr = document.createElement('tr');
      var otd= document.createElement('td');
      if(data.top_category_list[2]){
        otd.innerHTML=data.top_category_list[2].name+'<br/>'+data.top_category_list[2].ratio;
      }else{
        otd.innerHTML=' ';
      }
      otd.rowSpan='3';
      tr.appendChild(otd);
      var otd= document.createElement('td');
      if(data.top_category_list[2]&&data.top_category_list[2].poi_list[0]){
        otd.innerHTML=data.top_category_list[2].poi_list[0].name+','+data.top_category_list[2].poi_list[0].click_level;
      }else{
        otd.innerHTML=' ';
      }
      tr.appendChild(otd);
      oTbody.appendChild(tr);
      var tr = document.createElement('tr');
      var otd= document.createElement('td');
      if(data.top_category_list[2]&&data.top_category_list[2].poi_list[1]){
        otd.innerHTML=data.top_category_list[2].poi_list[1].name+','+data.top_category_list[2].poi_list[1].click_level;
      }else{
        otd.innerHTML=' ';
      }
      tr.appendChild(otd);
      oTbody.appendChild(tr);
      var tr = document.createElement('tr');
      var otd= document.createElement('td');
      if(data.top_category_list[2]&&data.top_category_list[2].poi_list[2]){
        otd.innerHTML=data.top_category_list[2].poi_list[2].name+','+data.top_category_list[2].poi_list[2].click_level;
      }else{
        otd.innerHTML=' ';
      }
      
      tr.appendChild(otd);
      oTbody.appendChild(tr);
  }
  if(data.top_click_list&&data.top_click_list.length!=0){
    //1轮
     //var top3_click_num=data.top_click_list.length;
     //console.log(top3_click_num)
     var tr = document.createElement('tr');
      var otd= document.createElement('td');
      otd.rowSpan='3';
      otd.innerHTML='TOP3点击';
      tr.appendChild(otd);
      var otd= document.createElement('td');
      otd.innerHTML=1;
      tr.appendChild(otd);
      var otd= document.createElement('td');
      if(data.top_click_list[0]){
        otd.innerHTML=data.top_click_list[0].name+','+data.top_click_list[0].click_level+','+data.top_click_list[0].category;
      }else{
        otd.innerHTML=' ';
      }
      
      tr.appendChild(otd);
      oTbody.appendChild(tr);
      var tr = document.createElement('tr');
      var otd= document.createElement('td');
      otd.innerHTML=2;
      tr.appendChild(otd);
      var otd= document.createElement('td');
      if(data.top_click_list[1]){
        otd.innerHTML=data.top_click_list[1].name+','+data.top_click_list[1].click_level+','+data.top_click_list[1].category;
      }else{
        otd.innerHTML=' ';
      }
      
      tr.appendChild(otd);
      oTbody.appendChild(tr);
      var tr = document.createElement('tr');
      var otd= document.createElement('td');
      otd.innerHTML=3;
      tr.appendChild(otd);
      var otd= document.createElement('td');
      if(data.top_click_list[2]){
        otd.innerHTML=data.top_click_list[2].name+','+data.top_click_list[2].click_level+','+data.top_click_list[2].category;
      }else{
        otd.innerHTML=' ';
      }
      tr.appendChild(otd);
      oTbody.appendChild(tr);
     }

}
/*通过名称获取latlng*/
function poi_search_wenzi(poi_w,radius_){
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
        if(json&&json.data&&json.data[0]&&json.data[0].location&&json.data[0].location.lat&&json.data[0].location.lng&&json.data[0].title){
           var lat=json.data[0].location.lat;
           var lng=json.data[0].location.lng;
           $('#search_lng_lat').val(json.data[0].title);
           poi_list(lng,lat,radius_);
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
function imgShow(id){
  var content2 = '<img width="300" height="500" src="http://svpoi.wsd.com/poi_image/shenzhen/'+id+'_gl.jpg" onerror="nofind();"/>';
  TINY.box.show(content2,0,0,0,1)
}
function nofind(){
    var img=event.srcElement;
    img.src='images/nofind.jpg';
    img.onerror=null;
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
/*有关classname*/
function addClass(obj,classname){
  if(obj.className == ''){
     obj.className=classname; 
  }else{
     var aclass=obj.className.split(' ');
     var i_index = arrclass(aclass,classname );
     if(i_index == -1){
       obj.className+=' '+classname;  
    }
     
  }
} 
function arrclass(arr,classname){
  for(var i=0;i<arr.length;i++){
      if(arr[i]==classname){
       return i;
    } 
  }
  return -1;  
}
function removeClass(obj,classname){
  if(obj.className != ''){
     var arrclassname=obj.className.split(' ');
     var i_index = arrclass(arrclassname,classname);
     if(i_index!=-1){
      arrclassname.splice(i_index,1);
      obj.className=arrclassname.join(' ');
     }  
  }  
}

function arr_chongfu(arr,item){
  console.log(arr)
  for(var i=0;i<arr.length;i++){
    if(arr[i].city_code==item){
      return i;
    }
  }
  return -1;
}

function banben_tianjia(arr){
  city_codes=[];
  var banben_sel=document.getElementById('banben_sel');
  for(var i=0;i<arr.length;i++){
    var opt=document.createElement('option');
    opt.id=i;
    opt.value=arr[i].version;
    opt.innerHTML=arr[i].version;
    banben_sel.appendChild(opt);
    city_codes.push(arr[i].city_list);
    if(i==0){
        city_codes_num=arr[i].city_list;
      }
  }
}
function get_version()
{
	ajax_poilist=$.ajax({
      type:"get",     
	  url:"http://10.173.142.164:8080/pokemon/pokemon_version.php?cb=a&ref=timi_version",
      dataType:"jsonp",
      jsonp:"callback",
      jsonpCallback:"a",
      success:function(data){
        if(data&&data.length>0){
           banben_tianjia(data);
        }
      },
      error:function(ys){
         console.log('fail_login')
      },
      beforeSend:function(){
      },
      complete:function(){
        initPage(113.90582084655762,22.47189502276308);
        var location_data=window.location.hash;
        if(location_data==''){
          poi_list(113.90582084655762,22.47189502276308,500);
        }
        else{
          var hashdata=GetRequest();
          var lng_=hashdata.point_x;
          var lat_=hashdata.point_y;
          var radius_=hashdata.radius;
          $('#radius').val(radius_);
          $('#search_lng_lat').val(''+lng_+':'+lat_+'');
          poi_list(lng_,lat_,radius_);
        }
      }
})
};
var markersArray={
  "10":"images/shandi.png",
  "2":"images/hean.png",
  "3":"images/haian.png",
  "4":"images/hupan.png",
  "5":"images/daxue.png",
  "6":"images/gongyuan.png",
  "7":"images/senlin.png",
  "11":"images/gongye.png",
  "12":"images/gongye.png",
  "13":"images/gongye.png",
  "8":"images/lvdi.png"
}