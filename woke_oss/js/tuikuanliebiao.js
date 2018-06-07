var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");

$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		//		debugger
		userId = userId;
		var pp = $("#select_type").val();
		var pageNumber = "1";
		var pageSize = "10";
		var billstatus = "";
		var startday = "";
		var endday = "";
		var selectinfo = "";
		var orderid = $("#text_sousuo1").val();

		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				isret: pp,
				startday: startday,
				endday: endday,
				selectinfo: selectinfo,
				orderid: orderid
			}
		}
		rq1 = reque();
		var req = function() {
			return {
				requestString: "",
				userId: userId,
				fullname: fullname
			}
		}
		requestObj1 = req();
		requestObj1.requestString = JSON.stringify(rq1);
		var req3 = JSON.stringify(requestObj1);
		$.ajax({
			contentType: "application/json; charset=utf-8",
			type: "POST",
			url: urltest + 'verify/financial/selectOrderRetList',
			data: req3,
			async: false,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {

					$("#count").html(msg.count);
					var gezi = msg.count;
					if(gezi % 10 == 0) {
						var lenn = parseInt(gezi / 10);
						if(lenn == 0) {
							var lenn = 1;
						}
					} else {
						var lenn = parseInt(gezi / 10) + 1;
					}
					test("Test bootstrap v3 rendering", function() {
						var element = $('#bp-3-element-test');
						var options = {
							bootstrapMajorVersion: 3,
							currentPage: 1,
							numberOfPages: 5,
							totalPages: lenn
						}
						element.bootstrapPaginator(options);
						var element = $('#bp-3-element-test');
						ok(!element.hasClass('pagination-lg'), "Root element shouldn't have pagination-lg class");
						ok(!element.hasClass('pagination-sm'), "Root element shouldn't have pagination-sm class");
						var list = element.children();
						for(var i = 0; i < list.length; i++) {
							var item = $(list[i]);
							ok(item.is("li"), "Element " + i + " should be li");
						}
					});
					var table_msg = msg.returnString;
					createShowingTable(table_msg);
				} else {
					alert(msg.resoponseDisp)
				}
			},
			error: function() {
				alert("获取信息失败");
			}
		});
	}

});

//下拉跨状态发生改变
$("#select_type").change(function() {
	//	debugger
	var pageNumber = "1";
	var pageSize = "10";
	var pp = $("#select_type").val();
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();

	var search_main = $('#text_sousuo').val();
	var startday = star_time;
	var endday = end_time;
	var selectinfo = search_main;
	var selectinfo = "";
	var orderid = $("#text_sousuo1").val();

	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			isret: pp,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			orderid: orderid
		}
	}
	rq1 = reque();
	var req = function() {
		return {
			requestString: "",
			userId: userId,
			fullname: fullname
		}
	}
	requestObj1 = req();
	requestObj1.requestString = JSON.stringify(rq1);
	var req3 = JSON.stringify(requestObj1);
	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: "POST",
		url: urltest + 'verify/financial/selectOrderRetList',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {

				$("#count").html(msg.count);
				var gezi = msg.count;
				if(gezi % 10 == 0) {
					var lenn = parseInt(gezi / 10);
					var lenn = parseInt(gezi / 10);
					if(lenn == 0) {
						var lenn = 1;
					}
				} else {
					var lenn = parseInt(gezi / 10) + 1;
				}
				test("Test bootstrap v3 rendering", function() {
					var element = $('#bp-3-element-test');
					var options = {
						bootstrapMajorVersion: 3,
						currentPage: 1,
						numberOfPages: 5,
						totalPages: lenn
					}
					element.bootstrapPaginator(options);
					var element = $('#bp-3-element-test');
					ok(!element.hasClass('pagination-lg'), "Root element shouldn't have pagination-lg class");
					ok(!element.hasClass('pagination-sm'), "Root element shouldn't have pagination-sm class");
					var list = element.children();
					for(var i = 0; i < list.length; i++) {
						var item = $(list[i]);
						ok(item.is("li"), "Element " + i + " should be li");
					}
				});
				var table_msg = msg.returnString;
				createShowingTable(table_msg);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});

})

