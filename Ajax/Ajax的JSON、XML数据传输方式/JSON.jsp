<jsp:directive contentType="application/javascript">
<%
String username = request.getParameter("name");
String password = request.getParameter("password");
%>
{
name:"<%=username%>",
password:"<%=password%>",
book:
{
title:"Think in java",
price:100,
author:"lxt008"
}
}
</jsp>