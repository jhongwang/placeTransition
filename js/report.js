window.onload=function(){
	var location_data=window.location.hash;
	if(location_data==''){
	  alert('抱歉！暂无数据！请返回主页！')
	}
	else{
	  var hashdata=GetRequest();
	  var idcode=hashdata.code;
    var idcity=hashdata.city;
    var idversion=hashdata.version;
    if(idcity){
      $('#city_span').html(idcity);
    }else{
      $('#city_span').html('');
    }
	  get_report_data(idcode,idversion);
	}
	$('#tab_3').height($('#tab_2').height());
}
var tab_1_data;
var tab_2_data;
var tab_3_data;
var tab_3_data2;
//http://10.173.142.164:8080/pokemon/pokemon_stat.php?cb=a&ref=timi_version&version=20160618210507&city_code=810000
function get_report_data(c,v){
	tab_1_data=[];
  tab_2_data=[];
  tab_3_data=[];
  tab_3_data2=[];
	$.ajax({
        type:"get",
        url:"http://10.173.142.164:8080/pokemon/pokemon_stat.php?ref=timi_version&city_code="+c+"&version="+v+"&output_type=jsonp&qtime="+(new Date()).getTime()+"",
        dataType: 'jsonp',
        jsonp: 'cb',    
        jsonpCallback:"a", 
        success: function(data){
           if(data){
           	  $('#report').css('display','block');
	            tab_1_data=data.book0;
	            creat_tab1(tab_1_data);
	            tab_2_data=data.book1;
	            creat_tab2(tab_2_data);
	            tab_3_data=data.book2;
              tab_3_data2=data.book3;
	            creat_tab3(tab_3_data,tab_3_data2);
            }else{
            	//$('#report').css('display','none');
            	alert('暂无数据！')
            }
        },
        error: function(data){
            console.log("fail-get_report_data");
        },
        beforeSend:function(){
           
        },
        complete: function(){
               
        }
   });
}
function creat_tab1(data_obj){
   var rows_=$$('tab_1').tBodies[0].rows;
   for(var j=1;j<29;j++){
   	  for(var i=0;i<rows_.length;i++){
        var num=j-1;
	   	  rows_[i].children[j].innerHTML=data_obj[num][i];
	    }
   }
   if(data_obj[28]&&data_obj[28][0]){
      rows_[0].children[29].innerHTML=data_obj[28][0];
    }
}
function creat_tab2(data_obj){
   var rows_=$$('tab_2').tBodies[0].rows;
   for(var j=0;j<6;j++){
      for(var i=0;i<rows_.length;i++){
        if(i==rows_.length-1){
          var num=j+1;
        }else{
          var num=j+2;
        }
        rows_[i].children[num].innerHTML=data_obj[j][i];
      }
   }
   if(data_obj[6]&&data_obj[6][0]){
       rows_[0].children[8].innerHTML=data_obj[6][0];
     }
   rows_[rows_.length-1].children[2].innerHTML='100%';
   rows_[rows_.length-1].children[4].innerHTML='100%';
   rows_[rows_.length-1].children[6].innerHTML='100%';
}
function creat_tab3(data_arr,arr_2){
   var rows_=$$('tab_3').tBodies[0].rows;
   for(var i=1;i<rows_.length;i++){
     if(i<7){
       if(i==1){
        var last_num=rows_[i].children.length-2;
       }else{
        var last_num=rows_[i].children.length-1;
       }
       var num=i-1;
       rows_[i].children[last_num].innerHTML=data_arr[0][num];
     }else if(i>7){
       if(i==8){
        var last_num=rows_[i].children.length-2;
       }else{
        var last_num=rows_[i].children.length-1;
       }
       var num=i-8;
       rows_[i].children[last_num].innerHTML=arr_2[1][num];
       rows_[i].children[last_num-1].innerHTML=arr_2[0][num];
     }
   }
   if(data_arr[1]&&data_arr[1][0]){
      rows_[1].children[2].innerHTML=data_arr[1][0];
   }
   if(arr_2[2]&&arr_2[2][0]){
      rows_[8].children[3].innerHTML=arr_2[2][0];
   }
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
function $$(id){
  return document.getElementById(id);
}
