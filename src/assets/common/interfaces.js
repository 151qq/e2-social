/**
 * Created by zhangbin on 2017/7/6.
 */
let wc = window.location;
//const platform =wc.protocol+'//'+wc.host+'/';
const platform = "/esocial/";
export default {
    interfaces: {
        "authentication": platform + "authentication.json",     //登录
        "uploadArticleAreaImage": platform + "siteEdit/uploadArticleAreaImage.json",   //图片上传接口
        "deleteDraftFile": platform + "html5SiteInfo/deleteDraftFile.json",                       //文章删除接口,参数 html5PageCode,id
        "mediaList": platform + "html5SiteInfo/mediaList.json",
        "getUserInfo": platform + "getUserInfo.json",
        "draftArticle": platform + "siteEdit/draftArticle.json",          //保存草草
        "publishArticle": platform + "siteEdit/publishArticle.json",       //发布
        "changePassword": platform + "changePassword.json",         //修改密码
        /**
        * 我的任务列表 get
        * pageSize 每页多少条
        * currentPage 当前页数
        */
        notice: '/static/api/common/notice.json',
        /**
        * 我的任务列表 get
        * tmpCode 模版号
        */
        getTemplate: '/static/api/common/getTemplate.json',
        /**
        * 任务详情 get
        * id 任务标识
        */
        noticeDetail: '/static/api/common/noticeDetail.json',
        /**
        * 获取二维码 get
        * path
        */
        getEwm: '/static/api/common/getEwm.json',
        /**
        * 发送邮件 post
        * email 邮件地址
        * id 报告序列标识
        */
        sendMail: '/static/api/report/sendMail.json',
        /**
        * 获取相关标题的楼盘或报告ID get
        * type 楼盘或报告标识
        * key 搜索关键字
        */
        getInfoId: '/static/api/report/getInfoId.json',
        /**
        * 楼盘列表 get
        */
        houseTree: '/static/api/property/houseTree.json',
        /**
        * 楼盘列表 get
        * id 楼盘序列标识
        */
        bigImgs: '/static/api/property/bigImgs.json',
        /**
        * 投资顾问 get
        * id 序列标识
        */
        getInvestors: '/static/api/common/getInvestors.json',
        /**
        * 物业基本信息 get
        * id 楼盘序列标识
        */
        base: '/static/api/property/base.json',
        /**
        * 物业交易历史 get
        * id 楼盘序列标识
        */
        changes: '/static/api/property/changes.json',
        /**
        * 物业租金历史 get
        * id 楼盘序列标识
        */
        rent: '/static/api/property/rent.json',
        /**
        * 物业评述 get
        * id 楼盘序列标识
        */
        articleHouse: '/static/api/property/article.json',
        /**
        * 物业公共区域图片 get
        * id 楼盘序列标识
        */
        public: '/static/api/property/public.json',
        /**
        * 物业外观图片 get
        * id 楼盘序列标识
        */
        appearance: '/static/api/property/appearance.json',
        /**
        * 物业周围环境图片 get
        * id 楼盘序列标识
        */
        surround: '/static/api/property/surround.json',
        /**
        * 我的报告列表 get
        * key 搜索时使用，返回搜索相关数据
        */
        reportList: '/static/api/report/reportList.json',
        /**
        * 我的报告列表 get
        */
        reportTree: '/static/api/report/reportTree.json',
        /**
        * 我的选中报告列表 get
        * ids 文章报告id eg: 1,2,3
        */
        reportSelectList: '/static/api/report/reportSelectList.json',
        /**
        * 删除文章或报告 post
        * id
        */
        deletehouse: '/static/api/property/deletehouse.json',
        /**
        * 保存楼盘 post
        * id
        * formdata
        */
        savehouse: '/static/api/property/savehouse.json',
        /**
        * 删除文章或报告 post
        * id
        */
        deletereport: '/static/api/report/deletereport.json',
        /**
        * 保存报告 post
        * id
        * formdata
        */
        savereport: '/static/api/report/savereport.json',
        /**
        * 报告详情 get
        * type 列表类型
        * id 序列标识
        */
        reportDetail: '/static/api/report/reportDetail.json',
        /**
        * 关联报告 get
        * id 楼盘序列标识
        */
        articles: '/static/api/report/articles.json',
        /**
        * 过滤地图数据 get
        * vr 要过滤的数据
        */
        searchMap: '/static/api/report/searchMap.json',
        /**
        * 获取商圈list get
        * city 要过滤的数据
        */
        malls: '/static/api/property/malls.json',
        /**
        * 地图过滤条件 get
        */
        typeMap: '/static/api/property/typeMap.json',
        /**
        * 楼盘对标列表 get
        * type 列表类型
        * id 楼盘序列标识
        */
        benchList: '/static/api/property/benchList.json'
    }
}
