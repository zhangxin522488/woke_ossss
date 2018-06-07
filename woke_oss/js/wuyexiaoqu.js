var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");
var organizeid = sessionStorage.getItem("organizeid");
$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		top.location.href = "login.html";
	} else {

		userId = userId;
		var pageNumber = "1";
		var pageSize = "13";
		var selectinfo = "";
		var reque = function() {
			return {
				organizeid: organizeid,
				pageSize: pageSize,
				pageNumber: pageNumber,
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
			url: urltest + 'verify/property/selectPropertyCommunityList',
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
	var search_main = $('#text_sousuo').val();

	var selectinfo = search_main;
	//	var userId = "";
	var reque = function() {
		return {
			organizeid: organizeid,
			pageSize: pageSize,
			pageNumber: pageNumber,
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
		url: urltest + 'verify/property/selectPropertyCommunityList',
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

				if(bb[i].createusername == undefined) {
					bb[i].createusername = "";
				}
				if(bb[i].areaname == undefined) {
					bb[i].areaname = "";
				}
				if(bb[i].areacode == undefined) {
					bb[i].areacode = "";
				}
				if(bb[i].createdate == undefined) {
					bb[i].createdate = "";
				}
				if(bb[i].builds == undefined) {
					bb[i].builds = "";
				}
				if(bb[i].areaadr == undefined) {
					bb[i].areaadr = "";
				}
				if(bb[i].buildcode == undefined) {
					bb[i].buildcode = "";
				}
				if(bb[i].areatel == undefined) {
					bb[i].areatel = "";
				}
				if(bb[i].description == undefined) {
					bb[i].description = "";
				}
				if(bb[i].addrprovince == undefined) {
					bb[i].addrprovince = "";
				}
				if(bb[i].addrcity == undefined) {
					bb[i].addrcity = "";
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].areaname + '</th>' +
					'<th style="display:none" >' + bb[i].areaid + '</th>' +
					'<th>' + bb[i].areacode + '</th>' +
					'<th>' + bb[i].createusername + '</th>' +
					'<th>' + bb[i].createdate + '</th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="display:none" >' + bb[i].areaadr + '</th>' + //小区地址
					'<th style="display:none" >' + bb[i].builds + '</th>' + //楼宇数
					'<th style="display: none;">' + bb[i].buildcode + '</th>' + //楼号首码
					'<th style="display: none;">' + bb[i].areatel + '</th>' + //联系电话
					'<th style="display: none;">' + bb[i].description + '</th>' + //备注
					'<th style="display: none;">' + bb[i].addrprovince + '</th>' + //省
					'<th style="display: none;">' + bb[i].addrcity + '</th>' + //市					
					'</tr>';

			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}

		//点击详情
		$("#tbbb tr th:nth-child(7)").click(function() {
			$('#xiaoqu_name').html($(this).siblings().eq(1).html());
			$('#xiaoqu_id').html($(this).siblings().eq(2).html());
			$('#xiaoqu_bianma').html($(this).siblings().eq(3).html());
			$('#xiaoqu_creat').html($(this).siblings().eq(4).html());
			$('#xiaoqu_creattime').html($(this).siblings().eq(5).html());
			$('#xiaoqu_adress').html($(this).siblings().eq(6).html());
			$('#xiaoqu_lou').html($(this).siblings().eq(7).html());
			$('#xiaoqu_louma').html($(this).siblings().eq(8).html());
			$('#xiaoqu_tel').html($(this).siblings().eq(9).html());
			$('#xiaoqu_beizhu').html($(this).siblings().eq(10).html());
			$('#xiaoqu_sheng').html($(this).siblings().eq(11).html());
			$('#xiaoqu_shi').html($(this).siblings().eq(12).html());

		});

		//删除
		//		$(".remove").click(function() {
		//			var id = $("#s_id").html();
		//			var userId = sessionStorage.getItem("userId");
		//			var userName = sessionStorage.getItem("userName");
		//			//			var auditSummary = $('#s_pizhu').val();
		//			//			if(auditSummary == "" || auditSummary == undefined || auditSummary == null) {
		//			//				alert("请填写审核批注！")
		//			//			} else {
		//			var reque = function() {
		//				return {
		//					id: id,
		//					deleteuser: userId,
		//					deleteusername: userName,
		//				}
		//			}
		//			rq1 = reque();
		//			var req = function() {
		//				return {
		//					requestString: "",
		//					userId: userId,
		//					fullname: fullname
		//				}
		//			}
		//			requestObj1 = req();
		//			requestObj1.requestString = JSON.stringify(rq1);
		//			var req3 = JSON.stringify(requestObj1);
		//
		//			$.ajax({
		//				contentType: "application/json; charset=utf-8",
		//				type: "POST",
		//				url: urltest + 'verify/merchant/deleteMerchantPrivilege',
		//				data: req3,
		//				async: true,
		//				dataType: "json",
		//				success: function(msg) {
		//					console.log(msg);
		//					if(msg.responseCode == 200) {
		//						console.log(msg);
		//						alert("删除成功！")
		//						location.href = "fuwu_shuju_list.html";
		//					} else {
		//						alert(msg.resoponseDisp)
		//					}
		//				},
		//				error: function() {
		//					alert("获取信息失败");
		//				}
		//			});
		//			//			}
		//		})

	}
}

//模糊查询
$('#search_chaxun').click(function() {

	var pageNumber = "1";
	var pageSize = "13";

	var search_main = $('#text_sousuo').val();

	var selectinfo = search_main;
	//	var userId = "";
	var reque = function() {
		return {
			pageSize: pageSize,
			pageNumber: pageNumber,
			organizeid: organizeid,
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
		url: urltest + 'verify/property/selectPropertyCommunityList',
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

})

//查询下属楼宇
$(".xiashu_louyu").click(function() {
	var areaid = $("#xiaoqu_id").html();
	sessionStorage.setItem("areaid", areaid);
	window.location.href = 'fangwuliebiao.html';
})