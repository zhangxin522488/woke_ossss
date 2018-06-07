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
		var pageSize = "10";
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
			url: urltest + 'verify/staff/selectStaffList',
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
			url: urltest + 'verify/staff/selectStaffList',
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
		//		console.log(bb);
		var bb = JSON.parse(bb);
		var tableStr = "";
		var len = bb.length;
		if(len == 0) {
			var wuxiaoxi = '<p>' + "暂无内容" + '</p>'
			$("#tbbb").html(wuxiaoxi);
		} else {
			for(var i = 0; i < len; i++) {
				var num = parseInt(i) + parseInt(1);
				if(bb[i].userkind == 1) {
					var userkind = "超管";
					var quanxian = "";
				} else {
					var userkind = "普通员工";
					var quanxian = '<span class="glyphicon glyphicon-time"></span>';
				}
				if(bb[i].moblieaduit == 1) {
					var moblieaduit = "已验证"
				} else {
					var moblieaduit = "未验证"
				}
				if(bb[i].modifyusername == undefined || bb[i].modifyusername == 'undefined') {
					bb[i].modifyusername = "暂无"
				}
				if(bb[i].modifydate == undefined || bb[i].modifydate == 'undefined') {
					bb[i].modifydate = "暂无"
				}
				tableStr = tableStr + '<tr>' +
					'<th>' + num + '</th>' +
					'<th>' + bb[i].username + '</th>' +
					'<th style="display: none;">' + bb[i].id + '</th>' +
					'<th>' + bb[i].nickname + '</th>' +
					'<th>' + userkind + '</th>' +
					'<th>' + bb[i].email + '</th>' +
					'<th>' + bb[i].mobileno + '</th>' +
					'<th data-toggle="modal" data-target="#myModal" style="color:blue;cursor: pointer" ;><span class="glyphicon glyphicon-edit"></span></th>' +
					'<th  style="color:red;cursor: pointer" ;>' + quanxian + '</th>' +
					'<th style="display: none;">' + moblieaduit + '</th>' +
					'<th style="display: none;">' + bb[i].createuserid + '</th>' +
					'<th style="display: none;">' + bb[i].createusername + '</th>' +
					'<th style="display: none;">' + bb[i].createdate + '</th>' +
					'<th style="display: none;">' + bb[i].modifyuserid + '</th>' +
					'<th style="display: none;">' + bb[i].modifyusername + '</th>' +
					'<th style="display: none;">' + bb[i].modifydate + '</th>' +
					'<th style="display: none;">' + bb[i].deletemark + '</th>' +
					'<th style="display: none;">' + bb[i].deleteuser + '</th>' +
					'<th style="display: none;">' + bb[i].deleteusername + '</th>' +
					'<th style="display: none;">' + bb[i].deletedate + '</th>' +
					'<th style="display: none;">' + bb[i].loginusername + '</th>' +
					'</tr>';
			}
			//将动态生成的table添加的事先隐藏的div中.  
			$("#tbbb").html(tableStr);
		}
		//点击详情
		$("#tbbb tr th:nth-child(8)").click(function() { //名字
			var s_name = $(this).siblings().eq(1).html();
			var s_id = $(this).siblings().eq(2).html();
			var s_nick = $(this).siblings().eq(3).html();
			var s_zhiwei = $(this).siblings().eq(4).html();
			var s_email = $(this).siblings().eq(5).html();
			var s_phone = $(this).siblings().eq(6).html();
			var s_moblieaduit = $(this).siblings().eq(8).html();
			var s_createuserid = $(this).siblings().eq(9).html();
			var s_createusername = $(this).siblings().eq(10).html();
			var s_createdate = $(this).siblings().eq(11).html();
			var s_modifyuserid = $(this).siblings().eq(12).html();
			var s_modifyusername = $(this).siblings().eq(10).html();
			var s_modifydate = $(this).siblings().eq(14).html();
			var s_deletemark = $(this).siblings().eq(15).html();
			var s_deleteuser = $(this).siblings().eq(16).html();
			var s_deleteusername = $(this).siblings().eq(17).html();
			var s_deletedate = $(this).siblings().eq(18).html();
			var s_y_zhanghao = $(this).siblings().eq(19).html();

			$("#myModalLabel").html(s_name + "员工详情");
			$('#s_name').val(s_name);
			$('#s_id').html(s_id);
			$('#s_nick').val(s_nick);
			$('#s_zhiwei').html(s_zhiwei);
			var s_zhiwei = s_zhiwei;
			if(s_zhiwei == "超管") {
				//				$(".seclect_2 option").val(1).attr("selected":"selected");
				$('.seclect_2').val('1');
			} else {
				$('.seclect_2').val('2');
			}
			//提示清空
			$('.name1_tips').html("");
			$('.nick1_tips').html("");
			$('.email1_tips').html("");
			$('.tel1_tips').html("");

			$('#s_email').val(s_email);
			$('#s_phone').html(s_phone);
			$('#s_moblieaduit').html(s_moblieaduit);
			$('#s_createuserid').html(s_createuserid);
			$('#s_createusername').html(s_createusername);
			$('#s_createdate').html(s_createdate);
			$('#s_modifyuserid').html(s_modifyuserid);
			$('#s_modifyusername').html(s_modifyusername);
			$('#s_modifydate').html(s_modifydate);
			$('#s_deletemark').html(s_deletemark);
			$('#s_deleteuser').html(s_deleteuser);
			$('#s_deleteusername').html(s_deleteusername);
			$('#s_deletedate').html(s_deletedate);
			$("#s_y_zhanghao").html(s_y_zhanghao)
		});
		$("#tbbb tr th:nth-child(9)").click(function() {
			var isjump = $(this).html();
			var id = $(this).siblings().eq(2).html();
			if(isjump != "") {
				sessionStorage.setItem("yuanGong_id", id)
				window.location.href = "quanxian_settings.html"
			}
		})

		//修改员工信息
		$(".fix_yuangong").click(function() {
			//			debugger
			//验证规则是否通过	
			var name_tips = $(".name1_tips").html();
			var nick_tips = $(".nick1_tips").html();
			//			var position_tips = $(".position_tips").html();
			var email_tips = $(".email1_tips").html();
			//			var tel_tips = $(".tel1_tips").html();
			//			var haoma_tips = $(".haoma_tips").html();
			var userId = sessionStorage.getItem("userId");
			var userName = sessionStorage.getItem("userName");
			var id = $('#s_id').html();
			var name = $("#s_name").val();
			var nickname = $("#s_nick").val();
			var email = $("#s_email").val();
			var mobileno = $("#s_phone").html();
			var loginusername = $("#s_y_zhanghao").html();
			var userkind = $(".seclect_2").val();
			if(name_tips == "" && nick_tips == "" && email_tips == "" && name != "" && nickname != "" && email != "" && mobileno != "" && loginusername != "" && userkind != "0") {

				var reque = function() {
					return {
						id: id,
						loginusername: loginusername,
						username: name,
						nickname: nickname,
						email: email,
						mobileno: mobileno,
						modifyuserid: userId,
						modifyusername: userName,
						userkind: userkind
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
					url: urltest + 'verify/staff/updateStaffInfo',
					data: req3,
					async: true,
					dataType: "json",
					success: function(msg) {
						console.log(msg);
						if(msg.responseCode == 200) {
							console.log(msg);
							alert("修改成功！")
							location.href = "Employee_list.html";
						} else {
							alert(msg.resoponseDisp)
						}
					},
					error: function() {
						alert("获取信息失败");
					}
				});
			} else {
				alert("请按提示填写")
			}

		})

		//删除
		$(".remove").click(function() {
			//			$(this).attr("disabled",true)
			var id = $("#s_id").html();
			var userId = sessionStorage.getItem("userId");
			var userName = sessionStorage.getItem("userName");
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
				url: urltest + 'verify/staff/deleteStaff',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						console.log(msg);
						alert("删除成功！")
						location.href = "Employee_list.html";
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
	var pageSize = "10";
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
			url: urltest + 'verify/staff/selectStaffList',
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

//添加员工
$(".add_yuangong").click(function() {
	debugger
	//验证规则是否通过	
	var name_tips = $(".name_tips").html();
	var nick_tips = $(".nick_tips").html();
	var position_tips = $(".position_tips").html();
	var email_tips = $(".email_tips").html();
	var tel_tips = $(".tel_tips").html();
	var haoma_tips = $(".haoma_tips").html();
	var userId = sessionStorage.getItem("userId");
	var userName = sessionStorage.getItem("userName");

	var name = $("#add_name").val();
	var nickname = $("#add_nick").val();
	var email = $("#add_em").val();
	var mobileno = $("#add_tel").val();
	var loginusername = $("#add_haoma").val();
	var userkind = $(".seclect_1").val();
	if(name_tips == "" && nick_tips == "" && position_tips == "" && email_tips == "" && tel_tips == "" && haoma_tips == "" && name != "" && nickname != "" && email != "" && mobileno != "" && loginusername != "" && userkind != "0") {

		var reque = function() {
			return {
				loginusername: loginusername,
				username: name,
				nickname: nickname,
				email: email,
				mobileno: mobileno,
				createuserid: userId,
				createusername: userName,
				userkind: userkind
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
			url: urltest + 'verify/staff/addNewStaff',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					var pp = JSON.parse(msg.returnString);
					alert("添加成功！" + "登录账号为：" + pp.loginusername + "登录密码：" + pp.loginuserpwd + "请尽快登录并重置密码")
					location.href = "Employee_list.html";
				} else {
					alert(msg.resoponseDisp)
				}
			},
			error: function() {
				alert("获取信息失败");
			}
		});
	} else {
		alert("请按提示填写")
	}

})

