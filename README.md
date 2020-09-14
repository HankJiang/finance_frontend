常见问题
-

 #### 项目初始化
 - 项目使用`create-react-app`初始化，参考：https://github.com/facebook/create-react-app
 - 使用`npm run eject` 暴露`create-react-app`的配置文件（不可逆）
 - 恢复方式
      ```
          // 删除被暴露的文件
          $ rm -r scripts/ 
          $ rm -r config/ 
          $ rm -r node_modules/
          
          // 重新安装react脚本
          npm install react-scripts
          
          // 修改package-lock.json
          "scripts": {
          +    "start": "react-scripts start",                 
          +    "build": "react-scripts build",                 
          +    "test": "react-scripts test --env=jsdom",       
          +    "eject": "react-scripts eject"                  
          -    "start": "node scripts/start.js",               
          -    "build": "node scripts/build.js",                
          -    "test": "node scripts/test.js --env=jsdom"      
            }
            
          // 重新安装启动
          npm install
          npm start 
      ```
