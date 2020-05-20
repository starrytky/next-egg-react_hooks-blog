let ipUrl = 'http://127.0.0.1:7001/default/'

let servicePath = {
    getArticleList:ipUrl + 'getArticleList',  //获取所有文章列表接口
    getArticleById:ipUrl + 'getArticleById/', //根据文章id获取详细接口
    getTypeInfo:ipUrl + 'getTypeInfo', //获取文章类别接口
    getListById:ipUrl + 'getListById/', //根据id获取文章列表文章类别接口
}

export default servicePath