//验证

//验证密码规则或者账号以及长度
var checkzhanghao = function() {
	$(".haoma_tips").html("");
	var email = $("#add_haoma").val();
	if(email != "") {
		var regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
		isok = regExp.test(email);
		if(!isok) {
			$(".haoma_tips").html("字母加数字且大于6位");
			return false;
		}
	} else {
		$(".haoma_tips").html("账号不能为空！");
	}
};
//验证 员工账号是否为空
var checksele = function() {
	$(".position_tips").html("");
	var email = $(".seclect_1").val();
	if(email != "0") {

	} else {
		$(".position_tips").html("请选择职位");
	}
};

//验证邮箱是否合格
var checkemail = function() {
	$(".email_tips").html("");
	var email = $("#add_em").val();
	if(email != "") {
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		isok = reg.test(email);
		if(!isok) {
			$(".email_tips").html("邮箱格式不正确");
			return false;
		}
	} else {
		$(".email_tips").html("邮箱不能为空！");
	}
};
//验证 昵称是否为空
var checknickname = function() {
	$(".nick_tips").html("");
	var email = $("#add_nick").val();
	if(email != "") {} else {
		$(".nick_tips").html("昵称不能为空！");
	}
};
//验证手机号码
var checktel = function() {
	$(".tel_tips").html("");
	var shouji = $("#add_tel").val();
	if(shouji != "") {
		var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
		isok = reg.test(shouji);
		if(!isok) {
			$(".tel_tips").html("手机格式不正确");
			return false;
		}
	} else {
		$(".tel_tips").html("手机号不能为空！");
	}
};
//验证 名字是否为空
var checkname = function() {
	$(".name_tips").html("");
	var email = $("#add_name").val();
	if(email != "") {} else {
		$(".name_tips").html("名字不能为空！");
	}
};
//验证邮箱是否合格
var checkemail1 = function() {
	$(".email1_tips").html("");
	var email = $("#s_email").val();
	if(email != "") {
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		isok = reg.test(email);
		if(!isok) {
			$(".email1_tips").html("邮箱格式不正确");
			return false;
		}
	} else {
		$(".email1_tips").html("邮箱不能为空！");
	}
};
//验证 昵称是否为空
var checknick1 = function() {
	$(".nick1_tips").html("");
	var email = $("#s_nick").val();
	if(email != "") {} else {
		$(".nick1_tips").html("昵称不能为空！");
	}
};
//验证手机号码
var checktel1 = function() {
	$(".tel1_tips").html("");
	var shouji = $("#s_phone").html();
	if(shouji != "") {
		var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
		isok = reg.test(shouji);
		if(!isok) {
			$(".tel1_tips").html("手机格式不正确");
			return false;
		}
	} else {
		$(".tel1_tips").html("手机号不能为空！");
	}
};
//验证 名字是否为空
var checkname1 = function() {
	$(".name1_tips").html("");
	var email = $("#s_name").val();
	if(email != "") {} else {
		$(".name1_tips").html("名字不能为空！");
	}
};