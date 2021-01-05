<template>
  <div class="captcha-box-wrapper">
    <div class="captcha-box" @click="focus">
      <span
          v-for="i in num"
          :key="i"
          :class="[
            'captcha-box-box',
            (i === code.length + 1) && focused && 'is-active',
            code.charAt(i-1) !== '' && 'is-filled'
          ]"
      >
          <template v-if="code.charAt(i)">
            <i class="captcha-box-dot">·</i>
          </template>
      </span>
    </div>
    <input type="number" :value="code" class="h-input" :maxlength="maxlength" @input="inputChanges" @blur="blur" :focus="focused">
  </div>
</template>

<script>
export default {
  name: "captcha-box",
  props: {
    maxlength: {
      type: [Number, String],
      default: 6,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      code: '',
      focused: this.autofocus,
    }
  },
  watch: {
    autofocus(v) {
      setTimeout(_ => {
        this.focused = v
      }, 200)
    }
  },
  computed: {
    num() {
      return Math.abs(parseInt(this.maxlength, 10)) || 1
    },
  },
  methods: {
    resetCode () {
      this.code = ''
    },
    focus () {
      if (this.focused) { return }
      this.focused = true
    },
    blur() {
      this.focused = false
    },
    inputChanges (e) {
      const { value } = e.mp.detail
      console.log(e.mp.detail,  "detaildetaildetail")
      if (this.maxlength < 0 || value.length <= this.maxlength) {
        this.code = value
      }
      if (this.code.length === this.maxlength) {
        this.$emit('submit', this.code)
        this.focused = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.captcha-box-wrapper {
  position: relative;
  overflow: hidden;
  .h-input {
    position: absolute;
    width: 1;
    height: 1;
    top: -100px;
    left: -1000px;
  }
}
.captcha-box {
  height: 42px;
  display: flex;
  text-align: center;
  justify-content: center;
  &-box {
    background-color: #fff;
    width: 40px;
    height: 40px;
    line-height: 38px;
    border: 1px solid #D0D0D1;
    margin-left: -1px;
  }
  &-dot {
    font-size: 40px;
  }
}
</style>
