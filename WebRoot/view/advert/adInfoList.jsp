<%@ page language="java" pageEncoding="utf-8"%>
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
						<li><a href="#">广告管理</a></li>
						<li class="active">广告内容管理</li>
					</ul><!-- /.breadcrumb -->

					<%--<div class="nav-search" id="nav-search">--%>
						<%--<form class="form-search">--%>
							<%--<!-- <span class="input-icon">--%>
								<%--<input type="text" placeholder="Search ..." class="nav-search-input" id="advertInfoDt" autocomplete="off" />--%>
								<%--<i class="ace-icon fa fa-search nav-search-icon" onclick="searchAdvertInfo()"></i>--%>
							<%--</span> -->--%>
							<%--<span class="input-icon">--%>
								<%--<a href="${pageContext.request.contextPath}/view/advert/advertInfo/saveAdvertInfoAdd.action" class="tooltip-info" data-rel="tooltip" title="新增">--%>
											<%--<span class="btn btn-xs btn-success">新增</span>--%>
								<%--</a>--%>
							<%--</span>--%>
						<%--</form>--%>
					<%--</div><!-- /.nav-search -->--%>
				</div>
					<input type="hidden" id="orgId" value="${account.orgId }" />
					<input type="hidden" id="proviceId" value="${account.dictProviceId }" />
					<input type="hidden" id="regionId" value="${account.dictRegionId }" />
				<div class="page-content">
					<div class="row">
						<!-- <div class="searchbar">
							<ul class="list-inline">
								<li>
									&nbsp;&nbsp;<span class="input-icon">
								        <input type="text" placeholder="Search ..." class="nav-search-input"
											   id="type_keyword" autocomplete="off" style="height: 30px"/>
								     <i class="ace-icon fa fa-search nav-search-icon"></i>
							  </span>
								</li>
								<a style="float: right" class="tooltip-info" data-rel="tooltip" title="新增">
									<button onclick="addOrModifyAdvertInfo('')" class="btn btn-xs btn-success">新增
									</button>
								</a>
							</ul>
						</div> -->
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->
							<div class="row">
							<div class="searchbar">
							<ul class="list-inline">
								<li>
									&nbsp;&nbsp;<span class="input-icon">
								        <input type="text" placeholder="Search ..." class="nav-search-input"
											   id="type_keyword" autocomplete="off" style="height: 30px"/>
								     <i class="ace-icon fa fa-search nav-search-icon"></i>
							  </span>
								</li>
								<span  style="float:right;" class="tooltip-info" data-rel="tooltip" title="新增">
									<button onclick="addOrModifyAdvertInfo('')" class="btn btn-xs btn-success">新增
									</button>&nbsp;&nbsp;&nbsp;&nbsp;
								</span>
							</ul>
							
						</div>
								<div class="col-xs-12">
									<table id="advertInfo_list" class="table table-striped table-bordered table-hover" style="text-align: center">
										<%--<div class="nav-search" id="nav-search_seller">--%>
									         <%--<span class="input-icon">--%>
										        <%--<input type="text" placeholder="Search ..." class="nav-search-input"--%>
		                                               <%--id="type_keyword" autocomplete="off"/>--%>
										     <%--<i class="ace-icon fa fa-search nav-search-icon"></i>--%>
									        <%--</span>--%>
                               			 <%--</div>--%>
										<thead>
											<tr>
												<th class="center">广告内容标题</th>
												<th class="center">广告主名称</th>
												<th class="center">广告主电话</th>
												<th class="center">广告开始日期</th>
												<th class="center">广告结束日期</th>
												<th class="center">
													<select onchange="searchAdvertStatus()" id="advertFeeStatus" style="border: none;">
															<option value=" ">支付状态</option>
															<option value="0">已结清</option>
															<option value="1">未结清</option>
														</select>
												</th>												
												<th class="center">
													<select onchange="searchAdvertStatus()" id="advertInfoStatus" style="border: none;">
															<option value=" ">广告状态</option>
															<option value="0">正常状态</option>
															<option value="1">禁用状态</option>
														</select>
												</th>
												<th class="center">管理</th>
												<th class="center">操作</th>
											</tr>
										</thead>

										<tbody>
										</tbody>
									</table>
								</div><!-- /.span -->
							</div><!-- /.row -->
							<div><br></div>
							<%-- <div class="col-xs-6">
								<tr>
									<td> 
										<a href="${pageContext.request.contextPath}/view/advert/advertInfo/saveAdvertInfoAdd.action" class="tooltip-info" data-rel="tooltip" title="维修">
											<button class="btn btn-xs btn-success">新增</button>
										</a>										
										<!-- <button class="btn btn-xs btn-danger">批量删除</button> -->
									</td>
									<td style="vertical-align:top;"> 
										
									</td>
								</tr>
							</div>	 --%>
							
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
		<script src="${pageContext.request.contextPath}/js/biz/advert/advertInfoList.js"></script>
		<script type="text/javascript">
			$("#submenu-menu-advert-info").addClass("active");
			$("#menu-advert").addClass("active");
			$("#menu-advert").addClass("open");
		</script>
	</body>
</html>



