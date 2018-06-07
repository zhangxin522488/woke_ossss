var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");

$(function() {
	debugger
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		userId = userId;
		var pageNumber = "1";
		var pageSize = "10";
		var pp = $("#select_type").val();
		var auditstatus = "0";
		var startday = "";
		var endday = "";
		var selectinfo = "";
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				auditstatus: auditstatus,
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
			url: urltest + 'verify/merchant/queryMerchantPage',
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
	var pageNumber = "1";
	var pageSize = "10";
	var pp = $("#select_type").val();
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
		console.log(pp);
		if(pp == "待审核") {
			var auditstatus = "0";
		} else {
			var auditstatus = "2";
		}
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				auditstatus: auditstatus,
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
			url: urltest + 'verify/merchant/queryMerchantPage',
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
	}

})

$("#bp-3-element-test").on("click", function() {
	var aa = $(this).children(".active").children("a").html();
	var pageNumber = aa;
	var pageSize = "10";
	var pp = $("#select_type").val();
	var pp = $("#select_type").val();

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
		console.log(pp);
		if(pp == "待审核") {
			var auditstatus = "0";
		} else {
			var auditstatus = "2";
		}
		//	var auditstatus = "1";
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				auditstatus: auditstatus,
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
			url: urltest + 'verify/merchant/queryMerchantPage',
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
				if(bb[i].auditstatus == "2") {
					bb[i].auditstatus = '<button type="button" class="btn btn-danger">' + "审核不通过" + '</button>';
				} else if(bb[i].auditstatus == "0") {
					bb[i].auditstatus = '<button  type="button" class="btn btn-primary">' + "待审核" + '</button>';
				}
				var num = parseInt(i) + parseInt(1);
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].mname + '</th>' +
					'<th>' + bb[i].category + '</th>' +
					'<th style="display: none;">' + bb[i].id + '</th>' +
					'<th>' + bb[i].createdate + '</th>' +
					'<th>' + bb[i].accountname + '</th>' +
					'<th class="change_color">' + bb[i].auditstatus + '</th>' +
					//					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;>' + "详情" + '</th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th style="color:red;cursor: pointer" ;> <span class="glyphicon glyphicon-time"></span></th>' +

					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);

		}

		//点击详情
		$("#tbbb tr th:nth-child(8)").click(function() {
			var id = $(this).siblings().eq(3).html();
			var mname = $(this).siblings().eq(1).html();
			$("#myModalLabel").html(mname + "服务商详情")

			var reque = function() {
				return {
					id: id,
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
			//查看某一服务商详情
			$.ajax({
				contentType: "application/json; charset=utf-8",
				type: "POST",
				url: urltest + 'verify/merchant/queryMerchantInfo',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						console.log(msg);
						var s_state = "";
						var msg = JSON.parse(msg.returnString);
						if(msg.auditstatus == 1) {
							s_state = "审核通过";
						} else if(msg.auditstatus == 0) {
							s_state = "待审核";
						} else if(msg.auditstatus == 2) {
							s_state = "审核不通过";
						} else {
							s_state = "未知错误";
						}

						$('#s_name').html(msg.mname);
						$('#s_zhanghao').html(msg.accountname);
						$('#s_id').html(msg.id);
						$('#s_stime').html(msg.createdate);
						$('#s_email').html(msg.email);

						$('#s_type').html(msg.category);
						$('#s_type_er').html(msg.category2);
						$('#s_type_san').html(msg.category3);

						$('#s_person').html(msg.contacts);

						$('#s_telephone').html(msg.mobileno);
						$('#s_farenName').html(msg.legalper);
						$('#s_tel').html(msg.telephone);
						$('#s_shenfenNum').html(msg.legalperidnum);

						$('#s_zhucetime').html(msg.registerdate);
						$('#s_shenhestate').html(s_state);

						$('#s_chuang').html(msg.createuserid);
						$('#s_chuangname').html(msg.createusername);
						//						$('#s_chuangtime').html(msg.CreateDate);

						$('#s_update').html(msg.modifyuserid);
						$('#s_updatename').html(msg.modifyusername);
						$('#s_updatetime').html(msg.modifydate);

						$('#s_remove_biaoji').html(msg.deletemark);
						$('#s_remove_ren').html(msg.deleteuser);
						$('#s_removename').html(msg.deleteusername);
						$('#s_removetime').html(msg.deletedate);
						$('#s_shijianchuo').html(msg.pubufts);
						$('#s_paixu').html(msg.rowno);

						//图片显示    照片地址暂时还没
											
						$('#s_shenfenZheng').attr("src", msg.legalperidnumpht1);
						$('#s_shenfenFan').attr("src", msg.legalperidnumpht2);
						$('#s_zhizhao').attr("src", msg.aptitudepht);
						//												$('#s_zzhi').attr("src",msg.aptitude);

						
						var pizhu = "";
						if(msg.aptitude == undefined) {
							pizhu = ""
						}
						$('#s_pizhu').html(pizhu);

					} else {
						alert(msg.resoponseDisp)
					}
				},
				error: function() {
					alert("获取信息失败");
				}
			});
			//判断显示哪种按钮
			var s_jieguo = $('#s_shenhestate').html();
			if(s_jieguo == "待审核") {
				$(".shenhe_no").css("display", "block");
				$(".wuxushenhe").css("display", "none");
				$(".shenhepizhu").css("display", "block");

			} else {
				$(".shenhe_no").css("display", "none");
				$(".wuxushenhe").css("display", "block");
				$(".shenhepizhu").css("display", "none");
			}

			//模态框内部页签
			$(".jichu_span").click(function() {
				$(this).attr("class", "te_p_span");
				$(this).siblings().removeClass("te_p_span");
				$(".jichu_in").show();
				$(".jichu_in").siblings().hide();
			})
			$(".fix_span").click(function() {
				$(this).attr("class", "te_p_span");
				$(this).siblings().removeClass("te_p_span");
				$(".person_in").show();
				$(".person_in").siblings().hide();
			})
			$(".zhuce_span").click(function() {
				$(this).attr("class", "te_p_span");
				$(this).siblings().removeClass("te_p_span");
				$(".zhuce_in").show();
				$(".zhuce_in").siblings().hide();
			})
			$(".img_span").click(function() {
				$(this).attr("class", "te_p_span");
				$(this).siblings().removeClass("te_p_span");
				$(".img_in").show();
				$(".img_in").siblings().hide();
			})
		});
		//点击历史记录  跳转新页面
		$("#tbbb tr th:nth-child(9)").click(function() {
			var id = $(this).siblings().eq(3).html();
			var name = $(this).siblings().eq(1).html();
			sessionStorage.setItem("zhuce_id_his", id);
			sessionStorage.setItem("zhuce_name_his", name);

			location.href = "History_of_registration.html";
		})

	}
}

