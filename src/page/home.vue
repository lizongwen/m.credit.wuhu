<template>
	<div class="home">
		<!-- 轮播 -->
		<div class="swipe-wrap">
			<van-swipe :autoplay="3000">
				<van-swipe-item v-for="(item, index) in swipeArry" :key="index">
					<router-link class="img-wrap" :to="{path:'articleDetail',query: { id: item.id }}"><img v-lazy="item.thumbnailBigLink" /></router-link>
				</van-swipe-item>
			</van-swipe>
		</div>

		<!-- 公示快速入口模块 -->
		<div class="gs-nav bg-grey">
			<div class="gs-nav-item">
				<img src="../img/Slice1.png" alt="" srcset="">
				<p>黑名单</p>
			</div>
			<div class="gs-nav-item">
				<img src="../img/Slice2.png" alt="" srcset="">
				<p>红名单</p>
			</div>
			<div class="gs-nav-item">
				<img src="../img/Slice3.png" alt="" srcset="">
				<p>失信被执行人</p>
			</div>
		</div>

		<!-- 守信和失信入口 -->
		<div class="credit-nav">
			<div class="credit-nav-item">
				<router-link :to="{path:'rewards',query: { active: 0 }}"><img src="../img/sx3x.png" alt="" srcset=""></router-link>

			</div>
			<div class="credit-nav-item">
				<router-link :to="{path:'rewards',query: { active: 1 }}"><img src="../img/sx13x.png" alt="" srcset=""></router-link>
			</div>
		</div>
		<!-- tab页签 -->
		<div class="tab">
			<van-tabs v-model="active" @click="onTabClick">
				<van-tab title="信用动态">
					<div>
						<van-list v-model="loading" @load="onLoad" :offset='10' :immediate-check="false" :finished="finished">
							<van-cell v-for="(item,index) in xydtlist" :key="index" :border="false" is-link :to="{ path: 'articleDetail', query: { id: item.id }}">
								<template slot="title">
									<div class="van-ellipsis fl news-title">{{item.title}}</div>
									<div class="fr">{{item.publishTime}}</div>
								</template>
							</van-cell>
						</van-list>
					</div>
				</van-tab>
				<van-tab title="政策法规">
					<div>
						<van-list v-model="loading1" @load="onLoad1" :offset='10' :immediate-check="false" :finished="finished1">
							<van-cell v-for="(item,index) in zcfgList" :key="index" :border="false" is-link :to="{ path: 'articleDetail', query: { id: item.id }}">
								<template slot="title">
									<div class="van-ellipsis fl news-title">{{item.title}}</div>
									<div class="fr">{{item.publishTime}}</div>
								</template>
							</van-cell>
						</van-list>
					</div>
				</van-tab>
				<van-tab title="县区信用监测">
					<div>
						<van-list v-model="loading2" @load="onLoad2" :offset='10' :immediate-check="false" :finished="finished2">
							<van-cell v-for="(item,index) in qxjcList" :key="index" :border="false" is-link :to="{ path: 'articleDetail', query: { id: item.id }}">
								<template slot="title">
									<div class="van-ellipsis fl news-title">{{item.title}}</div>
									<div class="fr">{{item.publishTime}}</div>
								</template>
							</van-cell>
						</van-list>
					</div>
				</van-tab>
			</van-tabs>
		</div>
	</div>
</template>

<script>
import moment from "moment";
import newPng from "../img/new.png";

export default {
  data() {
    return {
      active: 0,
      images: [newPng, newPng],
      swipeArry: [],
      pageNo_xydt: 1,
      pageNo_zcfg: 1,
      pageNo_qxjc: 1,
      loading: false,
      loading1: false,
      loading2: false,
      finished: false,
      finished1: false,
      finished2: false,
      xydtlist: [],
      zcfgList: [],
      qxjcList: []
    };
  },
  mounted() {
    this.getswipe();
    this.getXytdList();
    this.getZcfgList();
    this.getqxjcList();
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY-MM-DD");
    }
  },
  methods: {
    getswipe: async function() {
      const res = await this.$http.post("/webApp/credit/sowingMap");
      if (res.data.resultCode == "0000") {
        this.swipeArry = res.data.resultData;
        this;
      }
    },
    getXytdList: async function() {
      let params = {
        columnName: "信用动态",
        pageNo: this.pageNo_xydt,
        pageSize: 10
      };
      const res = await this.$http.post("/webApp/credit/searchArticle", params);
      if (res.data.resultCode == "0000") {
        this.xydtlist = this.xydtlist.concat(res.data.resultData.rows);
        ++this.pageNo_xydt;
        this.loading = false;
      }
    },
    getZcfgList: async function() {
      let params = {
        columnName: "政策法规",
        pageNo: this.pageNo_zcfg,
        pageSize: 10
      };
      const res = await this.$http.post("/webApp/credit/searchArticle", params);
      if (res.data.resultCode == "0000") {
        this.zcfgList = this.zcfgList.concat(res.data.resultData.rows);
        ++this.pageNo_zcfg;
        this.loading1 = false;
      }
    },
    getqxjcList: async function() {
      let params = {
        columnName: "政策法规",
        pageNo: this.pageNo_qxjc,
        pageSize: 10
      };
      const res = await this.$http.post("/webApp/credit/searchArticle", params);
      if (res.data.resultCode == "0000") {
        this.qxjcList = this.qxjcList.concat(res.data.resultData.rows);
        ++this.pageNo_qxjc;
        this.loading2 = false;
      }
    },
    onLoad() {
      this.getXytdList();
    },
    onLoad1() {
      this.getZcfgList();
    },
    onLoad2() {
      this.getqxjcList();
    },
    onTabClick(index, title) {
      if (index == 0) {
        this.finished = false;
        this.finished1 = true;
        this.finished2 = true;
      } else if (index == 1) {
        this.finished = true;
        this.finished1 = false;
        this.finished2 = true;
      } else if (index == 2) {
        this.finished = true;
        this.finished1 = true;
        this.finished2 = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  .swipe-wrap {
    padding: 10px;
    .van-swipe {
      .img-wrap {
        display: block;
        img {
          width: 100%;
		  height: 149px;
        }
      }
    }
  }
  .gs-nav {
    display: flex;
    padding: 8px 0;
    justify-content: space-evenly;
    align-content: space-evenly;
    align-items: center;
    background-color: #f6f6f6;
    .gs-nav-item {
      width: 30%;
      height: 60px;
      padding-top: 5px;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      background-color: #fff;
      img {
        height: 28px;
        width: 26px;
      }
      p {
        font-size: 14px;
        text-align: center;
        margin: 0 auto;
      }
    }
  }
  .credit-nav {
    display: flex;
    padding: 8px;
    justify-content: space-evenly;
    align-content: space-evenly;
    align-items: center;
    .credit-nav-item {
      height: 55px;
      img {
        height: 100%;
      }
    }
  }
  .tab {
    .van-tab__pane {
      padding: 10px;
      .van-cell__title {
        .news-title {
          max-width: 230px;
        }
      }
    }
  }
}
</style>

