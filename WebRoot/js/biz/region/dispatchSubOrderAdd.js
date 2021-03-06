jQuery(function ($) {
    $("#submenu-menu-inventory-plan").addClass("active");
    $("#menu-inventory").addClass("active");
    $("#menu-inventory").addClass("open");
    initDeviceTable();
    //initGoodsTable();
    $(document).on("dblclick", "#device_list tbody tr", function () {
        var $choiseDevice = getChoiseDeviceInfo($(this));
        $("#deviceIdStr").val($choiseDevice.deviceId);
        $("#deviceNoStr").val($choiseDevice.deviceNo);
        $("#deviceNameStr").val($choiseDevice.deviceName);
        $("#districtIdStr").val($choiseDevice.districtId);
        $("#districtNameStr").val($choiseDevice.districtName);
        $("#device_choise_modal").modal('hide');
        init();
    });
});
//获得选择设备对象
function getChoiseDeviceInfo(ele_goodsRow) {
    var $choiseDevice = {};
    var $ele_td = ele_goodsRow.find("td");
    $choiseDevice.deviceId = $ele_td.find("input[id='deviceId']").eq(0).val();
    $choiseDevice.deviceNo = $ele_td.find("label[name='deviceNo']").eq(0).html();
    $choiseDevice.deviceName = $ele_td.find("label[name='deviceName']").eq(0).html();
    $choiseDevice.districtId = $ele_td.find("input[id='districtId']").eq(0).val();
    $choiseDevice.districtName = $ele_td.find("label[name='districtName']").eq(0).html();
    return $choiseDevice;
}
function init() {
    initGoodsTable();
    setTimeout('batchAppendGoods()', 500);
}
function choiseDevice(input_deviceName) {
    //resetSelectDevice();
    $('#device_choise_modal').modal('show');
}
function resetSelectDevice() {
    initDeviceTable();
}

function choiseGoods(input_deviceName) {
    initGoodsTable();
    $('#goods_choise_modal').modal('show');
}
function resetSelectGoods() {
    initGoodsTable();
}


oTable = null;
function initDeviceTable() {
    var deviceStatus = 1;
    if (oTable == null) {
        oTable = $("#device_list").dataTable({
            "bAutoWidth": false,
            "bLengthChange": false,
            "bInfo": true,
            "bProcessing": false,
            "bFilter": false,// 搜索栏
            "bServerSide": true,//异步请求必须设置
            "sAjaxSource": ROOT_PATH + "/view/device/deviceGoods/queryDeviceGoodsByDevice.action?",  //异步请求地址
            "aoColumns": [
                {
                    "mDataProp": "deviceNo", "sClass": "center", "mRender": function (data, type, full) {
                    return '<label name="deviceNo">' + data + '</label>';
                }
                },
                {
                    "mDataProp": "deviceName", "sClass": "center", "mRender": function (data, type, full) {
                    return '<label name="deviceName">' + data + '</label><input id="deviceId" type="hidden" value="' + full.deviceId + '"/>';
                }
                },
                {
                    "mDataProp": "districtName", "sClass": "center", "mRender": function (data, type, full) {
                    return '<label name="districtName">' + data + '</label><input id="districtId" type="hidden" value="' + full.districtId + '"/>';
                }
                }
            ],
            "oLanguage": {
                "sProcessing": "正在加载中......",
                "sLengthMenu": "每页显示 _MENU_ 条记录",
                "sZeroRecords": "没有数据！",
                "sEmptyTable": "表中无数据存在！",
                "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                "sInfoEmpty": "显示0到0条记录",
                "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
                "zeroRecords": "没有内容",
                "sSearch": "搜索",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上一页",
                    "sNext": "下一页",
                    "sLast": "末页"
                }
            },
            "aoColumnDefs": [//和aoColums类似，但他可以给指定列附近爱属性
                {"bSortable": false, "aTargets": [0, 1, 2]},  //这句话意思是第1,3,6,7,8,9列（从0开始算） 不能排序
            ],
            "fnServerData": retrieveDeviceData,
        });
    } else {
        oTable.fnDraw(); //重新加载数据
    }
}

/**
 * sSource   查询链接
 * aoData    参数
 * fnCallback 返回数据填充方法
 */
function retrieveDeviceData(sSource, aoData, fnCallback) {
    //商品名称或编号
    var keyword = $("#keyword").val();
    var param = {
        "keyword": keyword
    };

    for (var i = 0; i < aoData.length; i++) {
        var _aoData = aoData[i];
        if (_aoData.name == "iDisplayStart") {
            /*开始页数*/
            param.iDisplayStart = _aoData.value;
        } else if (_aoData.name == "iDisplayLength") {
            /*记录条数*/
            param.iDisplayLength = _aoData.value;
        } else if (_aoData.name == "sEcho") {
            /*操作次数*/
            param.sEcho = _aoData.value;
        }
    }
    //提交访问
    $.ajax({
        type: "POST",
        url: sSource,
        dataType: "json",
        data: param, // 以json格式传递  
        success: function (resp) {
            fnCallback(resp);
//            removeMask($('.goods-container'));
        }
    });
}

