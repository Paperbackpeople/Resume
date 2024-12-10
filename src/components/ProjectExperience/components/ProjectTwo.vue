<template>
    <div>
      <h2>{{ name }}</h2>
      <div class="detail-info">
        <div class="description">
          <p>{{ description.intro }}</p>
          <h4>功能与特色：</h4>
          <ul class="feature-list">
            <li v-for="(feature, index) in description.features" :key="index">
              {{ feature }}
            </li>
          </ul>
          <p class="conclusion-text">{{ description.conclusion }}</p>
        </div>
        <div class="video-container">
          <video 
            v-if="video" 
            controls 
            class="project-video">
            <source :src="video" type="video/mp4">
            您的浏览器不支持视频播放。
          </video>
        </div>
        <h3>技术栈</h3>
        <ul>
          <li v-for="(tech, index) in technologies" :key="index">{{ tech }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProjectTwo',
    data() {
      return {
        name: '分布式寻宝游戏 (Distributed Treasure Hunt Game)',
        description: {
          intro: '本项目是一个分布式的寻宝小游戏。游戏中不存在单一中心服务器，所有节点（玩家）通过Java RMI注册表实现动态组网。主节点和备份节点由玩家优先级动态选定，当主节点宕机时，备份节点或其他玩家会自动选举出新的主服务器，从而确保系统的高可用性和容错性。',
          features: [
            '无中心化服务器：利用Java RMI的注册表机制，所有玩家节点平等地参与游戏，主服务器并非固定，而是根据玩家优先级动态选取。',
            '主/备服务器选举：当检测到主服务器崩溃后，系统会自动触发重新选举，确保游戏不中断。',
            '容错与可靠性：针对玩家退出和服务器崩溃，有相应的故障处理机制。主服务器和备份服务器能够在崩溃后通过选举流程重新设定，保证游戏继续进行。',
            'Gossip协议通信：通过Gossip机制实现状态同步和心跳检测（ping），确保所有玩家的游戏状态（迷宫信息、玩家位置、得分、宝物分布）及时更新。',
            '多线程与阻塞队列：使用多线程处理玩家间消息传递，通过阻塞队列保证多线程下的游戏状态一致性和安全更新。',
            '性能与伸缩性：系统可随时有新玩家加入或玩家退出，利用无中心化结构和缓存机制维持性能。'
          ],
          conclusion: '该项目具体展示在视频中，展示内容包括：迷宫生成、玩家移动、宝物分布、得分更新、主/备服务器选举、玩家退出与加入。'
        },
        technologies: [
          'Java',
          'RMI (Remote Method Invocation)',
          '多线程（Threading）',
          'Gossip协议',
          '分布式选主机制',
          '数据一致性与容错机制'
        ],
        video: 'maze_game.mp4'
      };
    }
  };
  </script>
  
  <style scoped>
  .detail-info {
    margin-top: 20px;
  }
  
  .project-video {
    width: 100%;
    max-width: 600px;
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  ul {
    margin-top: 10px;
    list-style-type: disc;
    padding-left: 20px;
  }
  
  h3 {
    margin-top: 20px;
    color: #2c3e50;
  }
  
  .conclusion-text {
    font-weight: 500;
    font-size: 1.1rem;
    padding: 15px;
    background-color: #f8f9fa;
    border-left: 4px solid #42b983;
    border-radius: 4px;
    margin: 1.5em 0;
  }
  </style>