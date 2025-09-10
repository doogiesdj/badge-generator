// Express 서버 - 배지 자동 생성 시스템

const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Google Sheets API 라우트
app.get('/api/sheets/:spreadsheetId', async (req, res) => {
    try {
        const { spreadsheetId } = req.params;
        const { range } = req.query;

        // Google Sheets API 호출 로직
        // 실제 구현에서는 googleapis 라이브러리 사용

        res.json({
            success: true,
            data: [],
            message: 'Google Sheets API 연동 필요'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 프린터 목록 API
app.get('/api/printers', (req, res) => {
    try {
        const printers = [
            { name: 'Microsoft Print to PDF', id: 'pdf', type: 'pdf' },
            { name: '기본 프린터', id: 'default', type: 'system' },
            { name: '화면에 표시', id: 'preview', type: 'preview' }
        ];

        res.json(printers);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 배지 생성 API
app.post('/api/generate-badges', async (req, res) => {
    try {
        const { data, template, size, quantity } = req.body;

        // 배지 생성 로직
        // 실제 구현에서는 Puppeteer나 PDFKit 사용

        res.json({
            success: true,
            message: '배지 생성 완료',
            badges: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 프린트 API
app.post('/api/print', async (req, res) => {
    try {
        const { badges, printerId, quantity } = req.body;

        // 프린트 로직
        // 실제 구현에서는 시스템 프린터 연동

        res.json({
            success: true,
            message: '프린트 완료'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 설정 API
app.get('/api/config', (req, res) => {
    try {
        const config = {
            googleSheets: {
                apiKey: process.env.GOOGLE_API_KEY || '',
                spreadsheetId: process.env.SHEET_ID || ''
            },
            badge: {
                templates: ['default', 'modern', 'classic'],
                sizes: ['a4', 'business', 'custom']
            },
            printer: {
                defaultPrinter: 'Microsoft Print to PDF'
            }
        };

        res.json(config);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 설정 저장 API
app.post('/api/config', (req, res) => {
    try {
        const { config } = req.body;

        // 설정 저장 로직
        // 실제 구현에서는 데이터베이스나 파일에 저장

        res.json({
            success: true,
            message: '설정이 저장되었습니다.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 메인 페이지
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 처리
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: '페이지를 찾을 수 없습니다.'
    });
});

// 에러 처리
app.use((error, req, res, next) => {
    console.error('서버 에러:', error);
    res.status(500).json({
        success: false,
        error: '서버 내부 오류가 발생했습니다.'
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`🚀 배지 자동 생성 시스템이 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`📱 브라우저에서 http://localhost:${PORT} 접속하세요.`);
    console.log(`📊 Google Sheets API 연동을 위해 설정을 완료하세요.`);
});

module.exports = app;
