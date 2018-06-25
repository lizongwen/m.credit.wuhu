<template>
	<div class="layout">
		<router-view/>
		<van-tabbar v-model="active">
			<van-tabbar-item icon="shop">首页</van-tabbar-item>
			<van-tabbar-item icon="chat">信用动态</van-tabbar-item>
			<van-tabbar-item icon="records">信用公示</van-tabbar-item>
			<van-tabbar-item icon="gold-coin">信用服务</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
		active: 0
	};
  }
};
</script>

<style lang="scss" scoped>
.layout{
	height:calc(100% - 50px);
	overflow: auto;
}
</style>