$("#bp-3-element-test").on("click", function() {
	var aa = $(this).children(".active").children("a").html();
	var pageNumber = aa;
	var pageSize = "10";
	var pp = $("#select_type").val();
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	var search_main = $('#text_sousuo').val();
	var startday = star_time;
	var endday = end_time;
	var selectinfo = search_main;
	var orderid = $("#text_sousuo1").val();

	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			isret: pp,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			orderid: orderid
		}
	}
	rq1 = reque();
	var req = function() {
		return {
			requestString: "",
			userId: userId,
			fullname: fullname
		}
	}
	requestObj1 = req();
	requestObj1.requestString = JSON.stringify(rq1);
	var req3 = JSON.stringify(requestObj1);

	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: "POST",
		url: urltest + 'verify/financial/selectOrderRetList',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				$("#count").html(msg.count);
				var gezi = msg.count;
				if(gezi % 10 == 0) {
					var lenn = parseInt(gezi / 10);
					if(lenn == 0) {
						var lenn = 1;
					}
				} else {
					var lenn = parseInt(gezi / 10) + 1;
				}
				test("Test bootstrap v3 rendering", function() {
					var element = $('#bp-3-element-test');
					var options = {
						bootstrapMajorVersion: 3,
						currentPage: aa,
						numberOfPages: 5,
						totalPages: lenn
					}
					element.bootstrapPaginator(options);
					var element = $('#bp-3-element-test');
					ok(!element.hasClass('pagination-lg'), "Root element shouldn't have pagination-lg class");
					ok(!element.hasClass('pagination-sm'), "Root element shouldn't have pagination-sm class");
					var list = element.children();
					for(var i = 0; i < list.length; i++) {
						var item = $(list[i]);
						ok(item.is("li"), "Element " + i + " should be li");
					}
				});
				var table_msg = msg.returnString;
				createShowingTable(table_msg);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});

})

