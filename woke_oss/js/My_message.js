var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var userkind = sessionStorage.getItem("userkind");
var fullname = sessionStorage.getItem("fullname");
$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		userId = userId;
		var reque = function() {
			return {
				id: userId
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
		//	console.log(JSON.parse(req3))
		$.ajax({
			contentType: "application/json; charset=utf-8",
			type: "POST",
			url: urltest + 'noverify/staff/selectOneselfInfo',
			data: req3,
			async: false,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {

					var msgg = JSON.parse(msg.returnString);
					if(msgg.userkind == "1") {
						var userkind = "超管";
					} else {
						var userkind = "普通员工";
					}
					if(msgg.mobileaudit == "0") {
						var mobileaudit = "未验证";
					} else {
						var mobileaudit = "已验证";
						$('.span_m5').hide();
					}

					$("#my_name").html(msgg.username)
					$("#my_nick").html(msgg.nickname)
					$("#my_ID").html(msgg.id)
					$("#my_zhanghao").html(msgg.loginusername)
					$("#my_mima").html(msgg.loginuserpwd)
					$("#my_zhiwei").html(userkind)
					$("#my_email").html(msgg.email)
					$("#my_tel").html(msgg.mobileno)
					$("#my_tel_yanzheng").html(mobileaudit)
					$("#my_cr_name").html(msgg.createusername)
					$("#my_cr_time").html(msgg.createdate)

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
//更改名字
$(".span_m1").click(function() {
	var old_name = $(this).parent().find("b").html();
	$('#old_name').html(old_name);
	$(".fix_name").click(function() {
		var userId = sessionStorage.getItem("userId");
		var userName = sessionStorage.getItem("userName");
		var userkind = sessionStorage.getItem("userkind");
		var username = $('#new_name').val();
		if(username == "") {
			alert("新名字不能为空")
		} else if(username.length > 6) {
			alert("名字不能大于6个字")
		} else {
			var reque = function() {
				return {
					id: userId,
					username: username,
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
			//	console.log(JSON.parse(req3))
			$.ajax({
				contentType: "application/json; charset=utf-8",
				type: "POST",
				url: urltest + 'noverify/staff/updateStaffInfo',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						alert("修改成功！");
						alert($("#userZ_name").html())
//						$("#userZ_name").html(username);
//						$("#span_username").html(username);
						window.location.href = "My_message.html";
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

})

//更改昵称
$(".span_m2").click(function() {
	var old_nick = $(this).parent().find("b").html();
	$('#old_nick').html(old_nick);
	$(".fix_nick").click(function() {
		var userId = sessionStorage.getItem("userId");
		var userName = sessionStorage.getItem("userName");
		var userkind = sessionStorage.getItem("userkind");
		var nickname = $('#new_nick').val();
		if(nickname == "") {
			alert("新昵称不能为空")
		} else if(nickname.length > 6) {
			alert("昵称不能大于6个字")
		} else {

			var reque = function() {
				return {
					id: userId,
					nickname: nickname,
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
			//	console.log(JSON.parse(req3))
			$.ajax({
				contentType: "application/json; charset=utf-8",
				type: "POST",
				url: urltest + 'noverify/staff/updateStaffInfo',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						alert("修改成功！");
						window.location.href = "My_message.html";
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

})

//更改邮箱
$(".span_m3").click(function() {
	var new_email = $(this).parent().find("b").html();
	$('#old_email').html(new_email);
	$(".fix_email").click(function() {
		var userId = sessionStorage.getItem("userId");
		var userName = sessionStorage.getItem("userName");
		var userkind = sessionStorage.getItem("userkind");
		var email = $('#new_email').val();

		//		if(email != "") {
		//			var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		//			isok = reg.test(email);
		//			if(!isok) {
		//				$(".email_tips").html("邮箱格式不正确");
		//				return false;
		//			}
		//		} else {
		//			$(".email_tips").html("邮箱不能为空！");
		//		}

		if(email == "") {
			alert("新昵称不能为空")
		} else {
			var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
			isok = reg.test(email);
			if(!isok) {
				alert("邮箱格式不正确");
			} else {
				var reque = function() {
					return {
						id: userId,
						email: email,
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
				//	console.log(JSON.parse(req3))
				$.ajax({
					contentType: "application/json; charset=utf-8",
					type: "POST",
					url: urltest + 'noverify/staff/updateStaffInfo',
					data: req3,
					async: true,
					dataType: "json",
					success: function(msg) {
						console.log(msg);
						if(msg.responseCode == 200) {
							alert("修改成功！");
							window.location.href = "My_message.html";
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

	})

})

//更改密码
$(".span_m4").click(function() {

	$(".fix_pas").click(function() {
		var userId = sessionStorage.getItem("userId");
		var userName = sessionStorage.getItem("userName");
		//		var userkind = sessionStorage.getItem("userkind");
		var pas1 = $('#new_pas1').val();
		var pas2 = $('#new_pas_sure').val();
		var oldpas = $('#new_pas').val();
		if(pas1 == "" || pas2 == "" || oldpas == "") {
			alert("当前还有未填写的内容")
		} else {
			if(pas1 != pas2) {
				alert("两次密码输入不一致");
			} else {
				var regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
				isok = regExp.test(pas1);
				if(!isok) {
					alert("密码必须是字母加数字且不小于6位")
				} else {
					var reque = function() {
						return {
							modifyuserid: userId,
							modifyusername: userName,
							id: userId,
							loginuserpwd: oldpas,
							newuserpwd: pas1,
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
					//	console.log(JSON.parse(req3))
					$.ajax({
						contentType: "application/json; charset=utf-8",
						type: "POST",
						url: urltest + 'noverify/staff/updateStaffPwd',
						data: req3,
						async: true,
						dataType: "json",
						success: function(msg) {
							console.log(msg);
							if(msg.responseCode == 200) {
								alert("修改成功！请用新密码重新登陆！");
								top.location.href = "login.html";
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

	})

})
$(".span_m5").click(function() {
	$('#old_inphone').html($("#my_tel").html());
	var id = $('#my_ID').html();
	//点击验证码 计时	   发送验证码
	var InterValObj; //timer变量，控制时间
	var count = 60; //间隔函数，1秒执行
	var curCount; //当前剩余秒数	
	$("#butt_yanzhangma").click(function sendMessage() {
		var use_em = $("#old_inphone").html();
		var reque = function() {
			return {
				moblieno: use_em,
			}
		}
		rq1 = reque();
		var req2 = JSON.stringify(rq1)
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
			url: urltest + 'noverify/staff/auditSendSms',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					curCount = count;　　 //设置button效果，开始计时
					$("#butt_yanzhangma").attr("disabled", "true");
					$("#butt_yanzhangma").html(curCount + "秒后重新获取");
					InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
				} else {
					alert(msg.resoponseDisp)
				}
			},
			error: function() {
				alert(msg.resoponseDisp)
			}

		});
	});　

	//timer处理函数
	function SetRemainTime() {
		if(curCount == 0) {
			window.clearInterval(InterValObj); //停止计时器
			$("#butt_yanzhangma").removeAttr("disabled"); //启用按钮
			$("#butt_yanzhangma").html("重新发送验证码");
		} else {
			curCount--;
			$("#butt_yanzhangma").html(curCount + "秒后重新获取");
		}
	};

	//验证手机号码
	$(".yanzheng_tel").click(function() {
		var code = $('#s_yanzhnegma').val();
		var moblieno = $("#old_inphone").html();
		if(code == "" || code == "" || code == "") {
			alert("请填写验证码")
		} else {

			var reque = function() {
				return {
					mobileno: moblieno,
					code: code,
					id: id
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
			//	console.log(JSON.parse(req3))
			$.ajax({
				contentType: "application/json; charset=utf-8",
				type: "POST",
				url: urltest + 'noverify/staff/updateStaffTelAudit',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						alert("验证成功");
						location.href = "My_message.html";
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

})
var InterValObj1; //timer变量，控制时间
var count1 = 60; //间隔函数，1秒执行
var curCount1; //当前剩余秒数

var InterValObj2; //timer变量，控制时间
var count2 = 60; //间隔函数，1秒执行
var curCount2; //当前剩余秒数

$("#fix_tel").click(function() {
	var my_tel_yanzheng = $('#my_tel_yanzheng').html();
	var my_tel = $('#my_tel').html();
	$('#old_tel').html(my_tel);
	if(my_tel_yanzheng == "已验证") {
		$("#myModal7").modal('show');
	} else {
		$("#myModal6").modal('show');
	}
	//发送验证码
	$("#butt_yanzhangma1").click(function sendMessage() {
		var use_em = $("#old_tel").html();
		var reque = function() {
			return {
				moblieno: use_em,
			}
		}
		rq1 = reque();
		var req2 = JSON.stringify(rq1)
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
			url: urltest + 'noverify/staff/auditSendSms',
			data: req3,
			async: true,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					curCount1 = count1;　　 //设置button效果，开始计时
					$("#butt_yanzhangma").attr("disabled", "true");
					$("#butt_yanzhangma").html(curCount1 + "秒后重新获取");
					InterValObj1 = window.setInterval(SetRemainTime1, 1000); //启动计时器，1秒执行一次
				} else {
					alert(msg.resoponseDisp)
				}
			},
			error: function() {
				alert(msg.resoponseDisp)
			}

		});
	});　

	$(".next_old").click(function() {
		$("#old_tips").html("");
		var old_tel = $('#old_tel').html();
		var old_yanzhengma = $("#old_yanzhengma").val();
		if(old_yanzhengma == "") {
			$("#old_tips").html("验证码不能为空");
		} else {
			var use_em = $("#old_tel").html();
			var code = $("#old_yanzhengma").val();
			var my_ID = $("#my_ID").html();

			var reque = function() {
				return {
					mobileno: use_em,
					code: code,
					id: my_ID
				}
			}
			rq1 = reque();
			var req2 = JSON.stringify(rq1)
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
				url: urltest + 'noverify/staff/updateTelValidationCode',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						$("#new_haoma").show();
						$("#old_old_tel").hide();
						$(".next_old").hide();
						$(".new_tijiao").show();

					} else {
						alert(msg.resoponseDisp)
					}
				},
				error: function() {
					alert(msg.resoponseDisp)
				}

			});

		}

	})

	//发送验证码
	$("#butt_yanzhangma2").click(function sendMessage() {
		var use_em = $("#new_tel").val();
		if(use_em == "") {
			$("#old_tips1").html("电话号码不能为空")
		} else {
			var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
			isok = reg.test(use_em);
			if(!isok) {
				$("#old_tips1").html("手机格式不正确");
			} else {
				var reque = function() {
					return {
						moblieno: use_em,
					}
				}
				rq1 = reque();
				var req2 = JSON.stringify(rq1)
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
					url: urltest + 'noverify/staff/auditSendSms',
					data: req3,
					async: true,
					dataType: "json",
					success: function(msg) {
						console.log(msg);
						if(msg.responseCode == 200) {
							curCount2 = count2;　　 //设置button效果，开始计时
							$("#butt_yanzhangma2").attr("disabled", "true");
							$("#butt_yanzhangma2").html(curCount2 + "秒后重新获取");
							InterValObj2 = window.setInterval(SetRemainTime2, 1000); //启动计时器，1秒执行一次
						} else {
							alert(msg.resoponseDisp)
						}
					},
					error: function() {
						alert(msg.resoponseDisp)
					}

				});
			}

		}

	});

	//修改新的手机号码
	$('.new_tijiao').click(function() {
		$("#old_tips1").html("");
		var new_tel = $('#new_tel').val();
		var new_yanzhengma = $("#new_yanzhengma").val();
		if(new_yanzhengma == "") {
			$("#old_tips1").html("验证码不能为空");
		} else {
			var use_em = $("#new_tel").val();
			var code = $("#new_yanzhengma").val();
			var my_ID = $("#my_ID").html();

			var reque = function() {
				return {
					mobileno: use_em,
					code: code,
					id: my_ID
				}
			}
			rq1 = reque();
			var req2 = JSON.stringify(rq1)
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
				url: urltest + 'noverify/staff/updateNewTel',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						alert("修改手机成功");
						window.location.href = "My_message.html";
					} else {
						alert(msg.resoponseDisp)
					}
				},
				error: function() {
					alert(msg.resoponseDisp)
				}

			});

		}
	});
	$(".weiyanzheng_tel_new").click(function() {
		var use_em = $("#weixiu_new_tel").val();
		if(use_em == "") {
			$("#old_tips2").html("电话号码不能为空")
		} else {
			var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
			isok = reg.test(use_em);
			if(!isok) {
				$("#old_tips2").html("手机格式不正确");
			} else {
				//				var use_em = $("#new_tel").val();
				var code = 1234;
				var my_ID = $("#my_ID").html();

				var reque = function() {
					return {
						mobileno: use_em,
						code: code,
						id: my_ID
					}
				}
				rq1 = reque();
				var req2 = JSON.stringify(rq1)
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
					url: urltest + 'noverify/staff/updateNewTel',
					data: req3,
					async: true,
					dataType: "json",
					success: function(msg) {
						console.log(msg);
						if(msg.responseCode == 200) {
							alert("修改手机成功");
							window.location.href = "My_message.html";
						} else {
							alert(msg.resoponseDisp)
						}
					},
					error: function() {
						alert(msg.resoponseDisp)
					}

				});
			}

		}
	})

})

//timer处理函数
function SetRemainTime2() {
	if(curCount2 == 0) {
		window.clearInterval(InterValObj2); //停止计时器
		$("#butt_yanzhangma2").removeAttr("disabled"); //启用按钮
		$("#butt_yanzhangma2").html("重新发送验证码");
	} else {
		curCount2--;
		$("#butt_yanzhangma2").html(curCount2 + "秒后重新获取");
	}
};
//timer处理函数
function SetRemainTime1() {
	if(curCount1 == 0) {
		window.clearInterval(InterValObj1); //停止计时器
		$("#butt_yanzhangma1").removeAttr("disabled"); //启用按钮
		$("#butt_yanzhangma1").html("重新发送验证码");
	} else {
		curCount1--;
		$("#butt_yanzhangma1").html(curCount1 + "秒后重新获取");
	}
};