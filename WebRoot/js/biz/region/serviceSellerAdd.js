jQuery(function($) {
	$("#submenu-menu-area-supplier").addClass("active");
	$("#menu-area").addClass("active");
	$("#menu-area").addClass("open");
    initOrgTree();
	var districtId = $("#districtId").val();
	if(districtId != null && districtId!=""){
		btn();
	}

});

function btn(){
	var userCity = $("#userId").val();
	var districtLng = $("#districtLng").val();
	var districtLat = $("#districtLat").val();
	var districtName = $("#districtName").val();
	var districtAddress = $("#districtAddress").val();
	
	var map = new BMap.Map("allmap");//初始化地图
	var point = new BMap.Point(114.405783, 30.512158);//设置一个点为光谷
	map.centerAndZoom(userCity, 15);//将光谷点设置为中心点并设置地图级别
	map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
	var label = new BMap.Label("商圈名称:"+districtName+",</br>商圈地址:"+districtAddress,{offset:new BMap.Size(20,-10)});
	var po = new BMap.Point(districtLng, districtLat);//设置一个点为光谷
	addMarker(po,label);
	
	map.addEventListener("click",function(e){
		var a = e.point.lng;
		var b = e.point.lat;
		var point1 = new BMap.Point(a, b);//将点击的点生成新的坐标
		var label = new BMap.Label("你选择的商圈位置是:"+a+","+b,{offset:new BMap.Size(20,-10)});
		addMarker(point1,label);
		$("#districtLng").val(a);
		$("#districtLat").val(b);
	});
	/*
	 * 
	 * 往地图上添加标注
	 * 
	 **/
	function addMarker(point,label){
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
		marker.setLabel(label);
	}
}

//初始化机构树
function initOrgTree() {
    var setting = {
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeClick: beforeClick,
                onClick : function(event, treeId, treeNode){
                    $("#orgId").val(treeNode.id);
                    $("#provinceId").val(treeNode.pid);
                    $("#regionId").val(treeNode.getParentNode().pid);
                    $("#userPro").val(treeNode.name);
                    hideMenu();
                }
            }
        };
        var treeObj = $("#org_tree");
        var zNodes;
        $.ajax({
            url: ROOT_PATH + '/view/inventory/warehouse/getMulSubDictDataByPcode.action',
            type:'POST',
            data:{"dictPcode" : "AL_POSITION" ,"dictLevel":"5"},
            dataType:'json',
            success:function(data){
                zNodes = data;
                $.fn.zTree.init($("#org_tree"), setting, zNodes);
            }
        });

        treeObj.hover(function () {
            if (!treeObj.hasClass("showIcon")) {
                treeObj.addClass("showIcon");
            }
        }, function() {
            treeObj.removeClass("showIcon");
        });
}

function showMenu() {
    var gtObj = $("#userPro");
    if($("#gt_combobox").css("display") == "none"){
        var gtOffset = $("#userPro").offset();
        $("#gt_combobox").css({width:gtObj.css("width"),left:gtOffset.left + "px", top:gtOffset.top + gtObj.outerHeight() + "px"}).slideDown("fast");
    }

    $("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
    $("#gt_combobox").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}
function beforeClick(treeId, treeNode) {
    var check = (treeNode.level == "3");
    if (!check) alert("只能选择分公司...");
    return check;
}

