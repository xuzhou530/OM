<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
	<jsp:include page="../commons/head.jsp" />	
	<body class="no-skin">
		<div class="main-container" id="main-container">
			<div>
				<div class="breadcrumbs" id="breadcrumbs">
					<script type="text/javascript">
						try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
					</script>
					<ul class="breadcrumb">
						<li>
							<i class="ace-icon fa fa-home home-icon"></i>
							<a href="#">首页</a>
						</li>
						<li><a href="#">配送管理</a></li>
						<li><a href="#">配送计划管理</a></li>
						<li class="active">配送计划列表</li>
					</ul><!-- /.breadcrumb -->
					<div class="nav-search" id="nav-search">
						<tr>
							<td> 
								<a  class="tooltip-info" data-rel="tooltip" >
									<button class="btn btn-xs btn-success" onclick="add('')" >新增</button>
								</a>										
							</td>									
						</tr>
					</div><!-- /.nav-search -->
				</div>

				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->
							<div class="row">
								<div class="col-xs-12">
									<div>
										<table id="yyPlan_list" class="table table-striped table-bordered table-hover">
											<thead>
												<tr>
												<th class="center">配送车牌号</th>
												<th class="center">配送司机</th>
												<th class="center">配送线路</th>
												<th class="center">出库单编号</th>
												<th class="center">配送日期</th>
												<th class="center">配送开始时间</th>
												<th class="center">配送结束时间</th>														
												<th class="center">配送状态</th>												
												<th class="center">操作</th>
											</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div><!-- /.span -->
							</div><!-- /.row -->
						</div><!-- /.col -->
					</div><!-- /.row -->
				</div><!-- /.page-content -->
			</div><!-- /.main-content -->
		</div><!-- /.main-container -->

		<!-- basic scripts -->

		<!--[if !IE]> -->
		<script src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
		<!-- <![endif]-->
		<!--[if !IE]> -->
		<script type="text/javascript">
			window.jQuery || document.write("<script src='${pageContext.request.contextPath}/js/jquery.min.js'>"+"<"+"/script>");
		</script>
		<!-- page specific plugin scripts -->
		<script src="${pageContext.request.contextPath}/js/bootstrap.min.js" ></script>
		<script src="${pageContext.request.contextPath}/js/assets/jquery.dataTables.min.js"></script>
		<script src="${pageContext.request.contextPath}/js/assets/jquery.dataTables.bootstrap.js"></script>
		<script src="${pageContext.request.contextPath}/js/jquery.form.min.js"></script>
		<script src="${pageContext.request.contextPath}/js/jquery.uniform.js"></script>
		<script src="${pageContext.request.contextPath}/js/jquery-ui.custom.min.js"></script>
		<script src="${pageContext.request.contextPath}/plugins/ztree/js/jquery.ztree.core-3.5.min.js" ></script>
		
		<!-- ace scripts -->
		<script src="${pageContext.request.contextPath}/js/ace-extra.min.js"></script>
		<script src="${pageContext.request.contextPath}/js/ace-elements.min.js"></script>
		<script src="${pageContext.request.contextPath}/js/ace.min.js"></script>
		<script src="${pageContext.request.contextPath}/js/biz/region/dispatchPlanList.js"></script>
		
	</body>
</html>



