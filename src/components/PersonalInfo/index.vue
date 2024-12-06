<template>
  <div class="section">
    <h2>个人信息</h2>
    <div class="info-container">
      <div class="text-info">
        <p>姓名：王兆宇</p>
        <p>邮箱：e1326002@u.nus.edu</p>
        <p>电话：+86 15690701976 / +65 89353349</p>
        <p>政治面貌：中共党员</p>
        <p>年龄：23</p>
      </div>
      <img class="profile-photo" src="profile.jpg" alt="个人照片" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalInfo',
};
</script>

<style scoped>
.section {
  margin-bottom: 30px;
}

.section h2 {
  color: #2e5b87;
}

.info-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.text-info {
  flex: 1;
}

.profile-photo {
  width: 130px;
  height: 180px;
  object-fit: cover;
  margin-left: 50px;
  border: 1px solid #ccc;
}
</style>