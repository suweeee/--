document.addEventListener('DOMContentLoaded', () => {
    const fortuneForm = document.getElementById('fortuneForm');
    const fortuneResult = document.getElementById('fortuneResult');
    const resultContentBasic = document.querySelector('.result-content-basic');
    const resultContentBazi = document.querySelector('.result-content-bazi');
    const resultContentFortune = document.querySelector('.result-content-fortune');

    // 農曆年份對應的生肖（從子鼠開始）
    const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];
    
    // 運勢類別 - 新增流年運勢
    const fortuneCategories = ['流年運勢', '八字分析', '事業運', '財運', '感情運', '健康運'];
    
    // 運勢描述庫
    const fortuneDescriptions = {
        流年運勢: [
            '今年為轉運年，各方面運勢皆有提升',
            '今年宜穩紮穩打，循序漸進',
            '今年貴人運旺，有意外驚喜',
            '今年宜修身養性，避免衝動決策'
        ],
        八字分析: [
            '天格與地格相合，易有貴人相助',
            '命宮有吉星照耀，未來發展順遂',
            '需注意趨吉避凶，凡事三思而行',
            '八字顯示穩定發展，耐心待時機'
        ],
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
        // 1900年是鼠年，以此為基準計算
        return zodiacAnimals[((birthYear - 1900) % 12 + 12) % 12];
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

    // 計算流年運勢
    function getYearlyFortune(birthYear) {
        const currentYear = new Date().getFullYear();
        const yearDiff = (currentYear - birthYear) % 10;
        const yearlyFortunes = [
            '黃金運',
            '成長運',
            '轉機運',
            '起伏運',
            '平穩運',
            '波動運',
            '挑戰運',
            '收成運',
            '調整運',
            '準備運'
        ];
        return yearlyFortunes[yearDiff];
    }

    // 計算八字
    function calculateBaZi(birthdate) {
        const year = birthdate.getFullYear();
        const month = birthdate.getMonth() + 1;
        const day = birthdate.getDate();
        
        // 天干對應表（簡化版）
        const heavenlyStems = ['癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬'];
        // 地支對應表（簡化版）
        const earthlyBranches = ['亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌'];
        
        const yearStem = heavenlyStems[year % 10];
        const yearBranch = earthlyBranches[year % 12];
        const monthStem = heavenlyStems[month % 10];
        const monthBranch = earthlyBranches[month % 12];
        const dayStem = heavenlyStems[day % 10];
        const dayBranch = earthlyBranches[day % 12];
        
        return {
            year: `${yearStem}${yearBranch}年`,
            month: `${monthStem}${monthBranch}月`,
            day: `${dayStem}${dayBranch}日`
        };
    }

    // 根據字串生成一個介於0到1之間的固定隨機數
    function seededRandom(seed) {
        let s = seed.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        
        // 使用正弦函數生成偽隨機數
        return Math.abs(Math.sin(s));
    }

    // 根據日期和個人資料產生固定的運勢描述
    function getFixedFortune(category, name, birthdate, gender) {
        const currentDate = new Date().toISOString().split('T')[0];
        const seed = `${currentDate}-${name}-${birthdate.toISOString().split('T')[0]}-${gender}-${category}`;
        const randomValue = seededRandom(seed);
        const descriptions = fortuneDescriptions[category];
        const index = Math.floor(randomValue * descriptions.length);
        return descriptions[index];
    }

    // 計算運勢指數（0-100）
    function calculateFortuneIndex(category, name, birthdate, gender) {
        const currentDate = new Date().toISOString().split('T')[0];
        const seed = `${currentDate}-${name}-${birthdate.toISOString().split('T')[0]}-${gender}-${category}-index`;
        const baseValue = seededRandom(seed);
        
        // 根據不同類別調整基礎值
        const adjustments = {
            '流年運勢': 0,
            '八字分析': 5,
            '事業運': -10,
            '財運': -5,
            '感情運': 0,
            '健康運': 10
        };

        // 計算最終分數（0-100之間）
        let score = Math.floor(baseValue * 70 + 20) + (adjustments[category] || 0);
        return Math.max(0, Math.min(100, score));
    }

    // 取得運勢指數的評級
    function getFortuneRating(index) {
        if (index >= 90) return '★★★★★';
        if (index >= 75) return '★★★★☆';
        if (index >= 60) return '★★★☆☆';
        if (index >= 45) return '★★☆☆☆';
        return '★☆☆☆☆';
    }

    // 取得運勢指數的顏色
    function getFortuneColor(index) {
        if (index >= 90) return '#FF4D4D';
        if (index >= 75) return '#FF8C00';
        if (index >= 60) return '#4CAF50';
        if (index >= 45) return '#2196F3';
        return '#757575';
    }

    fortuneForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const birthdate = new Date(document.getElementById('birthdate').value);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        
        const birthYear = birthdate.getFullYear();
        const zodiacAnimal = getZodiacAnimal(birthYear);
        const element = getElement(birthYear);
        const luckyColor = getLuckyColor(element);
        const yearlyFortune = getYearlyFortune(birthYear);
        const bazi = calculateBaZi(birthdate);

        // 顯示基本資料
        resultContentBasic.innerHTML = `
            <p><strong>姓名：</strong>${name} ${gender === 'male' ? '先生' : '小姐'}</p>
            <p><strong>生肖：</strong>${zodiacAnimal}</p>
            <p><strong>五行：</strong>${element}</p>
            <p><strong>幸運色：</strong>${luckyColor}</p>
            <p><strong>流年運勢：</strong>${yearlyFortune}</p>
        `;

        // 顯示八字命盤
        resultContentBazi.innerHTML = `
            <div class="bazi-display">
                <p><strong>年柱：</strong>${bazi.year}</p>
                <p><strong>月柱：</strong>${bazi.month}</p>
                <p><strong>日柱：</strong>${bazi.day}</p>
            </div>
        `;

        // 顯示運勢分析
        let fortuneHTML = '';
        fortuneCategories.forEach(category => {
            const fortune = getFixedFortune(category, name, birthdate, gender);
            const fortuneIndex = calculateFortuneIndex(category, name, birthdate, gender);
            const rating = getFortuneRating(fortuneIndex);
            const color = getFortuneColor(fortuneIndex);
            
            fortuneHTML += `
                <div class="fortune-category animate__animated animate__fadeInUp">
                    <div class="fortune-header">
                        <h4>${category}</h4>
                        <div class="fortune-index" style="color: ${color}">
                            <span class="fortune-score">${fortuneIndex}</span>
                            <div class="fortune-rating">${rating}</div>
                        </div>
                    </div>
                    <p>${fortune}</p>
                </div>
            `;
        });
        resultContentFortune.innerHTML = fortuneHTML;

        // 顯示結果區域
        fortuneResult.style.display = 'block';

        // 使用 SweetAlert2 顯示提示
        Swal.fire({
            title: '解析完成！',
            html: '您的命盤已準備就緒<br><small>點擊查看詳細解析</small>',
            icon: 'success',
            confirmButtonText: '查看結果',
            confirmButtonColor: '#d4534c'
        }).then(() => {
            // 平滑滾動到結果區域
            fortuneResult.scrollIntoView({ behavior: 'smooth' });
        });
    });
});