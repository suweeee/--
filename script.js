document.addEventListener('DOMContentLoaded', () => {
    const fortuneForm = document.getElementById('fortuneForm');
    const fortuneResult = document.getElementById('fortuneResult');
    const resultContent = document.querySelector('.result-content');

    // 農曆年份對應的生肖
    const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];
    
    // 運勢類別
    const fortuneCategories = ['事業運', '財運', '感情運', '健康運'];
    
    // 運勢描述庫
    const fortuneDescriptions = {
        事業運: [
            '貴人相助，事業蒸蒸日上',
            '努力付出將獲得回報',
            '適合嘗試新的發展方向',
            '工作上可能遇到些許挑戰'
        ],
        財運: [
            '財源廣進，適合投資理財',
            '量入為出，避免不必要支出',
            '意外之財可能到來',
            '理財需要更謹慎'
        ],
        感情運: [
            '桃花朵朵開，良緣即將到來',
            '維持現狀，感情穩定發展',
            '適合主動追求心儀對象',
            '感情方面需要多加耐心'
        ],
        健康運: [
            '身體狀況良好，保持運動習慣',
            '注意作息規律，避免熬夜',
            '可能容易感到疲勞，需要適當休息',
            '建議進行健康檢查'
        ]
    };

    // 計算生肖
    function getZodiacAnimal(birthYear) {
        return zodiacAnimals[birthYear % 12];
    }

    // 產生隨機運勢描述
    function getRandomFortune(category) {
        const descriptions = fortuneDescriptions[category];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    // 計算五行屬性
    function getElement(birthYear) {
        const elements = ['金', '木', '水', '火', '土'];
        return elements[birthYear % 5];
    }

    // 計算幸運色
    function getLuckyColor(element) {
        const luckyColors = {
            '金': '白色、金色',
            '木': '綠色、褐色',
            '水': '藍色、黑色',
            '火': '紅色、紫色',
            '土': '黃色、橙色'
        };
        return luckyColors[element];
    }

    fortuneForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const birthdate = new Date(document.getElementById('birthdate').value);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        
        // 計算出生年份
        const birthYear = birthdate.getFullYear();
        const zodiacAnimal = getZodiacAnimal(birthYear);
        const element = getElement(birthYear);
        const luckyColor = getLuckyColor(element);

        // 生成運勢分析
        let fortuneHTML = `
            <div class="animate__animated animate__fadeIn">
                <p class="h5 mb-4">${name} ${gender === 'male' ? '先生' : '小姐'}，您的命盤分析如下：</p>
                <p>生肖：${zodiacAnimal}</p>
                <p>五行屬性：${element}</p>
                <p>今日幸運色：${luckyColor}</p>
            </div>
        `;

        // 添加各類運勢
        fortuneCategories.forEach(category => {
            const fortune = getRandomFortune(category);
            fortuneHTML += `
                <div class="fortune-category animate__animated animate__fadeInUp">
                    <h4>${category}</h4>
                    <p>${fortune}</p>
                </div>
            `;
        });

        // 顯示結果
        resultContent.innerHTML = fortuneHTML;
        fortuneResult.style.display = 'block';

        // 使用 SweetAlert2 顯示提示
        Swal.fire({
            title: '解析完成！',
            text: '您的命盤已準備就緒',
            icon: 'success',
            confirmButtonText: '查看結果',
            confirmButtonColor: '#d4534c'
        });
    });
});