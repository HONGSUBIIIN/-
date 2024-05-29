document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 제출 기본 동작 막기

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const email = document.getElementById('email').value;

    // 비밀번호 일치 확인
    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    // 이메일 유효성 검사
    if (!validateEmail(email)) {
        alert('유효한 이메일을 입력해주세요.');
        return;
    }

    // 서버에 가입 요청 보내기
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('가입이 완료되었습니다.');
            window.location.href = '/login.html'; // 로그인 페이지로 리디렉션
        } else {
            alert('오류: ' + data.message);
        }
    })
    .catch(error => {
        console.error('에러:', error);
        alert('가입 중 오류가 발생했습니다.');
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}




const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// 유효성 검사 및 계정 중복 확인을 위한 예제 데이터베이스 (실제 DB 사용 권장)
const users = [];

app.use(bodyParser.json());

app.post('/api/signup', async (req, res) => {
    const { username, password, email } = req.body;

    // 이메일 유효성 검사
    if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: '유효한 이메일을 입력해주세요.' });
    }

    // 이메일 중복 검사
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ success: false, message: '이미 사용 중인 이메일입니다.' });
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 계정 생성
    users.push({ username, password: hashedPassword, email });
    res.json({ success: true });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
