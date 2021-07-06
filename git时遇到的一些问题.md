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