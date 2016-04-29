var allData;
$(function() {
	$("#message-li").addClass("active");
	$.ajax({
		"type" : "get",
		"dataType" : "json",
		"url" : "/message/come/all",
		"success" : function(rep) {
		    allData = rep.data;
            $("#totalRecords").html(allData.length);
            getPage(1,5);
		}
	});
	$("#pageSize3").click(function(){
		getPage(1,3);
	});
	$("#pageSize5").click(function(){
		getPage(1,5);
	});
	$("#pageSize10").click(function(){
		getPage(1,10);
	});
	$("#toRight").click(function(){
		var toPage=parseInt($("#currPage").html())+1;
		var pageSize=parseInt($(".li-on:first").html());
		getPage(toPage,pageSize);
	});
	$("#toLeft").click(function(){
		var toPage=parseInt($("#currPage").html())-1;
		var pageSize=parseInt($(".li-on:first").html());
		getPage(toPage,pageSize);
	});
	$("#jumpPage").click(function(){
		var toPage=$("#toPage-input").val();
		var pageSize=parseInt($(".li-on:first").html());
		var allPage=parseInt((allData.length-1)/pageSize)+1;
		if(toPage>allPage){
			toPage=allPage;
			$("#toPage-input").val(allPage);
			
		}
		var pageSize = parseInt($(".li-on:first").html());
		getPage(toPage,pageSize);
	});
	$("#add-message").click(function(){
		var message = {
				"username":$("#modal-username").val(),
				"password":$("#modal-password").val(),
				"email":$("#modal-email").val(),
				"grade":$("#modal-grade").val(),
		};
		$.ajax({
			"type" : "post",
			"dataType" : "json",
			"url" : "/message/come/add",
			"data" : message,
			"success" : function(rep) {
				window.location.reload();
			}
		});
	});
	$("#update-message").click(function(){
		var message = {
				"id":$("#update-id").html(),
				"username":$("#update-username").val(),
				"password":$("#update-password").val(),
				"email":$("#update-email").val(),
				"grade":$("#update-grade").val(),
		};
		$.ajax({
			"type" : "post",
			"dataType" : "json",
			"url" : "/message/come/update",
			"data" : message,
			"success" : function(rep) {
				window.location.reload();
			}
		});
	});
});
function generateTr(message) {
	var result = "<tr>";
	result += "<td>" + message.username + "</td>";
	result += "<td>" + message.password + "</td>";
	result += "<td>" + message.email + "</td>";
	result += "<td>" + message.grade + "</td>";
	result += "<td><button type=\"button\" class=\"btn btn-primary\" onclick=showModal("+message.id+")>修改</button>" +
			"<button type=\"button\" class=\"btn btn-danger\" onclick=deleteByid("+message.id+")>删除</button></td>";
	return result;
}
function showModal(id){
	$.ajax({
		"type" : "post",
		"dataType" : "json",
		"url" : "/message/find/"+id,
		"success" : function(rep) {
			if(rep.code == 1){
				$("#update-id").html(rep.data.id);
				$("#update-username").val(rep.data.username);
				$("#update-password").val(rep.data.password);
				$("#update-email").val(rep.data.email);
				$("#update-grade").val(rep.data.grade);
				$("#updateModal").modal("show");
			}
		}
	});
}
function deleteByid(id){
	$.ajax({
		"type" : "post",
		"dataType" : "json",
		"url" : "/message/come/delete/"+id,
		"success" : function(rep) {
			if(rep.code == 2){
				$("#warning").show();
				$("#warning-lable").html(rep.data);
			}
			window.location.reload();
		}
	});
}
function getPage(toPage,pageSize){
	
	$("#message-table tbody").html("");
	$(".li-on:first").removeClass("li-on");
	var allPage=parseInt((allData.length-1)/pageSize)+1;
	if(toPage>=allPage){
		$("#toRight").attr("disabled", true);
	}else{
		$("#toRight").removeAttr("disabled");	
	}
	if(toPage==1){
		$("#toLeft").attr("disabled", true);
	}else{
		$("#toLeft").removeAttr("disabled");	
	}
	var maxlength = toPage*pageSize < allData.length ? toPage*pageSize : allData.length;
	for (var i=(toPage-1)*pageSize; i < maxlength; i++) {
		$("#message-table").append(generateTr(allData[i]));
	}
	$("#currPage").html(toPage);
	$("#pageSize"+pageSize).addClass("li-on");
}