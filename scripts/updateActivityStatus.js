// 自动更新活动状态脚本
const { Activity } = require('../src/models');
const { Op } = require('sequelize');
const logger = require('../src/utils/logger');
const nodemailer = require('nodemailer');
const config = require('../src/config');

// 创建邮件发送器
const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
});

// 发送状态变更通知邮件给管理员
async function sendAdminNotification(activities, type) {
    try {
        if (!activities || activities.length === 0) return;

        const subject = type === 'ongoing' ? '活动状态变更为进行中通知' : '活动状态变更为已结束通知';
        const activityList = activities.map(act => 
            `- ${act.title}（ID: ${act.activity_id}）
  开始时间：${new Date(act.start_time).toLocaleString()}
  结束时间：${new Date(act.end_time).toLocaleString()}
  地点：${act.location || '不限'}
  活动类型：${act.activity_type || '未设置'}
  学分类型：${act.credit_type || '未设置'}
  主办方：${act.organizer || '未设置'}
  链接：${act.link || '无'}`
        ).join('\n\n');

        const mailOptions = {
            from: config.email.from,
            to: config.email.adminEmail,
            subject: `【智汇广金】${subject}`,
            text: `以下活动状态已更新：\n\n${activityList}\n\n此邮件由系统自动发送，请勿回复。\n\n发送时间：${new Date().toLocaleString()}`
        };

        await transporter.sendMail(mailOptions);
        logger.info('管理员通知邮件发送成功', { 
            type, 
            activitiesCount: activities.length,
            activityIds: activities.map(a => a.activity_id)
        });
    } catch (error) {
        logger.error('发送管理员通知邮件失败:', {
            error: error.message,
            type,
            activitiesCount: activities?.length
        });
    }
}

async function updateActivitiesStatus() {
    try {
        const now = new Date();
        logger.info('开始更新活动状态', { timestamp: now });

        // 查找需要更新为进行中的活动
        const activitiesToOngoing = await Activity.findAll({
            where: {
                start_time: { [Op.lte]: now },
                end_time: { [Op.gt]: now },
                status: '未开始'
            },
            attributes: [
                'activity_id', 
                'title', 
                'start_time', 
                'end_time', 
                'location', 
                'organizer',
                'activity_type',
                'credit_type',
                'link'
            ]
        });

        // 查找需要更新为已结束的活动
        const activitiesToEnd = await Activity.findAll({
            where: {
                end_time: { [Op.lte]: now },
                status: {
                    [Op.ne]: '已结束'
                }
            },
            attributes: [
                'activity_id', 
                'title', 
                'start_time', 
                'end_time', 
                'location', 
                'organizer',
                'activity_type',
                'credit_type',
                'link'
            ]
        });

        // 执行更新
        const [updatedOngoing] = await Activity.update(
            { status: '进行中' },
            {
                where: {
                    activity_id: activitiesToOngoing.map(a => a.activity_id)
                }
            }
        );

        const [updatedEnded] = await Activity.update(
            { status: '已结束' },
            {
                where: {
                    activity_id: activitiesToEnd.map(a => a.activity_id)
                }
            }
        );

        // 发送邮件通知
        if (updatedOngoing > 0) {
            await sendAdminNotification(activitiesToOngoing, 'ongoing');
        }
        if (updatedEnded > 0) {
            await sendAdminNotification(activitiesToEnd, 'ended');
        }

        const result = {
            updatedToOngoing: updatedOngoing,
            updatedToEnded: updatedEnded,
            timestamp: now,
            ongoingActivities: activitiesToOngoing.map(a => a.activity_id),
            endedActivities: activitiesToEnd.map(a => a.activity_id)
        };

        logger.info('活动状态更新完成', result);

        return result;
    } catch (error) {
        logger.error('更新活动状态失败:', {
            error: error.message,
            stack: error.stack,
            timestamp: new Date()
        });
        throw error;
    }
}

// 如果直接运行脚本则执行更新
if (require.main === module) {
    updateActivitiesStatus()
        .then(result => {
            console.log('活动状态更新完成:', result);
            process.exit(0);
        })
        .catch(error => {
            console.error('活动状态更新失败:', error);
            process.exit(1);
        });
}

module.exports = updateActivitiesStatus; 