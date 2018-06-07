var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");
$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		top.location.href = "login.html";
	} else {
		userId = userId;
		var pageNumber = "1";
		var pageSize = "10";
		var pp = $(".btn btn-primary").val();
		var startday = "";
		var endday = "";
		var selectinfo = "";

		var coupontype = "";
		var grantway = "";
		var couponkind = "";

		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				startday: startday,
				endday: endday,
				selectinfo: selectinfo,
				coupontype: coupontype,
				grantway: grantway,
				couponkind: couponkind
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
			url: urltest + 'verify/coupon/selectFinanceCouponBillsList',
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

$("#bp-3-element-test").on("click", function() {
	var aa = $(this).children(".active").children("a").html();
	var pageNumber = aa;
	var pageSize = "10";
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	var search_main = $('#text_sousuo').val();
	var coupontype = $("#select_type").val();
	if(coupontype == "选择类型") {
		coupontype = ""
	} else if(coupontype == "满减券") {
		coupontype = "1"
	} else {
		coupontype = "2"
	}
	var grantway = $("#select_type1").val();
	if(grantway == "选择途径") {
		grantway = ""
	} else if(grantway == "领取") {
		grantway = "1"
	} else {
		grantway = "2"
	}

	var couponkind = $("#select_type2").val();
	if(couponkind == "选择来源") {
		couponkind = ""
	} else if(couponkind == "商户") {
		couponkind = "1"
	} else {
		couponkind = "2"
	}

	var startday = star_time;
	var endday = end_time;
	var selectinfo = search_main;

	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			coupontype: coupontype,
			grantway: grantway,
			couponkind: couponkind
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
		url: urltest + 'verify/coupon/selectFinanceCouponBillsList',
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
				if(bb[i].coupontype == "1") {
					bb[i].coupontype = "满减券"
				} else {
					bb[i].coupontype = "无门槛劵"
				}
				if(bb[i].grantway == "1") {
					bb[i].grantway = "领取"
				} else {
					bb[i].grantway = "满额赠送"
				}

				if(bb[i].couponkind == "1") {
					bb[i].couponkind = "商户"
				} else {
					bb[i].couponkind = "平台"
				}
				if(bb[i].isaudit == "1") {
					bb[i].isaudit = "审核通过"
				} else {
					bb[i].isaudit = "审核不通过"
				}
				if(bb[i].couponname == undefined) {
					bb[i].couponname = ""
				}
				if(bb[i].billid == undefined) {
					bb[i].billid = ""
				}
				if(bb[i].coupontype == undefined) {
					bb[i].coupontype = ""
				}
				if(bb[i].grantway == undefined) {
					bb[i].grantway = ""
				}
				if(bb[i].couponkind == undefined) {
					bb[i].couponkind = ""
				}
				if(bb[i].isaudit == undefined) {
					bb[i].isaudit = ""
				}
//				debugger
				if(bb[i].minamt == undefined) {
					bb[i].minamt = ""
				}
				if(bb[i].eachamt == undefined) {
					bb[i].eachamt = ""
				}
				if(bb[i].grantqty == undefined) {
					bb[i].grantqty = ""
				}
				if(bb[i].begdate == undefined) {
					bb[i].begdate = ""
				}
				if(bb[i].enddate == undefined) {
					bb[i].enddate = ""
				}
				if(bb[i].giveupamt == undefined) {
					bb[i].giveupamt = ""
				}
				if(bb[i].launchdate == undefined) {
					bb[i].launchdate = ""
				}

				if(bb[i].summary == undefined) {
					bb[i].summary = ""
				}
				if(bb[i].createusername == undefined) {
					bb[i].createusername = ""
				}
				if(bb[i].createuser == undefined) {
					bb[i].createuser = ""
				}
				if(bb[i].createdate == undefined) {
					bb[i].createdate = ""
				}
				if(bb[i].auditusername == undefined) {
					bb[i].auditusername = ""
				}
				if(bb[i].audituser == undefined) {
					bb[i].audituser = ""
				}
				if(bb[i].auditdate == undefined) {
					bb[i].auditdate = ""
				}

				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					//这里需要改
					'<th>' + bb[i].couponname + '</th>' + //名字
					'<th style="display: none;">' + bb[i].billid + '</th>' + //id
					'<th>' + bb[i].coupontype + '</th>' + //类型
					'<th>' + bb[i].grantway + '</th>' + //发放途径
					'<th >' + bb[i].couponkind + '</th>' + //券来源
					'<th style="display: none;">' + bb[i].isaudit + '</th>' + //审核状态

					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="color:red;cursor: pointer;display: none;" ;><span class="glyphicon glyphicon-eye-open"></span></th>' +
					'<th style="color:green;cursor: pointer" ;><span class="glyphicon glyphicon-book"></span></th>' +
					'<th style="display: none;">' + bb[i].minamt + '</th>' + //满减金额
					'<th style="display: none;">' + bb[i].eachamt + '</th>' + //每张金额
					'<th style="display: none;">' + bb[i].grantqty + '</th>' + //发放张数
					'<th style="display: none;">' + bb[i].begdate + '</th>' + //有效日期开始
					'<th style="display: none;">' + bb[i].enddate + '</th>' + //有效日期结束
					'<th style="display: none;">' + bb[i].giveupamt + '</th>' + //赠送起额
					'<th style="display: none;">' + bb[i].launchdate + '</th>' + //发送时间
					'<th style="display: none;">' + bb[i].summary + '</th>' + //摘要
					'<th style="display: none;">' + bb[i].createusername + '</th>' + //创建人姓名
					'<th style="display: none;">' + bb[i].createuser + '</th>' + //创建人id
					'<th style="display: none;">' + bb[i].createdate + '</th>' + //创建时间
					'<th style="display: none;">' + bb[i].auditusername + '</th>' + //审核人姓名
					'<th style="display: none;">' + bb[i].audituser + '</th>' + //审核人id
					'<th style="display: none;">' + bb[i].auditdate + '</th>' + //审核时间
					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}

		//点击详情
		$("#tbbb tr th:nth-child(8)").click(function() {
			$("#myModalLabel").html($(this).siblings().eq(1).html() + "详情")
			$("#s_name").html($(this).siblings().eq(1).html());
			$("#s_id").html($(this).siblings().eq(2).html());
			$("#s_type").html($(this).siblings().eq(3).html());
			$("#s_tujing").html($(this).siblings().eq(4).html());
			$("#s_laiyuan").html($(this).siblings().eq(5).html());
			$("#s_shnehezhuangtai").html($(this).siblings().eq(6).html());
			$("#s_manjian").html($(this).siblings().eq(9).html());
			$("#s_meizhnag").html($(this).siblings().eq(10).html());
			$("#s_zhangshu").html($(this).siblings().eq(11).html());
			$("#s_youxiao_st").html($(this).siblings().eq(12).html());
			$("#s_youxiao_end").html($(this).siblings().eq(13).html());
			$("#s_qie").html($(this).siblings().eq(14).html());
			$("#s_fasong_time").html($(this).siblings().eq(15).html());
			$("#s_zhaiyao").html($(this).siblings().eq(16).html());
			$("#s_crname").html($(this).siblings().eq(17).html());
			$("#s_crtime").html($(this).siblings().eq(19).html());
			$("#s_shenhename").html($(this).siblings().eq(20).html());
			$("#s_shenhetime").html($(this).siblings().eq(22).html());
		});
		$("#tbbb tr th:nth-child(9)").click(function() {
			var xuyaoID = $(this).siblings().eq(2).html();
			var youhuiquan = $(this).siblings().eq(1).html();
			sessionStorage.setItem("youhuiquan", youhuiquan);
			sessionStorage.setItem("xuyaoID", xuyaoID);
			window.location.href = 'Coupon_merchant_lis.html';
		});
		$("#tbbb tr th:nth-child(10)").click(function() {
			var xuyaoID1 = $(this).siblings().eq(2).html();
			var youhuiquan1 = $(this).siblings().eq(1).html();
			sessionStorage.setItem("youhuiquan1", youhuiquan1);
			sessionStorage.setItem("xuyaoID1", xuyaoID1);
			window.location.href = 'Coupon_details.html';
		});

	}

}

