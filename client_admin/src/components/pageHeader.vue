<template>
  <div class="container">
    <div class="title">
      <slot />
    </div>
    <div class="operation">
      <slot name="operation" />
    </div>
  </div>
</template>

<style scoped>
  .container {
    height: 66px;
    line-height: 66px;
  }

  .title {
    float: left;
    font-size: 20px;
    color: rgba(0,0,0,0.84);
    font-weight: bold;
  }

  .operation {
    float: right;
  }
</style>