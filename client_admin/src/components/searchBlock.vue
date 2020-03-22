<template>
  <div class="search_block_container">
    <div class="form">
      <slot name="form" />
    </div>
    <div class="operation" v-if="$slots.operation">
      <slot name="operation" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search_block_container {
    background: rgba(0,0,0,0.02);
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 6px;
    padding: 16px 18px 4px;
    margin-bottom: 18px;
    display: flex;
  }

  .form {
    display: flex;
    flex: 1;
    padding-right: 20px;
  }

  .operation {
    padding-left: 18px;
    margin-bottom: 14px;
    padding-top: 2px;
    border-left: 1px solid rgba(0,0,0,0.12);
  }
</style>

<style lang="scss">
  .search_block_container {
    .form {
      .el-form-item {
        margin: 0 36px 12px 0;
        float: left;

        .el-form-item__content {
          display: inline-block;
        }
      }
    }

    .operation {
      .el-button {
        height: 36px;
        line-height: 36px;
        padding: 0 24px;
        font-size: 14px;
        background-color: transparent;
        &.el-button--primary {
          color: #2474FF;
        }

        &.el-button--info {
          border-color: rgba(0,0,0,0.12);
          color: rgba(0,0,0,0.84);
        }
      }
    }
  }
</style>