function createShowingTable(bb) {
	//获取后台传过来的jsonData,并进行解析  
	//此处需要让其动态的生成一个table并填充数据 
	if(bb.total == 0) {
		$("#tbbb").html("");
	} else {
		console.log(bb);
		var bb = JSON.parse(bb);
		var tableStr = "";
		var len = bb.length;
		if(len == 0) {
			var wuxiaoxi = '<p>' + "暂无内容" + '</p>'
			$("#tbbb").html(wuxiaoxi);
		} else {
			for(var i = 0; i < len; i++) {
				//				0 未支付 1 已支付 2 已取消
				//				3 已退款 4 缴费失败， 已退款
				if(bb[i].ordercode == undefined) {
					bb[i].ordercode = '';
				}
				if(bb[i].orderamt == undefined) {
					bb[i].orderamt = '';
				}
				if(bb[i].settledate == undefined) {
					bb[i].settledate = '';
				}
				if(bb[i].settlebillid == undefined) {
					bb[i].settlebillid = '';
				}

				switch(bb[i].issettle) {
					case undefined:
						bb[i].issettle = "";
						break;
					case 0:
						bb[i].issettle = "未清算";
						break;
					case 1:
						bb[i].issettle = "已清算";
						break;
					case 2:
						bb[i].issettle = "结算单审核中";
						break;

				}
				if(bb[i].ordrestatus == undefined) {
					bb[i].ordrestatus = '';
				}
				if(bb[i].isret == undefined) {
					bb[i].isret = '';
				}
				if(bb[i].type == undefined) {
					bb[i].type = '';
				}
				if(bb[i].type == 1) {
					bb[i].type = '物业';
				}
				if(bb[i].type == 2) {
					bb[i].type = '商户';
				}
				switch(bb[i].ordrestatus) {
					case 0:
						bb[i].ordrestatus = "未支付";
						break;
					case 1:
						bb[i].ordrestatus = "已支付";
						break;
					case 2:
						bb[i].ordrestatus = "已取消";
						break;
					case 3:
						bb[i].ordrestatus = "已退款";
						break;
					case 4:
						bb[i].ordrestatus = "缴费失败， 已退款";
						break;
					case 5:
						bb[i].ordrestatus = "缴费失败， 未退款";
						break;

				}
				switch(bb[i].isret) {
					case 0:
						bb[i].isret = "未退款";
						break;
					case 1:
						bb[i].isret = "已退款";
						break;
					case 2:
						bb[i].isret = "退款中";
						break;
				}
				if(bb[i].orderid == undefined) {
					bb[i].orderid = '';
				}
				if(bb[i].vipid == undefined) {
					bb[i].vipid = '';
				}
				if(bb[i].orderdate == undefined) {
					bb[i].orderdate = '';
				}
				if(bb[i].orderdescribe == undefined) {
					bb[i].orderdescribe = '';
				}
				if(bb[i].goldcoinamt == undefined) {
					bb[i].goldcoinamt = '';
				}
				if(bb[i].couponid == undefined) {
					bb[i].couponid = '';
				}
				if(bb[i].couponamt == undefined) {
					bb[i].couponamt = '';
				}
				if(bb[i].payamt == undefined) {
					bb[i].payamt = '';
				}
				if(bb[i].ispay == undefined) {
					bb[i].ispay = '';
				}
				if(bb[i].ispay == 1) {
					bb[i].ispay = '已支付';
				}
				if(bb[i].ispay == 0) {
					bb[i].ispay = '未支付';
				}

				if(bb[i].paykindname == undefined) {
					bb[i].paykindname = '';
				}
				//				if(bb[i].paykindname == 1) {bb[i].paykindname = '已支付';}
				//				if(bb[i].paykindname == 0) {bb[i].paykindname = '未支付';}
				if(bb[i].apipayid == undefined) {
					bb[i].apipayid = '';
				}
				if(bb[i].isnotify == undefined) {
					bb[i].isnotify = '';
				}
				if(bb[i].isnotify == 1) {
					bb[i].isnotify = '已通知';
				}
				if(bb[i].isnotify == 0) {
					bb[i].isnotify = '未通知';
				}
				if(bb[i].notifyurl == undefined) {
					bb[i].notifyurl = '';
				}
				if(bb[i].isnotifytimes == undefined) {
					bb[i].isnotifytimes = '';
				}
				if(bb[i].lastnotifydate == undefined) {
					bb[i].lastnotifydate = '';
				}
				if(bb[i].notifymsg == undefined) {
					bb[i].notifymsg = '';
				}
				if(bb[i].iscancel == undefined) {
					bb[i].iscancel = '';
				}
				if(bb[i].iscancel == 1) {
					bb[i].iscancel = '已撤销';
				}
				if(bb[i].iscancel == 0) {
					bb[i].iscancel = '未撤销';
				}
				if(bb[i].canceldate == undefined) {
					bb[i].canceldate = '';
				}
				if(bb[i].retdate == undefined) {
					bb[i].retdate = '';
				}
				if(bb[i].retamt == undefined) {
					bb[i].retamt = '';
				}
				if(bb[i].retdescribe == undefined) {
					bb[i].retdescribe = '';
				}
				if(bb[i].merchantid == undefined) {
					bb[i].merchantid = '';
				}
				if(bb[i].merchantname == undefined) {
					bb[i].merchantname = '';
				}
				if(bb[i].merchantorderid == undefined) {
					bb[i].merchantorderid = '';
				}
				if(bb[i].username == undefined) {
					bb[i].username = '';
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].username + '</th>' +
					'<th>' + bb[i].orderamt + '</th>' +
					'<th>' + bb[i].ordrestatus + '</th>' +
					'<th>' + bb[i].isret + '</th>' +
					'<th>' + bb[i].type + '</th>' +
					'<th data-toggle="modal" data-target="#myModal2"  style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display:none" >' + bb[i].orderid + '</th>' + //退款单id
					'<th style="display:none" >' + bb[i].vipid + '</th>' + //huiyuanid
					'<th style="display:none" >' + bb[i].orderdate + '</th>' + //订单日期
					'<th style="display:none" >' + bb[i].orderdescribe + '</th>' + //产品
					'<th style="display:none" >' + bb[i].goldcoinamt + '</th>' + //沃豆抵消额度
					'<th style="display:none" >' + bb[i].couponid + '</th>' + //优惠券id
					'<th style="display:none" >' + bb[i].couponamt + '</th>' + //优惠券抵扣金额
					'<th style="display:none" >' + bb[i].payamt + '</th>' + //订单金额
					'<th style="display:none" >' + bb[i].ispay + '</th>' + //支付状态
					'<th style="display:none" >' + bb[i].paykindname + '</th>' + //支付类型
					'<th style="display:none" >' + bb[i].apipayid + '</th>' + //支付id
					'<th style="display:none" >' + bb[i].isnotify + '</th>' + //通知商户
					'<th style="display:none" >' + bb[i].notifyurl + '</th>' + //同志抵制
					'<th style="display:none" >' + bb[i].isnotifytimes + '</th>' + //通知次数
					'<th style="display:none" >' + bb[i].lastnotifydate + '</th>' + //通知时间
					'<th style="display:none" >' + bb[i].notifymsg + '</th>' + //通知信息
					'<th style="display:none" >' + bb[i].iscancel + '</th>' + //撤销状态
					'<th style="display:none" >' + bb[i].canceldate + '</th>' + //撤销时间
					'<th style="display:none" >' + bb[i].retdate + '</th>' + //退款时间
					'<th style="display:none" >' + bb[i].retamt + '</th>' + //退款金额
					'<th style="display:none" >' + bb[i].retdescribe + '</th>' + //退款摘要
					'<th style="display:none" >' + bb[i].merchantid + '</th>' + //物业公司id
					'<th style="display:none" >' + bb[i].merchantname + '</th>' + //物业公司名称
					'<th style="display:none" >' + bb[i].merchantorderid + '</th>' + //物业公司退款单id	
					'<th style="display:none" >' + bb[i].merchantorderid + '</th>' + //订单号
					'<th style="display:none" >' + bb[i].issettle + '</th>' + //结算状态
					'<th style="display:none" >' + bb[i].settledate + '</th>' + //结算时间
					'<th style="display:none" >' + bb[i].settlebillid + '</th>' + //jiesuanid

					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}
		//点击详情
		$("#tbbb tr th:nth-child(7)").click(function() {
			$("#s_huiyuanname3").html($(this).siblings().eq(1).html());
			$("#s_jine3").html($(this).siblings().eq(2).html());
			$("#s_dingdanzhuangtai3").html($(this).siblings().eq(3).html());
			$("#s_tuikuanzhuangtai3").html($(this).siblings().eq(4).html());
			$("#s_tuikuandanleixing3").html($(this).siblings().eq(5).html());
			$("#s_tuikuanID3").html($(this).siblings().eq(6).html());
			$("#s_huiyuanID3").html($(this).siblings().eq(7).html());
			$("#s_dingdandata3").html($(this).siblings().eq(8).html());
			$("#s_chanpin3").html($(this).siblings().eq(9).html());
			$("#s_wddxed3").html($(this).siblings().eq(10).html());
			$("#s_yhqid3").html($(this).siblings().eq(11).html());
			$("#s_yhqdke3").html($(this).siblings().eq(12).html());
			$("#s_dingdanjine3").html($(this).siblings().eq(13).html());
			$("#s_zhifuzhuangtai3").html($(this).siblings().eq(14).html());
			$("#s_zhifuleixing3").html($(this).siblings().eq(15).html());
			$("#s_zhifuID3").html($(this).siblings().eq(16).html());
			$("#s_tongzhishanghu3").html($(this).siblings().eq(17).html());
			$("#s_tzdz3").html($(this).siblings().eq(18).html());
			$("#s_tzcs3").html($(this).siblings().eq(19).html());
			$("#s_tzsj3").html($(this).siblings().eq(20).html());
			$("#s_tzxx3").html($(this).siblings().eq(21).html());
			$("#s_cxzt3").html($(this).siblings().eq(22).html());
			$("#s_cxsj3").html($(this).siblings().eq(23).html());
			$("#s_tuikuanshijian3").html($(this).siblings().eq(24).html());
			$("#s_tuikuanjine3").html($(this).siblings().eq(25).html());
			$("#s_tuikuanzhaiyao3").html($(this).siblings().eq(26).html());
			$("#s_wuyetkdanid3").html($(this).siblings().eq(27).html());
			$("#s_wuyegsname3").html($(this).siblings().eq(28).html());
			$("#s_wuyetkdanid3").html($(this).siblings().eq(29).html());
			$("#s_dingdan3").html($(this).siblings().eq(30).html());

			$("#s_jiesuantype3").html($(this).siblings().eq(31).html());
			$("#s_jiesuandate3").html($(this).siblings().eq(32).html());
			$("#s_jiesuanID3").html($(this).siblings().eq(33).html());
		});

	}
}

//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "10";
	var auditstatus = "1";
	var pp = $("#select_type").val();
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();

	var search_main = $('#text_sousuo').val();
	var startday = star_time;
	var endday = end_time;
	var selectinfo = search_main;
	var orderid = $("#text_sousuo1").val();

	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			isret: pp,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			orderid: orderid
		}
	}
	rq1 = reque();
	var req = function() {
		return {
			requestString: "",
			userId: userId,
			fullname: fullname
		}
	}
	requestObj1 = req();
	requestObj1.requestString = JSON.stringify(rq1);
	var req3 = JSON.stringify(requestObj1);
	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: "POST",
		url: urltest + 'verify/financial/selectOrderRetList',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {

				$("#count").html(msg.count);
				var gezi = msg.count;
				if(gezi % 10 == 0) {
					var lenn = parseInt(gezi / 10);
					if(lenn == 0) {
						var lenn = 1;
					}
				} else {
					var lenn = parseInt(gezi / 10) + 1;
				}
				test("Test bootstrap v3 rendering", function() {
					var element = $('#bp-3-element-test');
					var options = {
						bootstrapMajorVersion: 3,
						currentPage: 1,
						numberOfPages: 5,
						totalPages: lenn
					}
					element.bootstrapPaginator(options);
					var element = $('#bp-3-element-test');
					ok(!element.hasClass('pagination-lg'), "Root element shouldn't have pagination-lg class");
					ok(!element.hasClass('pagination-sm'), "Root element shouldn't have pagination-sm class");
					var list = element.children();
					for(var i = 0; i < list.length; i++) {
						var item = $(list[i]);
						ok(item.is("li"), "Element " + i + " should be li");
					}
				});
				var table_msg = msg.returnString;
				createShowingTable(table_msg);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});

})