gTable = null;
function initGoodsTable() {
    if (gTable == null) {
        gTable = $("#goods_list").dataTable({
            "bAutoWidth": false,
            "bLengthChange": true,
            "bInfo": true,
            "iDisplayLength": 20,
            "bProcessing": false,
            "bFilter": false,// 搜索栏
            "bServerSide": true,//异步请求必须设置
            "sAjaxSource": ROOT_PATH + "/view/device/deviceGoods/queryDeviceGoods.action",  //异步请求地址
            "aoColumns": [
                {
                    "sDefaultContent": "",
                    "sClass": "center",
                    "bSortable": false,
                    "mRender": function (data, type, full) {
                        return '<label class="position-relative">' +
                            '<input type="checkbox" checked="false" class="ace" value="' + full.goodsId + '"/><span class="lbl"></span></label>';
                    }
                },
                {
                    "mDataProp": "goodsName", "sClass": "center", "mRender": function (data, type, full) {
                    return '<label name="goodsName">' + data + '</label><input id="goodsId" type="hidden" value="' + full.goodsId + '"/>';
                }
                },
                {"mDataProp": "goodsUnit", "sClass": "center"}
            ],
            "oLanguage": {
                "sProcessing": "正在加载中......",
                "sLengthMenu": "每页显示 _MENU_ 条记录",
                "sZeroRecords": "没有数据！",
                "sEmptyTable": "表中无数据存在！",
                "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                "sInfoEmpty": "显示0到0条记录",
                "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
                "zeroRecords": "没有内容",
                "sSearch": "搜索",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上一页",
                    "sNext": "下一页",
                    "sLast": "末页"
                }
            },
            "aoColumnDefs": [//和aoColums类似，但他可以给指定列附近爱属性
                {"bSortable": false, "aTargets": [0, 1, 2]},  //这句话意思是第1,3,6,7,8,9列（从0开始算） 不能排序
            ],
            "fnServerData": retrieveGoodsData,
        });
    } else {
        gTable.fnDraw(); //重新加载数据
    }
}

/**
 * sSource   查询链接
 * aoData    参数
 * fnCallback 返回数据填充方法
 */
function retrieveGoodsData(sSource, aoData, fnCallback) {
    //商品名称或编号
    var keyword = $("#keyword").val();
    var deviceId = $("#deviceIdStr").val();
    if (deviceId != null && deviceId != "" && deviceId != undefined) {
        var param = {"keyword": keyword, "deviceId": deviceId};
    }
    for (var i = 0; i < aoData.length; i++) {
        var _aoData = aoData[i];
        if (_aoData.name == "iDisplayStart") {
            /*开始页数*/
            param.iDisplayStart = _aoData.value;
        } else if (_aoData.name == "iDisplayLength") {
            /*记录条数*/
            param.iDisplayLength = _aoData.value;
        } else if (_aoData.name == "sEcho") {
            /*操作次数*/
            param.sEcho = _aoData.value;
        }
    }
    //提交访问
    $.ajax({
        type: "POST",
        url: sSource,
        dataType: "json",
        data: param, // 以json格式传递  
        success: function (resp) {
            fnCallback(resp);
//            removeMask($('.goods-container'));
        }
    });
}
function batchAppendGoods() {
    //先删除已存在的行
    var tb = document.getElementById('purchase_goods_list');
    var rowNum = tb.rows.length;
    for (var i = 0; i < rowNum; i++) {
        tb.deleteRow(i);
        rowNum = rowNum - 1;
        i = i - 1;
    }
    var $purchase_goods_list = $("#purchase_goods_list");
    var rowCount = $purchase_goods_list.find("tr").length; //得到行数
    //遍历查询站点列表，添加选择的站点到表单显示页面
    $("#goods_list td input:checkbox:checked").each(function (i) {
        var goodsId = $(this).val();
        if (!existPurchaseGoods(goodsId)) {
            var $choise_row = $(this).closest('tr');
            rowCount = rowCount + 1;
            var append_row_no = rowCount;
            var append_row = createPurchaseGoodsRow(append_row_no);
            var $choiseGoods = getChoiseGoods($choise_row);
            $purchase_goods_list.append(append_row);
            var append_row = append_row_no;
            fillGoodsInfo(append_row, $choiseGoods);
        } else {

        }
    });
    $("#goods_list input:checkbox").removeAttr("checked");
    $("#choise_submit").addClass("disabled");
    $("#goods_choise_modal").modal('hide');
    //focusNumbox();
}
//是否已存在 已选中的商品
function existPurchaseGoods(goodsId) {
    var flag = false;
    $("#purchase_goods_list").find("tr").each(function (i) {
        var lNodeId = $(this).find("td input[id ='lNodeId']").eq(0).val();
        if (goodsId == lNodeId) {
            flag = true;
        }
    });
    return flag;
}
//批量添加追加行数
function createPurchaseGoodsRow(append_row_no) {
    return '<tr>'
        + '<td class="center" >' + ( append_row_no) + '</td>'
        + '<td class="center" ><input type="hidden" id="lNodeId" name="subOrderList[' + (append_row_no - 1) + '].goodsId" />'
        + '<input name="subOrderList[' + (append_row_no - 1) + '].goodsName" type="text" readonly class="center" /></td>'
        + '<td class="center" ><input class="center"  type="text" id="dGoodsNumber" name="subOrderList[' + (append_row_no - 1) + '].goodsNumber" /></td>'
        + '</tr>';
}
//获得选择商品各项值
function getChoiseGoods(ele_goodsRow) {
    var $choiseGoods = {};
    var $ele_td = ele_goodsRow.find("td");
    $choiseGoods.goodsId = $ele_td.find("input[id='goodsId']").eq(0).val();
    $choiseGoods.goodsName = $ele_td.find("label[name='goodsName']").eq(0).html();
    return $choiseGoods;
}
//填充商品信息
function fillGoodsInfo(purchaseGoodsRowNo, $choiseGoods) {
    var $ele_tr = $("#purchase_goods_list").find("tr").eq(purchaseGoodsRowNo - 1);
    $ele_tr.find("td").eq(1).find("input[id='lNodeId']").val($choiseGoods.goodsId);
    $ele_tr.find("td").eq(1).find("input[type=text]").val($choiseGoods.goodsName);
}