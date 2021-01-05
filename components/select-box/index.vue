<template>
    <div class="select-box">
        <div :class="['select-box__item', item[customValueKey] === current ? 'at-checkbox__option--selected' : '']" v-for="(item, index) in options" :key="index"
            @click="handleClick(item,index)">

            <template v-if="slotFlag">
                <div class="select-box__content">
                    <slot :car="item" />
                </div>
                <div class="at-checkbox__icon-cnt">
                    <van-checkbox :value="current === item[customValueKey]" />
                </div>
            </template>
            <template v-else>
                <!-- <span class="select-box__title">{{ customKey ? item[customKey] : item.label }}</span> -->
                <!-- <span class="select-box__title">current:{{current}} - {{customValueKey}} </span> -->
                <span class="select-box__title">{{ item.name}}枪</span>

                <span class="select-box__content">
                    <span :class="[item.operatingStatus == 1 ? 'dev-offline' : 'disabled-style-status']"> {{portStatusBoj[item.operatingStatus]  || '空闲可用'}}</span>
                    <!--枪口状态充电中并且 是直流时显示soc-->
                    <span class="port-soc" v-if="item.operatingStatus == 4">SOC {{item.soc||'0'}} %</span>
                </span>

                <div class="at-checkbox__icon-cnt">
                    <van-checkbox :value="current === item[customValueKey]" :disabled="item.operatingStatus == 4"/>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "select-box",
    props: {
        options: {
            type: Array,
            default() {
                return []
            }
        },
        value: {
            type: [String, Number],
            default: null
        },
        customKey: {
            type: String,
            default: ''
        },
        customValueKey: {
            type: String,
            default: 'value'
        },
        slotFlag: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            current: this.value,
            portStatusBoj: {
                1: "空闲可用",
                2: "故障",
                3: "离线",
                4: "充电中",
                5: "自检中"
            },
        }
    },
    watch: {
        value(v, n) {
            if (v !== n) {
                this.current = v
            }
        }
    },
    methods: {
        handleClick(option, index) {
            if (option.disabled || option.operatingStatus == 4) return
            this.$emit('selected', option[this.customValueKey])
        }
    },
}
</script>

<style lang="less" scoped>
.select-box {
    overflow: hidden;
    &__item {
        margin: 12px;
        display: flex;
        align-items: center;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0px 2px 7px 0px rgba(158, 158, 158, 0.2);
        min-height: 60px;
        padding-left: 12px;
        padding-right: 12px;
    }
    &__title {
        min-width: 50px;
    }
    &__content {
        flex: 1;
        padding-left: 12px;
        padding-right: 12px;
    }
    .at-checkbox__icon-cnt {
        margin-right: 0;
        margin-top: 0;
    }

    .dev-offline {
        background: rgba(0, 117, 255, 0.1);
        color: #0075ff;
    }
    .disabled-style-status {
        background: #e7ebf1 !important;
        color: #c0c4cc !important;
    }
    .port-soc{
        color: #c0c4cc;
        padding-left: 5px;
    }
}
</style>
