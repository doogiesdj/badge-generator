// Express 서버 - 배지 자동 생성 시스템

const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

// Puppeteer는 선택적으로 로드 (설치되지 않은 경우를 대비)
let puppeteer;
try {
    puppeteer = require('puppeteer');
} catch (error) {
    console.log('Puppeteer가 설치되지 않았습니다. PDF 생성 기능이 제한됩니다.');
}

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

// PDF 생성 API
app.post('/api/generate-pdf', async (req, res) => {
    try {
        const { person } = req.body;
        
        if (!person) {
            return res.status(400).json({
                success: false,
                error: '사용자 정보가 필요합니다.'
            });
        }

        // Puppeteer가 설치되지 않은 경우 HTML 파일로 저장
        if (!puppeteer) {
            // 조직명 길이에 따른 폰트 사이즈 계산
            const getFontSize = (orgName) => {
                const length = orgName.length;
                if (length > 20) return '18px';
                if (length > 15) return '22px';
                if (length > 10) return '28px';
                return '32px';
            };

            const orgFontSize = getFontSize(person.organization);

            // 배지 HTML 생성
            const badgeHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>배지 - ${person.name}</title>
                    <style>
                        body { 
                            margin: 0; 
                            padding: 20px; 
                            font-family: Arial, sans-serif; 
                            background: white; 
                        }
                        .badge { 
                            width: 300px; 
                            height: 400px; 
                            border: 2px solid #333; 
                            text-align: center; 
                            padding: 20px;
                            background: white;
                            margin: 0 auto;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                        }
                        .logo { 
                            width: 100px; 
                            height: 50px; 
                            margin: 0 auto 20px auto;
                            background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjUwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TE9HTzwvdGV4dD4KPC9zdmc+') no-repeat center;
                            background-size: contain;
                            background-color: white;
                            display: block;
                        }
                        .name { 
                            font-size: 48px; 
                            font-weight: bold; 
                            margin: 40px 0 20px 0;
                            color: #333;
                            width: 100%;
                            margin-left: auto;
                            margin-right: auto;
                        }
                        .org { 
                            font-size: ${orgFontSize}; 
                            margin-bottom: 40px;
                            color: #555;
                            width: 100%;
                            margin-left: auto;
                            margin-right: auto;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            line-height: 1.2;
                        }
                        .footer-logos {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-top: auto;
                            gap: 40px;
                        }
                        .footer-logo {
                            width: 80px;
                            height: 40px;
                            background: #f0f0f0;
                            border: 1px solid #ddd;
                            border-radius: 5px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 10px;
                            color: #666;
                        }
                        @media print {
                            body { margin: 0; padding: 0; }
                            .badge { page-break-after: always; }
                        }
                    </style>
                </head>
                <body>
                    <div class="badge">
                        <div class="logo"></div>
                        <div class="name">${person.name}</div>
                        <div class="org">${person.organization}</div>
                        <div class="footer-logos">
                            <div class="footer-logo">계룡시</div>
                            <div class="footer-logo">국방산업연구원</div>
                        </div>
                    </div>
                </body>
                </html>
            `;

            // 파일명 생성
            const fileName = `badge_${person.name.replace(/\s+/g, '_')}_${Date.now()}.html`;
            const filePath = path.join(__dirname, 'output', fileName);
            
            // output 디렉토리가 없으면 생성
            if (!fs.existsSync(path.join(__dirname, 'output'))) {
                fs.mkdirSync(path.join(__dirname, 'output'));
            }
            
            // HTML 파일 저장
            fs.writeFileSync(filePath, badgeHtml);

            return res.json({
                success: true,
                message: 'HTML 파일 생성 완료 (브라우저에서 인쇄하여 PDF로 저장하세요)',
                fileName: fileName,
                filePath: filePath,
                isHtml: true
            });
        }

        // Puppeteer가 있는 경우 PDF 생성
        // 조직명 길이에 따른 폰트 사이즈 계산
        const getFontSize = (orgName) => {
            const length = orgName.length;
            if (length > 20) return '18px';
            if (length > 15) return '22px';
            if (length > 10) return '28px';
            return '32px';
        };

        const orgFontSize = getFontSize(person.organization);

        // 배지 HTML 생성
        const badgeHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { 
                        margin: 0; 
                        padding: 20px; 
                        font-family: Arial, sans-serif; 
                        background: white; 
                    }
                    .badge { 
                        width: 300px; 
                        height: 400px; 
                        border: 2px solid #333; 
                        text-align: center; 
                        padding: 20px;
                        background: white;
                        margin: 0 auto;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        page-break-after: always;
                    }
                    .logo { 
                        width: 100px; 
                        height: 50px; 
                        margin: 0 auto 20px auto;
                        background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjUwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TE9HTzwvdGV4dD4KPC9zdmc+') no-repeat center;
                        background-size: contain;
                        background-color: white;
                        display: block;
                    }
                    .name { 
                        font-size: 48px; 
                        font-weight: bold; 
                        margin: 40px 0 20px 0;
                        color: #333;
                        width: 100%;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .org { 
                        font-size: ${orgFontSize}; 
                        margin-bottom: 40px;
                        color: #555;
                        width: 100%;
                        margin-left: auto;
                        margin-right: auto;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        line-height: 1.2;
                    }
                    .footer-logos {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: auto;
                        gap: 40px;
                    }
                    .footer-logo {
                        width: 80px;
                        height: 40px;
                        background: #f0f0f0;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 10px;
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div class="badge">
                    <div class="logo"></div>
                    <div class="name">${person.name}</div>
                    <div class="org">${person.organization}</div>
                    <div class="footer-logos">
                        <div class="footer-logo">계룡시</div>
                        <div class="footer-logo">국방산업연구원</div>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Puppeteer로 PDF 생성
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        await page.setContent(badgeHtml, { waitUntil: 'networkidle0' });
        
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            }
        });
        
        await browser.close();

        // 파일명 생성
        const fileName = `badge_${person.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
        const filePath = path.join(__dirname, 'output', fileName);
        
        // output 디렉토리가 없으면 생성
        if (!fs.existsSync(path.join(__dirname, 'output'))) {
            fs.mkdirSync(path.join(__dirname, 'output'));
        }
        
        // PDF 파일 저장
        fs.writeFileSync(filePath, pdfBuffer);

        res.json({
            success: true,
            message: 'PDF 생성 완료',
            fileName: fileName,
            filePath: filePath
        });

    } catch (error) {
        console.error('PDF 생성 오류:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// PDF 다운로드 API
app.get('/api/download-pdf/:fileName', (req, res) => {
    try {
        const { fileName } = req.params;
        const filePath = path.join(__dirname, 'output', fileName);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                error: '파일을 찾을 수 없습니다.'
            });
        }
        
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('파일 다운로드 오류:', err);
                res.status(500).json({
                    success: false,
                    error: '파일 다운로드 중 오류가 발생했습니다.'
                });
            }
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