//点击审核通过
$(".shnehe_pass").click(function() {
	//	$(".shnehe_nopass").attr("disabled", "true");
	var id = $("#s_id").html();
	var userId = sessionStorage.getItem("userId");
	var userName = sessionStorage.getItem("userName");
	var auditSummary = $('#s_pizhu').val();
	if(auditSummary == "" || auditSummary == undefined || auditSummary == null) {
		alert("请填写审核批注！")
	} else {
		var reque = function() {
			return {
				merchantId: id,
				auditUser: userId,
				auditUserName: userName,
				auditSummary: auditSummary
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
			url: urltest + 'verify/merchant/aptitudeAuditPass',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					alert("审核成功！");
					location.href = "Registration_audit.html";
				} else {
					alert(msg.resoponseDisp);

				}
			},
			error: function() {
				alert("获取信息失败");
			}
		});
	}

})

//审核不通过
$(".shnehe_nopass").click(function() {
	//	$(".shnehe_nopass").attr("disabled","true");
	var id = $("#s_id").html();
	var userId = sessionStorage.getItem("userId");
	var userName = sessionStorage.getItem("userName");
	var auditSummary = $('#s_pizhu').val();
	if(auditSummary == "" || auditSummary == undefined || auditSummary == null) {
		alert("请填写审核批注！")
	} else {
		var reque = function() {
			return {
				merchantId: id,
				auditUser: userId,
				auditUserName: userName,
				auditSummary: auditSummary
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
			url: urltest + 'verify/merchant/aptitudeAuditNotPass',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					alert("审核不通过！");
					location.href = "Registration_audit.html";
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

//模糊查询
$('#search_chaxun').click(function() {
	var pageNumber = "1";
	var pageSize = "10";
	var auditstatus = "1";
	var pp = $("#select_type").val();
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
		//	console.log(pp);
		if(pp == "待审核") {
			var auditstatus = "0";
		} else {
			var auditstatus = "2";
		}
		//	var userId = "";
		var reque = function() {
			return {
				pageSize: pageSize,
				pageNumber: pageNumber,
				auditstatus: auditstatus,
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
			url: urltest + 'verify/merchant/queryMerchantPage',
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
	}

})