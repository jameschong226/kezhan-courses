/* 课栈课程资料 —— 首页和课程目录共用这一份。
   新增课程：照格式加一行。
   [编号, 课程名, 讲师, 分类, 形式, 学什么, 课程页面, 封面, 备用封面, 平台]
   - 大人学的课：课程页面填数字 id，封面填档名，平台可以不填。
   - 其他平台的课：课程页面和封面填完整网址，最后一栏写平台名称。 */
window.KZ_CATS=["人生策略","沟通表达","职场能力","商业销售","内容创作","两性关系"];
(()=>{
const DAREN_IMG="https://shop.darencademy.com/images/backend/products/";
const DAREN_PAGE="https://shop.darencademy.com/product/view/id/";
const rows=[
 ["V040","少年大人學：用遊戲思維建構人生策略","張國洋","人生策略","线上语音","用玩游戏的眼光看人生，学会给自己定策略",154,"729d597b4f48b37418a7337faec711f0.jpg","4e5863c314d56179775da86dfb63138f.jpg"],
 ["V036","LinkedIn經營全攻略：建立個人品牌，拓展國際人脈，讓外商工作找到你","陳湘陽 Sonny","职场能力","线上语音","经营 LinkedIn 个人品牌，让外商机会找上门",135,"208bdd4ec3972869aceff70f08de2c5f.jpg","dc1dfe80b055b2b68fc84d0fb926e630.jpg"],
 ["V035","邏輯思考情商課","姚詩豪","沟通表达","线上语音","用理性对话处理负面情绪，提升情商",133,"64811bf156760cfbf3907d10bacdb922.jpg","9884603e90fcad102072bfb3d7b4f6f2.jpg"],
 ["V034","年輕上班族必備的問題分析與解決課","彭建文","职场能力","线上语音","拆解陌生问题、找到根源、推出对策",132,"80059e26920459de3440adaf78a307d7.jpg","e7ad4c00a264f05230ec96af4f46907d.jpg"],
 ["V031","大人的說話課：條理清晰地說出觀點、發揮影響力","姚詩豪","沟通表达","线上语音","用结构和叙事，把观点说清楚、说服人",127,"e84dc044461b0a108326dc8fa1d76d39.jpg","276ebead2c3a29cc9180fd7b95dc5620.jpg"],
 ["V026","從商業設計故事學「突破框架思考力」","姚詩傑","商业销售","线上语音","从商业设计案例学跳出框架的思考",121,"89b8118af36d4dd1ec7d2577bf0d2b0d.jpg","08c902e09155f0de028c0ed9b02e1f1c.jpg"],
 ["V018","用經營公司的思維經營你的人生","張國洋","人生策略","线上语音","用经营公司的思维规划自己的人生",116,"a15668c8a49aba772132ac0d53a50841.jpg","46b40814dccec99aa74568a8fe056faa.jpg"],
 ["V015","知識型商品的文案寫作課","姚詩豪","商业销售","线上语音","为知识型商品写出能吸引对的客户的文案",98,"d841bf0410970b57406c79a361e97306.jpg","505e62b76014b2b90c2e8566820487cc.jpg"],
 ["V014","銷售專業服務的系統化做法","張國洋","商业销售","线上语音","靠个人品牌和内容营销卖专业服务，不靠杀价",97,"fc9832510c5c52d7b449bce58207826d.jpg","ce5cbbbe3da2cc4c98bb994e07fa0690.jpg"],
 ["V012","強效學習與征服考試的系統化做法 線上自學版","姚詩豪","职场能力","线上影音","看懂考试规则，用系统方法高效学习",90,"e7e181929813891b21ed3f4c20f6e095.jpg","7496bc4c974cd851d4029b15a9391ce2.jpg"],
 ["S012","人生難題的系統思考法：學會策略思考、讓你更有能力面對人生挑戰","張國洋","人生策略","演讲","遇到人生难题时，用策略绕路，不硬碰硬",66,"5ac0aa4f733c1d6e8e33fa051a0edf7a.png","6481a5979b617bd204a1329026dbf5ee.png"],
 ["V005","尋找天賦與熱情：職涯規劃線上工作坊","姚詩豪、洪澤洋","人生策略","线上影音","透过关卡练习，探索天赋、热情与职涯方向",72,"355e8f31bee6e935d19f607d2a7ce8c9.jpg","69302340fe68019a483c7dab32c74ef3.jpg"],

 // PressPlay Academy
 ["PP01","卡片盒筆記實戰課｜靈感捕捉到高效產出的知識管理系統","瓦基","职场能力","线上影音","用卡片盒笔记，把读到的东西变成自己的产出",
  "https://www.pressplay.cc/project/148B74E70523C7A7E260484F9B6825CB/about","https://static.pressplay.cc/static/uploads/enh_kv/res/148B74E70523C7A7E260484F9B6825CB_resized.jpg","","PressPlay"],
 ["PP02","贏得喜愛的故事溝通力","火星爺爺","沟通表达","线上影音","用故事塑造个人品牌，写出让人买单的文案",
  "https://www.pressplay.cc/project/C7B544553C2F16B1EC281C895A13BE3D/about","https://static.pressplay.cc/static/uploads/enh_kv/res/C7B544553C2F16B1EC281C895A13BE3D_resized.jpg","","PressPlay"],
 ["PP03","人人受用的數據思維｜商業分析師的養成之路","Lillian","职场能力","线上影音","建立数据思维，看懂商业分析师怎么帮公司做决策",
  "https://www.pressplay.cc/project/C64E4E015E2897A42FAF870BA51D4317/about","https://static.pressplay.cc/static/uploads/enh_kv/res/C64E4E015E2897A42FAF870BA51D4317_resized.jpg","","PressPlay"],
 ["PP04","《歡迎光臨撩慾系》手槍女王 袁非的情慾撩撥術","袁非","两性关系","线上影音","在亲密关系里更自在地表达，经营彼此的情趣",
  "https://www.pressplay.cc/project/CA3B7E60E508E4D2EFD9718F7870CE34/about","https://static.pressplay.cc/static/uploads/enh_kv/res/CA3B7E60E508E4D2EFD9718F7870CE34_resized.jpg","","PressPlay"],

 // HiSKIO
 ["HK01","外商一擊必中的新品熱銷策略｜提前預知市場反應，成功打造賺錢新品","Vicky Tsai","商业销售","线上影音","上市前先预测市场反应，打造真的卖得动的新品",
  "https://hiskio.com/courses/2290","https://thumbnails.f5ezcode.in/eyJidWNrZXQiOiJjZG4uaGlza2lvLmNvbSIsImtleSI6ImNvdXJzZXNcL3RqYmJvcmZnOGFvandmMCIsImVkaXRzIjp7InBuZyI6eyJxdWFsaXR5Ijo4MH0sInJlc2l6ZSI6eyJmaXQiOiJjb250YWluIiwid2lkdGgiOjgwMH19fQ==","","HiSKIO"],

 // Hahow 好學校
 ["HH01","AI 時代思考指南｜全球頂尖大學的思考習慣訓練課","李佳達","人生策略","线上影音","学顶尖大学的思考习惯，在 AI 时代保有自己的判断力",
  "https://hahow.in/courses/66d5ef0800abb5920b686d7e","https://images.hahow.in/images/6717233fcad0cf82b85d3680","","Hahow"],
 ["HH02","聲入人心-周震宇的人聲必修課","周震宇","沟通表达","线上影音","练好发声和声音表情，让说话更有感染力",
  "https://hahow.in/courses/5bfd47782d018e0020e4b0e4","https://images.hahow.in/images/67172259879d24413b0017b3","","Hahow"],
 ["HH03","讀懂關係的底層邏輯-周震宇的人際溝通課","周震宇、馬可欣","沟通表达","线上影音","看懂人际关系背后的逻辑，相处和沟通更顺",
  "https://hahow.in/courses/670944d5db8a3e3ad59f37ad","https://images.hahow.in/images/670cfcdc25c954a9afb483b6","","Hahow"],
 ["HH04","邏輯表達力-周震宇的口語邏輯優化課","周震宇","沟通表达","线上影音","让口语表达有条理、有重点，一开口就讲清楚",
  "https://hahow.in/courses/5fc4a352d375951a03cc0d45","https://images.hahow.in/images/6717229190b66d27afb66065","","Hahow"],

 // BetweenGos 職涯優勢發展學院
 ["BG01","跨領域求職實戰｜目標收斂 × 能力盤點 × 亮點呈現，系統化加速轉職","Grace","职场能力","线上影音","盘点能力、收敛目标，系统化完成跨领域转职",
  "https://course.betweengos.com/courses/job-hunting-success","https://s.teachifycdn.com/image/width=1200,quality=80/course/cover_photo/eb27949c-2099-43ca-8bc6-2f4dfb5ca075/60f3611e-ad84-4f42-a6b8-90e530842726.png","","BetweenGos"],
 ["BG02","優勢思維 2.0｜潛能分析 × 職場定位 × 優勢應用，看見清晰的職涯下一步","Grace","人生策略","线上影音","分析自己的潜能与优势，看清职涯的下一步",
  "https://course.betweengos.com/courses/strength-based-mindset","https://s.teachifycdn.com/image/width=1200,quality=80/course/cover_photo/e079ccb5-30bd-4228-8664-14e18439d338/b0f49d31-0819-47d8-a3d0-1e174040a7c3.png","","BetweenGos"],

 // ShiFu 師父
 ["SF01","短影音變現課 – 實戰陪跑課","陳修平","内容创作","实战陪跑","从拍短影音到建立能变现的商业模式",
  "https://shifu.tw/Course/Details/75bd34fb-df8f-4eb1-ba6a-0a9cb69942ca","https://img.shifu.tw/uploads/images/course_ab5bc6c1-c820-47fb-a037-ff1f8e2292d5.jpg?v=1","","ShiFu"]
];
const full=(v,base)=>!v?"":String(v).startsWith("http")?v:base+v;
window.KZ_COURSES=rows.map((c,i)=>{
  const platform=c[9]||"大人学",daren=platform==="大人学";
  return {order:i,code:c[0],title:c[1],teacher:c[2],cat:c[3],format:c[4],learn:c[5],platform,
    url:daren?full(c[6],DAREN_PAGE):c[6],cover:daren?full(c[7],DAREN_IMG):c[7],cover2:daren?full(c[8],DAREN_IMG):c[8]};
});
})();
