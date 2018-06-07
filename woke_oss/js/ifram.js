var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
//var userId = sessionStorage.getItem("userId");
var userName = sessionStorage.getItem("userName");
var userkind = sessionStorage.getItem("userkind");
$(".ifram_li").click(function() {
	var as = $(this).find("a");
	Hui_admin_tab(as);
	var fullname = $(this).find("a").text();
	fullname = $.trim(fullname); // abc
	sessionStorage.setItem("fullname", fullname);

});

function Hui_admin_tab(obj) {
	if($(obj).attr('_href')) {
		var _href = $(obj).attr('_href');
		$(".content").find("iframe").attr("src", _href);
		$("#ifram_mian").css("display", "block");
		$(".img").css("display", "none");
	}
};

var hei = $(window).height();
//
$("#ifram_mian").height(hei - 151);
$(".img").height(hei - 151);

$("#ifram_mian").css("width", "100%")
//$(".content").height(hei - 91);

$('.treeview-menu li').click(function() {
	$(this).attr("class", "active");
	$(this).siblings().attr("class", "");
})

$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {

		$("#index_huanying").html("欢迎您：" + userName + "，登录沃克智慧城市后台管理")
		$("#userZ_name").html(userName);
		$("#span_username").html(userName);
		if(userkind == "1") {
			$("#ri_p_user").html(userName + "——超管");
			$(".shenfen_img").attr("src", "img/timg.jpg");
			$('#ul_big li').show();
		} else {
			$("#ri_p_user").html(userName + "——员工");
			$(".shenfen_img").attr("src", "img/timg1.jpg");
			//判断权限

			var reque = function() {
				return {
					userId: userId,
				}
			}
			rq1 = reque();
			var req = function() {
				return {
					requestString: "",
					userId: userId,

				}
			}
			requestObj1 = req();
			requestObj1.requestString = JSON.stringify(rq1);
			var req3 = JSON.stringify(requestObj1);
			$.ajax({
				contentType: "application/json; charset=utf-8",
				type: "POST",
				url: urltest + 'noverify/staff/selectMenuList',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						var msgg = JSON.parse(msg.returnString);
						console.log(msgg);
						for(var i = 0; i < msgg.length; i++) {
							//服务商
							if(msgg[i].fullname == "服务商管理") {
								$("#fuwushang").show();
							}
							//服务商子菜单
							if(msgg[i].fullname == "服务商") {
								$("#fuwushang_1").show();
							}
							if(msgg[i].fullname == "资料审核") {
								$("#fuwushang_2").show();
							}
							if(msgg[i].fullname == "服务商小区列表") {
								$("#fuwushang_3").show();
							}
							if(msgg[i].fullname == "服务商小区申请权限") {
								$("#fuwushang_4").show();
							}
							if(msgg[i].fullname == "应用列表") {
								$("#fuwushang_5").show();
							}
							//平台功能
							if(msgg[i].fullname == "平台功能") {
								$("#PTGN").show();
							}
							//平台功能
							if(msgg[i].fullname == "平台功能列表") {
								$("#PTGN_1").show();
							}
							if(msgg[i].fullname == "数据权限信息列表") {
								$("#PTGN_2").show();
							}
							if(msgg[i].fullname == "优惠券") {
								$("#PTGN_3").show();
							}
							if(msgg[i].fullname == "平台日志") {
								$("#PTGN_4").show();
							}
							if(msgg[i].fullname == "平台公告") {
								$("#PTGN_7").show();
							}
							if(msgg[i].fullname == "消息推送") {
								$("#PTGN_5").show();
							}
							if(msgg[i].fullname == "版本控制") {
								$("#PTGN_6").show();
							}

							//app设置
							if(msgg[i].fullname == "app设置") {
								$("#APP").show();
							}
							//app设置 子菜单
							if(msgg[i].fullname == "展位设置") {
								$("#APP_1").show();
							}
							if(msgg[i].fullname == "展位审核列表") {
								$("#APP_2").show();
							}
							if(msgg[i].fullname == "app会员信息") {
								$("#APP_4").show();
							}
							if(msgg[i].fullname == "城市热点资讯") {
								$("#APP_5").show();
							}
							if(msgg[i].fullname == "意见反馈") {
								$("#APP_6").show();
							}

							//
							//功能设置
							if(msgg[i].fullname == "功能设置") {
								$("#GNSZ").show();
							}
							//功能设置子菜单
							if(msgg[i].fullname == "业务类型设置") {
								$("#GNSZ_1").show();
							}
							//
							//员工管理
							if(msgg[i].fullname == "员工管理") {
								$("#YGGL").show();
							}
							//员工管理子菜单
							if(msgg[i].fullname == "员工列表") {
								$("#YGGL_1").show();
							}
							//
							//物业管理
							if(msgg[i].fullname == "物业管理") {
								$("#WYGL").show();
							}
							//物业管理子菜单
							if(msgg[i].fullname == "物业档案") {
								$("#WYGL_1").show();
							}

							//
							//订单管理
							if(msgg[i].fullname == "订单管理") {
								$("#DDGL").show();
							}
							//物业管理子菜单
							if(msgg[i].fullname == "订单列表") {
								$("#DDGL_1").show();
							}
							if(msgg[i].fullname == "退款列表") {
								$("#DDGL_2").show();
							}
							if(msgg[i].fullname == "生成结算单") {
								$("#DDGL_4").show();
							}
							if(msgg[i].fullname == "结算列表") {
								$("#DDGL_3").show();
							}
							if(msgg[i].fullname == "资金流水列表") {
								$("#DDGL_5").show();
							}

						}

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
$('#tuichu').click(function() {
	window.location.href = "../login.html";
	sessionStorage.removeItem("userId");
})