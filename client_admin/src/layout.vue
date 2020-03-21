<template>
  <el-container class="container">
    <el-header>
      <el-container>
        <el-aside width="200px">
          <div class="logo">
            <span class="icon iconfont icon-xtrace"></span>
            <span>系统标题</span>
          </div>
        </el-aside>
      </el-container>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
          router
          default-active="/"
          class="el-menu-vertical-demo"
          background-color="#f5f5f5"
          text-color="rgba(0,0,0,.84)"
          active-text-color="rgba(0,0,0,.84)">
          <el-menu-item index="/report">
            <i class="el-icon-setting"></i>
            <span slot="title">数据报表</span>
          </el-menu-item>
          <el-menu-item index="/qrcode">
            <i class="el-icon-setting"></i>
            <span slot="title">二维码管理</span>
          </el-menu-item>
          <el-menu-item index="/field">
            <i class="el-icon-setting"></i>
            <span slot="title">字段维护</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  .container {
    width: 100vw;
    height: 100vh;
    background-color: black;

    .el-header {
      padding: 0;

      .logo {
        width: 130px;
        height: 40px;
        margin: 8px auto;
        padding: 2px 5px;
        vertical-align: middle;
        font-size: 18px;
        color: rgb(0, 193, 222);
        border-radius: 10px;
        letter-spacing: 3px;
        text-shadow: 2px 2px 8px rgba(255,255,255,0.3);

        span {
          line-height: 33px;
        }

        .iconfont {
          float: left;
          font-size: 30px;
        }
      }

      .header {
        font-size: 14px;
        line-height: 60px;
        color: white;
        margin-left: 20px;
      }
    }

    .aside {
      background-color: #f5f5f5;

      .is-active {
        font-weight: bold;
      }
    }

    .el-main {
      background-color: white;
    }

    .project-group-selector/deep/ {
      input {
        border: none;
        background-color: rgb(84, 92, 100);
        padding-left: 5px;
      }
    }
  }
</style>