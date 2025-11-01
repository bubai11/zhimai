const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testNoticeComplete() {
    console.log('🔍 测试Notice完整功能...\n');

    try {
        // 1. 测试搜索功能（应该排除软删除的记录）
        console.log('1. 测试搜索功能...');
        const searchResponse = await axios.get(`${BASE_URL}/api/search`, {
            params: {
                keyword: '测试通知',
                type: 'notice',
                page: 1,
                pageSize: 10
            }
        });
        
        console.log('✅ 搜索功能正常');
        console.log(`搜索结果数量: ${searchResponse.data.data.notices.count}`);
        console.log('');

        // 2. 测试搜索建议
        console.log('2. 测试搜索建议...');
        const suggestionsResponse = await axios.get(`${BASE_URL}/api/search/suggestions`);
        console.log('✅ 搜索建议功能正常');
        console.log(`建议数量: ${suggestionsResponse.data.data.length}`);
        console.log('');

        // 3. 测试搜索统计
        console.log('3. 测试搜索统计...');
        const statsResponse = await axios.get(`${BASE_URL}/api/search/stats`, {
            params: {
                keyword: '通知'
            }
        });
        console.log('✅ 搜索统计功能正常');
        console.log(`统计信息:`, statsResponse.data.data);
        console.log('');

        console.log('🎉 Notice完整功能测试完成！');

    } catch (error) {
        console.error('❌ 测试失败:', error.response?.data || error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 提示: 请确保服务器正在运行');
        }
    }
}

// 运行测试
testNoticeComplete();
