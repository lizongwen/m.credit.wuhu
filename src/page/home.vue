<template>
	<div class="home">
		<!-- 轮播 -->
		<div class="swipe-wrap">
			<van-swipe :autoplay="3000">
				<van-swipe-item v-for="(image, index) in images" :key="index">
					<img v-lazy="image" />
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
			<div class="credit-nav-item"><img src="../img/sx3x.png" alt="" srcset=""></div>
			<div class="credit-nav-item"><img src="../img/sx13x.png" alt="" srcset=""></div>
		</div>
		<!-- tab页签 -->
		<div class="tab">
			<van-tabs v-model="active">
				<van-tab title="信用动态">
					<div>
						<van-list v-model="loading" @load="onLoad" :offset='2' :immediate-check="false">
							<van-cell v-for="(item,index) in list" :key="index" :border="false" is-link>
								<template slot="title">
									<div class="van-ellipsis fl news-title">标题一标题一标题一标题一标题一标题一</div>
									<div class="fr">2018/02/01</div>
								</template>
							</van-cell>
						</van-list>
					</div>
				</van-tab>
				<van-tab title="政策法规">
					<div>2</div>
				</van-tab>
				<van-tab title="县区信用监测">
					<div>3</div>
				</van-tab>
			</van-tabs>
		</div>
	</div>
</template>

<script>
import newPng from "../img/new.png";

export default {
  data() {
    return {
      active: 0,
      images: [newPng, newPng],
      loading: false,
      list: [
        {
          title: "芜湖市荣获“守信激励创新奖”",
          content: "标题内容一",
          date: "2018/01/05"
        },
        {
          title: "标题二",
          content: "标题内容二",
          date: "2018/01/05"
        },
        {
          title: "标题三",
          content: "标题内容三",
          date: "2018/01/05"
        },
        {
          title: "标题四",
          content: "标题内容四",
          date: "2018/01/05"
        },
        {
          title: "标题五",
          content: "标题内容五",
          date: "2018/01/05"
        }
      ]
    };
  },
  mounted() {
    // console.log();
    // for (let i = 0; i < 10; i++) {
    //     this.list.push(this.list.length + 1);
    // }
  },
  methods: {
    onLoad() {
      console.log(123);
      setTimeout(() => {
        this.list.push({
          title: "标题一",
          content: "标题内容一"
        });
        this.loading = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  .swipe-wrap {
    padding: 10px;
    .van-swipe img {
      width: 100%;
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
      img{
      	height: 28px;
      	width: 26px;
      }
      p{
      	font-size: 14px;
      	text-align:center;
      	margin:0 auto;
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
	  .van-cell__title{
		  .news-title{
			  max-width: 230px;	
		  }
	  }
    }
  }
}
</style>

