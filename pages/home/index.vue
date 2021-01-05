<template>
    <view class="box">  
        <main-layout class="main-layout" :active="0"> 
            <map class='map' :latitude="latitude" :longitude="longitude" :markers="covers" :style="{height:91+'vh'}"></map>
        </main-layout>
    </view>
</template>

<script>
import MainLayout from '@/components/main-layout/index'
import stationCard from "./subnvue/stationCard";

export default {
    components: { MainLayout, stationCard },
    data() {
        return {
            id:0, // 使用 marker点击事件 需要填写id
            title: 'map',
            latitude: 39.909,
            longitude: 116.39742,
            covers: [{
                latitude: 39.909,
                longitude: 116.39742,
                iconPath: '../../../static/location.png'
            }, {
                latitude: 39.90,
                longitude: 116.39,
                iconPath: '../../../static/location.png'
            }],
            filterTop: 0,
        }
    },
    onLoad(){
        let _this = this
        uni.getSystemInfo({
            success: function (res) {
                console.log(res.model);
                console.log(res.pixelRatio);
                console.log(res.windowWidth);
                console.log(res.windowHeight);
                console.log(res.language);
                console.log(res.version);
                console.log(res.platform);
                _this.filterTop = res.windowHeight
            }
        });

        const subNVue = uni.getSubNVueById('stationCard');// 通过 id 获取 nvue 子窗体
        subNVue.show('slide-in-top', '');// 打开 nvue 子窗体
    }
}
</script>

<style>
    .map {
        width: 750rpx;
        /* height: 1000rpx; */
    }
   
</style>