const electron = require('electron')
const {
    webContents
} = require('electron')
const {
    session
} = require('electron')
const {
    dialog
} = require('electron')
const {
    autoUpdater
} = require('electron-updater')

const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app
const path = require('path')
const ipc = require('electron').ipcMain
let projectName = "太浦河经济开发区"
let projectIco = "ico_tph.ico"
let projectUrl = "https://zwdtuser.sh.gov.cn/uc/login/login.jsp"
let upLoadUrl = "http://116.228.76.169/electrontph/"

let template3 = [{
    id:1,
            label: '返回',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    focusedWindow.webContents.goBack()
                }
            }
        }, {id:2,
            label: '前进',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    focusedWindow.webContents.goForward()
                }
            }
        }, {id:3,
            label: '刷新',
            accelerator: 'F5',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    // 重载之后, 刷新并关闭所有的次要窗体
                    if (focusedWindow.id === 1) {
                        BrowserWindow.getAllWindows().forEach(function (win) {
                            if (win.id > 1) {
                                win.close()
                            }
                        })
                    }
                    focusedWindow.reload()
                }
            }
        },{id:4,label:'记录',accelerator:'F7',click:function (item,focusedWindow){
         if (focusedWindow){
             win3 = {
            width: 700,
            height:500,

                 x:102,
                 y:193,
            title: '记录界面',movable:false,resizable:false,minimizable:false,closable:true,
                 alwaysOnTop:true,
            icon: projectIco,
            webPreferences: {
            webSecurity: false
        }}
        gzWindow = new BrowserWindow(win3)
        gzWindow.loadURL('http://127.0.0.1:5030/getjg')
             gzWindow.webContents.on('did-finish-load', (event, url) => {
                 gzWindow.webContents.executeJavaScript(`if (document.location.href.search('x=14')!=-1){
                 result=99;
                 }`,true).then((result) => {if (result==99){
                      const menu = Menu.buildFromTemplate(template2)
                      Menu.setApplicationMenu(menu)
                 gzWindow.webContents.executeJavaScript(`
                 alert('信息提交成功,点击退出,重新跟踪');
                 localStorage.setItem('page', 0);
                localStorage.setItem('sess', 0);window.close()`,true).then((result)=>{})
             }})
             })
       }
         }
}]
 let template2 = [{
    id:1,
            label: '返回',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    focusedWindow.webContents.goBack()
                }
            }
        }, {id:2,
            label: '前进',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    focusedWindow.webContents.goForward()
                }
            }
        }, {id:3,
            label: '刷新',
            accelerator: 'F5',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    // 重载之后, 刷新并关闭所有的次要窗体
                    if (focusedWindow.id === 1) {
                        BrowserWindow.getAllWindows().forEach(function (win) {
                            if (win.id > 1) {
                                win.close()
                            }
                        })
                    }
                    focusedWindow.reload()
                }
            }
        },{
    id:4,
            label: '控制台',
            accelerator: 'F6',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    win2.webContents.openDevTools()
                }
            }
        }]
let template = [{
    id:1,
            label: '返回',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    focusedWindow.webContents.goBack()
                }
            }
        }, {id:2,
            label: '前进',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    focusedWindow.webContents.goForward()
                }
            }
        }, {id:3,
            label: '刷新',
            accelerator: 'F5',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    // 重载之后, 刷新并关闭所有的次要窗体
                    if (focusedWindow.id === 1) {
                        BrowserWindow.getAllWindows().forEach(function (win) {
                            if (win.id > 1) {
                                win.close()
                            }
                        })
                    }
                    focusedWindow.reload()
                }
            }
        },{id:4,label:'跟踪',accelerator:'F4',click:function (item,focusedWindow){
         if (focusedWindow){
             win3 = {
            width: 700,
            height:500,
            autoHideMenuBar: true,
                 x:102,
                 y:193,
            title: '跟踪页面',movable:false,resizable:false,minimizable:false,closable:true,
                 alwaysOnTop:true,skipTaskbar:true,
            icon: projectIco,
            webPreferences: {
            webSecurity: false
        }}
        gzWindow = new BrowserWindow(win3)
        gzWindow.loadURL('http://127.0.0.1:5030/getgz')
       }
         }
}]

