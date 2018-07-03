<template>
	<div class="layout">
		<div class="banner">
			<img src="../img/banner3x.png" alt="" srcset="">
		</div>
		<router-view class="content"/>
		<van-tabbar v-model="active">
			<van-tabbar-item to="./home">
				<span>首页</span>
				<template slot="icon" slot-scope="props">
					<img :src="props.active ? icon.homeActive : icon.homeNormal" />
				</template>
			</van-tabbar-item>
			<van-tabbar-item to="./dynamic">
				<span>信用动态</span>
				<template slot="icon" slot-scope="props">
					<img :src="props.active ? icon.starActive : icon.starNormal" />
				</template>
			</van-tabbar-item>
			<van-tabbar-item to="./publicity">
				<span>信用公示</span>
				<template slot="icon" slot-scope="props">
					<img :src="props.active ? icon.profileActive : icon.profileNormal" />
				</template>
			</van-tabbar-item>
			<van-tabbar-item to="./service">
				<span>信用服务</span>
				<template slot="icon" slot-scope="props">
					<img :src="props.active ? icon.appstoreActive : icon.appstoreNormal" />
				</template>
			</van-tabbar-item>
			<van-tabbar-item to="./rewards">
				<span>奖惩动态</span>
				<template slot="icon" slot-scope="props">
					<img :src="props.active ? icon.rewardsActive : icon.rewardsNormal" />
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      active: 0,
      icon: {
        homeNormal: require("../img/home.png"),
        homeActive: require("../img/home-o.png"),
        starNormal: require("../img/star.png"),
        starActive: require("../img/star-o.png"),
        profileNormal: require("../img/profile.png"),
        profileActive: require("../img/profile-o.png"),
        appstoreNormal: require("../img/appstore.png"),
        appstoreActive: require("../img/appstore-o.png"),
        rewardsNormal: require("../img/rewards.png"),
        rewardsActive: require("../img/rewards-o.png")
      }
    };
  },
  mounted() {
    this.active = this.$route.meta.index;
  },
  methods: {
    change(active) {
      console.log(active);
    }
  }
};
</script>

<style lang="scss" scoped>
.van-tabbar-item {
  color: #2e2e2e;
}
.van-tabbar-item--active {
  color: #e23b41;
}
.layout {
  height: calc(100% - 50px);
  overflow: auto;
  .banner {
    // height: 70px;
    img {
      width: 100%;
      vertical-align: top;
    }
  }
  .content {
    overflow: auto;
	height: calc(100% - 70px);
  }
}
</style>

