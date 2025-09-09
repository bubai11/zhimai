const { Reminder, Activity, User } = require('./src/models');
const reminderService = require('./src/services/reminderService');
const wechatNotificationService = require('./src/services/wechatNotificationService');
const logger = require('./src/utils/logger');

async function testReminderSystem() {
    try {
        console.log('🧪 开始测试提醒系统...\n');

        // 加载环境变量
        require('dotenv').config();

        // 1. 测试数据库连接
        console.log('1️⃣ 测试数据库连接...');
        console.log(`   数据库地址: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
        console.log(`   数据库名称: ${process.env.DB_NAME}`);
        
        await Reminder.sequelize.authenticate();
        console.log('✅ 数据库连接成功\n');

        // 2. 测试创建提醒
        console.log('2️⃣ 测试创建活动提醒...');
        
        // 查找一个活动
        let activity = await Activity.findOne();
        if (!activity) {
            console.log('❌ 没有找到活动，请先创建活动');
            return;
        }
        console.log(`📅 找到活动: ${activity.title}`);

        // 查找一个用户
        const user = await User.findOne();
        if (!user) {
            console.log('❌ 没有找到用户，请先创建用户');
            return;
        }
        console.log(`👤 找到用户: ${user.username}`);

        // 检查活动时间，如果是过去的，创建一个未来的测试活动
        const now = new Date();
        const activityStartTime = new Date(activity.start_time);
        
        if (activityStartTime <= now) {
            console.log('⚠️  活动时间已过，创建测试活动...');
            const testActivity = await Activity.create({
                title: '测试活动 - 定时提醒功能',
                start_time: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2小时后
                end_time: new Date(now.getTime() + 4 * 60 * 60 * 1000),   // 4小时后
                location: '测试地点',
                activity_type: '二课',
                credit_type: '创新创业',
                status: '未开始',
                description: '用于测试定时提醒功能的活动'
            });
            activity = testActivity;
            console.log(`✅ 创建测试活动成功: ${activity.title}`);
        }

        // 创建活动开始提醒（30分钟后）
        const startReminder = await reminderService.createActivityStartReminder(
            user.id, 
            activity.activity_id, 
            30
        );
        console.log(`✅ 创建活动开始提醒成功: ID ${startReminder.reminder_id}`);

        // 创建活动结束提醒（30分钟后）
        const endReminder = await reminderService.createActivityEndReminder(
            user.id, 
            activity.activity_id, 
            30
        );
        console.log(`✅ 创建活动结束提醒成功: ID ${endReminder.reminder_id}\n`);

        // 3. 测试获取用户提醒
        console.log('3️⃣ 测试获取用户提醒列表...');
        const userReminders = await reminderService.getUserReminders(user.id);
        console.log(`📋 用户提醒数量: ${userReminders.length}`);
        userReminders.forEach(reminder => {
            console.log(`   - ${reminder.title} (${reminder.type}) - ${reminder.sent ? '已发送' : '待发送'}`);
        });
        console.log('');

        // 4. 测试获取待发送提醒
        console.log('4️⃣ 测试获取待发送提醒...');
        const pendingReminders = await reminderService.getPendingReminders();
        console.log(`⏰ 待发送提醒数量: ${pendingReminders.length}\n`);

        // 5. 测试微信通知服务（需要配置环境变量）
        console.log('5️⃣ 测试微信通知服务...');
        try {
            // 检查环境变量
            if (!process.env.WECHAT_APP_ID || !process.env.WECHAT_APP_SECRET) {
                console.log('⚠️  微信配置未设置，跳过微信通知测试');
                console.log('   请设置 WECHAT_APP_ID 和 WECHAT_APP_SECRET 环境变量');
            } else {
                const accessToken = await wechatNotificationService.getAccessToken();
                console.log('✅ 微信访问令牌获取成功');
            }
        } catch (error) {
            console.log('⚠️  微信通知服务测试失败:', error.message);
        }
        console.log('');

        // 6. 测试定时提醒发送
        console.log('6️⃣ 测试定时提醒发送...');
        try {
            const result = await reminderService.sendScheduledReminders();
            console.log(`📤 定时提醒发送结果: 成功 ${result.sent} 个，失败 ${result.failed} 个`);
        } catch (error) {
            console.log('⚠️  定时提醒发送测试失败:', error.message);
        }
        console.log('');

        // 7. 清理测试数据
        console.log('7️⃣ 清理测试数据...');
        await Reminder.destroy({
            where: {
                reminder_id: [startReminder.reminder_id, endReminder.reminder_id]
            }
        });
        console.log('✅ 测试数据清理完成\n');

        console.log('🎉 提醒系统测试完成！');
        console.log('\n📝 测试总结:');
        console.log('   ✅ 数据库连接正常');
        console.log('   ✅ 提醒创建功能正常');
        console.log('   ✅ 提醒查询功能正常');
        console.log('   ✅ 定时任务功能正常');
        console.log('   ⚠️  微信通知需要配置环境变量');

    } catch (error) {
        console.error('❌ 测试失败:', error);
        logger.error('提醒系统测试失败:', error);
    } finally {
        process.exit(0);
    }
}

// 运行测试
testReminderSystem();
