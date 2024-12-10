<template>
    <div class="school-detail">
      <div class="detail-content">
        <h2>{{ schoolData.name }}</h2>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      schoolData: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .school-detail {
    position: fixed;
    right: 0;
    top: 0;
    width: 50%;
    height: 100vh;
    background: #fff;
    padding: 20px;
    box-shadow: -2px 0 10px rgba(0,0,0,0.1);
    overflow-y: auto;
  }
  
  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 8px 16px;
    border: none;
    background: #42b983;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .detail-content {
    padding: 40px 20px;
  }
  
  .basic-info {
    margin-bottom: 30px;
  }
  
  .degree, .year, .gpa {
    margin: 5px 0;
    color: #666;
  }
  
  h3 {
    margin: 20px 0 10px;
    color: #2c3e50;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 8px 0;
    padding: 5px 0;
    color: #666;
  }
  </style>