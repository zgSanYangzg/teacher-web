<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!-- 设置请求上下文根目录  -->
<c:set scope="application" var="ctxPath" value="${pageContext.request.contextPath}"/>
<c:set scope="application" var="basePath" value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${ctxPath}/"/>
<c:set scope="application" var="apiPath" value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${ctxPath}/proxy/freeapis/"/>
<c:set scope="application" var="websocketServerUrl" value="ws://${pageContext.request.serverName}:${pageContext.request.serverPort}/"/>