//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "10";
	//	var auditstatus = "";
	var pp = $("#select_type").val();
	console.log(pp);
	if(pp == "全部") {
		var executeresult = "";
	} else if(pp == "成功") {
		var executeresult = "1";
	} else if(pp == "失败") {
		var executeresult = "-1";
	} else {
		var executeresult = "";
	}
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	var search_main = $('#text_sousuo').val();
	var coupontype = $("#select_type").val();
	if(coupontype == "选择类型") {
		coupontype = ""
	} else if(coupontype == "满减券") {
		coupontype = "1"
	} else {
		coupontype = "2"
	}
	var grantway = $("#select_type1").val();
	if(grantway == "选择途径") {
		grantway = ""
	} else if(grantway == "领取") {
		grantway = "1"
	} else {
		grantway = "2"
	}

	var couponkind = $("#select_type2").val();
	if(couponkind == "选择来源") {
		couponkind = ""
	} else if(couponkind == "商户") {
		couponkind = "1"
	} else {
		couponkind = "2"
	}

	var startday = star_time;
	var endday = end_time;
	var selectinfo = search_main;

	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			startday: startday,
			endday: endday,
			selectinfo: selectinfo,
			coupontype: coupontype,
			grantway: grantway,
			couponkind: couponkind
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
		url: urltest + 'verify/coupon/selectFinanceCouponBillsList',
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
$("#search_add").click(function() {
	window.location.href = "Add_coupons.html";
})