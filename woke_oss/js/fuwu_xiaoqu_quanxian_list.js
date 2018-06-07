var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");

$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		userId = userId;
		var pageNumber = "1";
		var pageSize = "13";
		//	var auditstatus = "1";
		var startday = "";
		var endday = "";
		var selectinfo = "";
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				//			auditstatus: auditstatus,
				startday: startday,
				endday: endday,
				selectinfo: selectinfo
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
			url: urltest + 'verify/merchant/selectMerchantPrivilegeList',
			data: req3,
			async: false,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {

					$("#count").html(msg.count);
					var gezi = msg.count;
					if(gezi % 13 == 0) {
						var lenn = parseInt(gezi / 13);
						if(lenn == 0) {
							var lenn = 1;
						}
					} else {
						var lenn = parseInt(gezi / 13) + 1;
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
	var pageSize = "13";
	//	var auditstatus = "1";
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
		var search_main = $('#text_sousuo').val();
		var startday = star_time;
		var endday = end_time;
		var selectinfo = search_main;
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				//			auditstatus: auditstatus,
				startday: startday,
				endday: endday,
				selectinfo: selectinfo
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
			url: urltest + 'verify/merchant/selectMerchantPrivilegeList',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					$("#count").html(msg.count);
					var gezi = msg.count;
					if(gezi % 13 == 0) {
						var lenn = parseInt(gezi / 13);
						if(lenn == 0) {
							var lenn = 1;
						}
					} else {
						var lenn = parseInt(gezi / 13) + 1;
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
	}

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
				if(bb[i].accountname == undefined) {
					bb[i].accountname = ""
				}
				//				if(bb[i].modifydate==undefined){
				//					bb[i].modifydate==""
				//				}
				var aaa = "";
				if(bb[i].red == 'red') {
					aaa = '<span class="label label-danger">授权数据</span>'
				} else {
					aaa = '<span class="label label-info">授权数据</span>';
				}
				if(bb[i].createusername == undefined) {
					bb[i].createusername = "";
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].accountname + '</th>' +
					'<th style="display:none" >' + bb[i].id + '</th>' +
					'<th>' + bb[i].areaname + '</th>' +
					'<th>' + bb[i].createusername + '</th>' +
					'<th>' + bb[i].createdate + '</th>' +

					'<th  style="color:green;cursor: pointer" ;>' + aaa + '</th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display:none" >' + bb[i].merchantid + '</th>' +
					'<th style="display:none" >' + bb[i].communityid + '</th>' +
					'<th style="display: none;">' + bb[i].createuserid + '</th>' +
					'<th style="display: none;">' + bb[i].modifyuserid + '</th>' +
					'<th style="display: none;">' + bb[i].modifyusername + '</th>' +
					'<th style="display: none;">' + bb[i].modifydate + '</th>' +
					'<th style="display: none;">' + bb[i].deletemark + '</th>' +
					'<th style="display: none;">' + bb[i].deleteuser + '</th>' +
					'<th style="display: none;">' + bb[i].deleteusername + '</th>' +
					'<th style="display: none;">' + bb[i].deletedate + '</th>' +
					'<th style="display: none;">' + bb[i].pubufts + '</th>' +
					'</tr>';

			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}
		//点击数据权限
		$("#tbbb tr th:nth-child(7)").click(function() {
			window.location.href = "fuwu_shuju_shenhe_list.html";
			var merchantid = $(this).siblings().eq(7).html();
			var communityid = $(this).siblings().eq(8).html();
			sessionStorage.setItem("merchantid", merchantid);
			sessionStorage.setItem("communityid", communityid);

		})
		//点击详情
		$("#tbbb tr th:nth-child(8)").click(function() {
			var accountname = $(this).siblings().eq(1).html();
			var id = $(this).siblings().eq(2).html();
			var areaname = $(this).siblings().eq(3).html();
			var createusername = $(this).siblings().eq(4).html();
			if(createusername == 'undefined') {
				createusername = "暂无";
			}
			var createdate = $(this).siblings().eq(5).html();
			var merchantid = $(this).siblings().eq(7).html();
			var communityid = $(this).siblings().eq(8).html();

			var createuserid = $(this).siblings().eq(9).html();
			var modifyuserid = $(this).siblings().eq(10).html();
			var modifyusername = $(this).siblings().eq(11).html();
			if(modifyusername == 'undefined') {
				modifyusername = "暂无";
			}
			var modifydate = $(this).siblings().eq(12).html();
			if(modifydate == 'undefined') {
				modifydate = "暂无";
			}
			var deletemark = $(this).siblings().eq(13).html();
			var deleteuser = $(this).siblings().eq(14).html();
			var deleteusername = $(this).siblings().eq(15).html();
			if(deleteusername == 'undefined') {
				deleteusername = "暂无";
			}
			var deletedate = $(this).siblings().eq(16).html();
			if(deletedate == 'undefined') {
				deletedate = "暂无";
			}
			var pubufts = $(this).siblings().eq(17).html();
			$("#myModalLabel").html(accountname + "小区权限");
			$('#s_name').html(accountname);
			$('#s_id').html(id);
			$('#s_zhanghao').html(areaname);
			$('#s_chuangname').html(createusername);
			$('#s_stime').html(createdate);
			$('#s_xiquID').html(merchantid);
			$('#s_shanghuID').html(communityid);
			$('#s_chuang').html(createuserid);
			$('#s_chuangname').html(createusername);

			$('#s_update').html(modifyuserid);
			$('#s_updatename').html(modifyusername);
			$('#s_updatetime').html(modifydate);
			$('#s_remove_biaoji').html(deletemark);
			$('#s_remove_ren').html(deleteuser);
			$('#s_removename').html(deleteusername);
			$('#s_removetime').html(deletedate);
			$('#s_shijianchuo').html(pubufts);
		});

		//删除
		$(".remove").click(function() {
			var id = $("#s_id").html();
			var userId = sessionStorage.getItem("userId");
			var userName = sessionStorage.getItem("userName");
			//			var auditSummary = $('#s_pizhu').val();
			//			if(auditSummary == "" || auditSummary == undefined || auditSummary == null) {
			//				alert("请填写审核批注！")
			//			} else {
			var reque = function() {
				return {
					id: id,
					deleteuser: userId,
					deleteusername: userName,
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
				url: urltest + 'verify/merchant/deleteMerchantPrivilege',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						console.log(msg);
						alert("删除成功！")
						location.href = "fuwu_shuju_list.html";
					} else {
						alert(msg.resoponseDisp)
					}
				},
				error: function() {
					alert("获取信息失败");
				}
			});
			//			}
		})

	}
}

//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "13";
	//	var auditstatus = "1";
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
		var search_main = $('#text_sousuo').val();
		var startday = star_time;
		var endday = end_time;
		var selectinfo = search_main;
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				//			auditstatus: auditstatus,
				startday: startday,
				endday: endday,
				selectinfo: selectinfo
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
			url: urltest + 'verify/merchant/selectMerchantPrivilegeList',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {

					$("#count").html(msg.count);
					var gezi = msg.count;
					if(gezi % 13 == 0) {
						var lenn = parseInt(gezi / 13);
						if(lenn == 0) {
							var lenn = 1;
						}
					} else {
						var lenn = parseInt(gezi / 13) + 1;
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

})