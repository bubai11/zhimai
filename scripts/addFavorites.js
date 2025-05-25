const { Favorite } = require('../src/models');

const favorites = [
    {
        activity_id: 3,
        user_id: 9,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        activity_id: 6,
        user_id: 9,
        created_at: new Date(),
        updated_at: new Date()
    }
];

async function addFavorites() {
    try {
        const results = await Favorite.bulkCreate(favorites, {
            ignoreDuplicates: true
        });
        console.log('收藏记录添加成功:', results);
    } catch (error) {
        console.error('添加收藏记录失败:', error);
    }
    process.exit();
}

addFavorites(); 