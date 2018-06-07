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
			url: urltest + 'verify/merchant/selectDataPerList',
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
			url: urltest + 'verify/merchant/selectDataPerList',
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

				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].mname + '</th>' +
					'<th style="display:none" >' + bb[i].id + '</th>' +
					'<th>' + bb[i].areaname + '</th>' +
					'<th style="display:none" >' + bb[i].merchantprivilegeid + '</th>' +
					'<th style="display:none" >' + bb[i].id + '</th>' +
					'<th>' + bb[i].pername + '</th>' +
					'<th style="display:none" >' + bb[i].permissionid + '</th>' +
//					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;>' + "详情" + '</th>' +
//					'<th style="display: none;">' + bb[i].modifyuserid + '</th>' +
//					'<th style="display: none;">' + bb[i].modifyusername + '</th>' +
//					'<th style="display: none;">' + bb[i].modifydate + '</th>' +
//					'<th style="display: none;">' + bb[i].deletemark + '</th>' +
//					'<th style="display: none;">' + bb[i].deleteuser + '</th>' +
//					'<th style="display: none;">' + bb[i].deleteusername + '</th>' +
//					'<th style="display: none;">' + bb[i].deletedate + '</th>' +
//					'<th style="display: none;">' + bb[i].pubufts + '</th>' +
					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}

		//点击详情
		$("#tbbb tr th:nth-child(9)").click(function() {
			//名字
			var accountname = $(this).siblings().eq(1).html();
			//服务商id
			var areaname = $(this).siblings().eq(2).html();
			//小区名字
			var merchantid = $(this).siblings().eq(3).html();
			//小区id
			var communityid = $(this).siblings().eq(4).html();
			//主键id
			var createusername = $(this).siblings().eq(5).html();
			//权限名字
			var createdate = $(this).siblings().eq(6).html();
			//权限ID
			var createuserid = $(this).siblings().eq(7).html();
			//修改人ID
			var modifyuserid = $(this).siblings().eq(8).html();
			//修改人
			var modifyusername = $(this).siblings().eq(9).html();
			if(modifyusername == 'undefined') {
				modifyusername = "暂无";
			}
			//修改时间
			var modifydate = $(this).siblings().eq(10).html();
			if(modifydate == 'undefined') {
				modifydate = "暂无";
			}
			//删除标记
			var deletemark = $(this).siblings().eq(11).html();
			//删除人ID
			var deleteuser = $(this).siblings().eq(12).html();
			//			删除人名字
			var deleteusername = $(this).siblings().eq(13).html();
			if(deleteusername == 'undefined') {
				deleteusername = "暂无";
			}
			//删除时间
			var deletedate = $(this).siblings().eq(14).html();
			if(deletedate == 'undefined') {
				deletedate = "暂无";
			}
			//时间戳
			var pubufts = $(this).siblings().eq(15).html();
			$("#myModalLabel").html(accountname + "数据权限");
			$('#s_name').html(accountname);
			$('#s_id').html(areaname);
			$('#s_zhanghao').html(merchantid);
			$('#s_xiquID').html(communityid);
			$('#s_gongne').html(createdate);
			$('#s_gongneID').html(createuserid);
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
				url: urltest + 'verify/merchant/deleteMerchantDataPer',
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
			url: urltest + 'verify/merchant/selectDataPerList',
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