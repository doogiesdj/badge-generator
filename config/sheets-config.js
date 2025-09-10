// Google Sheets 설정 파일

const SHEETS_CONFIG = {
    // Google Sheets API 설정
    apiKey: '', // Google Cloud Console에서 발급받은 API 키
    spreadsheetId: '', // Google Sheets의 ID (URL에서 추출)
    range: 'Sheet1!A:D', // 데이터 범위

    // 인증 설정
    credentials: {
        // 서비스 계정 키 파일 경로 (서버 환경에서 사용)
        serviceAccountKey: './config/credentials.json',
        // 클라이언트 ID (브라우저 환경에서 사용)
        clientId: '',
        // 스코프
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    },

    // 데이터 매핑
    dataMapping: {
        name: 0,        // A열: 이름
        email: 1,       // B열: 이메일
        phone: 2,       // C열: 전화번호
        organization: 3 // D열: 소속
    },

    // 시트 설정
    sheetSettings: {
        // 헤더 행 포함 여부
        hasHeader: true,
        // 최대 행 수
        maxRows: 1000,
        // 캐시 시간 (밀리초)
        cacheTimeout: 300000 // 5분
    }
};

// 환경별 설정
const ENV_CONFIG = {
    development: {
        apiKey: 'YOUR_DEV_API_KEY',
        spreadsheetId: 'YOUR_DEV_SHEET_ID'
    },
    production: {
        apiKey: 'YOUR_PROD_API_KEY',
        spreadsheetId: 'YOUR_PROD_SHEET_ID'
    }
};

// 현재 환경 설정 적용
const currentEnv = process.env.NODE_ENV || 'development';
const envConfig = ENV_CONFIG[currentEnv] || {};

// 설정 병합
Object.assign(SHEETS_CONFIG, envConfig);

// 설정 검증
function validateConfig() {
    const required = ['apiKey', 'spreadsheetId'];
    const missing = required.filter(key => !SHEETS_CONFIG[key]);

    if (missing.length > 0) {
        console.warn(`다음 설정이 누락되었습니다: ${missing.join(', ')}`);
        return false;
    }

    return true;
}

// 설정 내보내기
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SHEETS_CONFIG,
        validateConfig
    };
} else {
    window.SHEETS_CONFIG = SHEETS_CONFIG;
    window.validateSheetsConfig = validateConfig;
}
