var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");
var billid = sessionStorage.getItem("xuyaoID1");
$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		top.location.href = "login.html";
	} else {
		userId = userId;
		var pp = $(".btn btn-primary").val();
		var pageNumber = "1";
		var pageSize = "10";
		var selectinfo = "";
		var couponstatus = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				selectinfo: selectinfo,
				billid: billid,
				couponstatus: null
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
			url: urltest + 'verify/coupon/selectFinanceCouponBooksList',
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
	userId = userId;
	var pageSize = "10";
	var selectinfo = $('#text_sousuo').val();
	var pp = $("#select_type").val();
	if(pp == "全部") {
		pp = null
	} else if(pp == "已领取") {
		pp = 1;
	} else {
		pp = 0;
	}
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			selectinfo: selectinfo,
			billid: billid,
			couponstatus: pp
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
		url: urltest + 'verify/coupon/selectFinanceCouponBooksList',
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
				var name = sessionStorage.getItem("youhuiquan1");
				var num = parseInt(i) + parseInt(1);
				if(bb[i].couponstatus == "1") {
					bb[i].couponstatus = "已领取或已赠送"
				} else {
					bb[i].couponstatus = "可用"
				}

				var remove = "删除";
				if(bb[i].couponstatus == "可用") {
					remove = '删除'
				} else {
					remove = "";
				}
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					//这里需要改
					'<th>' + name + '</th>' + //名字
					'<th style="display: none;">' + bb[i].couponid + '</th>' + //明细id
					'<th>' + bb[i].couponno + '</th>' + //券编号
					'<th>' + bb[i].couponstatus + '</th>' + //领取状态					
//					'<th style="display: none;">' + bb[i].summary + '</th>' + //摘要
//					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="color:red;cursor: pointer" ;>' + remove + '</th>' +
					'<th style="display: none;">' + bb[i].billid + '</th>' + //明细id
					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}

		//点击详情
		$("#tbbb tr th:nth-child(6)").click(function() {
			$("#name_quan").html($(this).siblings().eq(1).html());
			$("#bianhao_quan").html($(this).siblings().eq(3).html());
			$("#zhuangtai_quan").html($(this).siblings().eq(4).html());
//			debugger
//			$("#zhaiyao_quan").html($(this).siblings().eq(5).html());
			$("#id_quan").html($(this).siblings().eq(2).html());
		});
		$("#tbbb tr th:nth-child(6)").click(function() {
			var pp = $(this).html();
			var id = $(this).siblings().eq(2).html();
			if(pp == "删除") {
				$("#myModal2").modal('show');
				//删除
				$('.remove').click(function() {

					var reque = function() {
						return {
							couponid: id
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
						url: urltest + 'verify/coupon/deleteUnusedCoupons',
						data: req3,
						async: true,
						dataType: "json",
						success: function(msg) {
							console.log(msg);
							if(msg.responseCode == 200) {
								alert("删除成功！")
								window.location.href="Coupon_details.html";
							} else {
								alert(msg.resoponseDisp)
							}
						},
						error: function() {
							alert("获取信息失败");
						}
					});
				})

			} else {
				$("#myModal2").modal('hide');
			}
		});
	}

}

//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "10";

	var pp = $("#select_type").val();
	var selectinfo = $('#text_sousuo').val();

	if(pp == "全部") {
		pp = null
	} else if(pp == "已领取") {
		pp = 1;
	} else {
		pp = 0;
	}
	var selectinfo = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			selectinfo: selectinfo,
			billid: billid,
			couponstatus: pp
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
		url: urltest + 'verify/coupon/selectFinanceCouponBooksList',
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
//下拉跨状态发生改变
$("#select_type").change(function() {
	var pageNumber = "1";
	var pageSize = "10";
	var pp = $("#select_type").val();
	if(pp == "全部") {
		pp = null
	} else if(pp == "已领取") {
		pp = 1;
	} else {
		pp = 0;
	}
	var selectinfo = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			selectinfo: selectinfo,
			billid: billid,
			couponstatus: pp
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
		url: urltest + 'verify/coupon/selectFinanceCouponBooksList',
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