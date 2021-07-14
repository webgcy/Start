问题一：  
因为国内网络问题，在git push 的时候有时终端会卡老半天，ctrl+c退出重新push也无解。  
办法：  
添加sendpack.sideband属性并设置false。
```
git config --global sendpack.sideband false                  //全局的
git config --local sendpack.sideband false                     //仓库的
```
通过git config --local -l 查看仓库级配置，可以看到sendpack.sideband属性且置为false。  
再次git push。完工  


问题二：
今天修改了一些代码，包括main.js，git add . 的时候，跳出错误 warning: LF will be replaced by CRLF in src/main.js   
原因：LF是linux和Unix系统的换行符，CRLF是window 系统的换行符。git为了解决跨平台协作的项目系统标准不同的问题，提供”换行符自动转换“的功能，这个功能默认开启。
办法：  
关闭它（当前局部）
```
git config core.autocrlf false               //对当前仓库
git config --global core.autocrlf false               //全局
```
重新push代码。完工
