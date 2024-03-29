# Web Programming HW#2

## 完成所有HW1,HW2進階要求：
- 游標在所有按鈕上(hover)時
    - hover 時有變色提示
    - 皆會有功能提示(tooltip)浮現
        - 使用ease-in, 0.5s使tooltip緩慢浮現
    - 於被釘選的主要畫面上有三段式變色
        - 橢圓出現->橢圓變深->button 再變深
    - 人物中央橢圓三個按鈕皆用checkbox實現，可再擴充功能
- 完成"麥克風"、"鏡頭"、"舉手"等按鈕在按下後圖片、背景顏色轉換
    - 麥克風、鏡頭為紅色
    - 舉手為藍色
    - 當麥克風靜音時，自己("你")的靜音標示出現，反之則消失，且背景顏色根據有無釘選而變化
- 完成新增人物
    - 人物新增時皆假設為新進入會議的人(即"member#"的數字不會重複)，且做到側邊欄人數過多(>6)時改以數字標示
    - 側邊欄(釘選時)
        - 記錄曾出現過的人物，確保隱藏起來後，當前面的人被踢出會議時會再出現
            - i.e. 當member 6因人數過多被隱藏，畫面剩下member 1~5和數字框，當踢出1~5時，member 6會再出現
        - 根據人數不同做出動態大小，總人數為1~6時人物方塊大小皆不一樣，調整符合螢幕比例
        - 當只剩下被釘選人時，主畫面做到全螢幕
    - 非釘選時
        - 各個人物方塊比例根據畫面上人數作調整
            - 分別有 1x1, 2x1 , 2x2, 3x2, 3x3, 4x3, 4x4, ...以此類推，欄、列人數相差不會大於1
            - 人數小於等於20人時皆能保持畫面不超出螢幕
- 做到 Responsive Web Design(RWD)
    - 當畫面width 小於一定大小時，按鈕會一個個消失
        - 當小於一定大小時，會議文字(顯示時間、會議名稱)(位於畫面右下方)，會轉換減少文字呈現
- 將除了會議文字(位於畫面右下方)的文字、圖案設定為不可選取，防止使用者反白文字
- 會議時間呈現當前時間，且文字分為"凌晨"、"上午"、"中午"、"下午"、"晚上"