const noticeService = require('./src/services/noticeService');
const { Notice } = require('./src/models');
const logger = require('./src/utils/logger');

async function testNoticeSoftDelete() {
    console.log('🔍 测试Notice软删除功能...\n');

    try {
        // 1. 创建测试通知
        console.log('1. 创建测试通知...');
        const testNotice = await noticeService.createNotice({
            title: '软删除测试通知',
            content: '这是一个用于测试软删除功能的通知',
            publisher: '测试部门',
            campus: '主校区',
            college: '计算机学院',
            notice_type: '测试通知',
            publish_time: new Date()
        });
        console.log('✅ 测试通知创建成功');
        console.log(`通知ID: ${testNotice.notice_id}`);
        console.log(`标题: ${testNotice.title}\n`);

        // 2. 验证通知可以正常查询
        console.log('2. 验证通知可以正常查询...');
        const foundNotice = await noticeService.getNoticeById(testNotice.notice_id);
        if (foundNotice) {
            console.log('✅ 通知查询成功');
            console.log(`查询到的通知: ${foundNotice.title}\n`);
        } else {
            console.log('❌ 通知查询失败\n');
        }

        // 3. 测试软删除
        console.log('3. 测试软删除...');
        const deleteResult = await noticeService.deleteNotice(testNotice.notice_id);
        if (deleteResult) {
            console.log('✅ 软删除成功\n');
        } else {
            console.log('❌ 软删除失败\n');
        }

        // 4. 验证软删除后无法通过正常查询找到
        console.log('4. 验证软删除后无法通过正常查询找到...');
        const deletedNotice = await noticeService.getNoticeById(testNotice.notice_id);
        if (!deletedNotice) {
            console.log('✅ 软删除后正常查询找不到记录（符合预期）\n');
        } else {
            console.log('❌ 软删除后仍然可以查询到记录（不符合预期）\n');
        }

        // 5. 验证软删除后无法通过搜索找到
        console.log('5. 验证软删除后无法通过搜索找到...');
        const searchService = require('./src/services/searchService');
        const searchResult = await searchService.unifiedSearch({
            keyword: '软删除测试通知',
            type: 'notice',
            page: 1,
            pageSize: 10
        });
        
        if (searchResult.notices.count === 0) {
            console.log('✅ 软删除后搜索找不到记录（符合预期）\n');
        } else {
            console.log('❌ 软删除后搜索仍然可以找到记录（不符合预期）\n');
        }

        // 6. 验证可以通过paranoid: false查询到软删除的记录
        console.log('6. 验证可以通过paranoid: false查询到软删除的记录...');
        const deletedNoticeDirect = await Notice.findByPk(testNotice.notice_id, {
            paranoid: false
        });
        
        if (deletedNoticeDirect && deletedNoticeDirect.deleted_at) {
            console.log('✅ 通过paranoid: false可以查询到软删除的记录');
            console.log(`软删除时间: ${deletedNoticeDirect.deleted_at}\n`);
        } else {
            console.log('❌ 通过paranoid: false无法查询到软删除的记录\n');
        }

        // 7. 测试恢复软删除的记录
        console.log('7. 测试恢复软删除的记录...');
        const restoreResult = await noticeService.restoreNotice(testNotice.notice_id);
        if (restoreResult) {
            console.log('✅ 恢复软删除成功\n');
        } else {
            console.log('❌ 恢复软删除失败\n');
        }

        // 8. 验证恢复后可以正常查询
        console.log('8. 验证恢复后可以正常查询...');
        const restoredNotice = await noticeService.getNoticeById(testNotice.notice_id);
        if (restoredNotice) {
            console.log('✅ 恢复后可以正常查询到记录');
            console.log(`恢复的通知: ${restoredNotice.title}\n`);
        } else {
            console.log('❌ 恢复后仍然无法查询到记录\n');
        }

        // 9. 测试获取软删除列表
        console.log('9. 测试获取软删除列表...');
        
        // 再次软删除以便测试软删除列表
        await noticeService.deleteNotice(testNotice.notice_id);
        
        const deletedNotices = await noticeService.getDeletedNotices({
            page: 1,
            pageSize: 10
        });
        
        if (deletedNotices.notices.length > 0) {
            console.log('✅ 获取软删除列表成功');
            console.log(`软删除的通知数量: ${deletedNotices.notices.length}`);
            console.log(`第一个软删除通知: ${deletedNotices.notices[0].title}\n`);
        } else {
            console.log('❌ 获取软删除列表失败\n');
        }

        // 10. 测试永久删除
        console.log('10. 测试永久删除...');
        const forceDeleteResult = await noticeService.forceDeleteNotice(testNotice.notice_id);
        if (forceDeleteResult) {
            console.log('✅ 永久删除成功\n');
        } else {
            console.log('❌ 永久删除失败\n');
        }

        // 11. 验证永久删除后无法查询到
        console.log('11. 验证永久删除后无法查询到...');
        const permanentlyDeletedNotice = await Notice.findByPk(testNotice.notice_id, {
            paranoid: false
        });
        
        if (!permanentlyDeletedNotice) {
            console.log('✅ 永久删除后无法查询到记录（符合预期）\n');
        } else {
            console.log('❌ 永久删除后仍然可以查询到记录（不符合预期）\n');
        }

        console.log('🎉 Notice软删除功能测试完成！');

    } catch (error) {
        console.error('❌ 测试过程中出现错误:', error.message);
        console.error('错误堆栈:', error.stack);
    } finally {
        // 清理测试数据
        try {
            console.log('\n🧹 清理测试数据...');
            await Notice.destroy({
                where: {
                    title: '软删除测试通知'
                },
                force: true
            });
            console.log('✅ 测试数据清理完成');
        } catch (cleanupError) {
            console.log('⚠️ 测试数据清理失败:', cleanupError.message);
        }
        
        process.exit(0);
    }
}

// 运行测试
testNoticeSoftDelete();
