var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var userName = sessionStorage.getItem("userName");
var fullname = sessionStorage.getItem("fullname");
var urlo = '';
$('.my_feilei ul li button').click(function() {
	$(this).attr("class", "btn btn-primary");
	$(this).siblings().attr("class", "btn btn-info");
});
$(function() {
	if(userId == "" || userId == undefined || userId == null) {

		top.location.href = "login.html";
	} else {
		$("#Form1 .file-drop-zone-title").html("上传应用图标*")
		userId = userId;
		var currentPage = "1";
		var pageSize = "10";
		var aduitstatus = "0";
		var startday = "";
		var endday = "";
		var appname = "";
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				currentPage: currentPage,
				aduitstatus: aduitstatus,
				createdateEnd: startday,
				createdateStart: endday,
				appname: appname
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
			url: urltest + 'verify/merchant/selectBussinessInfo',
			data: req3,
			async: false,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {

					var msg = JSON.parse(msg.returnString);
					$("#count").html(msg.total);
					var gezi = msg.total;
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
					var table_msg = msg;
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
	var currentPage = aa;
	var pageSize = "10";
	var pp = $("#select_type").val();
	console.log(pp);
	if(pp == "待审核") {
		var aduitstatus = "0";
	} else if(pp == "全部") {
		var aduitstatus = "";
	} else if(pp == "审核不通过") {
		var aduitstatus = "2";
	} else {
		var aduitstatus = "1";
	}
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	date1 = new Date(Date.parse(star_time.replace(/-/g, "/")));
	date1 = date1.getTime();
	date2 = new Date(Date.parse(end_time.replace(/-/g, "/")));
	date2 = date2.getTime();
	var numm = date2 - date1;
	if(numm < 0) {
		alert("结束日期不能小于开始日期");
	} else {
		var appname = $('#text_sousuo').val();
		var startday = star_time;
		var endday = end_time;
		var selectinfo = appname;
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				currentPage: currentPage,
				aduitstatus: aduitstatus,
				createdateEnd: startday,
				createdateStart: endday,
				appname: appname
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
			url: urltest + 'verify/merchant/selectBussinessInfo',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					var msg = JSON.parse(msg.returnString);
					$("#count").html(msg.total);
					var gezi = msg.total;
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
					var table_msg = msg;
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

})

function createShowingTable(bb) {
	//获取后台传过来的jsonData,并进行解析  
	//此处需要让其动态的生成一个table并填充数据 
	if(bb.total == 0) {
		$("#tbbb").html("");
	} else {
		console.log(bb);
		//		var bb = JSON.parse(bb);

		if(bb == '[]') {
			var wuxiaoxi = '<p>' + "暂无内容" + '</p>'
			$("#tbbb").html(wuxiaoxi);
		} else {
			var tableStr = "";
			var len = bb.list.length;
			for(var i = 0; i < len; i++) {

				if(bb.list[i].auditsummary == undefined) {
					bb.list[i].auditsummary = "";
				}
				if(bb.list[i].domainname == undefined) {
					bb.list[i].domainname = "";
				}
				if(bb.list[i].appurl == undefined) {
					bb.list[i].appurl = "";
				}
				if(bb.list[i].paycalladdr == undefined) {
					bb.list[i].paycalladdr = "";
				}
				if(bb.list[i].msgcalladdr == undefined) {
					bb.list[i].msgcalladdr = "";
				}
				if(bb.list[i].couponcallAddr == undefined) {
					bb.list[i].couponcallAddr = "";
				}
				if(bb.list[i].appdesc == undefined) {
					bb.list[i].appdesc = "";
				}
				if(bb.list[i].appico == undefined) {
					bb.list[i].appico = "";
				}
				if(bb.list[i].appsecret == undefined) {
					bb.list[i].appsecret = "";
				}
				if(bb.list[i].paysecret == undefined) {
					bb.list[i].paysecret = "";
				}
				if(bb.list[i].accountname == undefined) {
					bb.list[i].accountname = "";
				}
				if(bb.list[i].deleteusername == undefined) {
					bb.list[i].deleteusername = "";
				}
				if(bb.list[i].deletedate == undefined) {
					bb.list[i].deletedate = "";
				}
				if(bb.list[i].createusername == undefined) {
					bb.list[i].createusername = "";
				}
				var aduitstatus = "";
				//				if(bb.list[i].aduitstatus == "0") {
				//					aduitstatus = "待审核"
				//				} else if(bb.list[i].aduitstatus == "1") {
				//					aduitstatus = "审核通过"
				//				} else {
				//					aduitstatus = "审核不通过"
				//				}
				if(bb.list[i].aduitstatus == "1") {
					aduitstatus = '<button type="button" class="btn btn-success">' + "审核通过" + '</button>';
					//					           ='<button type="button" class="btn btn-info">'+"审核不通过"+'</button>';
				} else if(bb.list[i].aduitstatus == "0") {
					aduitstatus = '<button type="button" class="btn btn-primary">' + "待审核" + '</button>';
				} else {
					aduitstatus = '<button  type="button" class="btn btn-danger">' + "审核不通过" + '</button>';
				}
				if(bb.list[i].auditsummary == undefined) {
					bb.list[i].auditsummary = ""
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb.list[i].mname + '</th>' +
					'<th>' + bb.list[i].appname + '</th>' +
					'<th>' + bb.list[i].createusername + '</th>' +
					'<th>' + bb.list[i].createdate + '</th>' +
					'<th>' + aduitstatus + '</th>' +
					//					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>'+
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-eye-open"></span></th>' +
//					'<th data-toggle="modal" data-target="#myModal8" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display:none" >' + bb.list[i].domainname + '</th>' + //应用域名
					'<th style="display:none" >' + bb.list[i].appurl + '</th>' + //应用入扣地址
					'<th style="display:none" >' + bb.list[i].paycalladdr + '</th>' + //支付回调地址
					'<th style="display:none" >' + bb.list[i].msgcalladdr + '</th>' + //消息回调地址
					'<th style="display:none" >' + bb.list[i].couponcallAddr + '</th>' + //优惠券会掉地址
					'<th style="display:none" >' + bb.list[i].appdesc + '</th>' + //应用描述
					'<th style="display:none" >' + bb.list[i].appico + '</th>' + //应用图片
					'<th style="display:none" >' + bb.list[i].appsecret + '</th>' + //通信秘钥
					'<th style="display:none" >' + bb.list[i].paysecret + '</th>' + //支付秘钥
					'<th style="display:none" >' + bb.list[i].accountname + '</th>' + //账户名称
					'<th style="display:none" >' + bb.list[i].deleteusername + '</th>' + //删除人名
					'<th style="display:none" >' + bb.list[i].deletedate + '</th>' + //删除时间
					'<th style="display:none" >' + bb.list[i].auditsummary + '</th>' + //审核理由
					'<th style="display:none" >' + bb.list[i].appid + '</th>' + //appid
					'<th style="display:none" >' + bb.list[i].id + '</th>' + //应用id
					'<th style="display:none" >' + bb.list[i].merchantid + '</th>' + //商户id
					'<th style="display:none" >' + bb.list[i].categoryname + '</th>' + //业务分类
					'</tr>';

			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}

		//点击详情
		$("#tbbb tr th:nth-child(7)").click(function() {
			var s_shenhe = $(this).siblings().eq(5).children("button").html();
			if(s_shenhe == "待审核") {
				$(".shenhe_no").hide();
				$(".shenhe_no1").show();
			} else {
				$(".shenhe_no").show();
				$(".shenhe_no1").hide();
			}
			var accountname = $(this).siblings().eq(1).html();
			var s_appname = $(this).siblings().eq(2).html();
			var s_creat = $(this).siblings().eq(3).html();
			var s_cr_time = $(this).siblings().eq(4).html();
			var s_shenhe = $(this).siblings().eq(5).children("button").html();

			var s_yuming = $(this).siblings().eq(6).html();
			var s_rukou = $(this).siblings().eq(7).html();
			var s_zhifu = $(this).siblings().eq(8).html();
			var s_xiaoxi = $(this).siblings().eq(9).html();
			var s_youhui = $(this).siblings().eq(10).html();
			var s_miaoshu = $(this).siblings().eq(11).html();
			var s_tupian = $(this).siblings().eq(12).html();
			var s_tongxin = $(this).siblings().eq(10).html();
			var s_zhifu = $(this).siblings().eq(14).html();
			var s_zhanghu = $(this).siblings().eq(15).html();
			var s_de_name = $(this).siblings().eq(16).html();
			var s_de_time = $(this).siblings().eq(17).html();
			var s_shenhe_reson = $(this).siblings().eq(18).html();
			var s_id = $(this).siblings().eq(20).html();

			$('#s_name').html(accountname);
			$('#s_appname').html(s_appname);
			$('#s_creat').html(s_creat);
			$('#s_cr_time').html(s_cr_time);
			$('#s_shenhe').html(s_shenhe);
			$('#s_yuming').html(s_yuming);
			$('#s_rukou').html(s_rukou);
			$('#s_zhifu').html(s_zhifu);
			$('#s_xiaoxi').html(s_xiaoxi);
			$('#s_youhui').html(s_youhui);
			$('#s_miaoshu').html(s_miaoshu);
			//tupian
			//			$('#s_tupian').html(s_tupian);
			$(".icon_img").attr("src", s_tupian)

			$('#s_tongxin').html(s_tongxin);
			$('#s_zhifu').html(s_zhifu);
			$('#s_zhanghu').html(s_zhanghu);
			$('#s_de_name').html(s_de_name);
			$('#s_de_time').html(s_de_time);
			$('#s_shenhe_reson').html(s_shenhe_reson);
			$('#s_id').html(s_id);
			$("#myModalLabel").html(accountname + "小区权限");
			$("#s_fenlei").html($(this).siblings().eq(22).html())
		});
	}
}

//模糊查询
$('#search_chaxun').click(function() {
	var currentPage = "1";
	var pageSize = "10";
	//	var aduitstatus = "1";
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	var pp = $("#select_type").val();
	console.log(pp);
	if(pp == "待审核") {
		var aduitstatus = "0";
	} else if(pp == "全部") {
		var aduitstatus = "";
	} else if(pp == "审核不通过") {
		var aduitstatus = "2";
	} else {
		var aduitstatus = "1";
	}
	date1 = new Date(Date.parse(star_time.replace(/-/g, "/")));
	date1 = date1.getTime();
	date2 = new Date(Date.parse(end_time.replace(/-/g, "/")));
	date2 = date2.getTime();
	var numm = date2 - date1;
	if(numm < 0) {
		alert("结束日期不能小于开始日期");
	} else {
		var appname = $('#text_sousuo').val();
		var startday = star_time;
		var endday = end_time;
		var selectinfo = appname;
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				currentPage: currentPage,
				aduitstatus: aduitstatus,
				createdateStart: startday,
				createdateEnd: endday,
				appname: appname
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
		//	console.log(star_time+end_time+search_main)
		$.ajax({
			contentType: "application/json; charset=utf-8",
			type: "POST",
			url: urltest + 'verify/merchant/selectBussinessInfo',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {

					var msg = JSON.parse(msg.returnString);
					$("#count").html(msg.total);
					var gezi = msg.total;
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
					var table_msg = msg;
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

})

//下拉跨状态发生改变
$("#select_type").change(function() {
	var currentPage = "1";
	var pageSize = "10";
	//	var pp = $("#select_type").val();
	var pp = $("#select_type").val();
	console.log(pp);
	if(pp == "待审核") {
		var aduitstatus = "0";
	} else if(pp == "全部") {
		var aduitstatus = "";
	} else if(pp == "审核不通过") {
		var aduitstatus = "2";
	} else {
		var aduitstatus = "1";
	}
	var star_time = $('.input_1').val();
	var end_time = $('.input_2').val();
	date1 = new Date(Date.parse(star_time.replace(/-/g, "/")));
	date1 = date1.getTime();
	date2 = new Date(Date.parse(end_time.replace(/-/g, "/")));
	date2 = date2.getTime();
	var numm = date2 - date1;
	if(numm < 0) {
		alert("结束日期不能小于开始日期");
	} else {
		var appname = $('#text_sousuo').val();
		var reque = function() {
			return {
				pageSize: pageSize,
				currentPage: currentPage,
				aduitstatus: aduitstatus,
				createdateEnd: star_time,
				createdateStart: end_time,
				appname: appname
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
			url: urltest + 'verify/merchant/selectBussinessInfo',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {

					var msg = JSON.parse(msg.returnString);
					$("#count").html(msg.total);
					var gezi = msg.total;
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
					var table_msg = msg;
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

})

//删除
$(".remove").click(function() {
	var id = $("#s_id").html();
	var userId = sessionStorage.getItem("userId");
	var userName = sessionStorage.getItem("userName");
	var auditsummary = $('#s_shenhe_reson').val();

	var reque = function() {
		return {
			id: id,
			isDelete: 1
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
		url: urltest + 'verify/merchant/updateMerchantAppInfo',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				alert("删除成功！")
				location.href = "business_list.html";
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});

})

//审核通过
$("#shenhe_pass").click(function() {
	var id = $("#s_id").html();
	var userId = sessionStorage.getItem("userId");
	var userName = sessionStorage.getItem("userName");
	var auditsummary = $('#s_shenhe_reson').val();
	if(auditsummary == "" || auditsummary == undefined || auditsummary == null) {
		alert("请填写审核批注！")
	} else {
		var reque = function() {
			return {
				id: id,
				aduitstatus: '1',
				auditsummary: auditsummary,
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
			url: urltest + 'verify/merchant/updateMerchantAppInfo',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					alert("审核通过成功！")
					window.location.href = "business_list.html";
				} else {
					alert(msg.resoponseDisp)
				}
			},
			error: function() {
				alert("获取信息失败");
			}
		});
	}
})
//审核不通过
$("#shenhe_nopass").click(function() {
	var id = $("#s_id").html();
	var userId = sessionStorage.getItem("userId");
	var userName = sessionStorage.getItem("userName");
	var auditsummary = $('#s_shenhe_reson').val();
	if(auditsummary == "" || auditsummary == undefined || auditsummary == null) {
		alert("请填写审核批注！")
	} else {
		var reque = function() {
			return {
				id: id,
				aduitstatus: '2',
				auditsummary: auditsummary,
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
			url: urltest + 'verify/merchant/updateMerchantAppInfo',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					alert("审核不通过成功！")
					window.location.href = "business_list.html";
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

//点击增加公共app应用，，获取应用类型
$("#add_pu_yy").click(function() {
	yy_type();
})
//加载应用类型
function yy_type() {
	var req4 = {
		userId: userId,
		fullname: fullname
	}
	var req4 = JSON.stringify(req4);
	console.log(JSON.stringify(req4))
	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: "POST",
		url: urltest + 'verify/merchant/selectAppType',
		data: req4,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				console.log(msg.returnString);
				var bb = JSON.parse(msg.returnString);
				//				var str = "";
				var str = '<option value="0">' + "请选择应用类型" + '</option>';
				for(var i = 0; i < bb.length; i++) {
					str += "<option value=" + bb[i].categoryid + ">" + bb[i].categoryname + "</option>";
				}
				$("#yy_type").html("");
				$("#yy_type").append(str);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
}
$(".yy_pu_add").click(function() {
	debugger
	//必须	
	var categoryid = $("#yy_type option:checked").val();
	var appname = $("#yy_name").val();
	var appurl = $("#yy_dizhi").val();
	var appico = urlo;
	var createuserid = userId; //创建人id
	var createusername = userName; //创建人
	//非必须
	var appdesc = $("#yy_yyms").val(); //应用描述
	var domainname = $("#yy_yuming").val(); //应用域名
	var appid = $("#yy_appid").val(); //appid
	var appsecret = $("#yy_txmy").val(); //通训秘钥
	var paysecret = $("#yy_zfid").val(); //支付id
	var paycalladdr = $("#yy_zfhddz").val(); //支付回调地址
	var msgcalladdr = $("#yy_xxhddz").val(); //消息回调地址
	var couponcalladdr = $("#yy_yhqhddz").val(); //消息回调地址

	if(appname == '') {
		alert("应用名称必须填写")
	} else {
		if(appurl == '') {
			alert("应用地址必须填写")
		} else {
			if(categoryid == '0') {
				alert("应用类型必须选择")
			} else {
				if(urlo == "") {
					alert("应用图标必须上传")
				} else {
					var reque = function() {
						return {
							categoryid: categoryid,
							appname: appname,
							appurl: appurl,
							appico: appico,
							createuserid: createuserid,
							createusername: createusername,
							appdesc: appdesc,
							domainname: domainname,
							appid: appid,
							appsecret: appsecret,
							paysecret: paysecret,
							paycalladdr: paycalladdr,
							msgcalladdr: msgcalladdr,
							couponcalladdr: couponcalladdr,
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
					//	console.log(star_time+end_time+search_main)
					$.ajax({
						contentType: "application/json; charset=utf-8",
						type: "POST",
						url: urltest + 'verify/merchant/addPublicApp',
						data: req3,
						async: true,
						dataType: "json",
						success: function(msg) {
							console.log(msg);
							if(msg.responseCode == 200) {
								alert("增加成功");
								location.href = "business_list.html";
							} else {
								alert(msg.resoponseDisp)
							}
						},
						error: function() {
							alert("获取信息失败");
						}
					});
				}

			}
		}
	}

})