function findReopenMenuItem() {
    const menu = Menu.getApplicationMenu()
    if (!menu) return
    let reopenMenuItem
    menu.items.forEach(function (item) {
        if (item.submenu) {
            item.submenu.items.forEach(function (item) {
                if (item.key === 'reopenMenuItem') {
                    reopenMenuItem = item
                }
            })
        }
    })
    return reopenMenuItem
}

if (process.platform === 'win32') {
    const helpMenu = template[template.length - 1].submenu
}


function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({
        width: 1300,
        height: 766,
        autoHideMenuBar: false,
        title: projectName,
        icon: projectIco,
        webPreferences: {
            webSecurity: false
        }
    })
   win.webContents.on('did-finish-load', (event, url) => {
        // getCookies();
          win.webContents.executeJavaScript(`
          pagecode=document.body.innerText;
          if (pagecode.search('个人用户登录')!=-1){
             window.state=-1
          }
          else{
          window.state=1
          }
          `, true).then((result) => {
              if (result <0){
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
   }
          else{
                  const menu = Menu.buildFromTemplate(template2)
    Menu.setApplicationMenu(menu)
    }})


    })
    win.webContents.on('new-window', (event, url) => {
        event.preventDefault(); //阻止窗口关闭
        const win2 = new BrowserWindow({
        width: 1360,
        height: 766,
        autoHideMenuBar: false,
        title: projectName,
        icon: projectIco,
        webPreferences: {
            webSecurity: false
        }})
        win2.loadURL("http://yct.sh.gov.cn/portal_yct/")
        win2.webContents.executeJavaScript(`document.cookie='JSESSIONID=';document.cookie='sessionUuid=';document.cookie='userId='`, true).then((result) => {//console.log('clear cookies')})
        //win2.webContents.openDevTools()
        //如果内容窗口崩溃时触发
        win2.webContents.on('crashed', function () {
        //console.log('crashed')
    })
    //网页变得未响应时触发
        win2.webContents.on('unresponsive', function () {
    })

        win2.webContents.on('close', function () {
                              win2.webContents.executeJavaScript(`
            localStorage.setItem('page', 0);
            localStorage.setItem('sess', 0);
            `,true).then((result)=>{})

        //console.log('alert win2 is close')
    })

        win2.webContents.on('destroyed',function () {

        })



        win2.webContents.on('did-finish-load', function () {
        win2.webContents.executeJavaScript(`
        
        
           function Ajax(arg){
                      $.ajax({
                         async: false,
                         type: "post",
                         url: "http://127.0.0.1:5030/geturls",
                         fail:function(data){
                         alert('后台报错,请稍后在使用');
                         window.i=10000;
                         },
                         success: function(data) {
                            if (data != "") {
                               data=JSON.parse(data);
                               urls=data.urls;
                               task=data.task;
                               if (urls==""){
                               window.i=10001;
                               document.location.href='http://yct.sh.gov.cn/portal_yct/webportal/handle_progress.do?x=14';
                               }
                               else if (task=='tbcg'){
                               window.i=10000;
                               document.location.href=urls;
                               }
                               else{
                               $.ajax({
                                  async:false,
                                  type:"get",
                                  url:urls,
                                  success:function(res_pagecode){
                                  if (res_pagecode.search('500服务器内部错误')!=-1 || res_pagecode.search('申请信息填写人需进行实名认证')!=-1){
                                     localStorage.setItem('sess',0);
                                     alert('身份失效,请退出重新登陆');
                                     window.i=10000;
                                     window.close();
                                     }
                                  else{
                                  console.log('跟踪中')
                                  }
                                  }})
                               }
                            }
                         }})
                       }
           current_url=document.location.href;
           
           pagecode=document.body.innerText;
           if (pagecode.search('500服务器内部错误')!=-1 || pagecode.search('申请信息填写人需进行实名认证')!=-1){
              if (current_url.search('portal_yct/webportal/tips.do')!=-1 && pagecode.search('申请信息填写人需进行实名认证')!=-1){
              
              sub();
              throw '1';
              }
              else{
              alert('localStorage:',localStorage);
              location.reload();
              }
           }
           storage=localStorage;
           if (storage.page!=1){
           $.ajax({
            type: "post",
            url: "http://127.0.0.1:5030/getpage",
            success: function(data) {
                if (data != "") {
                   data=JSON.parse(data);
                   pages=data.page;
                   if (pages==1){
                   localStorage.setItem('page',1);
                   }
                }
           }})
           }
           if (current_url.search('portal_yct/webportal/handle_progress.do')!=-1){
                if (current_url.search('x=14')!=-1){
                      res=99999;
                }
              else if (storage.sess!=1){
                  if (pagecode.search('退回修改')!=-1){
                     section=document.getElementsByClassName('first_c');
                     for(var i = 0; i < section.length; i++){
                        dom=section[i].outerHTML;
                        if (dom.search('退回修改')!=-1){
                           java_res=dom.split(':')[1].split('"')[0];
                           eval(java_res);
                           }
                        }
                     }
                  else if (pagecode.search('填报成功（查看详情）')!=-1){
                     section=document.getElementsByClassName('first_c');
                     for (var i =0;i<section.length;i++){
                        dom=section[i].outerHTML;
                        if (dom.search('填报成功（查看详情）')!=-1){
                           java_res=dom.split(':')[2].split('"')[0];
                           eval(java_res);
                           }
                        }
                     }
                  else{
                  btn_down();
                  }  
                  }
              else if (storage.page!=1){
                 btn_down();
                 }
              else if (storage.sess==1 && storage.page==1){
              window.i=0;
                   for (i = 0; i < 100;i++) { 
                              if (window.i==10000){
                       break
                   }
                      (function(arg){
                         Ajax(arg);
                         } 
                      )(i);
                   }
              }
           }
           else if (current_url.search('bizhallnz_yctnew')!=-1){
               if (storage.sess!=1){
                   pagecode=document.body.innerText;
                   if (pagecode.search('退回意见')!=-1 || pagecode.search('填报成功')!=-1){
                       storage.setItem('sess',1);
                       document.location.href='http://yct.sh.gov.cn/portal_yct/webportal/handle_progress.do?x=11';
                   }
                   else if (res_pagecode.search('500服务器内部错误')!=-1 || res_pagecode.search('申请信息填写人需进行实名认证')!=-1){
                   localStorage.setItem('sess',0);
                   alert('身份失效;请退出重新登陆');
                   window.close()
                   }
               }
               else if (storage.sess==1 && storage.page==1){
               window.i=0
               for (i = 0; i < 1000;i++) { 
                   if (window.i>=10000){
                   
                       break
                   }
                   (function (arg){
                   
                       a=Ajax(arg);
                       
                       return a;
                       }
                   )(i);
                   }
               }
           }`, true).then((result) => {if (result>99998){

               const menu = Menu.buildFromTemplate(template3)
    Menu.setApplicationMenu(menu)
                win2.webContents.executeJavaScript(`
                alert('跟踪账号成功,点击记录,提交信息')
                window.close();
                `,true).then((result)=>{})
            }})})})
    //最大化窗口
    //win.maximize()
    // 然后加载应用的 index.html。
    //win.loadFile('index.html')
    win.loadURL(projectUrl)
    // 打开开发者工具
    // win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    }
)}


app.commandLine.appendSwitch("--disable-http-cache") //禁用缓存
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('proxy-server', '127.0.0.1:8080');
app.commandLine.appendSwitch('--disable-web-security')
// app.commandLine.appendSwitch('proxy-server', '116.228.76.168:8888');
// app.commandLine.appendSwitch('proxy-bypass-list', '116.228.76.169;zwdtuser.sh.gov.cn;zwdt.sh.gov.cn;api.eshimin.com;login.gjzwfw.gov.cn;183.194.240.94');
// app.commandLine.appendSwitch('host-rules', 'MAP yct.sh.gov.cn proxy');







app.on('ready', function () {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
     // big()
    createWindow()
})

app.on('browser-window-created', function () {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem) reopenMenuItem.enabled = true
})

app.on('window-all-closed', () => {
    //console.log('app close')
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    //console.log('b')
    if (win === null) {
        createWindow()
    }
})